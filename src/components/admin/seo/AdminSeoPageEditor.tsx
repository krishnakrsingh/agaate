import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { getSeoPageAdmin, saveSeoPageAdmin } from "@/functions/seo";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { canManageSeo } from "@/lib/admin-constants";
import type { ResolvedSeo, SeoMetadataInput, SeoPageDefinition } from "@/lib/seo-types";
import { localePath } from "@/lib/seo-registry";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CmsImageField } from "@/components/admin/cms/CmsImageField";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { SeoSearchPreview, SeoSocialPreview } from "@/components/admin/seo/SeoPreview";
import { SeoChecklist, buildSeoChecklist } from "@/components/admin/seo/SeoChecklist";

type Props = {
  permissions: string[];
  entityType: string;
  entityKey: string;
};

const emptyForm = (entityType: string, entityKey: string, locale: string): SeoMetadataInput => ({
  entityType: entityType as SeoMetadataInput["entityType"],
  entityKey,
  locale,
  noindex: false,
  nofollow: false,
  seoStatus: "needs_review",
});

export function AdminSeoPageEditor({ permissions, entityType, entityKey }: Props) {
  const toast = useToast();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { locale?: string };
  const locale = search.locale === "hi" ? "hi" : "en";
  const canEdit = canManageSeo({ permissions });

  const [page, setPage] = useState<SeoPageDefinition | null>(null);
  const [form, setForm] = useState<SeoMetadataInput>(() => emptyForm(entityType, entityKey, locale));
  const [resolved, setResolved] = useState<ResolvedSeo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useCmsDirtyGuard(dirty);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getSeoPageAdmin({ data: { entityType, entityKey, locale } });
    if (isAdminOk<{
      page: SeoPageDefinition | undefined;
      metadata: SeoMetadataInput | null;
      resolved: ResolvedSeo;
    }>(res)) {
      setPage(res.page ?? null);
      setResolved(res.resolved);
      if (res.metadata) {
        setForm({ ...emptyForm(entityType, entityKey, locale), ...res.metadata });
      } else {
        setForm(emptyForm(entityType, entityKey, locale));
      }
    } else {
      toast.error(adminError(res));
    }
    setLoading(false);
    setDirty(false);
  }, [entityType, entityKey, locale, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const update = (patch: Partial<SeoMetadataInput>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const previewSeo = useMemo(() => {
    if (!resolved) return null;
    return {
      ...resolved,
      title: form.seoTitle || resolved.title,
      description: form.metaDescription || resolved.description,
      canonical: form.canonicalUrl || resolved.canonical,
      noindex: form.noindex ?? resolved.noindex,
      nofollow: form.nofollow ?? resolved.nofollow,
      og: {
        ...resolved.og,
        title: form.ogTitle || form.seoTitle || resolved.og.title,
        description: form.ogDescription || form.metaDescription || resolved.og.description,
        image: form.ogImage || resolved.og.image,
      },
      twitter: {
        ...resolved.twitter,
        title: form.twitterTitle || form.ogTitle || form.seoTitle || resolved.twitter.title,
        description:
          form.twitterDescription || form.ogDescription || form.metaDescription || resolved.twitter.description,
        image: form.twitterImage || form.ogImage || resolved.twitter.image,
      },
    } satisfies ResolvedSeo;
  }, [resolved, form]);

  const checklist = previewSeo ? buildSeoChecklist(previewSeo, form.focusKeyword) : [];

  const save = async () => {
    if (!canEdit) return;
    setSaving(true);
    const res = await saveSeoPageAdmin({ data: form });
    if (isAdminOk<{ resolved: ResolvedSeo }>(res)) {
      toast.success("Page SEO saved.");
      setResolved(res.resolved);
      setDirty(false);
    } else {
      toast.error(adminError(res));
    }
    setSaving(false);
  };

  const switchLocale = (next: string) => {
    if (dirty && !window.confirm("You have unsaved changes. Switch locale anyway?")) return;
    navigate({
      to: "/agaate-admin/seo/pages/$entityType/$entityKey",
      params: { entityType, entityKey },
      search: { locale: next },
    });
  };

  const translateToHindi = async (translations: string[]) => {
    const [
      seoTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      twitterTitle,
      twitterDescription,
      focusKeyword,
      secondaryKeywords,
    ] = translations;
    const hiRes = await getSeoPageAdmin({ data: { entityType, entityKey, locale: "hi" } });
    const existingHi =
      isAdminOk<{ metadata: SeoMetadataInput | null }>(hiRes) && hiRes.metadata
        ? hiRes.metadata
        : emptyForm(entityType, entityKey, "hi");
    const hiPayload: SeoMetadataInput = {
      ...existingHi,
      entityType: entityType as SeoMetadataInput["entityType"],
      entityKey,
      locale: "hi",
      seoTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      twitterTitle,
      twitterDescription,
      focusKeyword,
      secondaryKeywords,
      ogImage: existingHi.ogImage || form.ogImage,
      twitterImage: existingHi.twitterImage || form.twitterImage,
      noindex: form.noindex,
      nofollow: form.nofollow,
      seoStatus: form.seoStatus,
    };
    const saveRes = await saveSeoPageAdmin({ data: hiPayload });
    if (isAdminOk(saveRes)) {
      toast.success("Hindi SEO saved from English.");
      if (dirty && !window.confirm("You have unsaved English changes. Switch to Hindi anyway?")) {
        return;
      }
      navigate({
        to: "/agaate-admin/seo/pages/$entityType/$entityKey",
        params: { entityType, entityKey },
        search: { locale: "hi" },
      });
    } else {
      toast.error(adminError(saveRes));
    }
  };

  const seoTranslateTexts = [
    form.seoTitle ?? "",
    form.metaDescription ?? "",
    form.ogTitle ?? "",
    form.ogDescription ?? "",
    form.twitterTitle ?? "",
    form.twitterDescription ?? "",
    form.focusKeyword ?? "",
    form.secondaryKeywords ?? "",
  ];

  if (loading) {
    return <p className="p-6 text-sm text-muted-foreground">Loading page SEO…</p>;
  }

  if (!page) {
    return <p className="p-6 text-sm text-muted-foreground">Page not found.</p>;
  }

  return (
    <form
      className="space-y-6 pb-24"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <CmsPageHeader
        title={`SEO — ${page.label}`}
        description={`${localePath(page.path, locale)} · Leave fields empty to use smart defaults.`}
        workflow="live"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {locale === "en" && canEdit ? (
              <CmsTranslateToHindiButton
                variant="inline"
                disabled={!canEdit}
                enTexts={seoTranslateTexts}
                onTranslated={(translations) => void translateToHindi(translations)}
                hint="Translates and saves the Hindi locale."
              />
            ) : null}
            <Tabs value={locale} onValueChange={switchLocale}>
              <TabsList>
                <TabsTrigger value="en">EN</TabsTrigger>
                <TabsTrigger value="hi">HI</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>SEO title</Label>
                <Input
                  value={form.seoTitle ?? ""}
                  onChange={(e) => update({ seoTitle: e.target.value })}
                  disabled={!canEdit}
                  placeholder={page.defaultTitle}
                />
                <p className="text-xs text-muted-foreground">
                  {(form.seoTitle ?? page.defaultTitle).length} chars · 30–60 recommended
                </p>
              </div>
              <div className="space-y-2">
                <Label>Meta description</Label>
                <Textarea
                  value={form.metaDescription ?? ""}
                  onChange={(e) => update({ metaDescription: e.target.value })}
                  disabled={!canEdit}
                  rows={3}
                  placeholder={page.defaultDescription}
                />
                <p className="text-xs text-muted-foreground">
                  {(form.metaDescription ?? page.defaultDescription).length} chars · 120–160 recommended
                </p>
              </div>
              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input
                  value={form.canonicalUrl ?? ""}
                  onChange={(e) => update({ canonicalUrl: e.target.value })}
                  disabled={!canEdit}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Focus keyword</Label>
                  <Input
                    value={form.focusKeyword ?? ""}
                    onChange={(e) => update({ focusKeyword: e.target.value })}
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO status</Label>
                  <Select
                    value={form.seoStatus ?? "needs_review"}
                    onValueChange={(v) =>
                      update({ seoStatus: v as SeoMetadataInput["seoStatus"] })
                    }
                    disabled={!canEdit}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="needs_review">Needs review</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="optimized">Optimized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Secondary keywords</Label>
                <Input
                  value={form.secondaryKeywords ?? ""}
                  onChange={(e) => update({ secondaryKeywords: e.target.value })}
                  disabled={!canEdit}
                  placeholder="comma-separated, optional"
                />
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={form.noindex ?? false}
                    onCheckedChange={(v) => update({ noindex: v === true })}
                    disabled={!canEdit}
                  />
                  <Label>Noindex</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={form.nofollow ?? false}
                    onCheckedChange={(v) => update({ nofollow: v === true })}
                    disabled={!canEdit}
                  />
                  <Label>Nofollow</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Open Graph title</Label>
                <Input
                  value={form.ogTitle ?? ""}
                  onChange={(e) => update({ ogTitle: e.target.value })}
                  disabled={!canEdit}
                  placeholder="Uses SEO title if empty"
                />
              </div>
              <div className="space-y-2">
                <Label>Open Graph description</Label>
                <Textarea
                  value={form.ogDescription ?? ""}
                  onChange={(e) => update({ ogDescription: e.target.value })}
                  disabled={!canEdit}
                  rows={2}
                  placeholder="Uses meta description if empty"
                />
              </div>
              <CmsImageField
                label="Open Graph image"
                value={form.ogImage ?? ""}
                onChange={(url) => update({ ogImage: url })}
                disabled={!canEdit}
                hint="1200×630 recommended. Upload or paste a URL."
              />
              <div className="space-y-2">
                <Label>Twitter title</Label>
                <Input
                  value={form.twitterTitle ?? ""}
                  onChange={(e) => update({ twitterTitle: e.target.value })}
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Twitter description</Label>
                <Textarea
                  value={form.twitterDescription ?? ""}
                  onChange={(e) => update({ twitterDescription: e.target.value })}
                  disabled={!canEdit}
                  rows={2}
                />
              </div>
              <CmsImageField
                label="Twitter image"
                value={form.twitterImage ?? ""}
                onChange={(url) => update({ twitterImage: url })}
                disabled={!canEdit}
                hint="Uses Open Graph image if empty."
              />
            </TabsContent>

            <TabsContent value="advanced" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Custom robots directive</Label>
                <Input
                  value={form.robotsDirective ?? ""}
                  onChange={(e) => update({ robotsDirective: e.target.value })}
                  disabled={!canEdit}
                  placeholder="index, follow"
                />
              </div>
              <div className="space-y-2">
                <Label>JSON-LD schema (override)</Label>
                <Textarea
                  value={form.schemaJson ?? ""}
                  onChange={(e) => update({ schemaJson: e.target.value })}
                  disabled={!canEdit}
                  rows={8}
                  className="font-mono text-xs"
                  placeholder="Leave empty for auto-generated schema"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          {previewSeo && <SeoSearchPreview seo={previewSeo} />}
          {previewSeo && <SeoSocialPreview seo={previewSeo} />}
          {checklist.length > 0 && <SeoChecklist items={checklist} />}
        </div>
      </div>

      {canEdit && <CmsStickySaveBar saving={saving} label="Save page SEO" />}
    </form>
  );
}
