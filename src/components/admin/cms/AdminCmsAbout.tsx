import { useCallback, useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { getCmsAboutPageAdmin, saveCmsAboutPageAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { ABOUT_PAGE_FALLBACK } from "@/data/about-page-fallback";
import type { AboutPageContent, CmsIconKey } from "@/lib/cms-types";
import { CMS_ICON_KEYS } from "@/lib/cms-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[]): string {
  return items.join("\n");
}

export function AdminCmsAbout({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [content, setContent] = useState<AboutPageContent>(ABOUT_PAGE_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useCmsDirtyGuard(dirty);

  const updateContent = (next: AboutPageContent) => {
    setContent(next);
    setDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsAboutPageAdmin();
    if (isAdminOk<{ content: AboutPageContent }>(res)) {
      setContent(res.content);
      setDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load about page content."));
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
    const res = await saveCmsAboutPageAdmin({ data: content });
    setSaving(false);
    if (isAdminOk<{ content: AboutPageContent }>(res)) {
      setContent(res.content);
      setDirty(false);
      toast.success("Saved", "About page copy is updated on the public site.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save about page."));
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading about page…</p>;
  }

  const hero = content.hero;
  const whoWeAre = content.whoWeAre;

  return (
    <div className="space-y-8">
      <CmsPageHeader
        title="About page"
        description="Edit hero, values, milestones, footprint locations, impact metrics, and compliance copy on the About page."
        workflow="live"
      />

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Hero</h2>
          </div>
          <CmsBilingualField
            variant="plain"
            label="Badge"
            en={hero.badgeEn}
            hi={hero.badgeHi}
            onEn={(v) => updateContent({ ...content, hero: { ...hero, badgeEn: v } })}
            onHi={(v) => updateContent({ ...content, hero: { ...hero, badgeHi: v } })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            variant="plain"
            label="Title"
            en={hero.titleEn}
            hi={hero.titleHi}
            onEn={(v) => updateContent({ ...content, hero: { ...hero, titleEn: v } })}
            onHi={(v) => updateContent({ ...content, hero: { ...hero, titleHi: v } })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            variant="plain"
            label="Title accent"
            en={hero.titleAccentEn}
            hi={hero.titleAccentHi}
            onEn={(v) => updateContent({ ...content, hero: { ...hero, titleAccentEn: v } })}
            onHi={(v) => updateContent({ ...content, hero: { ...hero, titleAccentHi: v } })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            variant="plain"
            label="Description"
            en={hero.descriptionEn}
            hi={hero.descriptionHi}
            onEn={(v) => updateContent({ ...content, hero: { ...hero, descriptionEn: v } })}
            onHi={(v) => updateContent({ ...content, hero: { ...hero, descriptionHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <div className="space-y-1">
            <Label>Hero image URL</Label>
            <Input
              value={hero.heroImageUrl}
              onChange={(e) => updateContent({ ...content, hero: { ...hero, heroImageUrl: e.target.value } })}
              disabled={!canEdit}
            />
          </div>
          <CmsBilingualField
            variant="plain"
            label="Hero image alt"
            en={hero.heroImageAltEn}
            hi={hero.heroImageAltHi}
            onEn={(v) => updateContent({ ...content, hero: { ...hero, heroImageAltEn: v } })}
            onHi={(v) => updateContent({ ...content, hero: { ...hero, heroImageAltHi: v } })}
            disabled={!canEdit}
          />
          <div className="space-y-3">
            <Label>Hero stats</Label>
            {hero.stats.map((stat, i) => (
              <div key={i} className="rounded-lg border p-3 grid gap-2 sm:grid-cols-2">
                <CmsBilingualField
            variant="plain"
                  label="Value"
                  en={stat.valueEn}
                  hi={stat.valueHi}
                  onEn={(v) =>
                    updateContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, valueEn: v } : s)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, valueHi: v } : s)),
                      },
                    })
                  }
                  disabled={!canEdit}
                />
                <CmsBilingualField
            variant="plain"
                  label="Label"
                  en={stat.labelEn}
                  hi={stat.labelHi}
                  onEn={(v) =>
                    updateContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, labelEn: v } : s)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, labelHi: v } : s)),
                      },
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Who we are</h2>
          <CmsBilingualField
            variant="plain"
            label="Eyebrow"
            en={whoWeAre.eyebrowEn}
            hi={whoWeAre.eyebrowHi}
            onEn={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, eyebrowEn: v } })}
            onHi={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, eyebrowHi: v } })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            variant="plain"
            label="Headline"
            en={whoWeAre.headlineEn}
            hi={whoWeAre.headlineHi}
            onEn={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, headlineEn: v } })}
            onHi={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, headlineHi: v } })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            variant="plain"
            label="Body"
            en={whoWeAre.bodyEn}
            hi={whoWeAre.bodyHi}
            onEn={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, bodyEn: v } })}
            onHi={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, bodyHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <CmsBilingualField
            variant="plain"
            label="Pull quote"
            en={whoWeAre.pullQuoteEn}
            hi={whoWeAre.pullQuoteHi}
            onEn={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, pullQuoteEn: v } })}
            onHi={(v) => updateContent({ ...content, whoWeAre: { ...whoWeAre, pullQuoteHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <div className="space-y-1">
            <Label>Image URL</Label>
            <Input
              value={whoWeAre.imageUrl}
              onChange={(e) => updateContent({ ...content, whoWeAre: { ...whoWeAre, imageUrl: e.target.value } })}
              disabled={!canEdit}
            />
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Three pillars (guarantees)</h2>
          {content.guarantees.map((g, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Icon</Label>
                <Select
                  value={g.iconKey}
                  onValueChange={(v) =>
                    updateContent({
                      ...content,
                      guarantees: content.guarantees.map((item, idx) =>
                        idx === i ? { ...item, iconKey: v as CmsIconKey } : item,
                      ),
                    })
                  }
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CMS_ICON_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CmsBilingualField
            variant="plain"
                label="Title"
                en={g.titleEn}
                hi={g.titleHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, titleEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, titleHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Description"
                en={g.descEn}
                hi={g.descHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, descEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, descHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
                multiline
              />
              <CmsBilingualField
            variant="plain"
                label="Badge"
                en={g.badgeEn}
                hi={g.badgeHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, badgeEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, badgeHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Impact metrics</h2>
          {content.impactMetrics.map((m, i) => (
            <div key={i} className="rounded-lg border p-4 grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Number value</Label>
                <Input
                  type="number"
                  value={m.numValue}
                  onChange={(e) =>
                    updateContent({
                      ...content,
                      impactMetrics: content.impactMetrics.map((item, idx) =>
                        idx === i ? { ...item, numValue: Number(e.target.value) } : item,
                      ),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Icon</Label>
                <Select
                  value={m.iconKey}
                  onValueChange={(v) =>
                    updateContent({
                      ...content,
                      impactMetrics: content.impactMetrics.map((item, idx) =>
                        idx === i ? { ...item, iconKey: v as CmsIconKey } : item,
                      ),
                    })
                  }
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CMS_ICON_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CmsBilingualField
            variant="plain"
                label="Suffix"
                en={m.suffixEn}
                hi={m.suffixHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, suffixEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, suffixHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Label"
                en={m.labelEn}
                hi={m.labelHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, labelEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, labelHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Milestones</h2>
          {content.milestones.map((m, i) => (
            <div key={m.year} className="rounded-lg border p-4 space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Year</Label>
                <Input
                  value={m.year}
                  onChange={(e) =>
                    updateContent({
                      ...content,
                      milestones: content.milestones.map((item, idx) =>
                        idx === i ? { ...item, year: e.target.value } : item,
                      ),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
              <CmsBilingualField
            variant="plain"
                label="Title"
                en={m.titleEn}
                hi={m.titleHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, titleEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, titleHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Description"
                en={m.descEn}
                hi={m.descHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, descEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, descHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
                multiline
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Highlights (EN, one per line)</Label>
                  <Textarea
                    value={listToLines(m.highlightsEn)}
                    onChange={(e) =>
                      updateContent({
                        ...content,
                        milestones: content.milestones.map((item, idx) =>
                          idx === i ? { ...item, highlightsEn: linesToList(e.target.value) } : item,
                        ),
                      })
                    }
                    disabled={!canEdit}
                    rows={4}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Highlights (HI, one per line)</Label>
                  <Textarea
                    value={listToLines(m.highlightsHi)}
                    onChange={(e) =>
                      updateContent({
                        ...content,
                        milestones: content.milestones.map((item, idx) =>
                          idx === i ? { ...item, highlightsHi: linesToList(e.target.value) } : item,
                        ),
                      })
                    }
                    disabled={!canEdit}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Footprint locations</h2>
          {content.locations.map((loc, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <CmsBilingualField
            variant="plain"
                label="Tag"
                en={loc.tagEn}
                hi={loc.tagHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, tagEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, tagHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Name"
                en={loc.nameEn}
                hi={loc.nameHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, nameEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, nameHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Address"
                en={loc.addressEn}
                hi={loc.addressHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, addressEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, addressHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
                multiline
              />
              <CmsBilingualField
            variant="plain"
                label="Subtitle"
                en={loc.subEn}
                hi={loc.subHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, subEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, subHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Compliance & CTA footer</h2>
          <div className="space-y-1">
            <Label>Brochure PDF href</Label>
            <Input
              value={content.brochureHref}
              onChange={(e) => updateContent({ ...content, brochureHref: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          {content.complianceHighlights.map((item, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-2">
              <CmsBilingualField
            variant="plain"
                label="Label"
                en={item.labelEn}
                hi={item.labelHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, labelEn: v } : c,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, labelHi: v } : c,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <CmsBilingualField
            variant="plain"
                label="Value"
                en={item.valueEn}
                hi={item.valueHi}
                onEn={(v) =>
                  updateContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, valueEn: v } : c,
                    ),
                  })
                }
                onHi={(v) =>
                  updateContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, valueHi: v } : c,
                    ),
                  })
                }
                disabled={!canEdit}
              />
            </div>
          ))}
          <CmsBilingualField
            variant="plain"
            label="Compliance footer"
            en={content.complianceFooterEn}
            hi={content.complianceFooterHi}
            onEn={(v) => updateContent({ ...content, complianceFooterEn: v })}
            onHi={(v) => updateContent({ ...content, complianceFooterHi: v })}
            disabled={!canEdit}
            multiline
          />
        </section>

        {canEdit ? (
          <CmsStickySaveBar saving={saving} label="Save about page" />
        ) : null}
      </form>
    </div>
  );
}
