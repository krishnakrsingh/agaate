import { useCallback, useEffect, useState } from "react";
import { Phone, MessageCircle, Share2, Building2 } from "lucide-react";
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
import { canEditCms } from "@/lib/admin-constants";
import { SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
import type { SiteContactConfig } from "@/lib/cms-types";

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
          <CmsSectionHeader
            title={`Facilities (${contact.facilities.length})`}
            icon={<Building2 className="h-5 w-5 text-primary" />}
          />
          {contact.facilities.map((facility, index) => (
            <div key={facility.id} className="rounded-xl border p-4 space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {facility.id}
                </p>
                <CmsTranslateToHindiButton
                  variant="inline"
                  disabled={!canEdit}
                  enTexts={[facility.nameEn, facility.addressEn]}
                  onTranslated={([nameHi, addressHi]) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = {
                      ...facility,
                      nameHi: nameHi ?? facility.nameHi,
                      addressHi: addressHi ?? facility.addressHi,
                    };
                    setContact({ ...contact, facilities });
                  }}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <CmsBilingualField
                  label="Name"
                  en={facility.nameEn}
                  hi={facility.nameHi}
                  onEn={(v) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = { ...facility, nameEn: v };
                    setContact({ ...contact, facilities });
                  }}
                  onHi={(v) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = { ...facility, nameHi: v };
                    setContact({ ...contact, facilities });
                  }}
                  disabled={!canEdit}
                />
                <Field label="Phone display">
                  <Input
                    value={facility.phone}
                    onChange={(e) => {
                      const facilities = [...contact.facilities];
                      facilities[index] = { ...facility, phone: e.target.value };
                      setContact({ ...contact, facilities });
                    }}
                    disabled={!canEdit}
                  />
                </Field>
                <CmsBilingualField
                  label="Address"
                  en={facility.addressEn}
                  hi={facility.addressHi}
                  onEn={(v) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = { ...facility, addressEn: v };
                    setContact({ ...contact, facilities });
                  }}
                  onHi={(v) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = { ...facility, addressHi: v };
                    setContact({ ...contact, facilities });
                  }}
                  disabled={!canEdit}
                  multiline
                  rows={2}
                />
                <CmsImageField
                  label="Facility image"
                  value={facility.imageUrl}
                  onChange={(url) => {
                    const facilities = [...contact.facilities];
                    facilities[index] = { ...facility, imageUrl: url };
                    setContact({ ...contact, facilities });
                  }}
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
