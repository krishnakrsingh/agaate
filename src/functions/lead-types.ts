export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  topic: string;
  acreage?: string;
  crop?: string;
  district?: string;
  channel?: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
  startedAt: number;
  clientToken: string;
  sourcePage?: string;
};

export type LeadResult =
  | { ok: true; ticketId: string; stored: boolean }
  | { ok: false; error: string; code?: "validation" | "rate_limit" | "server" };
