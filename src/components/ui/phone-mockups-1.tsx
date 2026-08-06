import React from "react";
import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const defaultImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1592417817098-8f3d6eb13655?q=80&w=800&auto=format&fit=crop",
    alt: "Talk to Agronomist — Instant crop disease diagnosis & expert guidance",
  },
  {
    src: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop",
    alt: "Stage-Wise Advisory — Custom fertigation, soil care & spray timing",
  },
  {
    src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop",
    alt: "Agaate Kisaan Mall — Order genuine bio-inputs & seeds directly",
  },
  {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
    alt: "Smart Field Monitoring — Drone scouter & micro-climate weather alerts",
  },
];

export default function PhoneMockupBasic({
  images = defaultImages,
}: {
  images?: ImageItem[];
}) {
  return <PhoneCarousel images={images} />;
}
