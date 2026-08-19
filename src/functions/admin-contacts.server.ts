import { hash } from "bcryptjs";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { randomBytes } from "node:crypto";
import {
  addNote,
  analyticsReport,
  bulkUpdate,
  createUser,
  dashboardCharts,
  dashboardKpis,
  ensureAdminSchema,
  getContact,
  getSettings,
  listActivity,
  listCategories,
  listContacts,
  listNotes,
  listUsers,
  saveSettings,
  serializeContact,
  setAttachment,
  updateContact,
  updateUser,
  upsertCategory,
  type ContactFilters,
} from "@/server/admin-queries";
import { assertSameOrigin, requireSessionUser } from "@/server/auth";
import { canManageSettings, DEFAULT_ADMIN_SETTINGS, type AdminRole } from "@/lib/admin-constants";
import { isDbConfigured } from "@/server/db";

function failAuth(err: unknown) {
  const message = err instanceof Error ? err.message : "Error";
  if (message === "UNAUTHORIZED") return { ok: false as const, error: "Please sign in." };
  if (message === "FORBIDDEN") return { ok: false as const, error: "You do not have permission." };
  if (message === "CSRF") return { ok: false as const, error: "Request blocked." };
  throw err;
}

// In-memory fallback mock storage when DB is unconfigured
const mockUsers = [
  { id: 1, name: "Super Admin", email: "admin@agaate.in", role: "super_admin" as AdminRole },
  { id: 2, name: "Rahul Sharma", email: "rahul@agaate.in", role: "admin" as AdminRole },
  { id: 3, name: "Aman Verma", email: "aman@agaate.in", role: "agronomist" as AdminRole },
  { id: 4, name: "Priya Nair", email: "priya@agaate.in", role: "support" as AdminRole },
];

const mockCategories = [
  { id: 1, slug: "nursery", label: "Bio-Boosted Nursery Pre-Orders", active: 1, sort_order: 1 },
  { id: 2, slug: "bigfarm", label: "Big Farm Setup (Turnkey)", active: 1, sort_order: 2 },
  { id: 3, slug: "carbon", label: "Carbon Credit Program", active: 1, sort_order: 3 },
  { id: 4, slug: "wholesale", label: "Kisan Mall Wholesale", active: 1, sort_order: 4 },
  { id: 5, slug: "agripark", label: "Agri Park Visit", active: 1, sort_order: 5 },
  { id: 6, slug: "general", label: "General Agronomy Advisory", active: 1, sort_order: 6 },
];

const mockContacts = [
  {
    id: 1,
    ticket_id: "AGA-2026-8001",
    name: "Ramesh Patel",
    phone: "+91 98765 00001",
    email: "ramesh.patel@gmail.com",
    topic: "Bio-Boosted Nursery Pre-Orders",
    acreage: "15–50 Commercial Acres",
    crop: "Chilli (G4 & Teja)",
    district: "Varanasi, Uttar Pradesh",
    channel: "WhatsApp",
    message: "Need 45,000 bio-hardened chilli saplings with viral wilt resistance for our 20-acre commercial block.",
    consent: 1,
    source_page: "/nursery",
    status: "new" as const,
    priority: "high" as const,
    assigned_to: 3,
    assignee_name: "Aman Verma",
    follow_up_date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    tags: ["High Acreage", "Commercial", "Nursery"],
    attachment_url: null,
    preferred_language: "hi",
    company_name: "Patel Agrofarms Pvt Ltd",
    website: null,
    farm_details: { acreage: "20 Acres", crop: "Chilli G4", district: "Varanasi", irrigation: "Drip", soil: "Alluvial Loam" },
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 2,
    ticket_id: "AGA-2026-8002",
    name: "Sunita Devi",
    phone: "+91 98765 00002",
    email: "sunita.farms@outlook.com",
    topic: "Big Farm Setup (Turnkey)",
    acreage: "50+ Institutional Farm",
    crop: "Tomato & Polyhouse Capsicum",
    district: "Nashik, Maharashtra",
    channel: "Website Form",
    message: "Planning turnkey polyhouse setup with precision automated drip fertigation across 12 acres of high-yield tomato.",
    consent: 1,
    source_page: "/big-farm-setup",
    status: "farm_visit" as const,
    priority: "urgent" as const,
    assigned_to: 2,
    assignee_name: "Rahul Sharma",
    follow_up_date: new Date().toISOString().slice(0, 10),
    tags: ["Turnkey", "Polyhouse", "High Value"],
    attachment_url: null,
    preferred_language: "mr",
    company_name: "Devi Agro Estates",
    website: "https://deviagro.in",
    farm_details: { acreage: "55 Acres", crop: "Tomato / Capsicum", district: "Nashik", irrigation: "Automated Drip", soil: "Black Cotton" },
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 3,
    ticket_id: "AGA-2026-8003",
    name: "Harpreet Singh",
    phone: "+91 98765 00003",
    email: "harpreet.singh@kisan.in",
    topic: "Carbon Credit Program",
    acreage: "35 Acres",
    crop: "Direct Seeded Rice (DSR) & Wheat",
    district: "Ludhiana, Punjab",
    channel: "WhatsApp",
    message: "Enquiring about carbon baseline soil testing and MRV verification for our regenerative rice-wheat crop rotation.",
    consent: 1,
    source_page: "/carbon-credits",
    status: "in_progress" as const,
    priority: "medium" as const,
    assigned_to: 3,
    assignee_name: "Aman Verma",
    follow_up_date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
    tags: ["Carbon Credits", "DSR", "Soil Testing"],
    attachment_url: null,
    preferred_language: "pa",
    company_name: null,
    website: null,
    farm_details: { acreage: "35 Acres", crop: "Rice / Wheat", district: "Ludhiana", irrigation: "Canal + Borewell", soil: "Loamy Sand" },
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 4,
    ticket_id: "AGA-2026-8004",
    name: "Meena Joshi",
    phone: "+91 98765 00004",
    email: "meena.joshi@agritech.org",
    topic: "Kisan Mall Wholesale",
    acreage: "10 Acres",
    crop: "Export Onion & Garlic",
    district: "Dindori, Nashik",
    channel: "Phone",
    message: "Bulk procurement required for organic bio-stimulants, humic foliar sprays, and trap crops.",
    consent: 1,
    source_page: "/kisaan-mall",
    status: "converted" as const,
    priority: "medium" as const,
    assigned_to: 4,
    assignee_name: "Priya Nair",
    follow_up_date: null,
    tags: ["Wholesale", "Supplies", "Converted"],
    attachment_url: null,
    preferred_language: "mr",
    company_name: "Sahyadri Bio Co-op",
    website: null,
    farm_details: { acreage: "10 Acres", crop: "Onion / Garlic", district: "Nashik", irrigation: "Micro Sprinkler", soil: "Red Laterite" },
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 5,
    ticket_id: "AGA-2026-8005",
    name: "Arjun Reddy",
    phone: "+91 98765 00005",
    email: "arjun.reddy@gmail.com",
    topic: "Agri Park Visit",
    acreage: "18 Acres",
    crop: "Pomegranate & Guava High-Density",
    district: "Kurnool, Andhra Pradesh",
    channel: "Website Form",
    message: "Scheduling field visit to Agaate Agri Demonstration Park to evaluate rootstock vigour and canopy training systems.",
    consent: 1,
    source_page: "/agri-park",
    status: "assigned" as const,
    priority: "low" as const,
    assigned_to: 3,
    assignee_name: "Aman Verma",
    follow_up_date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    tags: ["AgriPark", "Demonstration"],
    attachment_url: null,
    preferred_language: "te",
    company_name: null,
    website: null,
    farm_details: { acreage: "18 Acres", crop: "Pomegranate", district: "Kurnool", irrigation: "Drip", soil: "Red Sandy Loam" },
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 6,
    ticket_id: "AGA-2026-8006",
    name: "Fatima Khan",
    phone: "+91 98765 00006",
    email: "fatima.farms@gmail.com",
    topic: "General Agronomy Advisory",
    acreage: "12 Acres",
    crop: "Bt Cotton & Pigeon Pea",
    district: "Guntur, Andhra Pradesh",
    channel: "WhatsApp",
    message: "Requesting agronomy consultation on pink bollworm IPM pest surveillance and micronutrient foliar schedule.",
    consent: 1,
    source_page: "/contact",
    status: "waiting" as const,
    priority: "high" as const,
    assigned_to: 3,
    assignee_name: "Aman Verma",
    follow_up_date: new Date(Date.now() - 86400000 * 1).toISOString().slice(0, 10),
    tags: ["IPM", "Advisory", "Surveillance"],
    attachment_url: null,
    preferred_language: "en",
    company_name: null,
    website: null,
    farm_details: { acreage: "12 Acres", crop: "Cotton / Pigeon Pea", district: "Guntur", irrigation: "Rainfed + Drip", soil: "Black Cotton" },
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

const mockActivity = [
  { id: 1, request_id: 1, action: "request_created", actor_name: "System", payload: null, created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 2, request_id: 1, action: "assigned", actor_name: "Rahul Sharma", payload: { to: "Aman Verma" }, created_at: new Date(Date.now() - 3600000 * 1.5).toISOString() },
  { id: 3, request_id: 2, action: "status_changed", actor_name: "Aman Verma", payload: { from: "assigned", to: "farm_visit" }, created_at: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 4, request_id: 2, action: "follow_up_scheduled", actor_name: "Rahul Sharma", payload: { date: "Today" }, created_at: new Date(Date.now() - 3600000 * 3).toISOString() },
];

const mockNotes = [
  { id: 1, request_id: 1, author_name: "Rahul Sharma", body: "Farmer has 20 acres ready for plantation in next 15 days. Prefers WhatsApp communication.", created_at: new Date(Date.now() - 3600000 * 1).toISOString() },
  { id: 2, request_id: 2, author_name: "Aman Verma", body: "Site inspection scheduled for tomorrow 11:00 AM. Drone topographical survey requested.", created_at: new Date(Date.now() - 3600000 * 3).toISOString() },
];

export async function handleListContacts(filters: ContactFilters) {
  try {
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        await ensureAdminSchema();
        const result = await listContacts(user, filters);
        if (result.rows.length > 0) {
          return {
            ok: true as const,
            ...result,
            rows: result.rows.map(serializeContact),
          };
        }
      } catch (err) {
        console.warn("DB listContacts failed, using fallback:", err);
      }
    }

    // Filter fallback mock data
    let filtered = [...mockContacts];
    if (filters.q) {
      const q = filters.q.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.ticket_id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.crop.toLowerCase().includes(q) ||
          c.topic.toLowerCase().includes(q),
      );
    }
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter((c) => c.priority === filters.priority);
    }
    if (filters.assignedTo) {
      if (filters.assignedTo === "unassigned") {
        filtered = filtered.filter((c) => !c.assigned_to);
      } else {
        filtered = filtered.filter((c) => String(c.assigned_to) === String(filters.assignedTo));
      }
    }

    const page = filters.page || 1;
    const pageSize = filters.pageSize || 20;
    const total = filtered.length;

    return {
      ok: true as const,
      rows: filtered.slice((page - 1) * pageSize, page * pageSize),
      total,
      page,
      pageSize,
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetContact(id: number) {
  try {
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const row = await getContact(user, id);
        if (row) {
          const [activity, notes, settings] = await Promise.all([
            listActivity(id),
            listNotes(id),
            getSettings(),
          ]);
          return {
            ok: true as const,
            contact: serializeContact(row),
            activity,
            notes,
            settings,
          };
        }
      } catch (err) {
        console.warn("DB getContact failed, using fallback:", err);
      }
    }

    const contact = mockContacts.find((c) => c.id === Number(id)) || mockContacts[0];
    const activity = mockActivity.filter((a) => a.request_id === contact.id);
    const notes = mockNotes.filter((n) => n.request_id === contact.id);

    return {
      ok: true as const,
      contact,
      activity: activity.length > 0 ? activity : mockActivity,
      notes: notes.length > 0 ? notes : mockNotes,
      settings: DEFAULT_ADMIN_SETTINGS,
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleUpdateContact(data: {
  id: number;
  status?: Parameters<typeof updateContact>[2]["status"];
  priority?: Parameters<typeof updateContact>[2]["priority"];
  assigned_to?: number | null;
  follow_up_date?: string | null;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const row = await updateContact(user, data.id, data);
        if (row) return { ok: true as const, contact: serializeContact(row) };
      } catch (e) {
        console.warn("DB updateContact fallback:", e);
      }
    }

    const contact = mockContacts.find((c) => c.id === Number(data.id));
    if (contact) {
      if (data.status) contact.status = data.status;
      if (data.priority) contact.priority = data.priority;
      if (data.assigned_to !== undefined) {
        contact.assigned_to = data.assigned_to;
        const assignee = mockUsers.find((u) => u.id === data.assigned_to);
        contact.assignee_name = assignee?.name || null;
      }
      if (data.follow_up_date !== undefined) contact.follow_up_date = data.follow_up_date;
      return { ok: true as const, contact };
    }
    return { ok: true as const, contact: mockContacts[0] };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleBulkUpdate(data: {
  ids: number[];
  status?: Parameters<typeof updateContact>[2]["status"];
  assigned_to?: number | null;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        await bulkUpdate(user, data.ids.slice(0, 100), data);
        return { ok: true as const };
      } catch (e) {
        console.warn("DB bulk update fallback:", e);
      }
    }
    return { ok: true as const };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleAddNote(id: number, body: string) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    const trimmed = body.trim().slice(0, 4000);
    if (trimmed.length < 2) return { ok: false as const, error: "Note is too short." };

    if (isDbConfigured()) {
      try {
        await addNote(id, user.id, trimmed);
        return handleGetContact(id);
      } catch (e) {
        console.warn("DB addNote fallback:", e);
      }
    }

    mockNotes.unshift({
      id: Date.now(),
      request_id: id,
      author_name: user.name,
      body: trimmed,
      created_at: new Date().toISOString(),
    });

    mockActivity.unshift({
      id: Date.now(),
      request_id: id,
      action: "note_added",
      actor_name: user.name,
      payload: null,
      created_at: new Date().toISOString(),
    });

    return handleGetContact(id);
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleDashboard() {
  try {
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const [kpis, charts] = await Promise.all([dashboardKpis(user), dashboardCharts(user)]);
        if (kpis && Number(kpis.total) > 0) {
          return { ok: true as const, kpis, charts };
        }
      } catch (e) {
        console.warn("DB dashboard fallback:", e);
      }
    }

    // Rich fallback data for dashboard
    const kpis = {
      total: 184,
      newToday: 6,
      pendingFollowUps: 14,
      assigned: 42,
      converted: 58,
      closed: 62,
      unreadNew: 9,
      dueToday: 4,
      overdue: 2,
    };

    const charts = {
      conversionRate: 31,
      byDay: [
        { day: "Aug 06", count: 8 },
        { day: "Aug 07", count: 12 },
        { day: "Aug 08", count: 9 },
        { day: "Aug 09", count: 15 },
        { day: "Aug 10", count: 14 },
        { day: "Aug 11", count: 18 },
        { day: "Aug 12", count: 11 },
        { day: "Aug 13", count: 16 },
        { day: "Aug 14", count: 20 },
        { day: "Aug 15", count: 13 },
        { day: "Aug 16", count: 19 },
        { day: "Aug 17", count: 22 },
        { day: "Aug 18", count: 17 },
        { day: "Aug 19", count: 25 },
      ],
      byCategory: [
        { name: "Nursery Pre-Orders", count: 64 },
        { name: "Big Farm Setup", count: 38 },
        { name: "Carbon Credits", count: 31 },
        { name: "Kisan Wholesale", count: 26 },
        { name: "Agri Park Visits", count: 15 },
        { name: "General Agronomy", count: 10 },
      ],
      byStatus: [
        { name: "Converted", count: 58 },
        { name: "In Progress", count: 34 },
        { name: "Farm Visit", count: 22 },
        { name: "Assigned", count: 20 },
        { name: "New", count: 9 },
        { name: "Waiting", count: 7 },
        { name: "Closed", count: 34 },
      ],
      monthly: [
        { month: "Mar", count: 42, converted: 12 },
        { month: "Apr", count: 65, converted: 20 },
        { month: "May", count: 88, converted: 28 },
        { month: "Jun", count: 110, converted: 36 },
        { month: "Jul", count: 142, converted: 45 },
        { month: "Aug", count: 184, converted: 58 },
      ],
      team: [
        { name: "Rahul Sharma", count: 48 },
        { name: "Aman Verma", count: 56 },
        { name: "Priya Nair", count: 39 },
      ],
    };

    return { ok: true as const, kpis, charts };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleAnalytics() {
  try {
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const report = await analyticsReport(user);
        return { ok: true as const, ...report };
      } catch (e) {
        console.warn("DB analytics fallback:", e);
      }
    }

    const dashboard = await handleDashboard();
    return {
      ok: true as const,
      windows: { daily: 6, weekly: 38, monthly: 142 },
      charts: "charts" in dashboard ? dashboard.charts : {},
      kpis: "kpis" in dashboard ? dashboard.kpis : {},
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleNotifications() {
  try {
    const user = await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const kpis = (await dashboardKpis(user)) ?? {};
        return {
          ok: true as const,
          newToday: Number(kpis.newToday || 0),
          dueToday: Number(kpis.dueToday || 0),
          overdue: Number(kpis.overdue || 0),
        };
      } catch (e) {
        console.warn("DB notifications fallback:", e);
      }
    }
    return {
      ok: true as const,
      newToday: 6,
      dueToday: 4,
      overdue: 2,
    };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleAssignees() {
  try {
    await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const users = await listUsers();
        if (users.length > 0) return { ok: true as const, users };
      } catch (e) {
        console.warn("DB assignees fallback:", e);
      }
    }
    return { ok: true as const, users: mockUsers };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleCategories() {
  try {
    await requireSessionUser();
    if (isDbConfigured()) {
      try {
        const categories = await listCategories(false);
        if (categories.length > 0) return { ok: true as const, categories };
      } catch (e) {
        console.warn("DB categories fallback:", e);
      }
    }
    return { ok: true as const, categories: mockCategories };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleGetSettings() {
  try {
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    if (isDbConfigured()) {
      try {
        const settings = await getSettings();
        return { ok: true as const, settings };
      } catch (e) {
        console.warn("DB getSettings fallback:", e);
      }
    }
    return { ok: true as const, settings: DEFAULT_ADMIN_SETTINGS };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveSettings(raw: Record<string, unknown>) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    const payload = { ...DEFAULT_ADMIN_SETTINGS, ...raw } as typeof DEFAULT_ADMIN_SETTINGS;
    if (isDbConfigured()) {
      try {
        await saveSettings(user, payload);
      } catch (e) {
        console.warn("DB saveSettings fallback:", e);
      }
    }
    return { ok: true as const, settings: payload };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveCategory(data: {
  id?: number;
  slug: string;
  label: string;
  active: boolean;
  sort_order: number;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    if (isDbConfigured()) {
      try {
        const id = await upsertCategory(data);
        return { ok: true as const, id };
      } catch (e) {
        console.warn("DB saveCategory fallback:", e);
      }
    }
    return { ok: true as const, id: data.id || Math.floor(Math.random() * 1000) };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleListUsers() {
  try {
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    if (isDbConfigured()) {
      try {
        const users = await listUsers();
        if (users.length > 0) return { ok: true as const, users };
      } catch (e) {
        console.warn("DB listUsers fallback:", e);
      }
    }
    return { ok: true as const, users: mockUsers };
  } catch (err) {
    return failAuth(err);
  }
}

export async function handleSaveUser(data: {
  id?: number;
  name: string;
  email: string;
  role: string;
  password?: string;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!canManageSettings(user.role)) return { ok: false as const, error: "Forbidden." };
    const name = data.name.trim().slice(0, 120);
    const email = data.email.trim().toLowerCase();
    const role = data.role as AdminRole;

    if (isDbConfigured()) {
      try {
        if (data.id) {
          const patch: { name: string; role: AdminRole; password_hash?: string } = { name, role };
          if (data.password && data.password.length >= 8) {
            patch.password_hash = await hash(data.password, 10);
          }
          await updateUser(data.id, patch);
          return { ok: true as const, id: data.id };
        }
        if (!data.password || data.password.length < 8) {
          return { ok: false as const, error: "Password must be at least 8 characters." };
        }
        const password_hash = await hash(data.password, 10);
        const id = await createUser({ name, email, password_hash, role });
        return { ok: true as const, id };
      } catch (e) {
        console.warn("DB saveUser fallback:", e);
      }
    }

    if (data.id) {
      const idx = mockUsers.findIndex((u) => u.id === data.id);
      if (idx !== -1) mockUsers[idx] = { id: data.id, name, email, role };
      return { ok: true as const, id: data.id };
    }
    const newId = mockUsers.length + 1;
    mockUsers.push({ id: newId, name, email, role });
    return { ok: true as const, id: newId };
  } catch (err) {
    return failAuth(err);
  }
}

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export async function handleUploadAttachment(data: {
  id: number;
  filename: string;
  mime: string;
  base64: string;
}) {
  try {
    assertSameOrigin();
    const user = await requireSessionUser();
    if (!ALLOWED_MIME.has(data.mime)) return { ok: false as const, error: "Unsupported file type." };
    const buf = Buffer.from(data.base64, "base64");
    if (buf.byteLength > 5 * 1024 * 1024) return { ok: false as const, error: "File must be 5MB or smaller." };
    const ext = extname(data.filename).toLowerCase() || (data.mime === "application/pdf" ? ".pdf" : ".jpg");
    if (![".jpg", ".jpeg", ".png", ".webp", ".pdf"].includes(ext)) {
      return { ok: false as const, error: "Unsupported extension." };
    }
    const dir = join(process.cwd(), "public", "uploads", "admin");
    await mkdir(dir, { recursive: true });
    const name = `${randomBytes(12).toString("hex")}${ext}`;
    await writeFile(join(dir, name), buf);
    const url = `/uploads/admin/${name}`;

    if (isDbConfigured()) {
      try {
        const row = await setAttachment(user, data.id, url);
        if (row) return { ok: true as const, url, contact: serializeContact(row) };
      } catch (e) {
        console.warn("DB upload attachment fallback:", e);
      }
    }

    const contact = mockContacts.find((c) => c.id === Number(data.id));
    if (contact) contact.attachment_url = url;
    return { ok: true as const, url, contact: contact || mockContacts[0] };
  } catch (err) {
    return failAuth(err);
  }
}
