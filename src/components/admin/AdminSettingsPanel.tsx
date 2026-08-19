import { useState } from "react";
import {
  Settings,
  MessageSquare,
  Clock,
  Tag,
  Users,
  Shield,
  Save,
  Plus,
  CheckCircle2,
  Lock,
  Mail,
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
  const [activeTab, setActiveTab] = useState<"templates" | "categories" | "users" | "hours">("templates");
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
      toast.success("Settings Saved", "Templates and parameters updated successfully.");
    } else {
      toast.error("Save Failed", "Could not save configuration.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              System Control
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Admin Settings & Configuration</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage response templates, inquiry categories, business hours, and team role permissions.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200/80 overflow-x-auto pb-px">
        {[
          { id: "templates", label: "Reply Templates", icon: MessageSquare },
          { id: "hours", label: "Business Hours", icon: Clock },
          { id: "categories", label: "Inquiry Categories", icon: Tag },
          { id: "users", label: "Team & Permissions", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-emerald-700 text-emerald-900 font-bold"
                  : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Reply Templates */}
      {activeTab === "templates" && (
        <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">WhatsApp & Email Auto-Reply Templates</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Dynamic tokens available: <code className="bg-stone-100 text-emerald-800 px-1.5 py-0.5 rounded text-[11px] font-mono">{"{{name}}"}</code>,{" "}
                <code className="bg-stone-100 text-emerald-800 px-1.5 py-0.5 rounded text-[11px] font-mono">{"{{ticket}}"}</code>,{" "}
                <code className="bg-stone-100 text-emerald-800 px-1.5 py-0.5 rounded text-[11px] font-mono">{"{{notes}}"}</code>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Follow-up Template
                </label>
                <textarea
                  rows={3}
                  value={settings.whatsappTemplate}
                  onChange={(e) => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 p-3 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Subject Line</label>
                <input
                  value={settings.emailSubject}
                  onChange={(e) => setSettings({ ...settings, emailSubject: e.target.value })}
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Priority Assignment Rule</label>
                <input
                  value={settings.priorityRules}
                  onChange={(e) => setSettings({ ...settings, priorityRules: e.target.value })}
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Body Draft</label>
                <textarea
                  rows={5}
                  value={settings.emailTemplate}
                  onChange={(e) => setSettings({ ...settings, emailTemplate: e.target.value })}
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 p-3 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Templates"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Business Hours */}
      {activeTab === "hours" && (
        <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Operating Hours & SLA Expectations</h2>
              <p className="text-xs text-stone-500 mt-0.5">Define response benchmarks for farmer support lines</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Start Time (IST)</label>
                <input
                  value={settings.businessHours.start}
                  onChange={(e) =>
                    setSettings({ ...settings, businessHours: { ...settings.businessHours, start: e.target.value } })
                  }
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">End Time (IST)</label>
                <input
                  value={settings.businessHours.end}
                  onChange={(e) =>
                    setSettings({ ...settings, businessHours: { ...settings.businessHours, end: e.target.value } })
                  }
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Active Days</label>
                <input
                  value={settings.businessHours.days}
                  onChange={(e) =>
                    setSettings({ ...settings, businessHours: { ...settings.businessHours, days: e.target.value } })
                  }
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Target Response Time</label>
                <input
                  value={settings.defaultResponseTime}
                  onChange={(e) => setSettings({ ...settings, defaultResponseTime: e.target.value })}
                  className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Operating Hours"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Inquiry Categories */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Agaate Inquiry Categories</h2>
              <p className="text-xs text-stone-500 mt-0.5">Agricultural program taxonomies and routing tags</p>
            </div>

            <div className="divide-y divide-stone-100">
              {categories.map((c) => (
                <div key={c.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <input
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
                      className="w-64 rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 font-medium text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
                    />
                    <span className="font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {c.slug}
                    </span>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-600 font-medium">
                    <input
                      type="checkbox"
                      defaultChecked={Boolean(c.active)}
                      onChange={(e) => {
                        void saveAdminCategory({
                          data: { id: c.id, slug: c.slug, label: c.label, active: e.target.checked, sort_order: c.sort_order },
                        });
                        toast.success("Status Toggled", `${c.label} is now ${e.target.checked ? "Active" : "Inactive"}`);
                      }}
                      className="rounded text-emerald-600"
                    />
                    <span>Active</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Add Category Form */}
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
              className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-2"
            >
              <input
                placeholder="slug (e.g. soil-test)"
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-emerald-600"
              />
              <input
                placeholder="Category Title"
                value={newCat.label}
                onChange={(e) => setNewCat({ ...newCat, label: e.target.value })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                <Plus className="h-3 w-3" />
                <span>Add Category</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Users & Permissions */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 md:p-6 shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Admin Staff & Role Access</h2>
              <p className="text-xs text-stone-500 mt-0.5">Control CRM access permissions and agronomist assignments</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-[11px] uppercase tracking-wider text-stone-400 pb-2">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email Address</th>
                    <th className="py-2">Role Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 font-semibold text-stone-900">{u.name}</td>
                      <td className="py-3 text-stone-500 font-mono text-[11px]">{u.email}</td>
                      <td className="py-3">
                        <select
                          defaultValue={u.role}
                          onChange={(e) => {
                            void saveAdminUser({
                              data: { id: u.id, name: u.name, email: u.email, role: e.target.value },
                            });
                            toast.success("Role Updated", `${u.name} is now ${e.target.value}`);
                          }}
                          className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs text-stone-800 outline-none"
                        >
                          {ADMIN_ROLES.map((r) => (
                            <option key={r} value={r}>
                              {ROLE_LABELS[r]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add User Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await saveAdminUser({ data: newUser });
                if (res && "ok" in res && res.ok) {
                  const listed = await listAdminUsers();
                  if (listed && "ok" in listed && listed.ok) setUsers(listed.users as User[]);
                  setNewUser({ name: "", email: "", role: "support", password: "" });
                  toast.success("User Created", newUser.name);
                } else {
                  toast.error("User Creation Failed", res && "error" in res ? String(res.error) : "Failed.");
                }
              }}
              className="mt-4 pt-4 border-t border-stone-100 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
            >
              <input
                required
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminRole })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 outline-none"
              >
                {ADMIN_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
              <input
                required
                type="password"
                minLength={8}
                placeholder="Password (8+ chars)"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all sm:col-span-2 lg:col-span-4"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Staff Account</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
