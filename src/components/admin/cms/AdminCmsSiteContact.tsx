import { useCallback, useEffect, useState } from "react";
import { Save, Phone, MessageCircle, Share2, Building2 } from "lucide-react";
import { getCmsSiteContactAdmin, saveCmsSiteContactAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
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

export function AdminCmsSiteContact({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [contact, setContact] = useState<SiteContactConfig>(SITE_CONTACT_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsSiteContactAdmin();
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      setContact(res.contact);
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
    const res = await saveCmsSiteContactAdmin({ data: contact });
    setSaving(false);
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      setContact(res.contact);
      toast.success("Saved", "Site contact, phones, WhatsApp, and facilities are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save site contact."));
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site contact & global links</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Phones, emails, WhatsApp templates, social profiles, footer location, and facility hubs
          used across header, footer, contact page, and CTAs.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Phone className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Phones & emails</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary phone (display)">
              <Input
                value={contact.primaryPhoneDisplay}
                onChange={(e) => setContact({ ...contact, primaryPhoneDisplay: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Primary phone (digits)">
              <Input
                value={contact.primaryPhone}
                onChange={(e) => setContact({ ...contact, primaryPhone: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Primary tel (WhatsApp format, e.g. 918350085005)">
              <Input
                value={contact.primaryTel}
                onChange={(e) => setContact({ ...contact, primaryTel: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Alt phone (display)">
              <Input
                value={contact.altPhoneDisplay}
                onChange={(e) => setContact({ ...contact, altPhoneDisplay: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Alt phone (digits)">
              <Input
                value={contact.altPhone}
                onChange={(e) => setContact({ ...contact, altPhone: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Alt tel">
              <Input
                value={contact.altTel}
                onChange={(e) => setContact({ ...contact, altTel: e.target.value })}
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
            <Field label="WhatsApp number (digits)">
              <Input
                value={contact.whatsappNumber}
                onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
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
          <div className="flex items-center gap-2 text-primary">
            <Share2 className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Social & footer</h2>
          </div>
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
          <div className="flex items-center gap-2 text-primary">
            <Building2 className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Facilities ({contact.facilities.length})</h2>
          </div>
          {contact.facilities.map((facility, index) => (
            <div key={facility.id} className="rounded-xl border p-4 space-y-3">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {facility.id}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name (EN)">
                  <Input
                    value={facility.nameEn}
                    onChange={(e) => {
                      const facilities = [...contact.facilities];
                      facilities[index] = { ...facility, nameEn: e.target.value };
                      setContact({ ...contact, facilities });
                    }}
                    disabled={!canEdit}
                  />
                </Field>
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
                <Field label="Address (EN)">
                  <Textarea
                    rows={2}
                    value={facility.addressEn}
                    onChange={(e) => {
                      const facilities = [...contact.facilities];
                      facilities[index] = { ...facility, addressEn: e.target.value };
                      setContact({ ...contact, facilities });
                    }}
                    disabled={!canEdit}
                  />
                </Field>
                <Field label="Image URL">
                  <Input
                    value={facility.imageUrl}
                    onChange={(e) => {
                      const facilities = [...contact.facilities];
                      facilities[index] = { ...facility, imageUrl: e.target.value };
                      setContact({ ...contact, facilities });
                    }}
                    disabled={!canEdit}
                  />
                </Field>
              </div>
            </div>
          ))}
        </section>

        {canEdit && (
          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save site contact"}
          </Button>
        )}
      </form>
    </div>
  );
}
