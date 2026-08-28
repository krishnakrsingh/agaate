import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  ExternalLink,
  FileText,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import {
  archiveCmsItemAdmin,
  getCmsCareersAdmin,
  publishCmsItemAdmin,
  saveCmsCareerJobAdmin,
  saveCmsCareersPageAdmin,
  unpublishCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { useCmsListConfirm } from "@/components/admin/cms/useCmsListConfirm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canEditCms } from "@/lib/admin-constants";
import { CAREERS_PAGE_FALLBACK } from "@/data/careers-fallback";
import type { CareersPageContent, CmsCareerJobRow } from "@/lib/cms-types";
import type { CareerApplicationRow } from "@/server/admin-queries";
import { cn } from "@/lib/utils";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[]): string {
  return items.join("\n");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatAppliedAt(value: string) {
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

const CATEGORY_STYLES: Record<CmsCareerJobRow["departmentCategory"], string> = {
  Agronomy: "bg-emerald-500/10 text-emerald-800 border-emerald-500/20",
  Corporate: "bg-sky-500/10 text-sky-800 border-sky-500/20",
  Retail: "bg-amber-500/10 text-amber-800 border-amber-500/20",
};

function StatCard({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {hint ? <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function AdminCareers({ permissions }: { permissions: string[] }) {
  const toast = useToast();
  const { requestConfirm, confirmDialog } = useCmsListConfirm();
  const canEdit = canEditCms({ permissions });

  const [content, setContent] = useState<CareersPageContent>(CAREERS_PAGE_FALLBACK);
  const [jobs, setJobs] = useState<CmsCareerJobRow[]>([]);
  const [applications, setApplications] = useState<CareerApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<CmsCareerJobRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [pageDirty, setPageDirty] = useState(false);
  const [jobDirty, setJobDirty] = useState(false);
  const [roleQuery, setRoleQuery] = useState("");
  const [roleCategory, setRoleCategory] = useState<string>("all");
  const [roleStatus, setRoleStatus] = useState<string>("all");
  const [appQuery, setAppQuery] = useState("");

  const { confirmDiscard: confirmJobDiscard } = useCmsDirtyGuard(jobDirty);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await getCmsCareersAdmin();
    if (
      isAdminOk<{
        content: CareersPageContent;
        jobs: CmsCareerJobRow[];
        applications: CareerApplicationRow[];
        dbConfigured: boolean;
      }>(res)
    ) {
      setContent(res.content);
      setJobs(res.jobs);
      setApplications(res.applications);
      setDbConfigured(res.dbConfigured);
      setPageDirty(false);
      setJobDirty(false);
    } else {
      toast.error("Load failed", adminError(res, "Could not load careers."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const publishedCount = jobs.filter((j) => j.status === "published").length;
  const draftCount = jobs.filter((j) => j.status === "draft").length;

  const filteredJobs = useMemo(() => {
    const q = roleQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      if (roleCategory !== "all" && job.departmentCategory !== roleCategory) return false;
      if (roleStatus !== "all" && job.status !== roleStatus) return false;
      if (!q) return true;
      return (
        job.titleEn.toLowerCase().includes(q) ||
        job.deptEn.toLowerCase().includes(q) ||
        job.locEn.toLowerCase().includes(q)
      );
    });
  }, [jobs, roleCategory, roleQuery, roleStatus]);

  const filteredApplications = useMemo(() => {
    const q = appQuery.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.job_title.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.includes(q),
    );
  }, [applications, appQuery]);

  async function handleSavePage(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSavingPage(true);
    const res = await saveCmsCareersPageAdmin({ data: content });
    setSavingPage(false);
    if (isAdminOk<{ content: CareersPageContent }>(res)) {
      setContent(res.content);
      setPageDirty(false);
      toast.success("Page saved", "Careers page copy is updated.");
    } else {
      toast.error("Save failed", adminError(res, "Could not save page copy."));
    }
  }

  function openNewJob() {
    setEditingJob({
      id: 0,
      slug: "",
      titleEn: "",
      titleHi: "",
      deptEn: "",
      deptHi: "",
      departmentCategory: "Corporate",
      locEn: "",
      locHi: "",
      typeEn: "Full-Time",
      typeHi: "Full-Time",
      descEn: "",
      descHi: "",
      experienceLevelEn: "",
      experienceLevelHi: "",
      highlightsEn: [],
      highlightsHi: [],
      reqsEn: [],
      reqsHi: [],
      responsibilitiesEn: [],
      responsibilitiesHi: [],
      sortOrder: jobs.length,
      status: "draft",
      livePayload: null,
      publishedAt: null,
      updatedAt: new Date().toISOString(),
      hasUnpublishedChanges: true,
    });
    setJobDirty(false);
    setSheetOpen(true);
  }

  function openEditJob(job: CmsCareerJobRow) {
    if (jobDirty && !confirmJobDiscard()) return;
    setEditingJob(job);
    setJobDirty(false);
    setSheetOpen(true);
  }

  function closeJobSheet() {
    if (jobDirty && !confirmJobDiscard()) return;
    setSheetOpen(false);
    setEditingJob(null);
    setJobDirty(false);
  }

  async function handleSaveJob(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit || !editingJob) return;
    setSavingJob(true);
    const payload = {
      id: editingJob.id > 0 ? editingJob.id : undefined,
      slug: editingJob.slug,
      titleEn: editingJob.titleEn,
      titleHi: editingJob.titleHi,
      deptEn: editingJob.deptEn,
      deptHi: editingJob.deptHi,
      departmentCategory: editingJob.departmentCategory,
      locEn: editingJob.locEn,
      locHi: editingJob.locHi,
      typeEn: editingJob.typeEn,
      typeHi: editingJob.typeHi,
      descEn: editingJob.descEn,
      descHi: editingJob.descHi,
      experienceLevelEn: editingJob.experienceLevelEn,
      experienceLevelHi: editingJob.experienceLevelHi,
      highlightsEn: editingJob.highlightsEn,
      highlightsHi: editingJob.highlightsHi,
      reqsEn: editingJob.reqsEn,
      reqsHi: editingJob.reqsHi,
      responsibilitiesEn: editingJob.responsibilitiesEn,
      responsibilitiesHi: editingJob.responsibilitiesHi,
      sortOrder: editingJob.sortOrder,
    };
    const res = await saveCmsCareerJobAdmin({ data: payload });
    setSavingJob(false);
    if (isAdminOk<{ item: CmsCareerJobRow }>(res)) {
      toast.success("Job saved", "Open role saved as draft.");
      setSheetOpen(false);
      setEditingJob(null);
      setJobDirty(false);
      await load();
    } else {
      toast.error("Save failed", adminError(res, "Could not save job."));
    }
  }

  async function handlePublishJob(id: number) {
    const res = await publishCmsItemAdmin({ data: { type: "careerJobs", id } });
    if (isAdminOk(res)) {
      toast.success("Published", "Role is live on the careers page.");
      await load();
    } else toast.error(adminError(res));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Careers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage open roles, review applications, and edit the public careers page.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
            <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button asChild size="sm" className="shadow-sm">
            <a href="/careers" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              View careers page
            </a>
          </Button>
          {canEdit && (
            <Button size="sm" className="shadow-sm" onClick={openNewJob}>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add role
            </Button>
          )}
        </div>
      </div>

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Jobs and applications are stored in memory only.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Published roles" value={publishedCount} hint="Live on /careers" />
        <StatCard label="Draft roles" value={draftCount} hint="Not yet published" />
        <StatCard label="Applications" value={applications.length} hint="All submissions" />
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="h-10">
          <TabsTrigger value="roles" className="gap-1.5 px-4">
            <Briefcase className="h-3.5 w-3.5" />
            Open roles
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-1.5 px-4">
            <Users className="h-3.5 w-3.5" />
            Applications
            {applications.length > 0 ? (
              <span className="ml-1 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                {applications.length}
              </span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="page" className="gap-1.5 px-4">
            <FileText className="h-3.5 w-3.5" />
            Page copy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={roleQuery}
                onChange={(e) => setRoleQuery(e.target.value)}
                placeholder="Search roles…"
                className="pl-9"
              />
            </div>
            <Select value={roleCategory} onValueChange={setRoleCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="Agronomy">Agronomy</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleStatus} onValueChange={setRoleStatus}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-xl border bg-muted/40" />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-card px-6 py-14 text-center shadow-sm">
              <Briefcase className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm font-medium">No roles found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {jobs.length === 0
                  ? "Add your first open position to start hiring."
                  : "Try adjusting your search or filters."}
              </p>
              {canEdit && jobs.length === 0 ? (
                <Button className="mt-4" size="sm" onClick={openNewJob}>
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add role
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          CATEGORY_STYLES[job.departmentCategory],
                        )}
                      >
                        {job.departmentCategory}
                      </span>
                      <h3 className="mt-2 truncate text-sm font-semibold">{job.titleEn}</h3>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{job.deptEn}</p>
                    </div>
                    {canEdit && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="shrink-0 opacity-60 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditJob(job)}>Edit role</DropdownMenuItem>
                          {job.status !== "published" && (
                            <DropdownMenuItem onClick={() => void handlePublishJob(job.id)}>
                              Publish
                            </DropdownMenuItem>
                          )}
                          {job.status === "published" && (
                            <DropdownMenuItem
                              onClick={() =>
                                requestConfirm({
                                  title: "Unpublish role?",
                                  description: `"${job.titleEn}" will be removed from public listings.`,
                                  confirmLabel: "Unpublish",
                                  action: async () => {
                                    const res = await unpublishCmsItemAdmin({
                                      data: { type: "careerJobs", id: job.id },
                                    });
                                    if (isAdminOk(res)) {
                                      toast.success("Unpublished", "Role removed from public listings.");
                                      await load();
                                    } else toast.error(adminError(res));
                                  },
                                })
                              }
                            >
                              Unpublish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() =>
                              requestConfirm({
                                title: "Archive role?",
                                description: `"${job.titleEn}" will be archived and hidden from this list.`,
                                confirmLabel: "Archive",
                                destructive: true,
                                action: async () => {
                                  const res = await archiveCmsItemAdmin({
                                    data: { type: "careerJobs", id: job.id },
                                  });
                                  if (isAdminOk(res)) {
                                    toast.success("Archived", "Role archived.");
                                    await load();
                                  } else toast.error(adminError(res));
                                },
                              })
                            }
                          >
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{job.locEn || "Location TBD"}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
                    <CmsStatusBadge status={job.status} pending={job.hasUnpublishedChanges} />
                    {canEdit && (
                      <Button variant="ghost" size="xs" onClick={() => openEditJob(job)}>
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={appQuery}
              onChange={(e) => setAppQuery(e.target.value)}
              placeholder="Search applicants…"
              className="pl-9"
            />
          </div>

          {filteredApplications.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-card px-6 py-14 text-center shadow-sm">
              <Users className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm font-medium">No applications yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Candidate submissions from the careers page will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y rounded-xl border bg-card shadow-sm">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {initials(app.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{app.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{app.job_title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {app.phone} · {app.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                    <p className="text-[11px] text-muted-foreground">{formatAppliedAt(app.created_at)}</p>
                    <Button asChild variant="outline" size="xs">
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                        View resume
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="page">
          <form
            onSubmit={handleSavePage}
            className="rounded-xl border bg-card p-6 shadow-sm space-y-4"
          >
            <div>
              <h2 className="text-base font-semibold">Public page copy</h2>
              <p className="text-xs text-muted-foreground">
                Hero, stats, culture, campus, and open roles section headers on /careers.
              </p>
            </div>
            <CmsTranslateToHindiButton
              variant="inline"
              disabled={!canEdit || loading}
              enTexts={[
                content.heroBadgeEn,
                content.heroTitleEn,
                content.heroDescriptionEn,
                content.openRolesTitleEn,
                content.campusTitleEn,
              ]}
              onTranslated={([
                heroBadgeHi,
                heroTitleHi,
                heroDescriptionHi,
                openRolesTitleHi,
                campusTitleHi,
              ]) => {
                setContent({
                  ...content,
                  heroBadgeHi: heroBadgeHi ?? content.heroBadgeHi,
                  heroTitleHi: heroTitleHi ?? content.heroTitleHi,
                  heroDescriptionHi: heroDescriptionHi ?? content.heroDescriptionHi,
                  openRolesTitleHi: openRolesTitleHi ?? content.openRolesTitleHi,
                  campusTitleHi: campusTitleHi ?? content.campusTitleHi,
                });
                setPageDirty(true);
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["Hero badge (EN)", "heroBadgeEn"],
                  ["Hero badge (HI)", "heroBadgeHi"],
                  ["Hero title (EN)", "heroTitleEn"],
                  ["Hero title (HI)", "heroTitleHi"],
                  ["Open roles title (EN)", "openRolesTitleEn"],
                  ["Open roles title (HI)", "openRolesTitleHi"],
                  ["Campus title (EN)", "campusTitleEn"],
                  ["Campus title (HI)", "campusTitleHi"],
                ] as const
              ).map(([label, key]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    value={content[key]}
                    onChange={(e) => {
                      setContent({ ...content, [key]: e.target.value });
                      setPageDirty(true);
                    }}
                    disabled={!canEdit || loading}
                  />
                </div>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs">Hero description (EN)</Label>
                <Textarea
                  value={content.heroDescriptionEn}
                  onChange={(e) => {
                    setContent({ ...content, heroDescriptionEn: e.target.value });
                    setPageDirty(true);
                  }}
                  disabled={!canEdit || loading}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Hero description (HI)</Label>
                <Textarea
                  value={content.heroDescriptionHi}
                  onChange={(e) => {
                    setContent({ ...content, heroDescriptionHi: e.target.value });
                    setPageDirty(true);
                  }}
                  disabled={!canEdit || loading}
                  rows={3}
                />
              </div>
            </div>
            <CmsStickySaveBar saving={savingPage} disabled={!canEdit} label="Save page copy" />
          </form>
        </TabsContent>
      </Tabs>

      <Sheet open={sheetOpen} onOpenChange={(open) => (open ? setSheetOpen(true) : closeJobSheet())}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {editingJob ? (
            <form onSubmit={handleSaveJob} className="flex h-full flex-col">
              <SheetHeader>
                <SheetTitle>{editingJob.id ? "Edit role" : "New role"}</SheetTitle>
                <SheetDescription>
                  Save as draft, then publish when ready to show on the careers page.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
                <CmsTranslateToHindiButton
                  variant="inline"
                  disabled={!canEdit || loading}
                  enTexts={[
                    editingJob.titleEn,
                    editingJob.deptEn,
                    editingJob.locEn,
                    editingJob.descEn,
                    ...editingJob.reqsEn,
                    ...editingJob.responsibilitiesEn,
                  ]}
                  onTranslated={(t) => {
                    let i = 0;
                    const take = () => t[i++] ?? "";
                    setEditingJob({
                      ...editingJob,
                      titleHi: take() || editingJob.titleHi,
                      deptHi: take() || editingJob.deptHi,
                      locHi: take() || editingJob.locHi,
                      descHi: take() || editingJob.descHi,
                      reqsHi: editingJob.reqsEn.map(
                        (_, idx) => (take() || editingJob.reqsHi[idx]) ?? "",
                      ),
                      responsibilitiesHi: editingJob.responsibilitiesEn.map(
                        (_, idx) => (take() || editingJob.responsibilitiesHi[idx]) ?? "",
                      ),
                    });
                    setJobDirty(true);
                  }}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs">Slug</Label>
                    <Input
                      value={editingJob.slug}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, slug: e.target.value });
                        setJobDirty(true);
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Category</Label>
                    <Select
                      value={editingJob.departmentCategory}
                      onValueChange={(v) => {
                        setEditingJob({
                          ...editingJob,
                          departmentCategory: v as CmsCareerJobRow["departmentCategory"],
                        });
                        setJobDirty(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agronomy">Agronomy</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Employment type</Label>
                    <Input
                      value={editingJob.typeEn}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, typeEn: e.target.value });
                        setJobDirty(true);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Title (EN)</Label>
                    <Input
                      value={editingJob.titleEn}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, titleEn: e.target.value });
                        setJobDirty(true);
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Title (HI)</Label>
                    <Input
                      value={editingJob.titleHi}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, titleHi: e.target.value });
                        setJobDirty(true);
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Department (EN)</Label>
                    <Input
                      value={editingJob.deptEn}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, deptEn: e.target.value });
                        setJobDirty(true);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Location (EN)</Label>
                    <Input
                      value={editingJob.locEn}
                      onChange={(e) => {
                        setEditingJob({ ...editingJob, locEn: e.target.value });
                        setJobDirty(true);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Description (EN)</Label>
                  <Textarea
                    value={editingJob.descEn}
                    onChange={(e) => {
                      setEditingJob({ ...editingJob, descEn: e.target.value });
                      setJobDirty(true);
                    }}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Requirements (EN, one per line)</Label>
                  <Textarea
                    value={listToLines(editingJob.reqsEn)}
                    onChange={(e) => {
                      setEditingJob({ ...editingJob, reqsEn: linesToList(e.target.value) });
                      setJobDirty(true);
                    }}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Responsibilities (EN, one per line)</Label>
                  <Textarea
                    value={listToLines(editingJob.responsibilitiesEn)}
                    onChange={(e) => {
                      setEditingJob({
                        ...editingJob,
                        responsibilitiesEn: linesToList(e.target.value),
                      });
                      setJobDirty(true);
                    }}
                    rows={4}
                  />
                </div>
              </div>
              <SheetFooter className="mt-6 gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={closeJobSheet}>
                  Cancel
                </Button>
                <Button type="submit" disabled={savingJob}>
                  {savingJob ? "Saving…" : "Save draft"}
                </Button>
              </SheetFooter>
            </form>
          ) : null}
        </SheetContent>
      </Sheet>

      {confirmDialog}
    </div>
  );
}
