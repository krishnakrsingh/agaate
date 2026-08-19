import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckSquare,
  Square,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  FileSpreadsheet,
} from "lucide-react";
import {
  bulkUpdateAdminContacts,
  exportAdminContacts,
  listAdminContacts,
} from "@/functions/admin-contacts";
import {
  PRIORITIES,
  PRIORITY_LABELS,
  REQUEST_STATUSES,
  STATUS_LABELS,
  type RequestStatus,
  type RequestPriority,
} from "@/lib/admin-constants";
import { downloadBlob, formatWhen, toCsv } from "@/lib/admin-format";
import { PriorityBadge, StatusBadge } from "@/components/admin/AdminBadges";
import { useToast } from "@/components/admin/AdminToast";

type Row = {
  id: number;
  ticket_id: string;
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  status: string;
  priority: string;
  assignee_name?: string | null;
  created_at: string | Date;
  follow_up_date?: string | Date | null;
  source_page?: string | null;
  crop?: string | null;
  district?: string | null;
};

type Filters = {
  q: string;
  status: string;
  priority: string;
  assignedTo: string;
  inquiryType: string;
  from: string;
  to: string;
  page: number;
  sort: string;
  dir: "asc" | "desc";
};

const COLUMNS = [
  { id: "ticket", label: "Ticket ID" },
  { id: "name", label: "Farmer / Lead" },
  { id: "phone", label: "Contact Phone" },
  { id: "topic", label: "Inquiry Program" },
  { id: "status", label: "Status" },
  { id: "priority", label: "Priority" },
  { id: "assignee", label: "Assigned Agronomist" },
  { id: "created", label: "Created Date" },
] as const;

export function AdminContactsTable({
  initial,
  assignees,
  categories,
  initialFilters,
}: {
  initial: { rows: Row[]; total: number; page: number; pageSize: number };
  assignees: Array<{ id: number; name: string }>;
  categories: Array<{ slug: string; label: string }>;
  initialFilters: Partial<Filters>;
}) {
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<"all" | "new" | "farm_visit" | "urgent" | "converted">("all");
  const [filters, setFilters] = useState<Filters>({
    q: "",
    status: "",
    priority: "",
    assignedTo: "",
    inquiryType: "",
    from: "",
    to: "",
    page: 1,
    sort: "created_at",
    dir: "desc",
    ...initialFilters,
  });

  const [data, setData] = useState(initial);
  const [selected, setSelected] = useState<number[]>([]);
  const [showColMenu, setShowColMenu] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>({
    ticket: true,
    name: true,
    phone: true,
    topic: true,
    status: true,
    priority: true,
    assignee: true,
    created: true,
  });

  const [pending, setPending] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<RequestStatus | "">("");
  const [bulkAssignee, setBulkAssignee] = useState("");

  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));

  async function reload(next: Filters) {
    setPending(true);
    const res = await listAdminContacts({ data: next });
    setPending(false);
    if (res && "ok" in res && res.ok) {
      setData({ rows: res.rows as Row[], total: res.total, page: res.page, pageSize: res.pageSize });
    }
  }

  function patch(partial: Partial<Filters>) {
    const next = { ...filters, ...partial, page: partial.page ?? 1 };
    setFilters(next);
    void reload(next);
  }

  function handleTabChange(tab: "all" | "new" | "farm_visit" | "urgent" | "converted") {
    setActiveTab(tab);
    if (tab === "all") patch({ status: "", priority: "" });
    else if (tab === "new") patch({ status: "new", priority: "" });
    else if (tab === "farm_visit") patch({ status: "farm_visit", priority: "" });
    else if (tab === "urgent") patch({ status: "", priority: "urgent" });
    else if (tab === "converted") patch({ status: "converted", priority: "" });
  }

  async function exportFile(kind: "csv" | "xls") {
    toast.info("Generating Export", "Preparing formatted spreadsheet...");
    const res = await exportAdminContacts({ data: { ...filters, export: true } });
    if (!res || !("ok" in res) || !res.ok) {
      toast.error("Export Failed", "Could not fetch contact records.");
      return;
    }
    const rows = (res.rows as Row[]).map((r) => ({
      ticket_id: r.ticket_id,
      name: r.name,
      phone: r.phone,
      email: r.email ?? "",
      topic: r.topic,
      status: r.status,
      priority: r.priority,
      assignee: r.assignee_name ?? "",
      created_at: formatWhen(r.created_at),
    }));
    const cols = ["ticket_id", "name", "phone", "email", "topic", "status", "priority", "assignee", "created_at"];
    if (kind === "csv") {
      downloadBlob(toCsv(rows, cols), "agaate-contacts.csv", "text/csv;charset=utf-8");
      toast.success("CSV Export Complete", "Downloaded agaate-contacts.csv");
      return;
    }
    const table = `<table><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr>${rows
      .map((r) => `<tr>${cols.map((c) => `<td>${String((r as Record<string, unknown>)[c] ?? "")}</td>`).join("")}</tr>`)
      .join("")}</table>`;
    downloadBlob(table, "agaate-contacts.xls", "application/vnd.ms-excel");
    toast.success("Excel Export Complete", "Downloaded agaate-contacts.xls");
  }

  const allSelected = useMemo(
    () => data.rows.length > 0 && data.rows.every((r) => selected.includes(r.id)),
    [data.rows, selected],
  );

  return (
    <div className="space-y-5">
      {/* Top Header & Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Contact Requests & Leads</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Managing <span className="font-semibold text-stone-800">{data.total} total inquiries</span> across all programs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void reload(filters)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200/80 bg-white text-stone-600 shadow-2xs hover:bg-stone-50 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin text-emerald-600" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => void exportFile("csv")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-all"
          >
            <Download className="h-3.5 w-3.5 text-stone-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => void exportFile("xls")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-all"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-stone-500" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Linear-style Quick Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200/80 overflow-x-auto pb-px">
        {[
          { id: "all", label: "All Requests" },
          { id: "new", label: "New (Unread)" },
          { id: "farm_visit", label: "Farm Visits" },
          { id: "urgent", label: "Urgent Priority" },
          { id: "converted", label: "Converted" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-emerald-700 text-emerald-900 font-bold"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Control Bar */}
      <div className="grid gap-2.5 rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-xs md:grid-cols-4 lg:grid-cols-6">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            placeholder="Search ticket, farmer name, crop, phone..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") patch({ q: filters.q });
            }}
            className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <select
          value={filters.status}
          onChange={(e) => patch({ status: e.target.value })}
          className="rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
        >
          <option value="">All Statuses</option>
          {REQUEST_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        {/* Priority Dropdown */}
        <select
          value={filters.priority}
          onChange={(e) => patch({ priority: e.target.value })}
          className="rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((s) => (
            <option key={s} value={s}>
              {PRIORITY_LABELS[s]}
            </option>
          ))}
        </select>

        {/* Assignee Dropdown */}
        <select
          value={filters.assignedTo}
          onChange={(e) => patch({ assignedTo: e.target.value })}
          className="rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
        >
          <option value="">All Agronomists</option>
          <option value="unassigned">Unassigned</option>
          {assignees.map((u) => (
            <option key={u.id} value={String(u.id)}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Categories Dropdown */}
        <select
          value={filters.inquiryType}
          onChange={(e) => patch({ inquiryType: e.target.value })}
          className="rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:bg-white"
        >
          <option value="">All Programs</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Column Visibility & Table Metadata */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColMenu(!showColMenu)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200/70 bg-white px-2.5 py-1 text-stone-600 hover:bg-stone-50 text-[11px] font-medium"
          >
            <SlidersHorizontal className="h-3 w-3 text-stone-400" />
            <span>Customize Columns</span>
          </button>

          {showColMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowColMenu(false)} />
              <div className="absolute left-0 mt-1.5 z-30 w-48 rounded-xl border border-stone-200 bg-white p-2 shadow-lg space-y-1">
                {COLUMNS.map((col) => (
                  <label
                    key={col.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-md text-xs hover:bg-stone-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleCols[col.id]}
                      onChange={(e) => setVisibleCols({ ...visibleCols, [col.id]: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span className="text-stone-700">{col.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <span>
          Showing <span className="font-semibold text-stone-800">{data.rows.length}</span> of {data.total} records
        </span>
      </div>

      {/* Main Data Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-stone-100 bg-stone-50/70 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              <tr>
                <th className="py-3 px-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => {
                      setSelected(e.target.checked ? data.rows.map((r) => r.id) : []);
                    }}
                    className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                {visibleCols.ticket && <Th label="Ticket" col="ticket_id" filters={filters} patch={patch} />}
                {visibleCols.name && <Th label="Farmer" col="name" filters={filters} patch={patch} />}
                {visibleCols.phone && <th className="py-3 px-3">Phone</th>}
                {visibleCols.topic && <Th label="Program" col="topic" filters={filters} patch={patch} />}
                {visibleCols.status && <Th label="Status" col="status" filters={filters} patch={patch} />}
                {visibleCols.priority && <Th label="Priority" col="priority" filters={filters} patch={patch} />}
                {visibleCols.assignee && <th className="py-3 px-3">Agronomist</th>}
                {visibleCols.created && <Th label="Created" col="created_at" filters={filters} patch={patch} />}
              </tr>
            </thead>
            <tbody className={`divide-y divide-stone-100 ${pending ? "opacity-60" : ""}`}>
              {data.rows.map((row) => {
                const isChecked = selected.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    onClick={() => navigate({ to: "/agaate-admin/contacts/$id", params: { id: String(row.id) } })}
                    className={`cursor-pointer transition-colors ${
                      isChecked ? "bg-emerald-50/60" : "hover:bg-emerald-50/30"
                    }`}
                  >
                    <td className="py-3 px-3.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setSelected(
                            e.target.checked ? [...selected, row.id] : selected.filter((id) => id !== row.id),
                          );
                        }}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    {visibleCols.ticket && (
                      <td className="py-3 px-3 font-mono text-[11px] font-semibold text-emerald-800">
                        {row.ticket_id}
                      </td>
                    )}
                    {visibleCols.name && (
                      <td className="py-3 px-3">
                        <p className="font-semibold text-stone-900">{row.name}</p>
                        {row.crop && <p className="text-[11px] text-stone-400">{row.crop}</p>}
                      </td>
                    )}
                    {visibleCols.phone && (
                      <td className="py-3 px-3 font-mono text-[11px] text-stone-600">{row.phone}</td>
                    )}
                    {visibleCols.topic && (
                      <td className="py-3 px-3 text-stone-700 font-medium">{row.topic}</td>
                    )}
                    {visibleCols.status && (
                      <td className="py-3 px-3">
                        <StatusBadge status={row.status} />
                      </td>
                    )}
                    {visibleCols.priority && (
                      <td className="py-3 px-3">
                        <PriorityBadge priority={row.priority} />
                      </td>
                    )}
                    {visibleCols.assignee && (
                      <td className="py-3 px-3 text-stone-700">
                        {row.assignee_name ? (
                          <span className="inline-flex items-center gap-1 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {row.assignee_name}
                          </span>
                        ) : (
                          <span className="text-stone-400">Unassigned</span>
                        )}
                      </td>
                    )}
                    {visibleCols.created && (
                      <td className="py-3 px-3 text-stone-400 font-mono text-[11px]">
                        {formatWhen(row.created_at)}
                      </td>
                    )}
                  </tr>
                );
              })}

              {data.rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-stone-400">
                    <p className="text-sm font-semibold text-stone-700">No matching contact requests</p>
                    <p className="text-xs text-stone-400 mt-1">Try resetting or broadening your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-4 py-3 text-xs text-stone-500">
          <span>
            Page <span className="font-semibold text-stone-800">{data.page}</span> of {pages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => patch({ page: data.page - 1 })}
              className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-2.5 py-1 font-medium text-stone-700 disabled:opacity-40 hover:bg-stone-50 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={data.page >= pages}
              onClick={() => patch({ page: data.page + 1 })}
              className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-2.5 py-1 font-medium text-stone-700 disabled:opacity-40 hover:bg-stone-50 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bulk Actions Dock */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200/90 bg-white/95 px-4 py-2.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-1 rounded-lg">
            {selected.length} Selected
          </span>

          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value as RequestStatus | "")}
            className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-800 outline-none"
          >
            <option value="">Set Status...</option>
            {REQUEST_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>

          <select
            value={bulkAssignee}
            onChange={(e) => setBulkAssignee(e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-800 outline-none"
          >
            <option value="">Assign Specialist...</option>
            {assignees.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={async () => {
              if (!bulkStatus && !bulkAssignee) return;
              toast.info("Updating Records", "Applying batch changes...");
              await bulkUpdateAdminContacts({
                data: {
                  ids: selected,
                  status: bulkStatus || undefined,
                  assigned_to: bulkAssignee ? Number(bulkAssignee) : undefined,
                },
              });
              setSelected([]);
              setBulkStatus("");
              setBulkAssignee("");
              toast.success("Batch Updated", `Updated ${selected.length} records successfully.`);
              void reload(filters);
            }}
            className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all"
          >
            Apply Changes
          </button>

          <button
            type="button"
            onClick={() => setSelected([])}
            className="rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-50"
          >
            Deselect
          </button>
        </div>
      )}
    </div>
  );
}

function Th({
  label,
  col,
  filters,
  patch,
}: {
  label: string;
  col: string;
  filters: Filters;
  patch: (p: Partial<Filters>) => void;
}) {
  const active = filters.sort === col;
  return (
    <th className="py-3 px-3">
      <button
        type="button"
        onClick={() =>
          patch({
            sort: col,
            dir: active && filters.dir === "desc" ? "asc" : "desc",
          })
        }
        className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-stone-700"
      >
        <span>{label}</span>
        {active ? (
          filters.dir === "asc" ? (
            <ArrowUp className="h-3 w-3 text-emerald-700" />
          ) : (
            <ArrowDown className="h-3 w-3 text-emerald-700" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 text-stone-300 opacity-60" />
        )}
      </button>
    </th>
  );
}
