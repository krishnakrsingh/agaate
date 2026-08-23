import facebookIcon from "@/assets/social/facebook.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import linkedinIcon from "@/assets/social/linkedin.svg";
import youtubeIcon from "@/assets/social/youtube.svg";

export interface SocialLink {
  href: string;
  icon: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.facebook.com/p/Agaate-Anzix-Farm-Technologies-61571500574178/",
    icon: facebookIcon,
    ariaLabel: "Facebook",
  },
  {
    href: "https://www.youtube.com/@AgaateAgri",
    icon: youtubeIcon,
    ariaLabel: "YouTube",
  },
  {
    href: "https://www.instagram.com/agaateanzixfarm/",
    icon: instagramIcon,
    ariaLabel: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/agaate-anzixfarm/",
    icon: linkedinIcon,
    ariaLabel: "LinkedIn",
  },
];

export const COMPANY_LINKS = [
  { href: "/about", labelKey: "footer.aboutUs", fallback: "About Us" },
  { href: "/#agri-park", labelKey: "nav.agriPark", fallback: "Agri Park" },
  { href: "/kisaan-mall", labelKey: "footer.services", fallback: "Services" },
  { href: "/careers", labelKey: "nav.careers", fallback: "Careers" },
];

export const EXPLORE_LINKS = [
  { href: "/#pillar-nursery", labelKey: "servicesSub.nursery", fallback: "Bio-Boosted Nursery" },
  { href: "/kisaan-mall", labelKey: "servicesSub.kisaanMall", fallback: "Kisaan Mall" },
  { href: "/#agaate-app", labelKey: "servicesSub.farmTech", fallback: "Agaate Mobile App" },
  { href: "/#pillar-market", labelKey: "servicesSub.marketLinkage", fallback: "Market Linkage" },
];

export const CONTACT_DETAILS = {
  phone: "8350085005",
  phoneDisplay: "+91 83500 85005",
  email: "info@agaate.in",
  nurseryLocation: "Pachgaon / Kukrola, Gurugram, Haryana",
};
