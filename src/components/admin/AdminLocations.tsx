import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  MapPin,
  Plus,
  Search,
  Star,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getCmsSiteContactAdmin, saveCmsSiteContactAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { normalizeSiteContactPhoneFields } from "@/lib/admin-format";
import { useToast } from "@/components/admin/AdminToast";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsImageField } from "@/components/admin/cms/CmsImageField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canEditCms } from "@/lib/admin-constants";
import { BLANK_SITE_FACILITY, SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
import type { SiteContactConfig, SiteFacilityConfig } from "@/lib/cms-types";
import { CMS_ICON_KEYS } from "@/lib/cms-types";
import { createFacilityId, updateFacilityAt } from "@/lib/facility-admin";
import { AdminFacilityMapPicker } from "@/components/admin/AdminFacilityMapPicker";

type FilterMode = "all" | "primary" | "secondary";

function hasValidPin(facility: SiteFacilityConfig) {
  return (
    Number.isFinite(facility.lat) &&
    Number.isFinite(facility.lng) &&
    !(facility.lat === 0 && facility.lng === 0)
  );
}

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

export function AdminLocations({ permissions }: { permissions: string[] }) {
  const toast = useToast();
  const canEdit = canEditCms({ permissions });
  const [contact, setContact] = useState<SiteContactConfig>(SITE_CONTACT_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  useCmsDirtyGuard(dirty);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsSiteContactAdmin();
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      setContact(res.contact);
      setDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load locations."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(() => {
    const primary = contact.facilities.filter((f) => f.isPrimary).length;
    return {
      total: contact.facilities.length,
      primary,
      secondary: contact.facilities.length - primary,
    };
  }, [contact.facilities]);

  const visibleFacilities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contact.facilities
      .map((facility, index) => ({ facility, index }))
      .filter(({ facility }) => {
        if (filter === "primary" && !facility.isPrimary) return false;
        if (filter === "secondary" && facility.isPrimary) return false;
        if (!q) return true;
        return (
          facility.nameEn.toLowerCase().includes(q) ||
          facility.nameHi.toLowerCase().includes(q) ||
          facility.districtEn.toLowerCase().includes(q) ||
          facility.id.toLowerCase().includes(q)
        );
      });
  }, [contact.facilities, filter, search]);

  function patchContact(next: SiteContactConfig) {
    setContact(next);
    setDirty(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const phones = normalizeSiteContactPhoneFields(contact, { whatsappSameAsPrimary: true });
    const res = await saveCmsSiteContactAdmin({ data: { ...contact, ...phones } });
    setSaving(false);
    if (isAdminOk<{ contact: SiteContactConfig }>(res)) {
      setContact(res.contact);
      setDirty(false);
      toast.success("Saved", "Locations updated on the contact page.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save locations."));
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading locations…</p>;
  }

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Locations"
        description="Manage physical hubs on the Contact page map. Primary locations show by default; secondary locations appear when visitors search or filter by state."
        workflow="live"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Primary hubs</p>
          <p className="mt-1 text-2xl font-semibold">{stats.primary}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Visible on load</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Secondary</p>
          <p className="mt-1 text-2xl font-semibold">{stats.secondary}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Search to reveal</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Total locations</p>
          <p className="mt-1 text-2xl font-semibold">{stats.total}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["all", "primary", "secondary"] as const).map((mode) => (
              <Button
                key={mode}
                type="button"
                size="sm"
                variant={filter === mode ? "default" : "outline"}
                onClick={() => setFilter(mode)}
              >
                {mode === "all" ? "All" : mode === "primary" ? "Primary" : "Secondary"}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative min-w-[200px] flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search locations…"
                className="pl-8"
              />
            </div>
            {canEdit ? (
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nextId = createFacilityId("new-location", contact.facilities);
                  const next: SiteFacilityConfig = {
                    ...BLANK_SITE_FACILITY,
                    id: nextId,
                    nameEn: "New location",
                  };
                  patchContact({ ...contact, facilities: [...contact.facilities, next] });
                  setExpandedId(nextId);
                }}
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add location
              </Button>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          {visibleFacilities.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              No locations match this filter.
            </div>
          ) : (
            visibleFacilities.map(({ facility, index }) => {
              const isOpen = expandedId === facility.id;
              return (
                <div key={facility.id} className="rounded-xl border bg-card shadow-sm overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
                    onClick={() => setExpandedId(isOpen ? null : facility.id)}
                  >
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium truncate">{facility.nameEn || "Untitled"}</p>
                        {facility.isPrimary ? (
                          <Badge variant="secondary" className="gap-1 text-[10px]">
                            <Star className="h-3 w-3 fill-current" />
                            Primary
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">
                            Secondary
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {facility.districtEn || "No district"} · {facility.id}
                        {hasValidPin(facility) ? (
                          <span className="inline-flex items-center gap-0.5 ml-1.5 text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            pinned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 ml-1.5 text-amber-600">
                            <AlertCircle className="h-3 w-3" />
                            no pin
                          </span>
                        )}
                      </p>
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="border-t px-4 py-4 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`primary-${facility.id}`}
                            checked={facility.isPrimary}
                            disabled={!canEdit}
                            onCheckedChange={(v) =>
                              patchContact(
                                updateFacilityAt(contact, index, { isPrimary: v === true }),
                              )
                            }
                          />
                          <Label htmlFor={`primary-${facility.id}`} className="text-sm font-medium">
                            Primary hub (show on contact page by default)
                          </Label>
                        </div>
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
                              patchContact(
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
                                patchContact({
                                  ...contact,
                                  facilities: contact.facilities.filter((_, i) => i !== index),
                                });
                                if (expandedId === facility.id) setExpandedId(null);
                              }}
                            >
                              <Trash2 className="mr-1.5 h-4 w-4" />
                              Remove
                            </Button>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Location ID" hint="Unique slug — not shown on the public site.">
                          <Input
                            value={facility.id}
                            onChange={(e) => {
                              const id = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]+/g, "-")
                                .replace(/^-|-$/g, "");
                              patchContact(updateFacilityAt(contact, index, { id }));
                            }}
                            disabled={!canEdit}
                            className="font-mono text-xs"
                          />
                        </Field>
                        <Field label="Icon">
                          <Select
                            value={facility.iconKey}
                            onValueChange={(v) =>
                              patchContact(
                                updateFacilityAt(contact, index, {
                                  iconKey: v as SiteFacilityConfig["iconKey"],
                                }),
                              )
                            }
                            disabled={!canEdit}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CMS_ICON_KEYS.map((key) => (
                                <SelectItem key={key} value={key}>
                                  {key}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <CmsBilingualField
                          label="Name"
                          en={facility.nameEn}
                          hi={facility.nameHi}
                          onEn={(v) => {
                            const patch: Partial<SiteFacilityConfig> = { nameEn: v };
                            if (
                              facility.id.startsWith("new-location") ||
                              facility.id.startsWith("location")
                            ) {
                              patch.id = createFacilityId(
                                v,
                                contact.facilities.filter((_, i) => i !== index),
                              );
                            }
                            patchContact(updateFacilityAt(contact, index, patch));
                          }}
                          onHi={(v) => patchContact(updateFacilityAt(contact, index, { nameHi: v }))}
                          disabled={!canEdit}
                        />
                        <CmsBilingualField
                          label="Tagline"
                          en={facility.taglineEn}
                          hi={facility.taglineHi}
                          onEn={(v) =>
                            patchContact(updateFacilityAt(contact, index, { taglineEn: v }))
                          }
                          onHi={(v) =>
                            patchContact(updateFacilityAt(contact, index, { taglineHi: v }))
                          }
                          disabled={!canEdit}
                        />
                        <CmsBilingualField
                          label="District (state filter)"
                          en={facility.districtEn}
                          hi={facility.districtHi}
                          onEn={(v) =>
                            patchContact(updateFacilityAt(contact, index, { districtEn: v }))
                          }
                          onHi={(v) =>
                            patchContact(updateFacilityAt(contact, index, { districtHi: v }))
                          }
                          disabled={!canEdit}
                        />
                        <Field label="Phone display">
                          <Input
                            value={facility.phone}
                            onChange={(e) =>
                              patchContact(updateFacilityAt(contact, index, { phone: e.target.value }))
                            }
                            disabled={!canEdit}
                          />
                        </Field>
                        <CmsBilingualField
                          label="Address"
                          en={facility.addressEn}
                          hi={facility.addressHi}
                          onEn={(v) =>
                            patchContact(updateFacilityAt(contact, index, { addressEn: v }))
                          }
                          onHi={(v) =>
                            patchContact(updateFacilityAt(contact, index, { addressHi: v }))
                          }
                          disabled={!canEdit}
                          multiline
                          rows={2}
                        />
                        <CmsBilingualField
                          label="Hours"
                          en={facility.hoursEn}
                          hi={facility.hoursHi}
                          onEn={(v) =>
                            patchContact(updateFacilityAt(contact, index, { hoursEn: v }))
                          }
                          onHi={(v) =>
                            patchContact(updateFacilityAt(contact, index, { hoursHi: v }))
                          }
                          disabled={!canEdit}
                        />
                      </div>

                      <AdminFacilityMapPicker
                        facility={facility}
                        canEdit={canEdit}
                        onChange={(patch) =>
                          patchContact(updateFacilityAt(contact, index, patch))
                        }
                      />

                      <div className="grid gap-3 sm:grid-cols-2">
                        <CmsImageField
                          label="Photo"
                          value={facility.imageUrl}
                          onChange={(url) =>
                            patchContact(updateFacilityAt(contact, index, { imageUrl: url }))
                          }
                          disabled={!canEdit}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground flex gap-2">
          <Building2 className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Primary locations (Farm, Kisan Mall, Corporate) appear immediately on{" "}
            <code>/contact</code>. Add franchise or partner outlets as secondary — visitors discover
            them by searching or filtering by state.
          </p>
        </div>

        {canEdit ? <CmsStickySaveBar saving={saving} label="Save locations" /> : null}
      </form>
    </div>
  );
}
