import { useCallback, useEffect, useState } from "react";
import { BookOpen, Save } from "lucide-react";
import { getCmsAboutPageAdmin, saveCmsAboutPageAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

function BilingualField({
  label,
  enValue,
  hiValue,
  onEn,
  onHi,
  disabled,
  multiline,
}: {
  label: string;
  enValue: string;
  hiValue: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  disabled?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">English</Label>
          {multiline ? (
            <Textarea value={enValue} onChange={(e) => onEn(e.target.value)} disabled={disabled} rows={3} />
          ) : (
            <Input value={enValue} onChange={(e) => onEn(e.target.value)} disabled={disabled} />
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Hindi</Label>
          {multiline ? (
            <Textarea value={hiValue} onChange={(e) => onHi(e.target.value)} disabled={disabled} rows={3} />
          ) : (
            <Input value={hiValue} onChange={(e) => onHi(e.target.value)} disabled={disabled} />
          )}
        </div>
      </div>
    </div>
  );
}

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

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsAboutPageAdmin();
    if (isAdminOk<{ content: AboutPageContent }>(res)) {
      setContent(res.content);
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About page</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit hero, values, milestones, footprint locations, impact metrics, and compliance copy on the About page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Hero</h2>
          </div>
          <BilingualField
            label="Badge"
            enValue={hero.badgeEn}
            hiValue={hero.badgeHi}
            onEn={(v) => setContent({ ...content, hero: { ...hero, badgeEn: v } })}
            onHi={(v) => setContent({ ...content, hero: { ...hero, badgeHi: v } })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Title"
            enValue={hero.titleEn}
            hiValue={hero.titleHi}
            onEn={(v) => setContent({ ...content, hero: { ...hero, titleEn: v } })}
            onHi={(v) => setContent({ ...content, hero: { ...hero, titleHi: v } })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Title accent"
            enValue={hero.titleAccentEn}
            hiValue={hero.titleAccentHi}
            onEn={(v) => setContent({ ...content, hero: { ...hero, titleAccentEn: v } })}
            onHi={(v) => setContent({ ...content, hero: { ...hero, titleAccentHi: v } })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Description"
            enValue={hero.descriptionEn}
            hiValue={hero.descriptionHi}
            onEn={(v) => setContent({ ...content, hero: { ...hero, descriptionEn: v } })}
            onHi={(v) => setContent({ ...content, hero: { ...hero, descriptionHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <div className="space-y-1">
            <Label>Hero image URL</Label>
            <Input
              value={hero.heroImageUrl}
              onChange={(e) => setContent({ ...content, hero: { ...hero, heroImageUrl: e.target.value } })}
              disabled={!canEdit}
            />
          </div>
          <BilingualField
            label="Hero image alt"
            enValue={hero.heroImageAltEn}
            hiValue={hero.heroImageAltHi}
            onEn={(v) => setContent({ ...content, hero: { ...hero, heroImageAltEn: v } })}
            onHi={(v) => setContent({ ...content, hero: { ...hero, heroImageAltHi: v } })}
            disabled={!canEdit}
          />
          <div className="space-y-3">
            <Label>Hero stats</Label>
            {hero.stats.map((stat, i) => (
              <div key={i} className="rounded-lg border p-3 grid gap-2 sm:grid-cols-2">
                <BilingualField
                  label="Value"
                  enValue={stat.valueEn}
                  hiValue={stat.valueHi}
                  onEn={(v) =>
                    setContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, valueEn: v } : s)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, valueHi: v } : s)),
                      },
                    })
                  }
                  disabled={!canEdit}
                />
                <BilingualField
                  label="Label"
                  enValue={stat.labelEn}
                  hiValue={stat.labelHi}
                  onEn={(v) =>
                    setContent({
                      ...content,
                      hero: {
                        ...hero,
                        stats: hero.stats.map((s, idx) => (idx === i ? { ...s, labelEn: v } : s)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setContent({
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
          <BilingualField
            label="Eyebrow"
            enValue={whoWeAre.eyebrowEn}
            hiValue={whoWeAre.eyebrowHi}
            onEn={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, eyebrowEn: v } })}
            onHi={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, eyebrowHi: v } })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Headline"
            enValue={whoWeAre.headlineEn}
            hiValue={whoWeAre.headlineHi}
            onEn={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, headlineEn: v } })}
            onHi={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, headlineHi: v } })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Body"
            enValue={whoWeAre.bodyEn}
            hiValue={whoWeAre.bodyHi}
            onEn={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, bodyEn: v } })}
            onHi={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, bodyHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <BilingualField
            label="Pull quote"
            enValue={whoWeAre.pullQuoteEn}
            hiValue={whoWeAre.pullQuoteHi}
            onEn={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, pullQuoteEn: v } })}
            onHi={(v) => setContent({ ...content, whoWeAre: { ...whoWeAre, pullQuoteHi: v } })}
            disabled={!canEdit}
            multiline
          />
          <div className="space-y-1">
            <Label>Image URL</Label>
            <Input
              value={whoWeAre.imageUrl}
              onChange={(e) => setContent({ ...content, whoWeAre: { ...whoWeAre, imageUrl: e.target.value } })}
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
                    setContent({
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
              <BilingualField
                label="Title"
                enValue={g.titleEn}
                hiValue={g.titleHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, titleEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, titleHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Description"
                enValue={g.descEn}
                hiValue={g.descHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, descEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, descHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
                multiline
              />
              <BilingualField
                label="Badge"
                enValue={g.badgeEn}
                hiValue={g.badgeHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    guarantees: content.guarantees.map((item, idx) =>
                      idx === i ? { ...item, badgeEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
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
                    setContent({
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
                    setContent({
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
              <BilingualField
                label="Suffix"
                enValue={m.suffixEn}
                hiValue={m.suffixHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, suffixEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, suffixHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Label"
                enValue={m.labelEn}
                hiValue={m.labelHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    impactMetrics: content.impactMetrics.map((item, idx) =>
                      idx === i ? { ...item, labelEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
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
                    setContent({
                      ...content,
                      milestones: content.milestones.map((item, idx) =>
                        idx === i ? { ...item, year: e.target.value } : item,
                      ),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
              <BilingualField
                label="Title"
                enValue={m.titleEn}
                hiValue={m.titleHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, titleEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, titleHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Description"
                enValue={m.descEn}
                hiValue={m.descHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    milestones: content.milestones.map((item, idx) =>
                      idx === i ? { ...item, descEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
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
                      setContent({
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
                      setContent({
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
              <BilingualField
                label="Tag"
                enValue={loc.tagEn}
                hiValue={loc.tagHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, tagEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, tagHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Name"
                enValue={loc.nameEn}
                hiValue={loc.nameHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, nameEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, nameHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Address"
                enValue={loc.addressEn}
                hiValue={loc.addressHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, addressEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, addressHi: v } : item,
                    ),
                  })
                }
                disabled={!canEdit}
                multiline
              />
              <BilingualField
                label="Subtitle"
                enValue={loc.subEn}
                hiValue={loc.subHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    locations: content.locations.map((item, idx) =>
                      idx === i ? { ...item, subEn: v } : item,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
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
              onChange={(e) => setContent({ ...content, brochureHref: e.target.value })}
              disabled={!canEdit}
            />
          </div>
          {content.complianceHighlights.map((item, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-2">
              <BilingualField
                label="Label"
                enValue={item.labelEn}
                hiValue={item.labelHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, labelEn: v } : c,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, labelHi: v } : c,
                    ),
                  })
                }
                disabled={!canEdit}
              />
              <BilingualField
                label="Value"
                enValue={item.valueEn}
                hiValue={item.valueHi}
                onEn={(v) =>
                  setContent({
                    ...content,
                    complianceHighlights: content.complianceHighlights.map((c, idx) =>
                      idx === i ? { ...c, valueEn: v } : c,
                    ),
                  })
                }
                onHi={(v) =>
                  setContent({
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
          <BilingualField
            label="Compliance footer"
            enValue={content.complianceFooterEn}
            hiValue={content.complianceFooterHi}
            onEn={(v) => setContent({ ...content, complianceFooterEn: v })}
            onHi={(v) => setContent({ ...content, complianceFooterHi: v })}
            disabled={!canEdit}
            multiline
          />
        </section>

        {canEdit ? (
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Save about page"}
          </Button>
        ) : null}
      </form>
    </div>
  );
}
