import { useCallback, useEffect, useState } from "react";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { getCmsContactPageAdmin, saveCmsContactPageAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsBilingualField } from "@/components/admin/cms/CmsBilingualField";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsSectionHeader } from "@/components/admin/cms/CmsSectionHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { CONTACT_PAGE_FALLBACK } from "@/data/contact-page-fallback";
import type { ContactPageContent, ContactConsultationTopic } from "@/lib/cms-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CMS_ICON_KEYS } from "@/lib/cms-types";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[]): string {
  return items.join("\n");
}

export function AdminCmsContactPage({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [content, setContent] = useState<ContactPageContent>(CONTACT_PAGE_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useCmsDirtyGuard(dirty);

  const updateContent = (next: ContactPageContent) => {
    setContent(next);
    setDirty(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsContactPageAdmin();
    if (isAdminOk<{ content: ContactPageContent }>(res)) {
      setContent(res.content);
      setDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load contact page content."));
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
    const res = await saveCmsContactPageAdmin({ data: content });
    setSaving(false);
    if (isAdminOk<{ content: ContactPageContent }>(res)) {
      setContent(res.content);
      setDirty(false);
      toast.success("Saved", "Contact page FAQs and form options are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save contact page."));
    }
  }

  function updateTopic(index: number, patch: Partial<ContactConsultationTopic>) {
    updateContent({
      ...content,
      consultationTopics: content.consultationTopics.map((t, i) =>
        i === index ? { ...t, ...patch } : t,
      ),
    });
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading contact page…</p>;
  }

  return (
    <div className="space-y-8">
      <CmsPageHeader
        title="Contact page"
        description="Manage FAQ copy, consultation inquiry tracks, and form dropdown options on the public contact page."
        workflow="live"
      />

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <CmsSectionHeader
            title="FAQ section"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            translate={{
              disabled: !canEdit,
              enTexts: [
                content.faqBadgeEn,
                content.faqTitleEn,
                ...content.faqs.flatMap((f) => [f.qEn, f.aEn]),
              ],
              onTranslated: (t) => {
                let i = 0;
                updateContent({
                  ...content,
                  faqBadgeHi: t[i++] ?? content.faqBadgeHi,
                  faqTitleHi: t[i++] ?? content.faqTitleHi,
                  faqs: content.faqs.map((f) => ({
                    ...f,
                    qHi: t[i++] ?? f.qHi,
                    aHi: t[i++] ?? f.aHi,
                  })),
                });
              },
            }}
          />
          <CmsBilingualField
            label="Section badge"
            en={content.faqBadgeEn}
            hi={content.faqBadgeHi}
            onEn={(v) => updateContent({ ...content, faqBadgeEn: v })}
            onHi={(v) => updateContent({ ...content, faqBadgeHi: v })}
            disabled={!canEdit}
          />
          <CmsBilingualField
            label="Section title"
            en={content.faqTitleEn}
            hi={content.faqTitleHi}
            onEn={(v) => updateContent({ ...content, faqTitleEn: v })}
            onHi={(v) => updateContent({ ...content, faqTitleHi: v })}
            disabled={!canEdit}
          />
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">FAQ {i + 1}</span>
                  {canEdit && content.faqs.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateContent({
                          ...content,
                          faqs: content.faqs.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
                <CmsBilingualField
                  label="Question"
                  en={faq.qEn}
                  hi={faq.qHi}
                  onEn={(v) =>
                    updateContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, qEn: v } : f)),
                    })
                  }
                  onHi={(v) =>
                    updateContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, qHi: v } : f)),
                    })
                  }
                  disabled={!canEdit}
                />
                <CmsBilingualField
                  label="Answer"
                  en={faq.aEn}
                  hi={faq.aHi}
                  onEn={(v) =>
                    updateContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, aEn: v } : f)),
                    })
                  }
                  onHi={(v) =>
                    updateContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, aHi: v } : f)),
                    })
                  }
                  disabled={!canEdit}
                  multiline
                />
              </div>
            ))}
            {canEdit ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateContent({
                    ...content,
                    faqs: [...content.faqs, { qEn: "", qHi: "", aEn: "", aHi: "" }],
                  })
                }
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add FAQ
              </Button>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <CmsSectionHeader
            title="Consultation inquiry tracks"
            translate={{
              disabled: !canEdit,
              enTexts: content.consultationTopics.flatMap((t) => [t.labelEn, t.descEn]),
              onTranslated: (t) => {
                let i = 0;
                updateContent({
                  ...content,
                  consultationTopics: content.consultationTopics.map((topic) => ({
                    ...topic,
                    labelHi: t[i++] ?? topic.labelHi,
                    descHi: t[i++] ?? topic.descHi,
                  })),
                });
              },
            }}
          />
          {content.consultationTopics.map((topic, i) => (
            <div key={topic.id} className="rounded-lg border p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Topic ID</Label>
                  <Input
                    value={topic.id}
                    onChange={(e) => updateTopic(i, { id: e.target.value })}
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <Select
                    value={topic.iconKey}
                    onValueChange={(v) =>
                      updateTopic(i, { iconKey: v as ContactConsultationTopic["iconKey"] })
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
                </div>
              </div>
              <CmsBilingualField
                label="Label"
                en={topic.labelEn}
                hi={topic.labelHi}
                onEn={(v) => updateTopic(i, { labelEn: v })}
                onHi={(v) => updateTopic(i, { labelHi: v })}
                disabled={!canEdit}
              />
              <CmsBilingualField
                label="Description"
                en={topic.descEn}
                hi={topic.descHi}
                onEn={(v) => updateTopic(i, { descEn: v })}
                onHi={(v) => updateTopic(i, { descHi: v })}
                disabled={!canEdit}
                multiline
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <CmsSectionHeader
            title="Form dropdown options"
            translate={{
              disabled: !canEdit,
              enTexts: [
                ...content.acreageOptionsEn,
                ...content.cropOptionsEn,
                ...content.channelOptionsEn,
              ],
              onTranslated: (t) => {
                let i = 0;
                const sliceHi = (en: string[], hi: string[]) => {
                  const n = en.length;
                  const slice = t.slice(i, i + n).map((v, idx) => (v || hi[idx]) ?? "");
                  i += n;
                  return slice;
                };
                updateContent({
                  ...content,
                  acreageOptionsHi: sliceHi(content.acreageOptionsEn, content.acreageOptionsHi),
                  cropOptionsHi: sliceHi(content.cropOptionsEn, content.cropOptionsHi),
                  channelOptionsHi: sliceHi(content.channelOptionsEn, content.channelOptionsHi),
                });
              },
            }}
          />
          <p className="text-xs text-muted-foreground">
            One option per line. English and Hindi lists should align by row.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Acreage options (EN)</Label>
              <Textarea
                value={listToLines(content.acreageOptionsEn)}
                onChange={(e) =>
                  updateContent({ ...content, acreageOptionsEn: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Acreage options (HI)</Label>
              <Textarea
                value={listToLines(content.acreageOptionsHi)}
                onChange={(e) =>
                  updateContent({ ...content, acreageOptionsHi: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Crop options (EN)</Label>
              <Textarea
                value={listToLines(content.cropOptionsEn)}
                onChange={(e) =>
                  updateContent({ ...content, cropOptionsEn: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Crop options (HI)</Label>
              <Textarea
                value={listToLines(content.cropOptionsHi)}
                onChange={(e) =>
                  updateContent({ ...content, cropOptionsHi: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Channel options (EN)</Label>
              <Textarea
                value={listToLines(content.channelOptionsEn)}
                onChange={(e) =>
                  updateContent({ ...content, channelOptionsEn: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <Label>Channel options (HI)</Label>
              <Textarea
                value={listToLines(content.channelOptionsHi)}
                onChange={(e) =>
                  updateContent({ ...content, channelOptionsHi: linesToList(e.target.value) })
                }
                disabled={!canEdit}
                rows={4}
              />
            </div>
          </div>
        </section>

        <CmsStickySaveBar saving={saving} disabled={!canEdit} label="Save contact page" />
      </form>
    </div>
  );
}
