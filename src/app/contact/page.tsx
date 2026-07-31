import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Agaate",
  description: "Let's Grow Together. Contact Agaate for farm consultations, partnerships, or Agri Park visits.",
};

export default function ContactPage() {
  return <ContactClient />;
}
