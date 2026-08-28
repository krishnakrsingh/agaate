import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { SiteContactConfig, SiteFacilityConfig, SiteWhatsAppMessages } from "@/lib/cms-types";
import type { Facility } from "@/components/contact/data";
import { SITE_CONTACT_FALLBACK } from "@/data/site-contact-fallback";
import { buildTelHref, buildWhatsAppUrl, buildMailtoHref } from "@/lib/site-contact-utils";
import {
  ChatCircleDots,
  Compass,
  DeviceMobile,
  House,
  Info,
  Phone,
  Plant,
  ShieldCheck,
  Stack,
  Storefront,
  Tree,
  TrendUp,
  Buildings,
  Warehouse,
  type Icon,
} from "@phosphor-icons/react";
import facebookIcon from "@/assets/social/facebook.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import linkedinIcon from "@/assets/social/linkedin.svg";
import youtubeIcon from "@/assets/social/youtube.svg";
import type { NavItem } from "@/components/header/header-data";

type WhatsAppMessageKey = keyof SiteWhatsAppMessages;

type SiteContactContextValue = {
  contact: SiteContactConfig;
  whatsappUrl: (key: WhatsAppMessageKey, vars?: { name?: string }) => string;
  telPrimaryHref: string;
  telAltHref: string;
  navStructure: NavItem[];
  socialLinks: Array<{ href: string; icon: string; ariaLabel: string }>;
  localizedFooterLocation: (lang: "en" | "hi") => string;
  localizedRegisteredOffice: (lang: "en" | "hi") => string;
  mapFacilityIcon: (iconKey: string) => Icon;
  mapFacilities: (lang: "en" | "hi") => Facility[];
  whatsappUrlWithText: (text: string) => string;
  mailtoInquiryUrl: string;
};

const SiteContactContext = createContext<SiteContactContextValue | null>(null);

const FACILITY_ICON_MAP: Record<string, Icon> = {
  plant: Plant,
  warehouse: Warehouse,
  cap: Buildings,
  tractor: Stack,
  chart: TrendUp,
  handshake: ShieldCheck,
  drop: Plant,
  users: Info,
};

function mapFacilityFromConfig(
  facility: SiteFacilityConfig,
  lang: "en" | "hi",
  mapIcon: SiteContactContextValue["mapFacilityIcon"],
): Facility {
  const isHi = lang === "hi";
  const district = isHi ? facility.districtHi : facility.districtEn;
  return {
    id: facility.id,
    name: isHi ? facility.nameHi : facility.nameEn,
    tagline: isHi ? facility.taglineHi : facility.taglineEn,
    role: isHi ? facility.roleHi : facility.roleEn,
    address: isHi ? facility.addressHi : facility.addressEn,
    district,
    state: district.split(",").pop()?.trim() || district.trim(),
    plusCode: facility.plusCode,
    phone: facility.phone,
    telRaw: facility.telRaw,
    email: facility.email,
    hours: isHi ? facility.hoursHi : facility.hoursEn,
    team: isHi ? facility.teamHi : facility.teamEn,
    highlights: isHi ? facility.highlightsHi : facility.highlightsEn,
    mapsUrl: facility.mapsUrl,
    mapEmbedQuery: facility.mapEmbedQuery,
    coordinates: {
      lat: facility.lat,
      lng: facility.lng,
      latLabel: facility.latLabel,
      lngLabel: facility.lngLabel,
    },
    icon: mapIcon(facility.iconKey) as Facility["icon"],
    image: facility.imageUrl,
    isPrimary: facility.isPrimary,
  };
}

function buildNavStructure(contact: SiteContactConfig): NavItem[] {
  const wa = contact.whatsappMessages;
  const num = contact.whatsappNumber;
  return [
    { key: "home", href: "/", hash: "hero", icon: House },
    {
      key: "services",
      href: "/",
      icon: Stack,
      subLinks: [
        {
          key: "advisory",
          href: buildWhatsAppUrl(num, wa.agronomist),
          external: true,
          label: "Talk to Agronomist",
          desc: "Direct field diagnosis, spray charts & farm visits",
          icon: ChatCircleDots,
        },
        {
          key: "kisaanMall",
          href: "/kisaan-mall",
          label: "Kisaan Mall",
          desc: "Direct-from-brand seeds, fertilizers & inputs",
          icon: Storefront,
        },
        {
          key: "nursery",
          href: "/",
          hash: "pillar-nursery",
          label: "Bio-Boosted Nursery",
          desc: "98% survival high-yield plug seedlings & saplings",
          icon: Plant,
        },
        {
          key: "bigFarmSetup",
          href: buildWhatsAppUrl(num, wa.bigFarmSetup),
          external: true,
          label: "Big Farm Setup",
          desc: "End-to-end turnkey farm setup for clients",
          icon: ShieldCheck,
        },
        {
          key: "agriPark",
          href: "/",
          hash: "agri-park",
          label: "Agri Park",
          desc: "Live crop demonstration, R&D & farmer trials",
          icon: Compass,
        },
        {
          key: "farmTech",
          href: "/",
          hash: "agaate-app",
          label: "Agaate Mobile App",
          desc: "Digital farm diary, crop scheduling & advisories",
          icon: DeviceMobile,
        },
        {
          key: "marketLinkage",
          href: "/",
          hash: "pillar-market",
          label: "Market Linkage",
          desc: "Direct retail buyers & guaranteed buyback",
          icon: TrendUp,
        },
        {
          key: "carbonCredits",
          href: buildWhatsAppUrl(num, wa.carbonCredits),
          external: true,
          label: "Carbon Credits",
          desc: "Earn extra income from sustainable farming",
          icon: Tree,
        },
      ],
    },
    { key: "kisaanMall", href: "/kisaan-mall", icon: Storefront },
    { key: "about", href: "/about", icon: Info },
    { key: "contact", href: "/contact", icon: Phone },
  ];
}

export function SiteContactProvider({
  contact,
  children,
}: {
  contact: SiteContactConfig;
  children: ReactNode;
}) {
  const value = useMemo<SiteContactContextValue>(() => {
    const normalized = contact ?? SITE_CONTACT_FALLBACK;
    const social = normalized.social;
    const mapFacilityIcon = (iconKey: string) => FACILITY_ICON_MAP[iconKey] ?? Plant;
    return {
      contact: normalized,
      whatsappUrl: (key, vars) => {
        let message = normalized.whatsappMessages[key];
        if (vars?.name) {
          message = message.replace("{name}", vars.name);
        }
        return buildWhatsAppUrl(normalized.whatsappNumber, message);
      },
      telPrimaryHref: buildTelHref(normalized.primaryTel),
      telAltHref: buildTelHref(normalized.altTel),
      navStructure: buildNavStructure(normalized),
      socialLinks: [
        { href: social.facebook, icon: facebookIcon, ariaLabel: "Facebook" },
        { href: social.youtube, icon: youtubeIcon, ariaLabel: "YouTube" },
        { href: social.instagram, icon: instagramIcon, ariaLabel: "Instagram" },
        { href: social.linkedin, icon: linkedinIcon, ariaLabel: "LinkedIn" },
      ],
      localizedFooterLocation: (lang) =>
        lang === "hi" ? normalized.footerLocationHi : normalized.footerLocationEn,
      localizedRegisteredOffice: (lang) =>
        lang === "hi" ? normalized.registeredOfficeHi : normalized.registeredOfficeEn,
      mapFacilityIcon,
      mapFacilities: (lang) =>
        normalized.facilities.map((f) => mapFacilityFromConfig(f, lang, mapFacilityIcon)),
      whatsappUrlWithText: (text) => buildWhatsAppUrl(normalized.whatsappNumber, text),
      mailtoInquiryUrl: buildMailtoHref(
        normalized.primaryEmail,
        "Inquiry — Agaate",
        normalized.whatsappMessages.contact,
      ),
    };
  }, [contact]);

  return <SiteContactContext.Provider value={value}>{children}</SiteContactContext.Provider>;
}

export function useSiteContact(): SiteContactContextValue {
  const ctx = useContext(SiteContactContext);
  if (!ctx) {
    const fallback = SITE_CONTACT_FALLBACK;
    const mapFacilityIcon = (iconKey: string) => FACILITY_ICON_MAP[iconKey] ?? Plant;
    return {
      contact: fallback,
      whatsappUrl: (key, vars) => {
        let message = fallback.whatsappMessages[key];
        if (vars?.name) message = message.replace("{name}", vars.name);
        return buildWhatsAppUrl(fallback.whatsappNumber, message);
      },
      telPrimaryHref: buildTelHref(fallback.primaryTel),
      telAltHref: buildTelHref(fallback.altTel),
      navStructure: buildNavStructure(fallback),
      socialLinks: [
        { href: fallback.social.facebook, icon: facebookIcon, ariaLabel: "Facebook" },
        { href: fallback.social.youtube, icon: youtubeIcon, ariaLabel: "YouTube" },
        { href: fallback.social.instagram, icon: instagramIcon, ariaLabel: "Instagram" },
        { href: fallback.social.linkedin, icon: linkedinIcon, ariaLabel: "LinkedIn" },
      ],
      localizedFooterLocation: (lang) =>
        lang === "hi" ? fallback.footerLocationHi : fallback.footerLocationEn,
      localizedRegisteredOffice: (lang) =>
        lang === "hi" ? fallback.registeredOfficeHi : fallback.registeredOfficeEn,
      mapFacilityIcon,
      mapFacilities: (lang) =>
        fallback.facilities.map((f) => mapFacilityFromConfig(f, lang, mapFacilityIcon)),
      whatsappUrlWithText: (text) => buildWhatsAppUrl(fallback.whatsappNumber, text),
      mailtoInquiryUrl: buildMailtoHref(
        fallback.primaryEmail,
        "Inquiry — Agaate",
        fallback.whatsappMessages.contact,
      ),
    };
  }
  return ctx;
}

export function useConsultationWhatsAppUrl(): string {
  const { whatsappUrl } = useSiteContact();
  return whatsappUrl("consultation");
}
