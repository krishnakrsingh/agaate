import { useCallback, useEffect, useState } from "react";
import { Phone, MessageCircle, Share2, Building2, Plus, Trash2 } from "lucide-react";
import { getCmsSiteContactAdmin, saveCmsSiteContactAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { normalizeSiteContactPhoneFields } from "@/lib/admin-format";
import { useToast } from "@/components/admin/AdminToast";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsImageField } from "@/components/admin/cms/CmsImageField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsSectionHeader } from "@/components/admin/cms/CmsSectionHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { canEditCms } from "@/lib/admin-constants";
import { BLANK_SITE_FACILITY, SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
import type { SiteContactConfig, SiteFacilityConfig } from "@/lib/cms-types";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function createFacilityId(name: string, existing: SiteFacilityConfig[]): string {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "location";
  let id = base;
  let n = 2;
  while (existing.some((f) => f.id === id)) {
    id = `${base}-${n++}`;
  }
  return id;
}

function updateFacilityAt(
  contact: SiteContactConfig,
  index: number,
  patch: Partial<SiteFacilityConfig>,
): SiteContactConfig {
  const facilities = [...contact.facilities];
  facilities[index] = { ...facilities[index]!, ...patch };
  return { ...contact, facilities };
}

export function AdminCmsSiteContact({ permissions }: { permissions: string[] }) {
  const toast = useToast();
  const canEdit = canEditCms({ permissions });
  const [contact, setContact] = useState<SiteContactConfig>(SITE_CONTACT_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [whatsappSameAsPrimary, setWhatsappSameAsPrimary] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsSiteContactAdmin();
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      const loaded = res.contact;
      setContact(loaded);
      setWhatsappSameAsPrimary(
        !loaded.whatsappNumber?.trim() || loaded.whatsappNumber === loaded.primaryTel,
      );
    } else {
      toast.error("Load failed", adminError(res, "Could not load site contact settings."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const phones = normalizeSiteContactPhoneFields(contact, { whatsappSameAsPrimary });
    const payload = { ...contact, ...phones };
    const res = await saveCmsSiteContactAdmin({ data: payload });
    setSaving(false);
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      setContact(res.contact);
      setWhatsappSameAsPrimary(
        !res.contact.whatsappNumber?.trim() ||
          res.contact.whatsappNumber === res.contact.primaryTel,
      );
      toast.success("Saved", "Site contact, phones, WhatsApp, and facilities are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save site contact."));
    }
  }

  function updatePrimaryPhone(value: string) {
    setContact((prev) => ({ ...prev, primaryPhoneDisplay: value }));
  }

  function commitPrimaryPhone() {
    const phones = normalizeSiteContactPhoneFields(contact, { whatsappSameAsPrimary });
    setContact((prev) => ({ ...prev, ...phones }));
  }

  function updateAltPhone(value: string) {
    setContact((prev) => ({ ...prev, altPhoneDisplay: value }));
  }

  function commitAltPhone() {
    const phones = normalizeSiteContactPhoneFields(contact, { whatsappSameAsPrimary });
    setContact((prev) => ({ ...prev, ...phones }));
  }

  function updateWhatsappSameAsPrimary(checked: boolean) {
    setWhatsappSameAsPrimary(checked);
    if (checked) {
      const phones = normalizeSiteContactPhoneFields(contact, { whatsappSameAsPrimary: true });
      setContact((prev) => ({ ...prev, whatsappNumber: phones.whatsappNumber }));
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading site contact…</p>;
  }

  const messageKeys = Object.keys(contact.whatsappMessages) as Array<
    keyof SiteContactConfig["whatsappMessages"]
  >;

  return (
    <div className="space-y-8">
      <CmsPageHeader
        title="Site contact & global links"
        description="Phones, emails, WhatsApp templates, social profiles, footer location, and facility hubs used across header, footer, contact page, and CTAs."
        workflow="live"
      />

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Phone className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Phones & emails</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Primary phone"
              hint="Used on the site, in tel: links, and for click-to-call. Format is applied automatically."
            >
              <Input
                value={contact.primaryPhoneDisplay}
                onChange={(e) => updatePrimaryPhone(e.target.value)}
                onBlur={commitPrimaryPhone}
                placeholder="+91 83500 85005"
                disabled={!canEdit}
              />
            </Field>
            <Field label="Alternate phone" hint="Optional second line for the site footer and contact page.">
              <Input
                value={contact.altPhoneDisplay}
                onChange={(e) => updateAltPhone(e.target.value)}
                onBlur={commitAltPhone}
                placeholder="+91 94872 63498"
                disabled={!canEdit}
              />
            </Field>
            <Field label="Primary email">
              <Input
                value={contact.primaryEmail}
                onChange={(e) => setContact({ ...contact, primaryEmail: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Careers email">
              <Input
                value={contact.careersEmail}
                onChange={(e) => setContact({ ...contact, careersEmail: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </div>
          <div className="rounded-lg border bg-muted/30 px-4 py-3 space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="wa-same-primary"
                checked={whatsappSameAsPrimary}
                onCheckedChange={(v) => updateWhatsappSameAsPrimary(v === true)}
                disabled={!canEdit}
              />
              <div className="space-y-1">
                <Label htmlFor="wa-same-primary" className="text-sm font-medium leading-none">
                  Use primary phone for WhatsApp
                </Label>
                <p className="text-xs text-muted-foreground">
                  WhatsApp links across the site will use {contact.primaryTel || "the primary number"}.
                </p>
              </div>
            </div>
            {!whatsappSameAsPrimary ? (
              <Field label="WhatsApp number" hint="Digits only, with country code (e.g. 918350085005).">
                <Input
                  value={contact.whatsappNumber}
                  onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })}
                  placeholder="918350085005"
                  disabled={!canEdit}
                />
              </Field>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <MessageCircle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">WhatsApp message templates</h2>
          </div>
          <div className="grid gap-4">
            {messageKeys.map((key) => (
              <Field key={key} label={key}>
                <Textarea
                  rows={2}
                  value={contact.whatsappMessages[key]}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      whatsappMessages: { ...contact.whatsappMessages, [key]: e.target.value },
                    })
                  }
                  disabled={!canEdit}
                />
              </Field>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <CmsSectionHeader
            title="Social & footer"
            icon={<Share2 className="h-5 w-5 text-primary" />}
            translate={{
              disabled: !canEdit,
              enTexts: [contact.footerLocationEn, contact.registeredOfficeEn],
              onTranslated: ([footerLocationHi, registeredOfficeHi]) =>
                setContact({
                  ...contact,
                  footerLocationHi: footerLocationHi ?? contact.footerLocationHi,
                  registeredOfficeHi: registeredOfficeHi ?? contact.registeredOfficeHi,
                }),
            }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {(["facebook", "youtube", "instagram", "linkedin"] as const).map((key) => (
              <Field key={key} label={key}>
                <Input
                  value={contact.social[key]}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social: { ...contact.social, [key]: e.target.value },
                    })
                  }
                  disabled={!canEdit}
                />
              </Field>
            ))}
            <Field label="Footer location (EN)">
              <Input
                value={contact.footerLocationEn}
                onChange={(e) => setContact({ ...contact, footerLocationEn: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Footer location (HI)">
              <Input
                value={contact.footerLocationHi}
                onChange={(e) => setContact({ ...contact, footerLocationHi: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Registered office (EN)">
              <Textarea
                rows={2}
                value={contact.registeredOfficeEn}
                onChange={(e) => setContact({ ...contact, registeredOfficeEn: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="CIN / legal line">
              <Input
                value={contact.cin}
                onChange={(e) => setContact({ ...contact, cin: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CmsSectionHeader
              title={`Facilities (${contact.facilities.length})`}
              icon={<Building2 className="h-5 w-5 text-primary" />}
            />
            {canEdit ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextId = createFacilityId("new-location", contact.facilities);
                  setContact({
                    ...contact,
                    facilities: [
                      ...contact.facilities,
                      { ...BLANK_SITE_FACILITY, id: nextId, nameEn: "New location" },
                    ],
                  });
                }}
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add location
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Locations shown on the Contact page map, homepage location modal, and footer. Group by
            district (e.g. &quot;Jaipur, Rajasthan&quot;) for regional filters.
          </p>
          {contact.facilities.map((facility, index) => (
            <div key={`${facility.id}-${index}`} className="rounded-xl border p-4 space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <Field label="Location ID" hint="Unique slug — used internally, not shown on site.">
                  <Input
                    value={facility.id}
                    onChange={(e) => {
                      const id = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]+/g, "-")
                        .replace(/^-|-$/g, "");
                      setContact(updateFacilityAt(contact, index, { id }));
                    }}
                    disabled={!canEdit}
                    className="font-mono text-xs max-w-xs"
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <CmsTranslateToHindiButton
                    variant="inline"
                    disabled={!canEdit}
                    enTexts={[
                      facility.nameEn,
                      facility.taglineEn,
                      facility.addressEn,
                      facility.districtEn,
                      facility.hoursEn,
                    ]}
                    onTranslated={([nameHi, taglineHi, addressHi, districtHi, hoursHi]) => {
                      setContact(
                        updateFacilityAt(contact, index, {
                          nameHi: nameHi ?? facility.nameHi,
                          taglineHi: taglineHi ?? facility.taglineHi,
                          addressHi: addressHi ?? facility.addressHi,
                          districtHi: districtHi ?? facility.districtHi,
                          hoursHi: hoursHi ?? facility.hoursHi,
                        }),
                      );
                    }}
                  />
                  {canEdit && contact.facilities.length > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setContact({
                          ...contact,
                          facilities: contact.facilities.filter((_, i) => i !== index),
                        });
                      }}
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" />
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <CmsBilingualField
                  label="Name"
                  en={facility.nameEn}
                  hi={facility.nameHi}
                  onEn={(v) => {
                    const patch: Partial<SiteFacilityConfig> = { nameEn: v };
                    if (facility.id.startsWith("new-location") || facility.id.startsWith("location")) {
                      patch.id = createFacilityId(
                        v,
                        contact.facilities.filter((_, i) => i !== index),
                      );
                    }
                    setContact(updateFacilityAt(contact, index, patch));
                  }}
                  onHi={(v) => setContact(updateFacilityAt(contact, index, { nameHi: v }))}
                  disabled={!canEdit}
                />
                <CmsBilingualField
                  label="Tagline / subtitle"
                  en={facility.taglineEn}
                  hi={facility.taglineHi}
                  onEn={(v) => setContact(updateFacilityAt(contact, index, { taglineEn: v }))}
                  onHi={(v) => setContact(updateFacilityAt(contact, index, { taglineHi: v }))}
                  disabled={!canEdit}
                />
                <CmsBilingualField
                  label="District (for grouping)"
                  en={facility.districtEn}
                  hi={facility.districtHi}
                  onEn={(v) => setContact(updateFacilityAt(contact, index, { districtEn: v }))}
                  onHi={(v) => setContact(updateFacilityAt(contact, index, { districtHi: v }))}
                  disabled={!canEdit}
                />
                <Field label="Phone display">
                  <Input
                    value={facility.phone}
                    onChange={(e) =>
                      setContact(updateFacilityAt(contact, index, { phone: e.target.value }))
                    }
                    disabled={!canEdit}
                  />
                </Field>
                <CmsBilingualField
                  label="Address"
                  en={facility.addressEn}
                  hi={facility.addressHi}
                  onEn={(v) => setContact(updateFacilityAt(contact, index, { addressEn: v }))}
                  onHi={(v) => setContact(updateFacilityAt(contact, index, { addressHi: v }))}
                  disabled={!canEdit}
                  multiline
                  rows={2}
                />
                <CmsBilingualField
                  label="Hours"
                  en={facility.hoursEn}
                  hi={facility.hoursHi}
                  onEn={(v) => setContact(updateFacilityAt(contact, index, { hoursEn: v }))}
                  onHi={(v) => setContact(updateFacilityAt(contact, index, { hoursHi: v }))}
                  disabled={!canEdit}
                />
                <Field label="Latitude">
                  <Input
                    type="number"
                    step="any"
                    value={facility.lat}
                    onChange={(e) => {
                      const lat = Number(e.target.value);
                      setContact(
                        updateFacilityAt(contact, index, {
                          lat,
                          latLabel: `${lat.toFixed(4)}° N`,
                        }),
                      );
                    }}
                    disabled={!canEdit}
                  />
                </Field>
                <Field label="Longitude">
                  <Input
                    type="number"
                    step="any"
                    value={facility.lng}
                    onChange={(e) => {
                      const lng = Number(e.target.value);
                      setContact(
                        updateFacilityAt(contact, index, {
                          lng,
                          lngLabel: `${lng.toFixed(4)}° E`,
                        }),
                      );
                    }}
                    disabled={!canEdit}
                  />
                </Field>
                <Field
                  label="Map search query"
                  hint="Used for the embedded Google Map (e.g. store name + city)."
                >
                  <Input
                    value={facility.mapEmbedQuery}
                    onChange={(e) =>
                      setContact(updateFacilityAt(contact, index, { mapEmbedQuery: e.target.value }))
                    }
                    disabled={!canEdit}
                  />
                </Field>
                <Field label="Google Maps link">
                  <Input
                    value={facility.mapsUrl}
                    onChange={(e) =>
                      setContact(updateFacilityAt(contact, index, { mapsUrl: e.target.value }))
                    }
                    disabled={!canEdit}
                    placeholder="https://www.google.com/maps/..."
                  />
                </Field>
                <CmsImageField
                  label="Facility image"
                  value={facility.imageUrl}
                  onChange={(url) => setContact(updateFacilityAt(contact, index, { imageUrl: url }))}
                  disabled={!canEdit}
                />
              </div>
            </div>
          ))}
        </section>

        {canEdit ? <CmsStickySaveBar saving={saving} label="Save site contact" /> : null}
      </form>
    </div>
  );
}
