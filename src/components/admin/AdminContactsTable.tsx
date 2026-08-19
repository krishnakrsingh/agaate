import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Download,
  FileSpreadsheet,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  X,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  pageSize: number;
  sort: string;
  dir: "asc" | "desc";
};

const COLUMNS = [
  { id: "ticket", label: "Ticket" },
  { id: "name", label: "Farmer / Lead" },
  { id: "phone", label: "Phone" },
  { id: "topic", label: "Program / Inquiry" },
  { id: "status", label: "Status" },
  { id: "priority", label: "Priority" },
  { id: "assignee", label: "Agronomist" },
  { id: "created", label: "Created" },
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

  const [filters, setFilters] = useState<Filters>({
    q: "",
    status: "",
    priority: "",
    assignedTo: "",
    inquiryType: "",
    from: "",
    to: "",
    page: 1,
    pageSize: 20,
    sort: "created_at",
    dir: "desc",
    ...initialFilters,
  });

  const [data, setData] = useState(initial);
  const [selected, setSelected] = useState<number[]>([]);
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
  const [createOpen, setCreateOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "Bio-Boosted Nursery Pre-Orders",
    crop: "",
    acreage: "",
    district: "",
    message: "",
  });

  const pages = Math.max(1, Math.ceil(data.total / (filters.pageSize || data.pageSize || 20)));

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

  const isFiltered = Boolean(
    filters.q || filters.status || filters.priority || filters.assignedTo || filters.inquiryType
  );

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
    [data.rows, selected]
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
          <p className="text-xs text-muted-foreground">
            Manage, triage, and assign farmer inquiries across all agricultural programs.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={() => setCreateOpen(true)}
            className="h-8"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Lead</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void reload(filters)}
            className="h-8.5 rounded-lg px-3 text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void exportFile("csv")}
            className="h-8.5 rounded-lg px-3 text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            <span>CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void exportFile("xls")}
            className="h-8.5 rounded-lg px-3 text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      {/* Official Data Table Toolbar (Rounded-Square Style) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            placeholder="Filter inquiries..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") patch({ q: filters.q });
            }}
            className="h-8.5 rounded-lg px-3 w-[160px] lg:w-[260px] text-xs bg-card border-border shadow-xs"
          />

          {/* Status Faceted Dropdown */}
          <select
            value={filters.status}
            onChange={(e) => patch({ status: e.target.value })}
            className="h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
          >
            <option value="">Status: All</option>
            {REQUEST_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>

          {/* Priority Faceted Dropdown */}
          <select
            value={filters.priority}
            onChange={(e) => patch({ priority: e.target.value })}
            className="h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
          >
            <option value="">Priority: All</option>
            {PRIORITIES.map((s) => (
              <option key={s} value={s}>
                {PRIORITY_LABELS[s]}
              </option>
            ))}
          </select>

          {/* Agronomist Faceted Dropdown */}
          <select
            value={filters.assignedTo}
            onChange={(e) => patch({ assignedTo: e.target.value })}
            className="h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
          >
            <option value="">Agronomist: All</option>
            <option value="unassigned">Unassigned</option>
            {assignees.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Program Category Dropdown */}
          <select
            value={filters.inquiryType}
            onChange={(e) => patch({ inquiryType: e.target.value })}
            className="h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
          >
            <option value="">Program: All</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                patch({ q: "", status: "", priority: "", assignedTo: "", inquiryType: "" })
              }
              className="h-8.5 rounded-lg px-2.5 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Reset
              <X className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* View Columns Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto hidden h-8.5 rounded-lg px-3 lg:flex text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px] rounded-xl">
            <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {COLUMNS.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize text-xs rounded-md"
                checked={visibleCols[col.id]}
                onCheckedChange={(val) =>
                  setVisibleCols({ ...visibleCols, [col.id]: Boolean(val) })
                }
              >
                {col.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Official Data Table (Rounded-xl Container) */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => {
                    setSelected(checked ? data.rows.map((r) => r.id) : []);
                  }}
                  aria-label="Select all rows"
                />
              </TableHead>
              {visibleCols.ticket && <Th label="Ticket" col="ticket_id" filters={filters} patch={patch} />}
              {visibleCols.name && <Th label="Farmer" col="name" filters={filters} patch={patch} />}
              {visibleCols.phone && <TableHead>Phone</TableHead>}
              {visibleCols.topic && <Th label="Program" col="topic" filters={filters} patch={patch} />}
              {visibleCols.status && <Th label="Status" col="status" filters={filters} patch={patch} />}
              {visibleCols.priority && <Th label="Priority" col="priority" filters={filters} patch={patch} />}
              {visibleCols.assignee && <TableHead>Agronomist</TableHead>}
              {visibleCols.created && <Th label="Created" col="created_at" filters={filters} patch={patch} />}
              <TableHead className="w-12 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={pending ? "opacity-60" : ""}>
            {data.rows.map((row) => {
              const isChecked = selected.includes(row.id);
              return (
                <TableRow
                  key={row.id}
                  data-state={isChecked ? "selected" : undefined}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({ to: "/agaate-admin/contacts/$id", params: { id: String(row.id) } })
                  }
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        setSelected(
                          checked
                            ? [...selected, row.id]
                            : selected.filter((id) => id !== row.id)
                        );
                      }}
                      aria-label={`Select row ${row.ticket_id}`}
                    />
                  </TableCell>
                  {visibleCols.ticket && (
                    <TableCell className="font-mono text-xs font-semibold">
                      {row.ticket_id}
                    </TableCell>
                  )}
                  {visibleCols.name && (
                    <TableCell>
                      <span className="font-medium text-xs text-foreground">{row.name}</span>
                      {row.crop && (
                        <p className="text-[11px] text-muted-foreground">{row.crop}</p>
                      )}
                    </TableCell>
                  )}
                  {visibleCols.phone && (
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {row.phone}
                    </TableCell>
                  )}
                  {visibleCols.topic && (
                    <TableCell className="text-xs text-foreground">{row.topic}</TableCell>
                  )}
                  {visibleCols.status && (
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                  )}
                  {visibleCols.priority && (
                    <TableCell>
                      <PriorityBadge priority={row.priority} />
                    </TableCell>
                  )}
                  {visibleCols.assignee && (
                    <TableCell className="text-xs text-muted-foreground">
                      {row.assignee_name ? (
                        <span className="font-medium text-foreground">{row.assignee_name}</span>
                      ) : (
                        <span>Unassigned</span>
                      )}
                    </TableCell>
                  )}
                  {visibleCols.created && (
                    <TableCell className="text-muted-foreground font-mono text-[11px]">
                      {formatWhen(row.created_at)}
                    </TableCell>
                  )}
                  <TableCell onClick={(e) => e.stopPropagation()} className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs" className="h-7 w-7 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            void navigator.clipboard.writeText(row.ticket_id);
                            toast.success("Copied Ticket ID", row.ticket_id);
                          }}
                          className="text-xs"
                        >
                          Copy ticket ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            navigate({
                              to: "/agaate-admin/contacts/$id",
                              params: { id: String(row.id) },
                            })
                          }
                          className="text-xs"
                        >
                          View lead details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}

            {data.rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center text-xs text-muted-foreground">
                  No matching inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Official Data Table Pagination (shadcn style) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>
            {selected.length} of {data.total} row(s) selected.
          </span>
          <div className="flex items-center gap-1.5">
            <span>Rows per page</span>
            <select
              value={filters.pageSize}
              onChange={(e) => patch({ pageSize: Number(e.target.value), page: 1 })}
              className="h-7 rounded border border-input bg-transparent px-1.5 text-xs text-foreground outline-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center font-medium">
            Page {data.page} of {pages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={data.page <= 1}
              onClick={() => patch({ page: 1 })}
              title="First page"
            >
              <span className="sr-only">Go to first page</span>
              «
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={data.page <= 1}
              onClick={() => patch({ page: data.page - 1 })}
              title="Previous page"
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={data.page >= pages}
              onClick={() => patch({ page: data.page + 1 })}
              title="Next page"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={data.page >= pages}
              onClick={() => patch({ page: pages })}
              title="Last page"
            >
              <span className="sr-only">Go to last page</span>
              »
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Multi-Select Bulk Actions Dock */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-lg border bg-background p-2 shadow-lg animate-in fade-in duration-150">
          <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md text-foreground">
            {selected.length} selected
          </span>

          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value as RequestStatus | "")}
            className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs text-foreground outline-none"
          >
            <option value="">Update status...</option>
            {REQUEST_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>

          <select
            value={bulkAssignee}
            onChange={(e) => setBulkAssignee(e.target.value)}
            className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs text-foreground outline-none"
          >
            <option value="">Assign agronomist...</option>
            {assignees.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.name}
              </option>
            ))}
          </select>

          <Button
            size="sm"
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
            className="h-8 text-xs font-medium"
          >
            Apply
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected([])}
            className="h-8 text-xs"
          >
            Deselect
          </Button>
        </div>
      )}

      {/* Manual Lead Intake Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">New Contact Inquiry</DialogTitle>
            <DialogDescription className="text-xs">
              Log an incoming farmer lead from direct phone call or walk-in consultation.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newLead.name || !newLead.phone) return;
              toast.success("Inquiry Logged", `Created ticket for ${newLead.name}`);
              setCreateOpen(false);
              setNewLead({
                name: "",
                phone: "",
                email: "",
                topic: "Bio-Boosted Nursery Pre-Orders",
                crop: "",
                acreage: "",
                district: "",
                message: "",
              });
              void reload(filters);
            }}
            className="space-y-3 pt-2"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name" className="text-xs font-medium">Farmer Name *</Label>
                <Input
                  id="lead-name"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-phone" className="text-xs font-medium">Phone Number *</Label>
                <Input
                  id="lead-phone"
                  required
                  placeholder="+91 98765 00000"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="lead-crop" className="text-xs font-medium">Crop Variety</Label>
                <Input
                  id="lead-crop"
                  placeholder="e.g. Chilli G4, Polyhouse"
                  value={newLead.crop}
                  onChange={(e) => setNewLead({ ...newLead, crop: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-acreage" className="text-xs font-medium">Land Acreage</Label>
                <Input
                  id="lead-acreage"
                  placeholder="e.g. 20 Acres"
                  value={newLead.acreage}
                  onChange={(e) => setNewLead({ ...newLead, acreage: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="lead-district" className="text-xs font-medium">District / Location</Label>
                <Input
                  id="lead-district"
                  placeholder="e.g. Varanasi, UP"
                  value={newLead.district}
                  onChange={(e) => setNewLead({ ...newLead, district: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-program" className="text-xs font-medium">Program Category</Label>
                <select
                  id="lead-program"
                  value={newLead.topic}
                  onChange={(e) => setNewLead({ ...newLead, topic: e.target.value })}
                  className="w-full h-8 rounded-md border border-input bg-transparent px-2.5 py-1 text-xs text-foreground outline-none"
                >
                  <option value="Bio-Boosted Nursery Pre-Orders">Bio-Boosted Nursery Pre-Orders</option>
                  <option value="Big Farm Setup (Turnkey)">Big Farm Setup (Turnkey)</option>
                  <option value="Carbon Credit Program">Carbon Credit Program</option>
                  <option value="Kisan Mall Wholesale">Kisan Mall Wholesale</option>
                  <option value="General Agronomy Inquiry">General Agronomy Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lead-msg" className="text-xs font-medium">Inquiry Notes / Request</Label>
              <Textarea
                id="lead-msg"
                rows={2}
                placeholder="Farmer requirements or questions..."
                value={newLead.message}
                onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCreateOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Create Inquiry Ticket
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
    <TableHead>
      <button
        type="button"
        onClick={() =>
          patch({
            sort: col,
            dir: active && filters.dir === "desc" ? "asc" : "desc",
          })
        }
        className="inline-flex items-center gap-1 text-xs font-medium hover:text-foreground"
      >
        <span>{label}</span>
        {active ? (
          filters.dir === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </button>
    </TableHead>
  );
}
