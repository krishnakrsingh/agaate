import {
  ArrowUpRight,
  Camera,
  Check,
  CircleCheck,
  ClipboardCheck,
  MessageCircleMore,
  Phone,
  Send,
} from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import fertigationImage from "@/assets/journey-06-fertigation.png";
import { SectionEyebrow } from "./Shared";

const advisoryOutputs = [
  {
    icon: Camera,
    title: "See the problem clearly",
    text: "Start with the crop photo, field observation, or question a farmer already has.",
  },
  {
    icon: ClipboardCheck,
    title: "Know the next field task",
    text: "Turn the response into one understandable action for the current crop stage.",
  },
  {
    icon: CircleCheck,
    title: "Keep the crop moving",
    text: "Use stage-wise follow-ups to stay on top of what the crop needs next.",
  },
];

export function TalkToAgronomist() {
  return (
    <>
      <section
        id="talk-to-agronomist"
        className="scroll-mt-24 overflow-hidden bg-[#12382D] px-6 py-20 text-[#F7F7F0] md:px-10 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-end gap-8 border-t border-white/15 pt-7 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionEyebrow dark>Core offering / 01</SectionEyebrow>
              <h2 className="mt-6 max-w-xl font-serif text-[clamp(3rem,5.2vw,5.4rem)] leading-[0.94] tracking-[-0.055em]">
                Talk to <span className="italic text-[#B8F08F]">Agronomist.</span>
              </h2>
            </div>
            <div className="max-w-md lg:col-span-4 lg:col-start-8">
              <p className="text-[17px] leading-7 text-white/70">
                A farmer-first application that brings crop questions, visual diagnosis, and
                stage-wise guidance into one practical conversation.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-12 lg:gap-10">
            <div className="order-2 lg:order-1 lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
              <div className="divide-y divide-white/12 border-y border-white/12">
                {[
                  ["01", "Share what you see", "Send a crop photo or describe the concern."],
                  ["02", "Get a clear action", "Receive practical, crop-stage guidance."],
                  ["03", "Stay on schedule", "Follow the next task through the growing cycle."],
                ].map(([number, title, text]) => (
                  <div key={number} className="grid grid-cols-[34px_1fr] gap-4 py-5">
                    <span className="font-jet text-[11px] text-[#B8F08F]">{number}</span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="tel:9487263498"
                className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#B8F08F] px-5 py-3 text-sm font-bold text-[#12382D] transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                Talk to an agronomist
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="order-1 relative min-h-[475px] overflow-hidden rounded-[2rem] bg-[#0B251D] p-5 sm:p-8 lg:order-2 lg:col-span-5 lg:min-h-[570px]">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(184,240,143,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(184,240,143,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative mx-auto max-w-[355px] rounded-[2rem] border border-white/15 bg-[#F8F8F4] p-3 text-[#143D31] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between border-b border-[#143D31]/10 px-2 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#DDF0D4] text-[#216147]">
                      <MessageCircleMore className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Agaate Agronomy</p>
                      <p className="mt-0.5 text-[10px] text-[#537167]">Online · crop support</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#EAF4E7] px-2 py-1 font-jet text-[8px] font-bold uppercase tracking-[0.11em] text-[#387255]">
                    Tomato
                  </span>
                </div>
                <div className="space-y-3 p-2 pt-5 text-[11px] leading-[1.5]">
                  <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-[#DCF0D5] px-3 py-2.5">
                    Leaves are curling on my field. What should I check first?
                  </div>
                  <div className="max-w-[87%] rounded-2xl rounded-tl-sm bg-[#EFF1ED] px-3 py-2.5">
                    Please send a close crop photo and tell me the crop stage. We’ll separate heat
                    stress from pest pressure.
                  </div>
                  <div className="ml-auto flex max-w-[78%] items-center gap-2 rounded-2xl rounded-tr-sm bg-[#DCF0D5] px-3 py-2.5">
                    <Camera className="h-4 w-4 text-[#387255]" />
                    <span>Photo shared</span>
                    <Check className="ml-auto h-3.5 w-3.5 text-[#387255]" />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#143D31] px-3 py-3 text-white">
                    <p className="font-bold text-[#B8F08F]">Today’s next step</p>
                    <p className="mt-1 text-white/80">
                      Check the underside of affected leaves this evening. I’ve added the next field
                      task to your crop plan.
                    </p>
                  </div>
                </div>
                <div className="mx-2 mb-1 flex items-center gap-2 rounded-xl border border-[#143D31]/10 px-3 py-2.5 text-[10px] text-[#6E8279]">
                  Type a crop question
                  <Send className="ml-auto h-3.5 w-3.5 text-[#387255]" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
                <span className="font-jet text-[9px] uppercase tracking-[0.16em] text-white/50">
                  Crop guidance, in context
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B8F08F]">
                  <CircleCheck className="h-3.5 w-3.5" /> Stage-wise
                </span>
              </div>
            </div>

            <div className="order-3 overflow-hidden rounded-[2rem] bg-[#1D4A3B] lg:col-span-3">
              <img
                src={advisorImage}
                alt="An Agaate agronomist reviewing a crop with a farmer"
                className="h-64 w-full object-cover lg:h-[420px]"
              />
              <div className="p-5">
                <p className="font-serif text-2xl leading-none">Advice has to work in the field.</p>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Built around the decisions farmers need to make now, not generic information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8F3] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 border-t border-[#143D31]/15 pt-7 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionEyebrow>More than a response</SectionEyebrow>
              <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.6rem,4.8vw,4.9rem)] leading-[0.98] tracking-[-0.05em] text-[#12382D]">
                A crop question should return a <span className="italic text-[#C9693B]">plan.</span>
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-7 text-[#486158]">
                The value of Talk to Agronomist is not just access to an expert. It is the clarity
                to decide what to observe, what to do, and what comes next in the crop cycle.
              </p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#153D31] lg:col-span-4 lg:min-h-[470px]">
              <img
                src={fertigationImage}
                alt="Drip irrigation supporting a growing tomato crop"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12382D]/90 via-[#12382D]/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-[#12382D]/65 p-4 text-white backdrop-blur-sm">
                <p className="font-jet text-[9px] uppercase tracking-[0.18em] text-[#B8F08F]">
                  Crop plan / today
                </p>
                <p className="mt-2 font-serif text-2xl leading-[1.05]">
                  Keep the daily decision close to the crop.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 lg:col-span-3">
              {advisoryOutputs.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-[1.35rem] border border-[#143D31]/15 bg-white p-5"
                >
                  <Icon className="h-5 w-5 text-[#2E6B50]" />
                  <h3 className="mt-5 font-serif text-2xl leading-[1.02] tracking-[-0.035em] text-[#12382D]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#587066]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
