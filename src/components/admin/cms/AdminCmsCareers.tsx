import { useCallback, useEffect, useState } from "react";
import { Briefcase, Plus, RefreshCw, Save } from "lucide-react";
import {
  getCmsCareersAdmin,
  saveCmsCareersPageAdmin,
  saveCmsCareerJobAdmin,
  publishCmsItemAdmin,
  unpublishCmsItemAdmin,
  archiveCmsItemAdmin,
} from "@/functions/admin-cms";
import { adminError, isAdminOk } from "@/lib/admin-api";
import { useToast } from "@/components/admin/AdminToast";
import { CmsPageHeader } from "@/components/admin/cms/CmsPageHeader";
import { CmsStickySaveBar } from "@/components/admin/cms/CmsStickySaveBar";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";
import { CmsTableEmptyAction, CmsTableEmptyRow, CmsTableLoadingRow } from "@/components/admin/cms/CmsTableState";
import { useCmsDirtyGuard } from "@/components/admin/cms/useCmsDirtyGuard";
import { useCmsListConfirm } from "@/components/admin/cms/useCmsListConfirm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { canManageSettings, type AdminRole } from "@/lib/admin-constants";
import { CAREERS_PAGE_FALLBACK } from "@/data/careers-fallback";
import type { CareersPageContent, CmsCareerJobRow } from "@/lib/cms-types";
import type { CareerApplicationRow } from "@/server/admin-queries";
import { CmsStatusBadge } from "@/components/admin/cms/CmsStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[]): string {
  return items.join("\n");
}

export function AdminCmsCareers({ role }: { role: AdminRole }) {
  const toast = useToast();
  const { requestConfirm, confirmDialog } = useCmsListConfirm();
  const canEdit = canManageSettings(role);
  const [content, setContent] = useState<CareersPageContent>(CAREERS_PAGE_FALLBACK);
  const [jobs, setJobs] = useState<CmsCareerJobRow[]>([]);
  const [applications, setApplications] = useState<CareerApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<CmsCareerJobRow | null>(null);
  const [dbConfigured, setDbConfigured] = useState(true);
  const [pageDirty, setPageDirty] = useState(false);
  const [jobDirty, setJobDirty] = useState(false);
  const { confirmDiscard: confirmPageDiscard } = useCmsDirtyGuard(pageDirty);
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
      toast.error("Load failed", adminError(res, "Could not load careers settings."));
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

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
  }

  function openEditJob(job: CmsCareerJobRow) {
    if (jobDirty && !confirmJobDiscard()) return;
    setEditingJob(job);
    setJobDirty(false);
  }

  function cancelEditJob() {
    if (jobDirty && !confirmJobDiscard()) return;
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
    <div className="space-y-8">
      <CmsPageHeader
        title="Careers"
        description="Manage the public /careers page, open roles, and applications."
        workflow="live"
      />

      {!dbConfigured && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MySQL is not configured. Jobs and applications are stored in memory only.
        </div>
      )}

      <form onSubmit={handleSavePage} className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Page copy</h2>
            <p className="text-xs text-muted-foreground">Hero, stats, culture, campus, and open roles headers.</p>
          </div>
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
          onTranslated={([heroBadgeHi, heroTitleHi, heroDescriptionHi, openRolesTitleHi, campusTitleHi]) => {
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
          <div className="space-y-2">
            <Label className="text-xs">Hero badge (EN)</Label>
            <Input value={content.heroBadgeEn} onChange={(e) => { setContent({ ...content, heroBadgeEn: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Hero badge (HI)</Label>
            <Input value={content.heroBadgeHi} onChange={(e) => { setContent({ ...content, heroBadgeHi: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Hero title (EN)</Label>
            <Input value={content.heroTitleEn} onChange={(e) => { setContent({ ...content, heroTitleEn: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Hero title (HI)</Label>
            <Input value={content.heroTitleHi} onChange={(e) => { setContent({ ...content, heroTitleHi: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs">Hero description (EN)</Label>
            <Textarea value={content.heroDescriptionEn} onChange={(e) => { setContent({ ...content, heroDescriptionEn: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} rows={3} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Hero description (HI)</Label>
            <Textarea value={content.heroDescriptionHi} onChange={(e) => { setContent({ ...content, heroDescriptionHi: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} rows={3} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs">Open roles title (EN)</Label>
            <Input value={content.openRolesTitleEn} onChange={(e) => { setContent({ ...content, openRolesTitleEn: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Open roles title (HI)</Label>
            <Input value={content.openRolesTitleHi} onChange={(e) => { setContent({ ...content, openRolesTitleHi: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs">Campus title (EN)</Label>
            <Input value={content.campusTitleEn} onChange={(e) => { setContent({ ...content, campusTitleEn: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Campus title (HI)</Label>
            <Input value={content.campusTitleHi} onChange={(e) => { setContent({ ...content, campusTitleHi: e.target.value }); setPageDirty(true); }} disabled={!canEdit || loading} />
          </div>
        </div>
        <CmsStickySaveBar saving={savingPage} disabled={!canEdit} label="Save page copy" />
      </form>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-base font-semibold">Open positions</h2>
            <p className="text-xs text-muted-foreground">{jobs.length} roles in CMS</p>
          </div>
          {canEdit && (
            <Button size="sm" variant="outline" onClick={openNewJob} disabled={loading}>
              Add role
            </Button>
          )}
        </div>
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs">Title</TableHead>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? <CmsTableLoadingRow colSpan={4} /> : null}
            {!loading && jobs.length === 0 ? (
              <CmsTableEmptyRow
                colSpan={4}
                title="No roles yet"
                description="Add an open position, then publish it to appear on the careers page."
                action={canEdit ? <CmsTableEmptyAction label="Add role" onClick={openNewJob} /> : undefined}
              />
            ) : null}
            {!loading
              ? jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="text-sm font-medium">{job.titleEn}</TableCell>
                  <TableCell className="text-xs">{job.departmentCategory}</TableCell>
                  <TableCell><CmsStatusBadge status={job.status} pending={job.hasUnpublishedChanges} /></TableCell>
                  <TableCell className="text-right space-x-1">
                    {canEdit && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => openEditJob(job)}>Edit</Button>
                        {job.status !== "published" && (
                          <Button size="sm" variant="ghost" onClick={() => void handlePublishJob(job.id)}>Publish</Button>
                        )}
                        {job.status === "published" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              requestConfirm({
                                title: "Unpublish role?",
                                description: `"${job.titleEn}" will be removed from public listings.`,
                                confirmLabel: "Unpublish",
                                action: async () => {
                                  const res = await unpublishCmsItemAdmin({ data: { type: "careerJobs", id: job.id } });
                                  if (isAdminOk(res)) {
                                    toast.success("Unpublished", "Role removed from public listings.");
                                    await load();
                                  } else toast.error(adminError(res));
                                },
                              })
                            }
                          >
                            Unpublish
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            requestConfirm({
                              title: "Archive role?",
                              description: `"${job.titleEn}" will be archived and hidden from this list.`,
                              confirmLabel: "Archive",
                              destructive: true,
                              action: async () => {
                                const res = await archiveCmsItemAdmin({ data: { type: "careerJobs", id: job.id } });
                                if (isAdminOk(res)) {
                                  toast.success("Archived", "Role archived.");
                                  await load();
                                } else toast.error(adminError(res));
                              },
                            })
                          }
                        >
                          Archive
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </div>

      {editingJob && (
        <form onSubmit={handleSaveJob} className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold">{editingJob.id ? "Edit role" : "New role"}</h3>
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
                  reqsHi: editingJob.reqsEn.map((_, idx) => (take() || editingJob.reqsHi[idx]) ?? ""),
                  responsibilitiesHi: editingJob.responsibilitiesEn.map(
                    (_, idx) => (take() || editingJob.responsibilitiesHi[idx]) ?? "",
                  ),
                });
                setJobDirty(true);
              }}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs">Slug</Label>
              <Input value={editingJob.slug} onChange={(e) => { setEditingJob({ ...editingJob, slug: e.target.value }); setJobDirty(true); }} required />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Category</Label>
              <Select
                value={editingJob.departmentCategory}
                onValueChange={(v) => { setEditingJob({ ...editingJob, departmentCategory: v as CmsCareerJobRow["departmentCategory"] }); setJobDirty(true); }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agronomy">Agronomy</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title (EN)</Label>
              <Input value={editingJob.titleEn} onChange={(e) => { setEditingJob({ ...editingJob, titleEn: e.target.value }); setJobDirty(true); }} required />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Title (HI)</Label>
              <Input value={editingJob.titleHi} onChange={(e) => { setEditingJob({ ...editingJob, titleHi: e.target.value }); setJobDirty(true); }} required />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Department (EN)</Label>
              <Input value={editingJob.deptEn} onChange={(e) => { setEditingJob({ ...editingJob, deptEn: e.target.value }); setJobDirty(true); }} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Location (EN)</Label>
              <Input value={editingJob.locEn} onChange={(e) => { setEditingJob({ ...editingJob, locEn: e.target.value }); setJobDirty(true); }} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Description (EN)</Label>
            <Textarea value={editingJob.descEn} onChange={(e) => { setEditingJob({ ...editingJob, descEn: e.target.value }); setJobDirty(true); }} rows={3} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Requirements (EN, one per line)</Label>
            <Textarea
              value={listToLines(editingJob.reqsEn)}
              onChange={(e) => { setEditingJob({ ...editingJob, reqsEn: linesToList(e.target.value) }); setJobDirty(true); }}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Responsibilities (EN, one per line)</Label>
            <Textarea
              value={listToLines(editingJob.responsibilitiesEn)}
              onChange={(e) => { setEditingJob({ ...editingJob, responsibilitiesEn: linesToList(e.target.value) }); setJobDirty(true); }}
              rows={4}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={cancelEditJob}>Cancel</Button>
            <Button type="submit" disabled={savingJob}>{savingJob ? "Saving…" : "Save draft"}</Button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="border-b px-6 py-4">
          <h2 className="text-base font-semibold">Applications</h2>
          <p className="text-xs text-muted-foreground">{applications.length} submissions</p>
        </div>
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs">Applicant</TableHead>
              <TableHead className="text-xs">Role</TableHead>
              <TableHead className="text-xs">Contact</TableHead>
              <TableHead className="text-xs">Resume</TableHead>
              <TableHead className="text-xs">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  No applications yet.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="text-sm">{app.name}</TableCell>
                  <TableCell className="text-xs">{app.job_title}</TableCell>
                  <TableCell className="text-xs">
                    <div>{app.phone}</div>
                    <div className="text-muted-foreground">{app.email}</div>
                  </TableCell>
                  <TableCell>
                    <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">
                      Download
                    </a>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(app.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {confirmDialog}
    </div>
  );
}
