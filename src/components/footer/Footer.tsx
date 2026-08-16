import { Link, useParams } from "@tanstack/react-router";
import { useState, type ReactNode, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Envelope, Phone } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { FooterDotShader } from "./FooterDotShader";
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
  const { locale } = useParams({ strict: false }) as any;
  const { i18n } = useTranslation();
  const currentLang = locale ?? i18n.language ?? "en";
  const [isHovered, setIsHovered] = useState(false);
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <>
      {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </>
  );

  return (
    <motion.div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 z-0 bg-forest/5"
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      />
      {isExternal ? (
        <a
          href={href}
          className="relative z-10 flex h-full items-center justify-start px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-forest md:text-sm"
        >
          {content}
        </a>
      ) : (
        <Link
          to={getLocalizedPath(href, currentLang) as any}
          className="relative z-10 flex h-full items-center justify-start px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-forest md:text-sm"
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation("common");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-[#FAFBFB] text-[#17211B]">
      {/* Three.js Dot Matrix Shader Background */}
      <div className="pointer-events-auto absolute inset-0 z-0 opacity-60 mix-blend-multiply">
        <FooterDotShader
          animationSpeed={3}
          containerClassName="bg-transparent absolute inset-0"
          colors={[
            [34, 197, 94], // green-500
            [16, 185, 129], // emerald-500
          ]}
          dotSize={1.5}
          showGradient={true}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-8 pt-14 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-6">
                <Link to={getLocalizedPath("/", currentLang) as any}>
                  <img src="/logo.png" alt="Agaate Logo" className="mb-5 h-10 w-auto lg:h-12" />
                </Link>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "footer.tagline",
                    "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
                  )}
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((item) => (
                <motion.a
                  key={item.ariaLabel}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-white p-2 shadow-xs transition-colors hover:border-forest/40"
                >
                  <img
                    src={item.icon}
                    className="h-4 w-4 object-contain opacity-80"
                    alt={item.ariaLabel}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
            {/* Company */}
            <div className="flex flex-col gap-2">
              <h4 className="font-jet text-[11px] font-bold uppercase tracking-[0.18em] text-[#17211B]">
                {t("footer.company", "Company")}
              </h4>
              <div className="flex flex-col border-l border-border pl-1">
                {COMPANY_LINKS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {t(link.labelKey as any, link.fallback)}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Explore Solutions */}
            <div className="flex flex-col gap-2">
              <h4 className="font-jet text-[11px] font-bold uppercase tracking-[0.18em] text-[#17211B]">
                {t("footer.explore", "Solutions")}
              </h4>
              <div className="flex flex-col border-l border-border pl-1">
                {EXPLORE_LINKS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {t(link.labelKey as any, link.fallback)}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Contact & Nursery Coordinates */}
            <div className="flex flex-col gap-2">
              <h4 className="font-jet text-[11px] font-bold uppercase tracking-[0.18em] text-[#17211B]">
                {t("footer.contactHeading", "Contact")}
              </h4>
              <div className="flex flex-col border-l border-border pl-1">
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
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground md:text-sm">
            {t("footer.copyright", {
              year: new Date().getFullYear(),
              defaultValue: `© ${new Date().getFullYear()} Agaate (Anzix Farm Technologies Pvt Ltd). All rights reserved.`,
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm">
            <Link
              to={getLocalizedPath("/privacy-policy", currentLang) as any}
              className="text-muted-foreground transition-colors hover:text-forest"
            >
              {t("footer.privacyPolicy", "Privacy Policy")}
            </Link>
            <Link
              to={getLocalizedPath("/terms-of-service", currentLang) as any}
              className="text-muted-foreground transition-colors hover:text-forest"
            >
              {t("footer.termsOfService", "Terms of Service")}
            </Link>
            <Link
              to={getLocalizedPath("/cookie-policy", currentLang) as any}
              className="text-muted-foreground transition-colors hover:text-forest"
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
