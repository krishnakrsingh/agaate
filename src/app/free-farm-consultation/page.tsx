import { Metadata } from "next";
import { LeadGenClient } from "./LeadGenClient";

export const metadata: Metadata = {
  title: "Free Farm Consultation | Agaate",
  description: "Get free expert guidance for your farm. Receive crop-specific recommendations, scientific farming support, and market access opportunities.",
};

export default function FreeFarmConsultationPage() {
  return <LeadGenClient />;
}
