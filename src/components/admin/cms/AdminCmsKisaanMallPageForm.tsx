import { useState } from "react";
import { saveCmsKisaanMallPageAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { KisaanMallPageContent } from "@/lib/cms-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminCmsKisaanMallPageForm({
  page,
  setPage,
  canEdit,
  loading,
  onSaved,
}: {
  page: KisaanMallPageContent;
  setPage: (p: KisaanMallPageContent) => void;
  canEdit: boolean;
  loading: boolean;
  onSaved?: () => void;
}) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    const res = await saveCmsKisaanMallPageAdmin({ data: page });
    setSaving(false);
    if (isAdminOk<{ page: KisaanMallPageContent }>(res)) {
      setPage(res.page);
      onSaved?.();
      toast.success("Page saved", "Kisaan Mall full page content is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save mall page."));
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-2">
        <Label>Public page mode</Label>
        <Select
          value={page.displayMode}
          onValueChange={(v) => setPage({ ...page, displayMode: v as KisaanMallPageContent["displayMode"] })}
          disabled={!canEdit || loading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="coming_soon">Coming soon waitlist</SelectItem>
            <SelectItem value="full">Full mall page</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Choose whether <code>/kisaan-mall</code> shows the waitlist or the full catalog page.
        </p>
      </div>

      <CmsTranslateToHindiButton
        variant="inline"
        disabled={!canEdit || loading}
        enTexts={[
          page.heroEyebrowEn,
          page.heroTitleEn,
          page.heroTitleAccentEn,
          page.heroDescriptionEn,
          page.homeChapter.badgeEn,
          page.homeChapter.titleEn,
          page.homeChapter.descriptionEn,
          page.homeChapter.browseLabelEn,
          page.homeChapter.supplyHeadingEn,
          page.homeChapter.supplySubtextEn,
          page.homeChapter.ctaEyebrowEn,
          page.homeChapter.ctaTitleEn,
          page.homeChapter.ctaDescriptionEn,
          page.homeChapter.ctaBrowseEn,
          page.homeChapter.ctaCallEn,
          ...page.faqs.flatMap((f) => [f.qEn, f.aEn]),
          page.ctaTitleEn,
          page.ctaDescriptionEn,
        ]}
        onTranslated={(t) => {
          let i = 0;
          const take = () => t[i++] ?? "";
          setPage({
            ...page,
            heroEyebrowHi: take() || page.heroEyebrowHi,
            heroTitleHi: take() || page.heroTitleHi,
            heroTitleAccentHi: take() || page.heroTitleAccentHi,
            heroDescriptionHi: take() || page.heroDescriptionHi,
            homeChapter: {
              ...page.homeChapter,
              badgeHi: take() || page.homeChapter.badgeHi,
              titleHi: take() || page.homeChapter.titleHi,
              descriptionHi: take() || page.homeChapter.descriptionHi,
              browseLabelHi: take() || page.homeChapter.browseLabelHi,
              supplyHeadingHi: take() || page.homeChapter.supplyHeadingHi,
              supplySubtextHi: take() || page.homeChapter.supplySubtextHi,
              ctaEyebrowHi: take() || page.homeChapter.ctaEyebrowHi,
              ctaTitleHi: take() || page.homeChapter.ctaTitleHi,
              ctaDescriptionHi: take() || page.homeChapter.ctaDescriptionHi,
              ctaBrowseHi: take() || page.homeChapter.ctaBrowseHi,
              ctaCallHi: take() || page.homeChapter.ctaCallHi,
            },
            faqs: page.faqs.map((f) => ({
              ...f,
              qHi: take() || f.qHi,
              aHi: take() || f.aHi,
            })),
            ctaTitleHi: take() || page.ctaTitleHi,
            ctaDescriptionHi: take() || page.ctaDescriptionHi,
          });
        }}
      />

      <CmsBilingualField
        label="Hero eyebrow"
        en={page.heroEyebrowEn}
        hi={page.heroEyebrowHi}
        onEn={(v) => setPage({ ...page, heroEyebrowEn: v })}
        onHi={(v) => setPage({ ...page, heroEyebrowHi: v })}
        disabled={!canEdit || loading}
      />
      <CmsBilingualField label="Hero title" en={page.heroTitleEn} hi={page.heroTitleHi} onEn={(v) => setPage({ ...page, heroTitleEn: v })} onHi={(v) => setPage({ ...page, heroTitleHi: v })} disabled={!canEdit || loading} />
      <CmsBilingualField label="Hero title accent" en={page.heroTitleAccentEn} hi={page.heroTitleAccentHi} onEn={(v) => setPage({ ...page, heroTitleAccentEn: v })} onHi={(v) => setPage({ ...page, heroTitleAccentHi: v })} disabled={!canEdit || loading} />
      <CmsBilingualField label="Hero description" en={page.heroDescriptionEn} hi={page.heroDescriptionHi} onEn={(v) => setPage({ ...page, heroDescriptionEn: v })} onHi={(v) => setPage({ ...page, heroDescriptionHi: v })} disabled={!canEdit || loading} multiline />

      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="text-sm font-semibold">Homepage chapter (MallChapter)</h3>
        <p className="text-xs text-muted-foreground">
          Copy for the Kisaan Mall section on the homepage scroll narrative.
        </p>
        <CmsBilingualField
          label="Badge"
          en={page.homeChapter.badgeEn}
          hi={page.homeChapter.badgeHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, badgeEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, badgeHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Title"
          en={page.homeChapter.titleEn}
          hi={page.homeChapter.titleHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, titleEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, titleHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Description"
          en={page.homeChapter.descriptionEn}
          hi={page.homeChapter.descriptionHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, descriptionEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, descriptionHi: v } })}
          disabled={!canEdit || loading}
          multiline
        />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Features (EN)</Label>
          <Textarea
            value={page.homeChapter.featuresEn.join("\n")}
            onChange={(e) =>
              setPage({
                ...page,
                homeChapter: {
                  ...page.homeChapter,
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
            value={page.homeChapter.featuresHi.join("\n")}
            onChange={(e) =>
              setPage({
                ...page,
                homeChapter: {
                  ...page.homeChapter,
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
          en={page.homeChapter.browseLabelEn}
          hi={page.homeChapter.browseLabelHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, browseLabelEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, browseLabelHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Supply heading"
          en={page.homeChapter.supplyHeadingEn}
          hi={page.homeChapter.supplyHeadingHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, supplyHeadingEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, supplyHeadingHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="Supply subtext"
          en={page.homeChapter.supplySubtextEn}
          hi={page.homeChapter.supplySubtextHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, supplySubtextEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, supplySubtextHi: v } })}
          disabled={!canEdit || loading}
          multiline
        />
        <CmsBilingualField
          label="CTA eyebrow"
          en={page.homeChapter.ctaEyebrowEn}
          hi={page.homeChapter.ctaEyebrowHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaEyebrowEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaEyebrowHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA title"
          en={page.homeChapter.ctaTitleEn}
          hi={page.homeChapter.ctaTitleHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaTitleEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaTitleHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA description"
          en={page.homeChapter.ctaDescriptionEn}
          hi={page.homeChapter.ctaDescriptionHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaDescriptionEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaDescriptionHi: v } })}
          disabled={!canEdit || loading}
          multiline
        />
        <CmsBilingualField
          label="CTA browse button"
          en={page.homeChapter.ctaBrowseEn}
          hi={page.homeChapter.ctaBrowseHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaBrowseEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaBrowseHi: v } })}
          disabled={!canEdit || loading}
        />
        <CmsBilingualField
          label="CTA call button"
          en={page.homeChapter.ctaCallEn}
          hi={page.homeChapter.ctaCallHi}
          onEn={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaCallEn: v } })}
          onHi={(v) => setPage({ ...page, homeChapter: { ...page.homeChapter, ctaCallHi: v } })}
          disabled={!canEdit || loading}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">FAQs</h3>
        {page.faqs.map((faq, i) => (
          <div key={i} className="rounded-lg border p-3 space-y-2">
            <CmsBilingualField
              label={`FAQ ${i + 1} question`}
              en={faq.qEn}
              hi={faq.qHi}
              onEn={(v) =>
                setPage({
                  ...page,
                  faqs: page.faqs.map((f, idx) => (idx === i ? { ...f, qEn: v } : f)),
                })
              }
              onHi={(v) =>
                setPage({
                  ...page,
                  faqs: page.faqs.map((f, idx) => (idx === i ? { ...f, qHi: v } : f)),
                })
              }
              disabled={!canEdit || loading}
            />
            <CmsBilingualField
              label="Answer"
              en={faq.aEn}
              hi={faq.aHi}
              onEn={(v) =>
                setPage({
                  ...page,
                  faqs: page.faqs.map((f, idx) => (idx === i ? { ...f, aEn: v } : f)),
                })
              }
              onHi={(v) =>
                setPage({
                  ...page,
                  faqs: page.faqs.map((f, idx) => (idx === i ? { ...f, aHi: v } : f)),
                })
              }
              disabled={!canEdit || loading}
              multiline
            />
          </div>
        ))}
      </div>

      <CmsBilingualField label="CTA title" en={page.ctaTitleEn} hi={page.ctaTitleHi} onEn={(v) => setPage({ ...page, ctaTitleEn: v })} onHi={(v) => setPage({ ...page, ctaTitleHi: v })} disabled={!canEdit || loading} />
      <CmsBilingualField label="CTA description" en={page.ctaDescriptionEn} hi={page.ctaDescriptionHi} onEn={(v) => setPage({ ...page, ctaDescriptionEn: v })} onHi={(v) => setPage({ ...page, ctaDescriptionHi: v })} disabled={!canEdit || loading} multiline />

      <CmsStickySaveBar saving={saving} disabled={!canEdit} label="Save full page content" />
    </form>
  );
}