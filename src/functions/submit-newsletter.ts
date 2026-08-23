import { createServerFn } from "@tanstack/react-start";
import {
  newsletterSignupSchema,
  type NewsletterSignupInput,
  type NewsletterSignupResult,
} from "@/functions/newsletter-types";

export type { NewsletterSignupInput, NewsletterSignupResult } from "@/functions/newsletter-types";

export const submitNewsletterSignup = createServerFn({ method: "POST" })
  .validator((data: NewsletterSignupInput) => newsletterSignupSchema.parse(data))
  .handler(async ({ data }): Promise<NewsletterSignupResult> => {
    const { handleSubmitNewsletterSignup } = await import("./submit-newsletter.server");
    return handleSubmitNewsletterSignup(data);
  });
