import { createServerFn } from "@tanstack/react-start";
import {
  careerApplicationSchema,
  type CareerApplicationInput,
  type CareerApplicationResult,
} from "@/functions/career-application-types";

export type {
  CareerApplicationInput,
  CareerApplicationResult,
} from "@/functions/career-application-types";

export const submitCareerApplication = createServerFn({ method: "POST" })
  .validator((data: CareerApplicationInput) => careerApplicationSchema.parse(data))
  .handler(async ({ data }): Promise<CareerApplicationResult> => {
    const { handleSubmitCareerApplication } = await import("./submit-career-application.server");
    return handleSubmitCareerApplication(data);
  });
