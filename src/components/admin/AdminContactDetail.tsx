import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MessageSquare,
  Mail,
  ChevronLeft,
  Copy,
  ExternalLink,
  Upload,
  Send,
  FileText,
} from "lucide-react";
import {
  addAdminNote,
  updateAdminContact,
  uploadAdminAttachment,
} from "@/functions/admin-contacts";
import {
  interpolateTemplate,
  PRIORITIES,
  PRIORITY_LABELS,
  REQUEST_STATUSES,
  STATUS_LABELS,
  type AdminSettingsPayload,
  type RequestPriority,
  type RequestStatus,
} from "@/lib/admin-constants";
import { formatWhen, whatsappDigits } from "@/lib/admin-format";
import { PriorityBadge, StatusBadge } from "@/components/admin/AdminBadges";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Contact = {
  id: number;
  ticket_id: string;
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  message: string | null;
  status: RequestStatus;
  priority: RequestPriority;
  assigned_to: number | null;
  assignee_name?: string | null;
  follow_up_date: string | Date | null;
  attachment_url: string | null;
  preferred_language: string | null;
  company_name: string | null;
  website: string | null;
  farm_details: {
    acreage?: string | null;
    crop?: string | null;
    district?: string | null;
    irrigation?: string | null;
    soil?: string | null;
  };
  acreage?: string | null;
  crop?: string | null;
  district?: string | null;
  channel?: string | null;
  source_page?: string | null;
  created_at: string | Date;
};

type Activity = {
  id: number;
  action: string;
  actor_name?: string | null;
  payload: unknown;
  created_at: string | Date;
};

type Note = {
  id: number;
  body: string;
  author_name?: string | null;
  created_at: string | Date;
};

export function AdminContactDetail({
  initial,
  assignees,
  settings,
}: {
  initial: { contact: Contact; activity: Activity[]; notes: Note[]; settings: AdminSettingsPayload };
  assignees: Array<{ id: number; name: string }>;
  settings: AdminSettingsPayload;
}) {
  const toast = useToast();
  const [contact, setContact] = useState(initial.contact);
  const [activity, setActivity] = useState(initial.activity);
  const [notes, setNotes] = useState(initial.notes);
  const [noteBody, setNoteBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const farm = contact.farm_details || {};
  const waText = interpolateTemplate(settings.whatsappTemplate, {
    name: contact.name,
    ticket: contact.ticket_id,
    notes: contact.message ?? "",
  });
  const mailBody = interpolateTemplate(settings.emailTemplate, {
    name: contact.name,
    ticket: contact.ticket_id,
    notes: contact.message ?? "",
  });
  const mailSubject = interpolateTemplate(settings.emailSubject, { ticket: contact.ticket_id, name: contact.name });
  const tel = `tel:+${whatsappDigits(contact.phone)}`;
  const wa = `https://wa.me/${whatsappDigits(contact.phone)}?text=${encodeURIComponent(waText)}`;
  const mail = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
    : null;

  async function patch(data: {
    id: number;
    status?: RequestStatus;
    priority?: RequestPriority;
    assigned_to?: number | null;
    follow_up_date?: string | null;
  }) {
    setSaving(true);
    const res = await updateAdminContact({ data });
    setSaving(false);
    if (!res || !("ok" in res) || !res.ok) {
      toast.error("Update Failed", "Could not save workflow changes.");
      return;
    }
    setContact(res.contact as Contact);
    toast.success("Changes Saved", "Lead details updated.");
  }

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb-like title & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="h-8.5 w-8.5 rounded-lg p-0 bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Link to="/agaate-admin/contacts" aria-label="Back to contacts">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-semibold bg-muted/50 rounded-md px-2 py-0.5 text-muted-foreground">{contact.ticket_id}</span>
              <StatusBadge status={contact.status} />
              <PriorityBadge priority={contact.priority} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">{contact.name}</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="rounded-lg px-3.5 h-8.5 bg-card border-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors shadow-xs text-xs font-medium">
            <a href={tel}>
              <Phone className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>Call</span>
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="rounded-lg px-3.5 h-8.5 bg-card border-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors shadow-xs text-xs font-medium">
            <a href={wa} target="_blank" rel="noreferrer">
              <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>WhatsApp</span>
            </a>
          </Button>
          {mail && (
            <Button variant="outline" size="sm" asChild className="rounded-lg px-3.5 h-8.5 bg-card border-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors shadow-xs text-xs font-medium">
              <a href={mail}>
                <Mail className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <span>Email</span>
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left 2 Cols */}
        <div className="md:col-span-2 space-y-6">
          {/* Details Rounded-Square Island */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Inquiry Profile
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Farmer & Landholding Specifications</h3>
              <p className="text-xs text-muted-foreground">Original submitted details and diagnostic parameters</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Phone</span>
                <span className="font-medium text-foreground">{contact.phone}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Email</span>
                <span className="font-medium text-foreground">{contact.email || "—"}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Program</span>
                <span className="font-medium text-foreground">{contact.topic}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Company / Entity</span>
                <span className="font-medium text-foreground">{contact.company_name || "—"}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Landholding</span>
                <span className="font-medium text-foreground">{farm.acreage || contact.acreage || "—"}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Crop Variety</span>
                <span className="font-medium text-foreground">{farm.crop || contact.crop || "—"}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">District</span>
                <span className="font-medium text-foreground">{farm.district || contact.district || "—"}</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Channel / Source</span>
                <span className="font-medium text-foreground">{contact.channel || "Website"} ({contact.source_page || "Direct"})</span>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-xs">
                <span className="text-muted-foreground block text-[11px]">Submitted On</span>
                <span className="font-medium font-mono text-[11px] text-foreground">{formatWhen(contact.created_at)}</span>
              </div>
            </div>

            <div className="rounded-xl bg-muted/30 border border-border/60 p-4">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Original Message
              </span>
              <p className="text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                {contact.message || "No specific customer notes provided."}
              </p>
            </div>
          </div>

          {/* Attachments Rounded-Square Island */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Documents
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Soil Reports & Attachments</h3>
              <p className="text-xs text-muted-foreground">Topographical maps and lab test records</p>
            </div>

            {contact.attachment_url ? (
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-3.5">
                <div className="flex items-center space-x-3 truncate">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="truncate text-xs">
                    <span className="font-medium block truncate text-foreground">Attached Document</span>
                    <span className="text-muted-foreground font-mono text-[11px] truncate block">{contact.attachment_url}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild className="rounded-lg px-3 h-7.5 text-xs bg-card border-border shadow-xs">
                  <a href={contact.attachment_url} target="_blank" rel="noreferrer">
                    Open <ExternalLink className="ml-1.5 h-3 w-3" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground bg-muted/10">
                <Upload className="h-5 w-5 mb-1.5 text-muted-foreground" />
                <p className="font-medium text-foreground">Attach soil test reports or site photos</p>
                <p className="text-[11px] mt-0.5">PDF, PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  id="file-attachment-input-detail"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    toast.info("Uploading", "Transferring document...");
                    const buf = await file.arrayBuffer();
                    const bytes = new Uint8Array(buf);
                    let binary = "";
                    bytes.forEach((b) => {
                      binary += String.fromCharCode(b);
                    });
                    const base64 = btoa(binary);
                    const res = await uploadAdminAttachment({
                      data: { id: contact.id, filename: file.name, mime: file.type, base64 },
                    });
                    setUploading(false);
                    if (res && "ok" in res && res.ok) {
                      setContact(res.contact as Contact);
                      toast.success("Upload Complete", "Document attached successfully.");
                    } else {
                      toast.error("Upload Failed", "Could not upload file.");
                    }
                  }}
                />
                <Button variant="outline" size="sm" asChild className="mt-3 rounded-lg px-3.5 h-7.5 text-xs cursor-pointer bg-card border-border shadow-xs">
                  <label htmlFor="file-attachment-input-detail">
                    <span>{uploading ? "Uploading..." : "Select Document"}</span>
                  </label>
                </Button>
              </div>
            )}
          </div>

          {/* Internal Notes Feed Island */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Triage Notes
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Internal Agronomist Notes</h3>
              <p className="text-xs text-muted-foreground">Private advisory recommendations and triage history</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!noteBody.trim()) return;
                const res = await addAdminNote({ data: { id: contact.id, body: noteBody } });
                if (res && typeof res === "object" && "ok" in res && res.ok === true) {
                  const payload = res as unknown as { notes: Note[]; activity: Activity[] };
                  setNotes(payload.notes);
                  setActivity(payload.activity);
                  setNoteBody("");
                  toast.success("Note Logged", "Internal team note posted.");
                }
              }}
              className="flex gap-2"
            >
              <Input
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Add note or advisory prescription..."
                className="h-8.5 rounded-lg px-3 text-xs bg-muted/20 border-border"
              />
              <Button type="submit" size="sm" className="h-8.5 rounded-lg px-3.5 text-xs shrink-0 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs">
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Post
              </Button>
            </form>

            <div className="space-y-2.5">
              {notes.map((n) => (
                <div key={n.id} className="rounded-xl border border-border/60 bg-muted/15 p-3.5 space-y-1">
                  <p className="text-xs text-foreground leading-relaxed">{n.body}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    <span className="font-semibold text-foreground">{n.author_name || "Staff"}</span> · {formatWhen(n.created_at)}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="py-3 text-center text-xs text-muted-foreground">No notes recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Workflow Card + Audit Timeline Island */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Lifecycle
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Workflow & Dispatch</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Status</Label>
                <select
                  value={contact.status}
                  disabled={saving}
                  onChange={(e) => void patch({ id: contact.id, status: e.target.value as RequestStatus })}
                  className="w-full h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
                >
                  {REQUEST_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Priority</Label>
                <select
                  value={contact.priority}
                  disabled={saving}
                  onChange={(e) => void patch({ id: contact.id, priority: e.target.value as RequestPriority })}
                  className="w-full h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
                >
                  {PRIORITIES.map((s) => (
                    <option key={s} value={s}>
                      {PRIORITY_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Assigned Agronomist</Label>
                <select
                  value={contact.assigned_to ?? ""}
                  disabled={saving}
                  onChange={(e) =>
                    void patch({
                      id: contact.id,
                      assigned_to: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
                >
                  <option value="">Unassigned</option>
                  {assignees.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Follow-up / Audit Date</Label>
                <Input
                  type="date"
                  disabled={saving}
                  value={String(contact.follow_up_date || "").slice(0, 10)}
                  onChange={(e) => void patch({ id: contact.id, follow_up_date: e.target.value || null })}
                  className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                />
              </div>

              <div className="pt-4 border-t border-border/60">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                  Activity Timeline
                </span>
                <div className="space-y-3">
                  {activity.map((a) => (
                    <div key={a.id} className="flex space-x-2 text-xs">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sidebar-primary dark:bg-primary shrink-0" />
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {a.action.replaceAll("_", " ")}
                          {a.actor_name ? ` · ${a.actor_name}` : ""}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">{formatWhen(a.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
