import { useCallback, useEffect, useState } from "react";
import { MessageSquare, Plus, Save, Trash2 } from "lucide-react";
import { getCmsContactPageAdmin, saveCmsContactPageAdmin } from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
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
    <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
      <p className="text-sm font-medium">{label}</p>
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

export function AdminCmsContactPage({ role }: { role: AdminRole }) {
  const toast = useToast();
  const canEdit = canManageSettings(role);
  const [content, setContent] = useState<ContactPageContent>(CONTACT_PAGE_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsContactPageAdmin();
    if (isAdminOk<{ content: ContactPageContent }>(res)) {
      setContent(res.content);
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
      toast.success("Saved", "Contact page FAQs and form options are updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save contact page."));
    }
  }

  function updateTopic(index: number, patch: Partial<ContactConsultationTopic>) {
    setContent((prev) => ({
      ...prev,
      consultationTopics: prev.consultationTopics.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    }));
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading contact page…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact page</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage FAQ copy, consultation inquiry tracks, and form dropdown options on the public contact page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">FAQ section</h2>
          </div>
          <BilingualField
            label="Section badge"
            enValue={content.faqBadgeEn}
            hiValue={content.faqBadgeHi}
            onEn={(v) => setContent({ ...content, faqBadgeEn: v })}
            onHi={(v) => setContent({ ...content, faqBadgeHi: v })}
            disabled={!canEdit}
          />
          <BilingualField
            label="Section title"
            enValue={content.faqTitleEn}
            hiValue={content.faqTitleHi}
            onEn={(v) => setContent({ ...content, faqTitleEn: v })}
            onHi={(v) => setContent({ ...content, faqTitleHi: v })}
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
                        setContent({
                          ...content,
                          faqs: content.faqs.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
                <BilingualField
                  label="Question"
                  enValue={faq.qEn}
                  hiValue={faq.qHi}
                  onEn={(v) =>
                    setContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, qEn: v } : f)),
                    })
                  }
                  onHi={(v) =>
                    setContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, qHi: v } : f)),
                    })
                  }
                  disabled={!canEdit}
                />
                <BilingualField
                  label="Answer"
                  enValue={faq.aEn}
                  hiValue={faq.aHi}
                  onEn={(v) =>
                    setContent({
                      ...content,
                      faqs: content.faqs.map((f, idx) => (idx === i ? { ...f, aEn: v } : f)),
                    })
                  }
                  onHi={(v) =>
                    setContent({
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
                  setContent({
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
          <h2 className="text-base font-semibold">Consultation inquiry tracks</h2>
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
                    onValueChange={(v) => updateTopic(i, { iconKey: v as ContactConsultationTopic["iconKey"] })}
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
              </div>
              <BilingualField
                label="Label"
                enValue={topic.labelEn}
                hiValue={topic.labelHi}
                onEn={(v) => updateTopic(i, { labelEn: v })}
                onHi={(v) => updateTopic(i, { labelHi: v })}
                disabled={!canEdit}
              />
              <BilingualField
                label="Description"
                enValue={topic.descEn}
                hiValue={topic.descHi}
                onEn={(v) => updateTopic(i, { descEn: v })}
                onHi={(v) => updateTopic(i, { descHi: v })}
                disabled={!canEdit}
                multiline
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold">Form dropdown options</h2>
          <p className="text-xs text-muted-foreground">One option per line. English and Hindi lists should align by row.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Acreage options (EN)</Label>
              <Textarea
                value={listToLines(content.acreageOptionsEn)}
                onChange={(e) => setContent({ ...content, acreageOptionsEn: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Acreage options (HI)</Label>
              <Textarea
                value={listToLines(content.acreageOptionsHi)}
                onChange={(e) => setContent({ ...content, acreageOptionsHi: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Crop options (EN)</Label>
              <Textarea
                value={listToLines(content.cropOptionsEn)}
                onChange={(e) => setContent({ ...content, cropOptionsEn: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Crop options (HI)</Label>
              <Textarea
                value={listToLines(content.cropOptionsHi)}
                onChange={(e) => setContent({ ...content, cropOptionsHi: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={5}
              />
            </div>
            <div className="space-y-1">
              <Label>Channel options (EN)</Label>
              <Textarea
                value={listToLines(content.channelOptionsEn)}
                onChange={(e) => setContent({ ...content, channelOptionsEn: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <Label>Channel options (HI)</Label>
              <Textarea
                value={listToLines(content.channelOptionsHi)}
                onChange={(e) => setContent({ ...content, channelOptionsHi: linesToList(e.target.value) })}
                disabled={!canEdit}
                rows={4}
              />
            </div>
          </div>
        </section>

        {canEdit ? (
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Save contact page"}
          </Button>
        ) : null}
      </form>
    </div>
  );
}
