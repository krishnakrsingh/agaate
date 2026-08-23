import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, type ComponentType } from "react";
import {
  Envelope,
  Phone,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, stripLocalePrefix } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { COMPANY_LINKS, EXPLORE_LINKS, SOCIAL_LINKS, CONTACT_DETAILS } from "./footer-data";

function FooterLink({
  href,
  children,
  icon: Icon,
  className,
}: {
  href: string;
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}) {
  const location = useLocation();
  const isHindi = location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const currentLang = isHindi ? "hi" : "en";
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <div className="flex items-center justify-start py-1 text-xs text-[#fafbf7]/75 transition-colors hover:text-white md:text-sm group">
      {Icon && (
        <Icon className="mr-2 h-4 w-4 shrink-0 transition-colors duration-200 group-hover:text-white" />
      )}
      <span>{children}</span>
    </div>
  );

  const isHash = href.startsWith("/#") || href.startsWith("#");
  const targetHash = isHash ? href.replace(/^\/?#/, "") : undefined;
  const targetPath = isHash ? "/" : href;

  return (
    <div className={cn("w-full", className)}>
      {isExternal ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        <Link
          to={getLocalizedPath(targetPath, currentLang) as any}
          hash={targetHash}
          onClick={() => {
            if (targetHash) {
              setTimeout(() => {
                const el = document.getElementById(targetHash);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 50);
            }
          }}
          className="block"
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const isHindi = location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const currentLang = isHindi ? "hi" : "en";

  return (
    <footer className="relative w-full bg-[#0d2a21] text-stone-200 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="text-left">
              <Link
                to={getLocalizedPath("/", currentLang) as any}
                hash="hero"
                onClick={() => {
                  const strippedPath = stripLocalePrefix(location.pathname);
                  if (strippedPath === "/") {
                    const heroEl = document.getElementById("hero");
                    if (heroEl) {
                      heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }
                }}
              >
                <img
                  src="/logo.svg"
                  alt="Agaate Logo"
                  className="mb-5 h-8 w-auto lg:h-9 brightness-0 invert"
                />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-[#fafbf7]/80">
                {t(
                  "footer.tagline",
                  "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
                )}
              </p>
            </div>

            {/* Social Channels - Pure White Icons */}
            <div className="mt-8 flex gap-5">
              {SOCIAL_LINKS.map((item) => {
                let IconComponent = FacebookLogo;
                if (item.ariaLabel.toLowerCase().includes("youtube")) {
                  IconComponent = YoutubeLogo;
                } else if (item.ariaLabel.toLowerCase().includes("instagram")) {
                  IconComponent = InstagramLogo;
                } else if (item.ariaLabel.toLowerCase().includes("linkedin")) {
                  IconComponent = LinkedinLogo;
                }

                return (
                  <a
                    key={item.ariaLabel}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="group flex items-center justify-center transition-all opacity-60 hover:opacity-100 hover:scale-110 text-white"
                  >
                    <IconComponent weight="bold" className="h-5 w-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
            {/* Company */}
            <div className="flex flex-col gap-3 text-left">
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#fafbf7]">
                {t("footer.company", "Company")}
              </h4>
              <div className="flex flex-col gap-1.5 pl-0.5">
                {COMPANY_LINKS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {t(link.labelKey as any, link.fallback)}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Explore Solutions */}
            <div className="flex flex-col gap-3 text-left">
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#fafbf7]">
                {t("footer.explore", "Solutions")}
              </h4>
              <div className="flex flex-col gap-1.5 pl-0.5">
                {EXPLORE_LINKS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {t(link.labelKey as any, link.fallback)}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Contact & Coordinates */}
            <div className="flex flex-col gap-3 text-left">
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#fafbf7]">
                {t("footer.contactHeading", "Contact")}
              </h4>
              <div className="flex flex-col gap-1.5 pl-0.5">
                <FooterLink href="/contact">{t("footer.contactUs", "Get In Touch")}</FooterLink>
                <FooterLink href={`tel:${CONTACT_DETAILS.phone}`} icon={Phone}>
                  {CONTACT_DETAILS.phoneDisplay}
                </FooterLink>
                <FooterLink href={`mailto:${CONTACT_DETAILS.email}`} icon={Envelope}>
                  {CONTACT_DETAILS.email}
                </FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#fafbf7]/60 md:text-sm">
            {t("footer.copyright", {
              year: new Date().getFullYear(),
              defaultValue: `© ${new Date().getFullYear()} Agaate. All rights reserved.`,
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm">
            <Link
              to={getLocalizedPath("/privacy-policy", currentLang) as any}
              className="text-[#fafbf7]/60 transition-colors hover:text-white"
            >
              {t("footer.privacyPolicy", "Privacy Policy")}
            </Link>
            <Link
              to={getLocalizedPath("/terms-of-service", currentLang) as any}
              className="text-[#fafbf7]/60 transition-colors hover:text-white"
            >
              {t("footer.termsOfService", "Terms of Service")}
            </Link>
            <Link
              to={getLocalizedPath("/cookie-policy", currentLang) as any}
              className="text-[#fafbf7]/60 transition-colors hover:text-white"
            >
              {t("footer.cookiePolicy", "Cookie Policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
