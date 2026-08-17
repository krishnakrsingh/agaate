import { createServerFn } from "@tanstack/react-start";
import { leadInputSchema, type LeadInput, type LeadResult } from "./lead-types";

export type { LeadInput, LeadResult } from "./lead-types";
export { leadInputSchema, leadResultSchema } from "./lead-types";

/**
 * Client-safe RPC entry. DB/crypto live under src/server and load only in the handler.
 */
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => {
    return leadInputSchema.parse(data);
  })
  .handler(async ({ data }): Promise<LeadResult> => {
    const { handleSubmitLead } = await import("./submit-lead.server");
    return handleSubmitLead(data);
  });
