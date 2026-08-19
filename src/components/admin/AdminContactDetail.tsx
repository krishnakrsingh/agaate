import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  UserCheck,
  Clock,
  Send,
  Upload,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Copy,
  MapPin,
  Sprout,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
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
      toast.error("Update Failed", "Could not save changes.");
      return;
    }
    setContact(res.contact as Contact);
    toast.success("Changes Saved", "Contact workflow status updated.");
  }

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to="/agaate-admin/contacts"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                {contact.ticket_id}
              </span>
              <StatusBadge status={contact.status} />
              <PriorityBadge priority={contact.priority} />
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">{contact.name}</h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={tel}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-all"
          >
            <Phone className="h-3.5 w-3.5 text-stone-500" />
            <span>Call</span>
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300/80 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 shadow-2xs hover:bg-emerald-100/80 transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
          {mail && (
            <a
              href={mail}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-all"
            >
              <Mail className="h-3.5 w-3.5 text-stone-500" />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Details, Farm Profile, Attachments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Farm Info Cards */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-stone-900 tracking-tight flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <span>Customer & Contact Information</span>
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Phone Number" value={contact.phone} copyable />
                <Field label="Email Address" value={contact.email || "—"} copyable={Boolean(contact.email)} />
                <Field label="Inquiry Program" value={contact.topic} />
                <Field label="Preferred Language" value={contact.preferred_language || "en"} />
                <Field label="Company / Entity" value={contact.company_name || "—"} />
                <Field label="Intake Channel" value={contact.channel || "Website"} />
                <Field label="Source Page" value={contact.source_page || "Direct"} />
                <Field label="Created On" value={formatWhen(contact.created_at)} />
              </div>
            </div>

            {/* Farm & Land Specifications */}
            <div className="border-t border-stone-100 pt-5">
              <h2 className="text-sm font-semibold text-stone-900 tracking-tight flex items-center gap-2">
                <Sprout className="h-4 w-4 text-emerald-600" />
                <span>Farm & Land Specifications</span>
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Total Acreage" value={farm.acreage || contact.acreage || "—"} highlight />
                <Field label="Primary Crop Variety" value={farm.crop || contact.crop || "—"} highlight />
                <Field label="District & State" value={farm.district || contact.district || "—"} />
                <Field label="Irrigation Setup" value={farm.irrigation || "Drip & Micro-sprinkler"} />
                <Field label="Soil Profile" value={farm.soil || "Tested Fertile Loam"} />
                <Field label="Agronomy Track" value="Precision Protected Farming" />
              </div>
            </div>

            {/* Customer Message */}
            <div className="border-t border-stone-100 pt-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Customer Inquiry Notes
              </h2>
              <div className="mt-2 rounded-xl bg-stone-50/80 border border-stone-200/50 p-4 text-xs leading-relaxed text-stone-800 whitespace-pre-wrap">
                {contact.message || "No specific customer notes provided."}
              </div>
            </div>
          </div>

          {/* Attachments & Field Documents */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-stone-900 tracking-tight flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span>Attachments & Soil Test Reports</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">Topography surveys, soil diagnostic reports, and farm photos</p>
              </div>
            </div>

            {contact.attachment_url ? (
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900">Uploaded Document</p>
                    <p className="text-[11px] text-stone-500 font-mono truncate max-w-xs">{contact.attachment_url}</p>
                  </div>
                </div>
                <a
                  href={contact.attachment_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                >
                  <span>Open File</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-stone-200 p-6 text-center">
                <Upload className="mx-auto h-6 w-6 text-stone-400 mb-2" />
                <p className="text-xs font-semibold text-stone-700">Upload diagnostic reports or site photos</p>
                <p className="text-[11px] text-stone-400 mt-0.5">PDF, PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  id="attachment-input"
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
                      toast.success("Upload Successful", "Document attached to request.");
                    } else {
                      toast.error("Upload Failed", "Could not upload file.");
                    }
                  }}
                />
                <label
                  htmlFor="attachment-input"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
                >
                  <Upload className="h-3 w-3 text-stone-500" />
                  <span>{uploading ? "Uploading..." : "Select File"}</span>
                </label>
              </div>
            )}
          </div>

          {/* Internal Notes Feed */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs">
            <h2 className="text-sm font-semibold text-stone-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>Internal Agronomist Notes</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Private team collaboration and farmer follow-up logs</p>

            <form
              className="mt-4 flex gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!noteBody.trim()) return;
                const res = await addAdminNote({ data: { id: contact.id, body: noteBody } });
                if (res && typeof res === "object" && "ok" in res && res.ok === true) {
                  const payload = res as unknown as { notes: Note[]; activity: Activity[] };
                  setNotes(payload.notes);
                  setActivity(payload.activity);
                  setNoteBody("");
                  toast.success("Note Added", "Logged private agronomist note.");
                }
              }}
            >
              <input
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Log a private note, callback details, or advisory recommendation..."
                className="flex-1 rounded-xl border border-stone-200/90 bg-stone-50/60 px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 focus:bg-white"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post Note</span>
              </button>
            </form>

            <div className="mt-5 divide-y divide-stone-100">
              {notes.map((n) => (
                <div key={n.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-xs text-stone-800 leading-relaxed font-normal">{n.body}</p>
                  <p className="mt-1 text-[11px] text-stone-400 font-medium">
                    <span className="font-semibold text-stone-600">{n.author_name || "Staff"}</span> · {formatWhen(n.created_at)}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="py-4 text-center text-xs text-stone-400">No internal notes logged yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Sticky Workflow & Activity Timeline */}
        <div className="space-y-6">
          {/* Sticky Workflow Control Panel */}
          <div className="sticky top-20 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-stone-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Workflow & Assignment</span>
            </h2>

            {/* Status Selector */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                Status Stage
              </label>
              <select
                value={contact.status}
                disabled={saving}
                onChange={(e) => void patch({ id: contact.id, status: e.target.value as RequestStatus })}
                className="w-full rounded-xl border border-stone-200/90 bg-stone-50/70 px-3 py-2 text-xs font-semibold text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
              >
                {REQUEST_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                Priority Level
              </label>
              <select
                value={contact.priority}
                disabled={saving}
                onChange={(e) => void patch({ id: contact.id, priority: e.target.value as RequestPriority })}
                className="w-full rounded-xl border border-stone-200/90 bg-stone-50/70 px-3 py-2 text-xs font-semibold text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
              >
                {PRIORITIES.map((s) => (
                  <option key={s} value={s}>
                    {PRIORITY_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Agronomist Assignee */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                Assigned Specialist
              </label>
              <select
                value={contact.assigned_to ?? ""}
                disabled={saving}
                onChange={(e) =>
                  void patch({
                    id: contact.id,
                    assigned_to: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full rounded-xl border border-stone-200/90 bg-stone-50/70 px-3 py-2 text-xs font-semibold text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value="">Unassigned</option>
                {assignees.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Follow-up Date */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                Follow-up / Visit Date
              </label>
              <input
                type="date"
                disabled={saving}
                value={String(contact.follow_up_date || "").slice(0, 10)}
                onChange={(e) => void patch({ id: contact.id, follow_up_date: e.target.value || null })}
                className="w-full rounded-xl border border-stone-200/90 bg-stone-50/70 px-3 py-2 text-xs font-semibold text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Activity Timeline */}
            <div className="border-t border-stone-100 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                Audit Timeline
              </h3>
              <div className="space-y-3">
                {activity.map((a) => (
                  <div key={a.id} className="flex gap-2.5 text-xs">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                    <div>
                      <p className="font-medium text-stone-800 capitalize">
                        {a.action.replaceAll("_", " ")}
                        {a.actor_name ? ` · ${a.actor_name}` : ""}
                      </p>
                      <p className="text-[10px] text-stone-400">{formatWhen(a.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  copyable,
  highlight,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  highlight?: boolean;
}) {
  const toast = useToast();
  return (
    <div className="group">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">{label}</p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <p
          className={`text-xs font-semibold ${
            highlight ? "text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded" : "text-stone-800"
          }`}
        >
          {value}
        </p>
        {copyable && (
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(value);
              toast.success("Copied to Clipboard", value);
            }}
            className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-stone-700 transition-opacity"
            title="Copy"
          >
            <Copy className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
