import { useState } from "react";
import {
  Save,
  Plus,
} from "lucide-react";
import {
  listAdminUsers,
  saveAdminCategory,
  saveAdminSettings,
  saveAdminUser,
} from "@/functions/admin-contacts";
import {
  ADMIN_ROLES,
  DEFAULT_ADMIN_SETTINGS,
  ROLE_LABELS,
  type AdminRole,
  type AdminSettingsPayload,
} from "@/lib/admin-constants";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type Category = { id: number; slug: string; label: string; active: number; sort_order: number };
type User = { id: number; name: string; email: string; role: AdminRole };

export function AdminSettingsPanel({
  settings: initialSettings,
  categories: initialCategories,
  users: initialUsers,
}: {
  settings: AdminSettingsPayload;
  categories: Category[];
  users: User[];
}) {
  const toast = useToast();
  const [settings, setSettings] = useState({ ...DEFAULT_ADMIN_SETTINGS, ...initialSettings });
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);
  const [saving, setSaving] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "support" as AdminRole, password: "" });
  const [newCat, setNewCat] = useState({ slug: "", label: "", sort_order: categories.length + 1 });

  async function handleSaveSettingsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    toast.info("Saving Configuration", "Updating templates and settings...");
    const res = await saveAdminSettings({ data: settings });
    setSaving(false);
    if (res && "ok" in res && res.ok) {
      toast.success("Settings Saved", "Configuration updated successfully.");
    } else {
      toast.error("Save Failed", "Could not save configuration.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header (shadcn settings style) */}
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-xs">
          Manage automated communication templates, response SLA benchmarks, and team access.
        </p>
      </div>
      <Separator className="my-4" />

      {/* Tabs */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="inline-flex h-9 items-center rounded-lg bg-muted/60 p-0.5 border border-border/80 shadow-2xs">
          <TabsTrigger value="templates" className="rounded-md px-3.5 py-1 text-xs font-medium">
            Reply Templates
          </TabsTrigger>
          <TabsTrigger value="hours" className="rounded-md px-3.5 py-1 text-xs font-medium">
            Business SLA
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-md px-3.5 py-1 text-xs font-medium">
            Inquiry Categories
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-md px-3.5 py-1 text-xs font-medium">
            Staff Users
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Reply Templates */}
        <TabsContent value="templates" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Automation
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Auto-Reply Templates</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tokens available for replacement: <code className="bg-muted px-2 py-0.5 rounded-md text-[11px] font-mono">{"{{name}}"}</code>, <code className="bg-muted px-2 py-0.5 rounded-md text-[11px] font-mono">{"{{ticket}}"}</code>, <code className="bg-muted px-2 py-0.5 rounded-md text-[11px] font-mono">{"{{notes}}"}</code>
              </p>
            </div>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waTemplate" className="text-xs font-medium text-foreground">WhatsApp Follow-up Template</Label>
                <Textarea
                  id="waTemplate"
                  rows={3}
                  value={settings.whatsappTemplate}
                  onChange={(e) => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                  className="text-xs rounded-lg bg-muted/20 border-border"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emailSubject" className="text-xs font-medium text-foreground">Email Subject Line</Label>
                  <Input
                    id="emailSubject"
                    value={settings.emailSubject}
                    onChange={(e) => setSettings({ ...settings, emailSubject: e.target.value })}
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priorityRules" className="text-xs font-medium text-foreground">Priority Rule Guidance</Label>
                  <Input
                    id="priorityRules"
                    value={settings.priorityRules}
                    onChange={(e) => setSettings({ ...settings, priorityRules: e.target.value })}
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailTemplate" className="text-xs font-medium text-foreground">Email Body Template</Label>
                <Textarea
                  id="emailTemplate"
                  rows={5}
                  value={settings.emailTemplate}
                  onChange={(e) => setSettings({ ...settings, emailTemplate: e.target.value })}
                  className="text-xs rounded-lg bg-muted/20 border-border"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving} size="sm" className="h-8.5 rounded-lg px-4 text-xs bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold">
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  <span>{saving ? "Saving..." : "Save Templates"}</span>
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* Tab 2: Business Hours */}
        <TabsContent value="hours" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                SLA Benchmarks
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Business Hours & Response SLA</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Configure active operational hours and farmer callback benchmarks</p>
            </div>

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-xs font-medium text-foreground">Start Time (IST)</Label>
                  <Input
                    id="startTime"
                    value={settings.businessHours.start}
                    onChange={(e) =>
                      setSettings({ ...settings, businessHours: { ...settings.businessHours, start: e.target.value } })
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-xs font-medium text-foreground">End Time (IST)</Label>
                  <Input
                    id="endTime"
                    value={settings.businessHours.end}
                    onChange={(e) =>
                      setSettings({ ...settings, businessHours: { ...settings.businessHours, end: e.target.value } })
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activeDays" className="text-xs font-medium text-foreground">Active Days</Label>
                  <Input
                    id="activeDays"
                    value={settings.businessHours.days}
                    onChange={(e) =>
                      setSettings({ ...settings, businessHours: { ...settings.businessHours, days: e.target.value } })
                    }
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseTime" className="text-xs font-medium text-foreground">Response SLA</Label>
                  <Input
                    id="responseTime"
                    value={settings.defaultResponseTime}
                    onChange={(e) => setSettings({ ...settings, defaultResponseTime: e.target.value })}
                    className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving} size="sm" className="h-8.5 rounded-lg px-4 text-xs bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold">
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  <span>{saving ? "Saving..." : "Save SLA Settings"}</span>
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* Tab 3: Inquiry Categories */}
        <TabsContent value="categories" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Channel Routing
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Inquiry Categories</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage agricultural program channels and intake routing</p>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="text-xs">Program Label</TableHead>
                    <TableHead className="text-xs">Slug Identifier</TableHead>
                    <TableHead className="w-24 text-right text-xs">Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="py-2">
                        <Input
                          defaultValue={c.label}
                          onBlur={(e) => {
                            const label = e.target.value.trim();
                            if (label && label !== c.label) {
                              void saveAdminCategory({
                                data: { id: c.id, slug: c.slug, label, active: Boolean(c.active), sort_order: c.sort_order },
                              });
                              toast.success("Category Updated", label);
                            }
                          }}
                          className="h-8 rounded-lg px-3 text-xs max-w-sm bg-card border-border"
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{c.slug}</TableCell>
                      <TableCell className="text-right">
                        <Checkbox
                          defaultChecked={Boolean(c.active)}
                          onCheckedChange={(checked) => {
                            void saveAdminCategory({
                              data: { id: c.id, slug: c.slug, label: c.label, active: Boolean(checked), sort_order: c.sort_order },
                            });
                            toast.success("Status Toggled", `${c.label} is now ${checked ? "Active" : "Inactive"}`);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add category */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newCat.slug || !newCat.label) return;
                const res = await saveAdminCategory({
                  data: {
                    slug: newCat.slug.trim().toLowerCase(),
                    label: newCat.label.trim(),
                    active: true,
                    sort_order: Number(newCat.sort_order) || 0,
                  },
                });
                if (res && "ok" in res && res.ok) {
                  setCategories([
                    ...categories,
                    {
                      id: res.id,
                      slug: newCat.slug.trim().toLowerCase(),
                      label: newCat.label.trim(),
                      active: 1,
                      sort_order: Number(newCat.sort_order) || 0,
                    },
                  ]);
                  setNewCat({ slug: "", label: "", sort_order: categories.length + 2 });
                  toast.success("Category Added", newCat.label);
                }
              }}
              className="flex flex-wrap gap-2 pt-2 border-t border-border/60"
            >
              <Input
                placeholder="slug (e.g. soil-test)"
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                className="h-8.5 rounded-lg px-3 text-xs w-44 bg-card border-border"
              />
              <Input
                placeholder="Program Title"
                value={newCat.label}
                onChange={(e) => setNewCat({ ...newCat, label: e.target.value })}
                className="h-8.5 rounded-lg px-3 text-xs w-64 bg-card border-border"
              />
              <Button type="submit" size="sm" className="h-8.5 rounded-lg px-3.5 text-xs bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                <span>Add Category</span>
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Tab 4: Staff Users */}
        <TabsContent value="users" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-sidebar-accent/70 px-2.5 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                Access Control
              </span>
              <h3 className="text-base font-bold text-foreground mt-1">Staff Accounts & Roles</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage team access levels and role-based permissions</p>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="text-xs">Staff Name</TableHead>
                    <TableHead className="text-xs">Email Address</TableHead>
                    <TableHead className="text-xs">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="font-semibold text-xs text-foreground">{u.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        <select
                          defaultValue={u.role}
                          onChange={(e) =>
                            void saveAdminUserRole({
                              data: { id: u.id, role: e.target.value as AdminRole },
                            }).then(() => toast.success("Role Updated", `${u.name} is now ${e.target.value}`))
                          }
                          className="h-8 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="agronomist">Agronomist</option>
                          <option value="support">Support</option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add User Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await saveAdminUser({ data: newUser });
                if (res && "ok" in res && res.ok) {
                  const listed = await listAdminUsers();
                  if (listed && "users" in listed) setUsers(listed.users);
                  setNewUser({ email: "", name: "", password: "", role: "agronomist" });
                  toast.success("User Added", newUser.email);
                } else {
                  toast.error("Failed to add user", (res as any)?.error || "Error");
                }
              }}
              className="grid gap-3 pt-3 border-t border-border/60 sm:grid-cols-2 lg:grid-cols-5 items-end"
            >
              <div className="space-y-1">
                <Label className="text-xs font-medium text-foreground">Name</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Aman Verma"
                  required
                  className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-foreground">Email</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. aman@agaate.in"
                  required
                  className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-foreground">Password</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Min 6 chars"
                  required
                  className="h-8.5 rounded-lg px-3 text-xs bg-card border-border"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-foreground">Role</Label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminRole })}
                  className="w-full h-8.5 rounded-lg border border-border bg-card hover:bg-sidebar-accent/50 transition-colors px-2.5 py-1 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="agronomist">Agronomist</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div>
                <Button type="submit" size="sm" className="w-full h-8.5 rounded-lg px-3.5 text-xs bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold">
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  <span>Create Account</span>
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
