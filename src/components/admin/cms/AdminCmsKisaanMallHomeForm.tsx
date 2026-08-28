import { useState } from "react";
import { saveCmsKisaanMallLandingAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { useToast } from "@/components/admin/AdminToast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { KisaanMallLanding } from "@/lib/cms-types";

export function AdminCmsKisaanMallHomeForm({
  landing,
  setLanding,
  canEdit,
  loading,
  onSaved,
}: {
  landing: KisaanMallLanding;
  setLanding: (p: KisaanMallLanding) => void;
  canEdit: boolean;
  loading: boolean;
  onSaved?: () => void;
}) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const chapter = landing.homeChapter;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const res = await saveCmsKisaanMallLandingAdmin({ data: landing });
    setSaving(false);
    if (isAdminOk<{ landing: KisaanMallLanding }>(res)) {
      setLanding(res.landing);
      onSaved?.();
      toast.success("Homepage section saved", "Kisaan Mall homepage chapter is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save homepage section."));
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <CmsTranslateToHindiButton
        variant="inline"
        disabled={!canEdit || loading}
        enTexts={[
          chapter.badgeEn,
          chapter.titleEn,
          chapter.descriptionEn,
          chapter.browseLabelEn,
          chapter.supplyHeadingEn,
          chapter.supplySubtextEn,
          chapter.ctaEyebrowEn,
          chapter.ctaTitleEn,
          chapter.ctaDescriptionEn,
          chapter.ctaBrowseEn,
          chapter.ctaCallEn,
          landing.supplyChain.badgeEn,
          landing.supplyChain.titleEn,
          landing.supplyChain.descriptionEn,
        ]}
        onTranslated={(t) => {
          let i = 0;
          const take = () => t[i++] ?? "";
          setLanding({
            ...landing,
            homeChapter: {
              ...chapter,
              badgeHi: take() || chapter.badgeHi,
              titleHi: take() || chapter.titleHi,
              descriptionHi: take() || chapter.descriptionHi,
              browseLabelHi: take() || chapter.browseLabelHi,
              supplyHeadingHi: take() || chapter.supplyHeadingHi,
              supplySubtextHi: take() || chapter.supplySubtextHi,
              ctaEyebrowHi: take() || chapter.ctaEyebrowHi,
              ctaTitleHi: take() || chapter.ctaTitleHi,
              ctaDescriptionHi: take() || chapter.ctaDescriptionHi,
              ctaBrowseHi: take() || chapter.ctaBrowseHi,
              ctaCallHi: take() || chapter.ctaCallHi,
            },
            supplyChain: {
              ...landing.supplyChain,
              badgeHi: take() || landing.supplyChain.badgeHi,
              titleHi: take() || landing.supplyChain.titleHi,
              descriptionHi: take() || landing.supplyChain.descriptionHi,
            },
          });
        }}
      />

      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="text-sm font-semibold">Homepage chapter (MallChapter)</h3>
        <p className="text-xs text-muted-foreground">
          Copy for the Kisaan Mall section on the homepage scroll narrative.
        </p>
        <CmsBilingualField
          label="Badge"
          en={chapter.badgeEn}
          hi={chapter.badgeHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, badgeEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, badgeHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Title"
          en={chapter.titleEn}
          hi={chapter.titleHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, titleEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, titleHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Description"
          en={chapter.descriptionEn}
          hi={chapter.descriptionHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, descriptionEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, descriptionHi: v } })}
          disabled={!canEdit || loading}
          multiline
        />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Features (EN)</Label>
          <Textarea
            value={chapter.featuresEn.join("\n")}
            onChange={(e) =>
              setLanding({
                ...landing,
                homeChapter: {
                  ...chapter,
                  featuresEn: e.target.value.split("\n").filter(Boolean),
                },
              })
            }
            disabled={!canEdit || loading}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Features (HI)</Label>
          <Textarea
            value={chapter.featuresHi.join("\n")}
            onChange={(e) =>
              setLanding({
                ...landing,
                homeChapter: {
                  ...chapter,
                  featuresHi: e.target.value.split("\n").filter(Boolean),
                },
              })
            }
            disabled={!canEdit || loading}
            rows={3}
          />
        </div>
        <CmsBilingualField
          label="Browse button"
          en={chapter.browseLabelEn}
          hi={chapter.browseLabelHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, browseLabelEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, browseLabelHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Supply heading"
          en={chapter.supplyHeadingEn}
          hi={chapter.supplyHeadingHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, supplyHeadingEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, supplyHeadingHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Supply subtext"
          en={chapter.supplySubtextEn}
          hi={chapter.supplySubtextHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, supplySubtextEn: v } })}
          onHi={(v) =>
            setLanding({ ...landing, homeChapter: { ...chapter, supplySubtextHi: v } })
          }
          disabled={!canEdit || loading}
          multiline
        />
        <CmsBilingualField
          label="CTA eyebrow"
          en={chapter.ctaEyebrowEn}
          hi={chapter.ctaEyebrowHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaEyebrowEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaEyebrowHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA title"
          en={chapter.ctaTitleEn}
          hi={chapter.ctaTitleHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaTitleEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaTitleHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA description"
          en={chapter.ctaDescriptionEn}
          hi={chapter.ctaDescriptionHi}
          onEn={(v) =>
            setLanding({ ...landing, homeChapter: { ...chapter, ctaDescriptionEn: v } })
          }
          onHi={(v) =>
            setLanding({ ...landing, homeChapter: { ...chapter, ctaDescriptionHi: v } })
          }
          disabled={!canEdit || loading}
          multiline
        />
        <CmsBilingualField
          label="CTA browse button"
          en={chapter.ctaBrowseEn}
          hi={chapter.ctaBrowseHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaBrowseEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaBrowseHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA call button"
          en={chapter.ctaCallEn}
          hi={chapter.ctaCallHi}
          onEn={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaCallEn: v } })}
          onHi={(v) => setLanding({ ...landing, homeChapter: { ...chapter, ctaCallHi: v } })}
          disabled={!canEdit || loading}
        />
      </div>

      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="text-sm font-semibold">Supply chain band</h3>
        <CmsBilingualField
          label="Badge"
          en={landing.supplyChain.badgeEn}
          hi={landing.supplyChain.badgeHi}
          onEn={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, badgeEn: v } })
          }
          onHi={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, badgeHi: v } })
          }
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Title"
          en={landing.supplyChain.titleEn}
          hi={landing.supplyChain.titleHi}
          onEn={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, titleEn: v } })
          }
          onHi={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, titleHi: v } })
          }
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Description"
          en={landing.supplyChain.descriptionEn}
          hi={landing.supplyChain.descriptionHi}
          onEn={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, descriptionEn: v } })
          }
          onHi={(v) =>
            setLanding({ ...landing, supplyChain: { ...landing.supplyChain, descriptionHi: v } })
          }
          disabled={!canEdit || loading}
          multiline
        />
      </div>

      <CmsStickySaveBar saving={saving} disabled={!canEdit} label="Save homepage section" />
    </form>
  );
}
