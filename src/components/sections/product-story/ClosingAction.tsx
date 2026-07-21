import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircleMore, ShoppingBasket } from "lucide-react";
import { SectionEyebrow } from "./Shared";

export function ClosingAction() {
  return (
    <section className="bg-[#F4F7F0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1040px] text-center">
        <div className="flex justify-center">
          <SectionEyebrow>Begin with the next right step</SectionEyebrow>
        </div>
        <h2 className="mx-auto mt-7 max-w-4xl font-serif text-[clamp(2.8rem,5.5vw,5.8rem)] leading-[0.95] tracking-[-0.06em] text-[#12382D]">
          Better crop decisions should feel{" "}
          <span className="italic text-[#C9693B]">within reach.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-7 text-[#486158]">
          Start a conversation with an agronomist, or visit Kisaan Mall for the inputs that help
          turn a crop plan into action.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="tel:9487263498"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12382D] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <MessageCircleMore className="h-4 w-4 text-[#B8F08F]" />
            Talk to an agronomist
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            to="/services/kisaan-mall"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#12382D]/25 px-6 py-3.5 text-sm font-bold text-[#12382D] transition-colors hover:border-[#12382D] hover:bg-white sm:w-auto"
          >
            <ShoppingBasket className="h-4 w-4 text-[#C9693B]" />
            Explore Kisaan Mall
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-10 inline-flex items-center gap-2 text-sm text-[#526C61]">
          <MapPin className="h-4 w-4 text-[#C9693B]" />
          Agaate Kisaan Mall · Bilaspur Road, Gurugram, Haryana
        </div>
      </div>
    </section>
  );
}
