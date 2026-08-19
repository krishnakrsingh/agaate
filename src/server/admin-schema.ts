import type { AdminRole, RequestPriority, RequestStatus } from "@/lib/admin-constants";

export type AdminUserRow = {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role: AdminRole;
  created_at: Date | string;
  updated_at: Date | string;
};

export type InquiryCategoryRow = {
  id: number;
  slug: string;
  label: string;
  active: number;
  sort_order: number;
};

export type ContactRequestRow = {
  id: number;
  ticket_id: string;
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  acreage: string | null;
  crop: string | null;
  district: string | null;
  channel: string | null;
  message: string | null;
  consent: number;
  consent_at: Date | string | null;
  source_page: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  status: RequestStatus;
  priority: RequestPriority;
  assigned_to: number | null;
  assignee_name?: string | null;
  follow_up_date: Date | string | null;
  tags: unknown;
  attachment_url: string | null;
  preferred_language: string | null;
  company_name: string | null;
  website: string | null;
  farm_details: unknown;
  created_at: Date | string;
  updated_at: Date | string;
};

export type ActivityRow = {
  id: number;
  request_id: number;
  user_id: number | null;
  actor_name?: string | null;
  action: string;
  payload: unknown;
  created_at: Date | string;
};

export type NoteRow = {
  id: number;
  request_id: number;
  user_id: number | null;
  author_name?: string | null;
  body: string;
  created_at: Date | string;
};

export const LEAD_CRM_COLUMNS = [
  "status",
  "priority",
  "assigned_to",
  "follow_up_date",
  "tags",
  "attachment_url",
  "preferred_language",
  "company_name",
  "website",
  "farm_details",
  "updated_at",
] as const;
