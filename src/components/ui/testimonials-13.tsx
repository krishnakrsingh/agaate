import type { ComponentProps } from "react";
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
} from "@/components/ui/testimonials-13-utils/logos";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Pankaj Gupta",
    designation: "Agaate Parivaar Member",
    company: "Karnal, Haryana · 12 Acres",
    testimonial:
      "Agaate Kisan Mall is a game changer. Getting batch-verified seeds and Bio-Cures direct from manufacturers saved my chilli crop from wilt and boosted yield by 25%.",
    avatar:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80",
    logo: Logo01,
  },
  {
    id: 2,
    name: "Rameshwar Singh",
    designation: "Progressive Vegetable Farmer",
    company: "Kukrola, Gurugram · 8 Acres",
    testimonial:
      "Visiting the 17-acre Agri Park before buying my drip fertigation kit helped me see the exact dose results on living crops. Zero guesswork.",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    logo: Logo02,
  },
  {
    id: 3,
    name: "Rajesh Yadav",
    designation: "Kisan Sathi & Lead Grower",
    company: "Rewari, Haryana · 18 Acres",
    testimonial:
      "Agaate's Bio-Boosted nursery seedlings have 98% survival compared to 60% from traditional seed sowing. My input cost dropped by 40%.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    logo: Logo03,
  },
  {
    id: 4,
    name: "Sunita Devi",
    designation: "Woman Agri-Entrepreneur",
    company: "Sonipat, Haryana · 15 Acres",
    testimonial:
      "Doorstep delivery in 24 hours with QR batch tracking gives us complete peace of mind against duplicate chemicals. Highest tomato harvest ever.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    logo: Logo04,
  },
  {
    id: 5,
    name: "Vikramaditya Rao",
    designation: "Horticulture Specialist",
    company: "Rohtak, Haryana · 25 Acres",
    testimonial:
      "Senior Agronomist field visits and soil testing guide exact spray charts. We saved over ₹85,000 on unnecessary pesticides this season.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    logo: Logo05,
  },
  {
    id: 6,
    name: "Abhay Ranjan",
    designation: "Agaate Parivaar Member",
    company: "Farrukhnagar, Haryana · 10 Acres",
    testimonial:
      "From seed selection to direct buyer market linkages, Agaate provides an end-to-end ecosystem that doubled our farm profitability.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    logo: Logo06,
  },
];

const Testimonials = () => (
  <div className="px-6 py-12">
    <h2 className="text-center font-display font-bold text-3xl md:text-4xl text-[#143d31] tracking-tight">
      Farmer Success Stories
    </h2>
    <p className="mt-3 text-center text-[#4f624f] text-base md:text-lg max-w-2xl mx-auto">
      Real voices from Agaate Parivaar members across Haryana & NCR
    </p>
    <div className="mask-x-from-80% mt-10 space-y-px border-y border-[#143d31]/10 bg-[#f4f8f5]">
      <Marquee className="py-0 [--duration:50s] [--gap:0px]" pauseOnHover>
        <TestimonialList />
      </Marquee>
    </div>
  </div>
);

const TestimonialList = ({ className, ...props }: ComponentProps<"div">) =>
  testimonials.map((testimonial) => (
    <div className="-mx-1 flex w-full max-w-sm flex-col odd:flex-col-reverse" key={testimonial.id}>
      <div
        className={cn("rounded-2xl border border-[#143d31]/12 bg-white shadow-xs p-6", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border-2 border-[#5d7d37]/30">
              <AvatarImage className="object-cover" src={testimonial.avatar} />
              <AvatarFallback className="bg-[#143d31] font-bold text-white text-lg">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-[#143d31] text-sm">{testimonial.name}</p>
              <p className="text-[#5d7d37] text-xs font-semibold">{testimonial.designation}</p>
              <p className="text-[#4f624f] text-[10px] font-mono">{testimonial.company}</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#143d31] leading-relaxed font-normal">
          "{testimonial.testimonial}"
        </p>
      </div>
      <div className="mask-y-from-75% mask-x-from-75% relative flex h-36 w-96 items-center justify-center p-6">
        <testimonial.logo className="h-16 w-44 text-[#143d31]/30" />

        <div
          className="absolute inset-0 isolate -z-1 opacity-15"
          style={{
            backgroundImage: `
        linear-gradient(to right, var(--color-muted-foreground) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-muted-foreground) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>
    </div>
  ));

export default Testimonials;
