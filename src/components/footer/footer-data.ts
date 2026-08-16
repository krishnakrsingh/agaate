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
  { href: "/agri-park", labelKey: "nav.agriPark", fallback: "Agri Park" },
  { href: "/services", labelKey: "footer.services", fallback: "Services" },
  { href: "/careers", labelKey: "nav.careers", fallback: "Careers" },
];

export const EXPLORE_LINKS = [
  { href: "/community", labelKey: "nav.community", fallback: "Farmer Community" },
  { href: "/services/nursery", labelKey: "servicesSub.nursery", fallback: "Bio-Boosted Nursery" },
  { href: "/services/kisaan-mall", labelKey: "servicesSub.kisaanMall", fallback: "Kisaan Mall" },
  { href: "/services/farm-tech", labelKey: "servicesSub.farmTech", fallback: "Farm Tech & IoT" },
];

export const CONTACT_DETAILS = {
  phone: "8350085005",
  phoneDisplay: "+91 83500 85005",
  email: "info@agaate.in",
  nurseryLocation: "Pachgaon / Kukrola, Gurugram, Haryana",
};
