import { ArrowRight, Phone } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

export default function ClosingChapter() {
  const { t, i18n } = useTranslation("conversion");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section className="bg-[#EAD7A7] px-6 py-20 text-[#173F32] md:px-10 md:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A5A31]">
            {t("closing.eyebrow")}
          </p>
          <h2 className="mt-7 max-w-5xl font-serif text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.065em]">
            {t("closing.titleStart")} <span className="italic">{t("closing.titleEmphasis")}</span>
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[#4B5E49]">
            {t("closing.description")}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <Link
            to={getLocalizedPath("/contact", currentLang) as any}
            className="group inline-flex items-center gap-3 bg-[#173F32] px-6 py-4 text-sm font-semibold text-[#F4F6EE] transition-transform hover:-translate-y-1"
          >
            {t("closing.primaryCta")}{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:9487263498"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#173F32] underline decoration-[#173F32]/35 underline-offset-4 hover:decoration-[#173F32]"
          >
            <Phone className="h-4 w-4" /> {t("closing.callCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
