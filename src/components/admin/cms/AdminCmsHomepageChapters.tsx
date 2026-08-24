import { useCallback, useEffect, useState } from "react";
import { Save, Layout } from "lucide-react";
import { getCmsHomepageChaptersAdmin, saveCmsHomepageChaptersAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import type { HomepageChaptersContent } from "@/lib/cms-types";
import { HOMEPAGE_CHAPTERS_FALLBACK } from "@/data/homepage-chapters-fallback";

function Bilingual({
  label,
  en,
  hi,
  onEn,
  onHi,
  disabled,
  multiline,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  disabled?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2 rounded-lg border bg-muted/20 p-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">EN</Label>
          {multiline ? (
            <Textarea value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} rows={2} />
          ) : (
            <Input value={en} onChange={(e) => onEn(e.target.value)} disabled={disabled} />
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">HI</Label>
          {multiline ? (
            <Textarea value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} rows={2} />
          ) : (
            <Input value={hi} onChange={(e) => onHi(e.target.value)} disabled={disabled} />
          )}
        </div>
      </div>
    </div>
  );
}

function StatEditor({
  stats,
  onChange,
  disabled,
}: {
  stats: HomepageChaptersContent["appChapter"]["stats"];
  onChange: (stats: HomepageChaptersContent["appChapter"]["stats"]) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-lg border p-3 space-y-2">
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Value</Label>
              <Input
                type="number"
                value={stat.numValue}
                onChange={(e) =>
                  onChange(stats.map((s, idx) => (idx === i ? { ...s, numValue: Number(e.target.value) } : s)))
                }
                disabled={disabled}
              />
            </div>
            <Bilingual
              label="Static text (e.g. 24/7)"
              en={stat.valueTextEn}
              hi={stat.valueTextHi}
              onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, valueTextEn: v } : s)))}
              onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, valueTextHi: v } : s)))}
              disabled={disabled}
            />
          </div>
          <Bilingual
            label="Prefix"
            en={stat.prefixEn}
            hi={stat.prefixHi}
            onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, prefixEn: v } : s)))}
            onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, prefixHi: v } : s)))}
            disabled={disabled}
          />
          <Bilingual
            label="Suffix"
            en={stat.suffixEn}
            hi={stat.suffixHi}
            onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, suffixEn: v } : s)))}
            onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, suffixHi: v } : s)))}
            disabled={disabled}
          />
          <Bilingual
            label="Label"
            en={stat.labelEn}
            hi={stat.labelHi}
            onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, labelEn: v } : s)))}
            onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, labelHi: v } : s)))}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}

export function AdminCmsHomepageChapters({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [chapters, setChapters] = useState<HomepageChaptersContent>(HOMEPAGE_CHAPTERS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsHomepageChaptersAdmin();
    if (isAdminOk<{ chapters: HomepageChaptersContent; dbConfigured: boolean }>(res)) {
      setChapters(res.chapters);
      setDbConfigured(res.dbConfigured);
    } else {
      toast.error("Load failed", adminError(res, "Could not load homepage sections."));
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
    const res = await saveCmsHomepageChaptersAdmin({ data: chapters });
    setSaving(false);
    if (isAdminOk<{ chapters: HomepageChaptersContent }>(res)) {
      setChapters(res.chapters);
      toast.success("Sections saved", "Homepage pillar, app, and closing sections are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save homepage sections."));
    }
  }

  const { pillars, pillarMarket, appChapter, closingChapter } = chapters;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Homepage sections</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit copy for the pillars parallax, market linkage block, mobile app chapter, and closing pathways on the
          homepage.
        </p>
        {!dbConfigured && (
          <p className="mt-2 text-xs text-amber-600">Database not configured — changes will not persist.</p>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {pillars.map((pillar, pi) => (
          <div key={pillar.id} className="rounded-xl border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b px-5 py-4">
              <Layout className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Pillar {pillar.number}: {pillar.id}</h2>
            </div>
            <div className="space-y-4 p-5">
              <Bilingual
                label="Tag"
                en={pillar.tagEn}
                hi={pillar.tagHi}
                onEn={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, tagEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, tagHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <Bilingual
                label="Title"
                en={pillar.titleEn}
                hi={pillar.titleHi}
                onEn={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, titleEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, titleHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <Bilingual
                label="Description"
                en={pillar.descriptionEn}
                hi={pillar.descriptionHi}
                onEn={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, descriptionEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, descriptionHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
                multiline
              />
              <StatEditor
                stats={pillar.metrics}
                onChange={(stats) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, metrics: stats } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Features (EN)</Label>
                <Textarea
                  value={pillar.featuresEn.join("\n")}
                  onChange={(e) =>
                    setChapters({
                      ...chapters,
                      pillars: pillars.map((p, idx) =>
                        idx === pi ? { ...p, featuresEn: e.target.value.split("\n").filter(Boolean) } : p,
                      ),
                    })
                  }
                  disabled={!canEdit || loading}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Features (HI)</Label>
                <Textarea
                  value={pillar.featuresHi.join("\n")}
                  onChange={(e) =>
                    setChapters({
                      ...chapters,
                      pillars: pillars.map((p, idx) =>
                        idx === pi ? { ...p, featuresHi: e.target.value.split("\n").filter(Boolean) } : p,
                      ),
                    })
                  }
                  disabled={!canEdit || loading}
                  rows={3}
                />
              </div>
              <Bilingual
                label="CTA button"
                en={pillar.ctaTextEn}
                hi={pillar.ctaTextHi}
                onEn={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, ctaTextEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, ctaTextHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <div className="space-y-2">
                <Label className="text-xs font-medium">Image URL</Label>
                <Input
                  value={pillar.imageUrl}
                  onChange={(e) =>
                    setChapters({
                      ...chapters,
                      pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageUrl: e.target.value } : p)),
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <CmsUploadField
                  label="Upload image"
                  value={pillar.imageUrl}
                  onChange={(url) =>
                    setChapters({
                      ...chapters,
                      pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageUrl: url } : p)),
                    })
                  }
                  kind="image"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={!canEdit || loading}
                />
              </div>
              <Bilingual
                label="Image alt"
                en={pillar.imageAltEn}
                hi={pillar.imageAltHi}
                onEn={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageAltEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  setChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageAltHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              {pillar.ctaType === "locations" && (
                <>
                  <Bilingual
                    label="Locations badge"
                    en={pillar.locationsBadgeEn}
                    hi={pillar.locationsBadgeHi}
                    onEn={(v) =>
                      setChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, locationsBadgeEn: v } : p)),
                      })
                    }
                    onHi={(v) =>
                      setChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, locationsBadgeHi: v } : p)),
                      })
                    }
                    disabled={!canEdit || loading}
                  />
                  <Bilingual
                    label="View locations button"
                    en={pillar.viewLocationsLabelEn}
                    hi={pillar.viewLocationsLabelHi}
                    onEn={(v) =>
                      setChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, viewLocationsLabelEn: v } : p)),
                      })
                    }
                    onHi={(v) =>
                      setChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, viewLocationsLabelHi: v } : p)),
                      })
                    }
                    disabled={!canEdit || loading}
                  />
                </>
              )}
            </div>
          </div>
        ))}

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-sm font-semibold">Market linkage pillar</h2>
          </div>
          <div className="space-y-4 p-5">
            <Bilingual
              label="Badge"
              en={pillarMarket.badgeEn}
              hi={pillarMarket.badgeHi}
              onEn={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, badgeEn: v } })}
              onHi={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Title"
              en={pillarMarket.titleEn}
              hi={pillarMarket.titleHi}
              onEn={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, titleEn: v } })}
              onHi={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Description"
              en={pillarMarket.descriptionEn}
              hi={pillarMarket.descriptionHi}
              onEn={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, descriptionEn: v } })}
              onHi={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            <StatEditor
              stats={pillarMarket.stats}
              onChange={(stats) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, stats } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="CTA"
              en={pillarMarket.ctaLabelEn}
              hi={pillarMarket.ctaLabelHi}
              onEn={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, ctaLabelEn: v } })}
              onHi={(v) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, ctaLabelHi: v } })}
              disabled={!canEdit || loading}
            />
            <div className="space-y-2">
              <Label className="text-xs font-medium">Image URL</Label>
              <Input
                value={pillarMarket.imageUrl}
                onChange={(e) =>
                  setChapters({ ...chapters, pillarMarket: { ...pillarMarket, imageUrl: e.target.value } })
                }
                disabled={!canEdit || loading}
              />
              <CmsUploadField
                label="Upload image"
                value={pillarMarket.imageUrl}
                onChange={(url) => setChapters({ ...chapters, pillarMarket: { ...pillarMarket, imageUrl: url } })}
                kind="image"
                accept="image/jpeg,image/png,image/webp"
                disabled={!canEdit || loading}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-sm font-semibold">Mobile app chapter</h2>
          </div>
          <div className="space-y-4 p-5">
            <Bilingual
              label="Badge"
              en={appChapter.badgeEn}
              hi={appChapter.badgeHi}
              onEn={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, badgeEn: v } })}
              onHi={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Title"
              en={appChapter.titleEn}
              hi={appChapter.titleHi}
              onEn={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, titleEn: v } })}
              onHi={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Description"
              en={appChapter.descriptionEn}
              hi={appChapter.descriptionHi}
              onEn={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, descriptionEn: v } })}
              onHi={(v) => setChapters({ ...chapters, appChapter: { ...appChapter, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            <StatEditor
              stats={appChapter.stats}
              onChange={(stats) => setChapters({ ...chapters, appChapter: { ...appChapter, stats } })}
              disabled={!canEdit || loading}
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Checklist (EN)</Label>
              <Textarea
                value={appChapter.checklistEn.join("\n")}
                onChange={(e) =>
                  setChapters({
                    ...chapters,
                    appChapter: { ...appChapter, checklistEn: e.target.value.split("\n").filter(Boolean) },
                  })
                }
                disabled={!canEdit || loading}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Checklist (HI)</Label>
              <Textarea
                value={appChapter.checklistHi.join("\n")}
                onChange={(e) =>
                  setChapters({
                    ...chapters,
                    appChapter: { ...appChapter, checklistHi: e.target.value.split("\n").filter(Boolean) },
                  })
                }
                disabled={!canEdit || loading}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-sm font-semibold">Closing chapter (Get started)</h2>
          </div>
          <div className="space-y-4 p-5">
            <Bilingual
              label="Badge"
              en={closingChapter.badgeEn}
              hi={closingChapter.badgeHi}
              onEn={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, badgeEn: v } })}
              onHi={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Title"
              en={closingChapter.titleEn}
              hi={closingChapter.titleHi}
              onEn={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, titleEn: v } })}
              onHi={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <Bilingual
              label="Description"
              en={closingChapter.descriptionEn}
              hi={closingChapter.descriptionHi}
              onEn={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, descriptionEn: v } })}
              onHi={(v) => setChapters({ ...chapters, closingChapter: { ...closingChapter, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            {closingChapter.pathways.map((pathway, i) => (
              <div key={pathway.number} className="rounded-lg border p-3 space-y-2">
                <p className="text-sm font-semibold">Pathway {pathway.number}</p>
                <Bilingual
                  label="Tag"
                  en={pathway.tagEn}
                  hi={pathway.tagHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, tagEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, tagHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <Bilingual
                  label="Title"
                  en={pathway.titleEn}
                  hi={pathway.titleHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, titleEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, titleHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <Bilingual
                  label="Subtitle"
                  en={pathway.subtitleEn}
                  hi={pathway.subtitleHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, subtitleEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, subtitleHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <Bilingual
                  label="Description"
                  en={pathway.descriptionEn}
                  hi={pathway.descriptionHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, descriptionEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, descriptionHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                  multiline
                />
                <Bilingual
                  label="Action label"
                  en={pathway.actionLabelEn}
                  hi={pathway.actionLabelHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionLabelEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionLabelHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <Bilingual
                  label="Action subtext"
                  en={pathway.actionSubEn}
                  hi={pathway.actionSubHi}
                  onEn={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionSubEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    setChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionSubHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                {pathway.type === "link" && (
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Link href</Label>
                    <Input
                      value={pathway.linkHref}
                      onChange={(e) =>
                        setChapters({
                          ...chapters,
                          closingChapter: {
                            ...closingChapter,
                            pathways: closingChapter.pathways.map((p, idx) =>
                              idx === i ? { ...p, linkHref: e.target.value } : p,
                            ),
                          },
                        })
                      }
                      disabled={!canEdit || loading}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {canEdit && (
          <Button type="submit" disabled={saving || loading}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Save homepage sections"}
          </Button>
        )}
      </form>
    </div>
  );
}
