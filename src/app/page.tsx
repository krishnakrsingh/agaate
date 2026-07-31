import { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Agaate | Premium AgriTech Solutions for Farmers",
  description: "From Seed to Sale - Empowering Farmers. Managing Farming Outcomes. Higher Yield. Better Price. Zero Guesswork.",
};

export default function HomePage() {
  return <HomeClient />;
}
