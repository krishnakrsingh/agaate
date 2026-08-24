import { useCallback, useEffect, useState } from "react";
import { Calendar, MapPin, RefreshCw, Search } from "lucide-react";
import { listAdminFarmVisits, updateAdminFarmVisit } from "@/functions/admin-contacts";
import { STATUS_LABELS, type RequestStatus } from "@/lib/admin-constants";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsTableEmptyRow, CmsTableLoadingRow } from "@/components/admin/cms/CmsTableState";
import { useCmsListConfirm } from "@/components/admin/cms/useCmsListConfirm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FarmDetails = {
  visitDate?: string | null;
  visitorType?: string | null;
  groupCount?: string | null;
  crop?: string | null;
  district?: string | null;
};

type FarmVisitRow = {
  id: number;
  ticket_id: string;
  name: string;
  phone: string;
  status: RequestStatus;
  follow_up_date: string | null;
  created_at: string;
  farm_details: FarmDetails;
  crop: string | null;
  district: string | null;
};

const FARM_VISIT_STATUSES: RequestStatus[] = ["new", "contacted", "farm_visit", "closed"];

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function parseFarmDetails(row: FarmVisitRow): FarmDetails {
  const details = row.farm_details;
  if (details && typeof details === "object") return details as FarmDetails;
  return {
    crop: row.crop,
    district: row.district,
  };
}

export function AdminFarmVisits() {
  const toast = useToast();
  const { requestConfirm, confirmDialog } = useCmsListConfirm();
  const [rows, setRows] = useState<FarmVisitRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    const res = await listAdminFarmVisits({
      data: {
        q: q.trim() || undefined,
        status: status === "all" ? undefined : status,
        from: from || undefined,
        to: to || undefined,
        page,
        pageSize,
      },
    });
    setLoading(false);
    if (res && "ok" in res && res.ok) {
      setRows((res.rows ?? []) as FarmVisitRow[]);
      setTotal(res.total ?? 0);
      setPending(res.pending ?? 0);
    } else {
      toast.error("Load failed", res && "error" in res ? res.error : "Could not load farm visits.");
    }
  }, [q, status, from, to, page]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleStatusChange(
    id: number,
    nextStatus: RequestStatus,
    currentStatus: RequestStatus,
  ) {
    const apply = async () => {
      setUpdatingId(id);
      const res = await updateAdminFarmVisit({ data: { id, status: nextStatus } });
      setUpdatingId(null);
      if (res && "ok" in res && res.ok) {
        toast.success("Updated", `Status set to ${STATUS_LABELS[nextStatus]}.`);
        void load();
      } else {
        toast.error(
          "Update failed",
          res && "error" in res ? res.error : "Could not update booking.",
        );
      }
    };

    if (nextStatus === "closed" && currentStatus !== "closed") {
      requestConfirm({
        title: "Close this booking?",
        description:
          "The visit will be marked closed. You can still change status later if needed.",
        confirmLabel: "Mark closed",
        destructive: true,
        action: apply,
      });
      return;
    }

    await apply();
  }

  async function handleFollowUpChange(id: number, followUpDate: string) {
    setUpdatingId(id);
    const res = await updateAdminFarmVisit({
      data: { id, follow_up_date: followUpDate || null },
    });
    setUpdatingId(null);
    if (res && "ok" in res && res.ok) {
      toast.success("Updated", "Follow-up date saved.");
      void load();
    } else {
      toast.error(
        "Update failed",
        res && "error" in res ? res.error : "Could not update follow-up date.",
      );
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Farm visits"
        description={
          pending > 0
            ? `${pending} booking${pending === 1 ? "" : "s"} awaiting confirmation. Agri Park field visit bookings from the website.`
            : "Agri Park field visit bookings from the website. All caught up."
        }
        workflow="live"
        actions={
          <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        }
      />

      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Label htmlFor="farm-visit-search" className="text-xs text-muted-foreground">
              Search
            </Label>
            <div className="relative mt-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="farm-visit-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage(1);
                    void load();
                  }
                }}
                placeholder="Name, phone, or ticket ID"
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {FARM_VISIT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="from-date" className="text-xs text-muted-foreground">
              From
            </Label>
            <Input
              id="from-date"
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="to-date" className="text-xs text-muted-foreground">
              To
            </Label>
            <Input
              id="to-date"
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Visitor</TableHead>
              <TableHead>Visit date</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && rows.length === 0 ? <CmsTableLoadingRow colSpan={7} /> : null}
            {!loading && rows.length === 0 ? (
              <CmsTableEmptyRow
                colSpan={7}
                title="No farm visit bookings yet"
                description="Bookings from the Agri Park visit form will appear here."
              />
            ) : null}
            {rows.map((row) => {
              const details = parseFarmDetails(row);
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.ticket_id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-xs text-muted-foreground">+91 {row.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatDate(details.visitDate)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[220px]">
                    <div className="text-xs space-y-0.5">
                      <div>{details.visitorType || "—"}</div>
                      <div className="text-muted-foreground">{details.groupCount || "—"}</div>
                      <div className="text-muted-foreground">{details.crop || row.crop || "—"}</div>
                      {(details.district || row.district) && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {details.district || row.district}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      disabled={updatingId === row.id}
                      onValueChange={(v) =>
                        void handleStatusChange(row.id, v as RequestStatus, row.status)
                      }
                    >
                      <SelectTrigger className="h-8 w-[150px] text-xs">
                        <SelectValue>{STATUS_LABELS[row.status]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {FARM_VISIT_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      className="h-8 w-[140px] text-xs"
                      value={row.follow_up_date ? String(row.follow_up_date).slice(0, 10) : ""}
                      disabled={updatingId === row.id}
                      onChange={(e) => void handleFollowUpChange(row.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(row.created_at)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {total} booking{total === 1 ? "" : "s"} · page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {confirmDialog}
    </div>
  );
}
