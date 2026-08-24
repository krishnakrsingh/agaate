import { useCallback, useEffect, useState } from "react";
import { Layout } from "lucide-react";
import { getCmsHomepageChaptersAdmin, saveCmsHomepageChaptersAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsImageField } from "@/components/admin/cms/CmsImageField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsSectionHeader } from "@/components/admin/cms/CmsSectionHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CmsUploadField } from "@/components/admin/cms/CmsUploadField";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import type { HomepageChaptersContent } from "@/lib/cms-types";
import { HOMEPAGE_CHAPTERS_FALLBACK } from "@/data/homepage-chapters-fallback";

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
            <CmsBilingualField
              label="Static text (e.g. 24/7)"
              en={stat.valueTextEn}
              hi={stat.valueTextHi}
              onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, valueTextEn: v } : s)))}
              onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, valueTextHi: v } : s)))}
              disabled={disabled}
            />
          </div>
          <CmsBilingualField
            label="Prefix"
            en={stat.prefixEn}
            hi={stat.prefixHi}
            onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, prefixEn: v } : s)))}
            onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, prefixHi: v } : s)))}
            disabled={disabled}
          />
          <CmsBilingualField
            label="Suffix"
            en={stat.suffixEn}
            hi={stat.suffixHi}
            onEn={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, suffixEn: v } : s)))}
            onHi={(v) => onChange(stats.map((s, idx) => (idx === i ? { ...s, suffixHi: v } : s)))}
            disabled={disabled}
          />
          <CmsBilingualField
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
  const [dirty, setDirty] = useState(false);
  useCmsDirtyGuard(dirty);

  const updateChapters = (next: HomepageChaptersContent) => {
    setChapters(next);
    setDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsHomepageChaptersAdmin();
    if (isAdminOk<{ chapters: HomepageChaptersContent; dbConfigured: boolean }>(res)) {
      setChapters(res.chapters);
      setDbConfigured(res.dbConfigured);
      setDirty(false);
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
      setDirty(false);
      toast.success("Sections saved", "Homepage pillar, app, and closing sections are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save homepage sections."));
    }
  }

  const { pillars, pillarMarket, appChapter, closingChapter } = chapters;

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Homepage sections"
        description="Edit copy for the pillars parallax, market linkage block, mobile app chapter, and closing pathways on the homepage."
        workflow="live"
      />
      {!dbConfigured && (
        <p className="text-xs text-amber-600">Database not configured — changes will not persist.</p>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {pillars.map((pillar, pi) => (
          <div key={pillar.id} className="rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-semibold">Pillar {pillar.number}: {pillar.id}</h2>
              <CmsTranslateToHindiButton
                variant="inline"
                disabled={!canEdit || loading}
                enTexts={[
                  pillar.tagEn,
                  pillar.titleEn,
                  pillar.descriptionEn,
                  pillar.ctaTextEn,
                  pillar.imageAltEn,
                ]}
                onTranslated={([tagHi, titleHi, descriptionHi, ctaTextHi, imageAltHi]) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) =>
                      idx === pi
                        ? {
                            ...p,
                            tagHi: tagHi ?? p.tagHi,
                            titleHi: titleHi ?? p.titleHi,
                            descriptionHi: descriptionHi ?? p.descriptionHi,
                            ctaTextHi: ctaTextHi ?? p.ctaTextHi,
                            imageAltHi: imageAltHi ?? p.imageAltHi,
                          }
                        : p,
                    ),
                  })
                }
              />
            </div>
            <div className="space-y-4 p-5">
              <CmsBilingualField
                label="Tag"
                en={pillar.tagEn}
                hi={pillar.tagHi}
                onEn={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, tagEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, tagHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Title"
                en={pillar.titleEn}
                hi={pillar.titleHi}
                onEn={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, titleEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, titleHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <CmsBilingualField
                label="Description"
                en={pillar.descriptionEn}
                hi={pillar.descriptionHi}
                onEn={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, descriptionEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  updateChapters({
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
                  updateChapters({
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
                    updateChapters({
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
                    updateChapters({
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
              <CmsBilingualField
                label="CTA button"
                en={pillar.ctaTextEn}
                hi={pillar.ctaTextHi}
                onEn={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, ctaTextEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, ctaTextHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              <div className="space-y-2">
                <CmsImageField
                  label="Pillar image"
                  value={pillar.imageUrl}
                  onChange={(url) =>
                    updateChapters({
                      ...chapters,
                      pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageUrl: url } : p)),
                    })
                  }
                  disabled={!canEdit || loading}
                />
              </div>
              <CmsBilingualField
                label="Image alt"
                en={pillar.imageAltEn}
                hi={pillar.imageAltHi}
                onEn={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageAltEn: v } : p)),
                  })
                }
                onHi={(v) =>
                  updateChapters({
                    ...chapters,
                    pillars: pillars.map((p, idx) => (idx === pi ? { ...p, imageAltHi: v } : p)),
                  })
                }
                disabled={!canEdit || loading}
              />
              {pillar.ctaType === "locations" && (
                <>
                  <CmsBilingualField
                    label="Locations badge"
                    en={pillar.locationsBadgeEn}
                    hi={pillar.locationsBadgeHi}
                    onEn={(v) =>
                      updateChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, locationsBadgeEn: v } : p)),
                      })
                    }
                    onHi={(v) =>
                      updateChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, locationsBadgeHi: v } : p)),
                      })
                    }
                    disabled={!canEdit || loading}
                  />
                  <CmsBilingualField
                    label="View locations button"
                    en={pillar.viewLocationsLabelEn}
                    hi={pillar.viewLocationsLabelHi}
                    onEn={(v) =>
                      updateChapters({
                        ...chapters,
                        pillars: pillars.map((p, idx) => (idx === pi ? { ...p, viewLocationsLabelEn: v } : p)),
                      })
                    }
                    onHi={(v) =>
                      updateChapters({
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
            <CmsSectionHeader
              title="Market linkage pillar"
              translate={{
                disabled: !canEdit || loading,
                enTexts: [
                  pillarMarket.badgeEn,
                  pillarMarket.titleEn,
                  pillarMarket.descriptionEn,
                  pillarMarket.ctaLabelEn,
                  ...pillarMarket.stats.flatMap((s) => [
                    s.valueTextEn,
                    s.prefixEn,
                    s.suffixEn,
                    s.labelEn,
                  ]),
                ],
                onTranslated: (t) => {
                  let i = 0;
                  const take = () => t[i++] ?? "";
                  updateChapters({
                    ...chapters,
                    pillarMarket: {
                      ...pillarMarket,
                      badgeHi: take() || pillarMarket.badgeHi,
                      titleHi: take() || pillarMarket.titleHi,
                      descriptionHi: take() || pillarMarket.descriptionHi,
                      ctaLabelHi: take() || pillarMarket.ctaLabelHi,
                      stats: pillarMarket.stats.map((s) => ({
                        ...s,
                        valueTextHi: take() || s.valueTextHi,
                        prefixHi: take() || s.prefixHi,
                        suffixHi: take() || s.suffixHi,
                        labelHi: take() || s.labelHi,
                      })),
                    },
                  });
                },
              }}
            />
          </div>
          <div className="space-y-4 p-5">
            <CmsBilingualField
              label="Badge"
              en={pillarMarket.badgeEn}
              hi={pillarMarket.badgeHi}
              onEn={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, badgeEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Title"
              en={pillarMarket.titleEn}
              hi={pillarMarket.titleHi}
              onEn={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, titleEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Description"
              en={pillarMarket.descriptionEn}
              hi={pillarMarket.descriptionHi}
              onEn={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, descriptionEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            <StatEditor
              stats={pillarMarket.stats}
              onChange={(stats) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, stats } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="CTA"
              en={pillarMarket.ctaLabelEn}
              hi={pillarMarket.ctaLabelHi}
              onEn={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, ctaLabelEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, ctaLabelHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsImageField
              label="Market linkage image"
              value={pillarMarket.imageUrl}
              onChange={(url) => updateChapters({ ...chapters, pillarMarket: { ...pillarMarket, imageUrl: url } })}
              disabled={!canEdit || loading}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <CmsSectionHeader
              title="Mobile app chapter"
              translate={{
                disabled: !canEdit || loading,
                enTexts: [
                  appChapter.badgeEn,
                  appChapter.titleEn,
                  appChapter.descriptionEn,
                  appChapter.checklistEn.join("\n"),
                  ...appChapter.stats.flatMap((s) => [
                    s.valueTextEn,
                    s.prefixEn,
                    s.suffixEn,
                    s.labelEn,
                  ]),
                ],
                onTranslated: (t) => {
                  let i = 0;
                  const take = () => t[i++] ?? "";
                  updateChapters({
                    ...chapters,
                    appChapter: {
                      ...appChapter,
                      badgeHi: take() || appChapter.badgeHi,
                      titleHi: take() || appChapter.titleHi,
                      descriptionHi: take() || appChapter.descriptionHi,
                      checklistHi: take().split("\n").filter(Boolean) || appChapter.checklistHi,
                      stats: appChapter.stats.map((s) => ({
                        ...s,
                        valueTextHi: take() || s.valueTextHi,
                        prefixHi: take() || s.prefixHi,
                        suffixHi: take() || s.suffixHi,
                        labelHi: take() || s.labelHi,
                      })),
                    },
                  });
                },
              }}
            />
          </div>
          <div className="space-y-4 p-5">
            <CmsBilingualField
              label="Badge"
              en={appChapter.badgeEn}
              hi={appChapter.badgeHi}
              onEn={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, badgeEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Title"
              en={appChapter.titleEn}
              hi={appChapter.titleHi}
              onEn={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, titleEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Description"
              en={appChapter.descriptionEn}
              hi={appChapter.descriptionHi}
              onEn={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, descriptionEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, appChapter: { ...appChapter, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            <StatEditor
              stats={appChapter.stats}
              onChange={(stats) => updateChapters({ ...chapters, appChapter: { ...appChapter, stats } })}
              disabled={!canEdit || loading}
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Checklist (EN)</Label>
              <Textarea
                value={appChapter.checklistEn.join("\n")}
                onChange={(e) =>
                  updateChapters({
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
                  updateChapters({
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
            <CmsSectionHeader
              title="Closing chapter (Get started)"
              translate={{
                disabled: !canEdit || loading,
                enTexts: [
                  closingChapter.badgeEn,
                  closingChapter.titleEn,
                  closingChapter.descriptionEn,
                  ...closingChapter.pathways.flatMap((p) => [
                    p.tagEn,
                    p.titleEn,
                    p.subtitleEn,
                    p.descriptionEn,
                    p.actionLabelEn,
                    p.actionSubEn,
                  ]),
                ],
                onTranslated: (t) => {
                  let i = 0;
                  const take = () => t[i++] ?? "";
                  updateChapters({
                    ...chapters,
                    closingChapter: {
                      ...closingChapter,
                      badgeHi: take() || closingChapter.badgeHi,
                      titleHi: take() || closingChapter.titleHi,
                      descriptionHi: take() || closingChapter.descriptionHi,
                      pathways: closingChapter.pathways.map((p) => ({
                        ...p,
                        tagHi: take() || p.tagHi,
                        titleHi: take() || p.titleHi,
                        subtitleHi: take() || p.subtitleHi,
                        descriptionHi: take() || p.descriptionHi,
                        actionLabelHi: take() || p.actionLabelHi,
                        actionSubHi: take() || p.actionSubHi,
                      })),
                    },
                  });
                },
              }}
            />
          </div>
          <div className="space-y-4 p-5">
            <CmsBilingualField
              label="Badge"
              en={closingChapter.badgeEn}
              hi={closingChapter.badgeHi}
              onEn={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, badgeEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, badgeHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Title"
              en={closingChapter.titleEn}
              hi={closingChapter.titleHi}
              onEn={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, titleEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, titleHi: v } })}
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Description"
              en={closingChapter.descriptionEn}
              hi={closingChapter.descriptionHi}
              onEn={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, descriptionEn: v } })}
              onHi={(v) => updateChapters({ ...chapters, closingChapter: { ...closingChapter, descriptionHi: v } })}
              disabled={!canEdit || loading}
              multiline
            />
            {closingChapter.pathways.map((pathway, i) => (
              <div key={pathway.number} className="rounded-lg border p-3 space-y-2">
                <p className="text-sm font-semibold">Pathway {pathway.number}</p>
                <CmsBilingualField
                  label="Tag"
                  en={pathway.tagEn}
                  hi={pathway.tagHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, tagEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, tagHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <CmsBilingualField
                  label="Title"
                  en={pathway.titleEn}
                  hi={pathway.titleHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, titleEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, titleHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <CmsBilingualField
                  label="Subtitle"
                  en={pathway.subtitleEn}
                  hi={pathway.subtitleHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, subtitleEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, subtitleHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <CmsBilingualField
                  label="Description"
                  en={pathway.descriptionEn}
                  hi={pathway.descriptionHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, descriptionEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
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
                <CmsBilingualField
                  label="Action label"
                  en={pathway.actionLabelEn}
                  hi={pathway.actionLabelHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionLabelEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionLabelHi: v } : p)),
                      },
                    })
                  }
                  disabled={!canEdit || loading}
                />
                <CmsBilingualField
                  label="Action subtext"
                  en={pathway.actionSubEn}
                  hi={pathway.actionSubHi}
                  onEn={(v) =>
                    updateChapters({
                      ...chapters,
                      closingChapter: {
                        ...closingChapter,
                        pathways: closingChapter.pathways.map((p, idx) => (idx === i ? { ...p, actionSubEn: v } : p)),
                      },
                    })
                  }
                  onHi={(v) =>
                    updateChapters({
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
                        updateChapters({
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

        <CmsStickySaveBar saving={saving} disabled={!canEdit} label="Save homepage sections" />
      </form>
    </div>
  );
}
