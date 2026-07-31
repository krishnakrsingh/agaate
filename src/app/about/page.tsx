import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Agaate",
  description: "Built for Farmers. Driven by Science. Learn about Agaate's mission, vision, and team.",
};

export default function AboutPage() {
  return <AboutClient />;
}
