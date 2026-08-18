/**
 * Database Schema and Type Definitions for Agaate Backend
 */

export interface LeadDbRecord {
  id?: number;
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
  consent_at: Date | null;
  source_page: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  created_at?: Date;
}

export const LEADS_TABLE = "leads";
