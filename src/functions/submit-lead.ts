import { createServerFn } from "@tanstack/react-start";
import type { LeadInput, LeadResult } from "./lead-types";

export type { LeadInput, LeadResult } from "./lead-types";

/**
 * Client-safe RPC entry. DB/crypto live under src/server and load only in the handler.
 */
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }): Promise<LeadResult> => {
    const { handleSubmitLead } = await import("./submit-lead.server");
    return handleSubmitLead(data);
  });
