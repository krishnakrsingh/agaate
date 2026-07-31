import { Metadata } from "next";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Agaate",
  description: "Explore Agaate's end-to-end solutions for modern farming including Crop Advisory, Farm Management, and Carbon Credits.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
