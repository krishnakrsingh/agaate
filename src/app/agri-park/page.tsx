import { Metadata } from "next";
import { AgriParkClient } from "./AgriParkClient";

export const metadata: Metadata = {
  title: "India's First Agri Park | Agaate",
  description: "Walk the entire crop journey in one visit. See products perform on real crops before you buy.",
};

export default function AgriParkPage() {
  return <AgriParkClient />;
}
