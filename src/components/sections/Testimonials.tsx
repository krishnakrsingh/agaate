import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import { WaveTransition } from "./SectionTransitions";

/* 8. FARMER TESTIMONIALS */
export default function Testimonials() {
  const reviews = [
    { name: "Ramesh Patel", place: "Anand, Gujarat", crop: "Tomatoes", yieldGain: "+25% Yield", quote: "Agaate caught a fungal issue early. My tomato crop quality has never been better and yield is up 25%.", img: t1 },
    { name: "Lakshmi Devi", place: "Warangal, Telangana", crop: "Chilli", yieldGain: "40% Less Water", quote: "The nursery saplings establish far better. Sourcing fertilizers is transparent and on time.", img: t2 },
    { name: "Arjun Singh", place: "Ludhiana, Punjab", crop: "Cabbage", yieldGain: "Direct Institutional Buy", quote: "With stage-wise harvest advice, we achieved better pricing and direct institutional buyers.", img: t3 }
  ];

  return (
    <>
      <WaveTransition topColor="#FFFFFF" bottomColor="#F8FAF7" />
      <section className="bg-[#F8FAF7] py-24 lg:py-32 px-6 lg:px-12 border-b border-[#E7ECE8] relative overflow-hidden text-left">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-[12px] md:text-[13px] font-bold uppercase tracking-[0.1em] text-forest mb-4">TRUSTED BY FARMERS</div>
            <h2 className="font-display text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px] font-bold text-[#17211B] leading-[1.1] tracking-[-0.03em]">
              Real Results from Real Vegetable Growers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white border border-[#E7ECE8] rounded-3xl p-8 flex flex-col justify-between text-left shadow-sm hover:shadow-xl hover:border-forest/40 hover:-translate-y-1.5 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-forest/10 text-forest font-mono text-xs font-bold rounded-full">
                      ✓ VERIFIED FARMER
                    </span>
                    <span className="px-3 py-1 bg-moss/15 text-forest font-mono text-xs font-bold rounded-full">
                      {r.yieldGain}
                    </span>
                  </div>
                  <p className="text-[#17211B] text-[18px] md:text-[21px] font-normal leading-[1.6] mb-8 group-hover:text-forest transition-colors">
                    "{r.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-[#E7ECE8]">
                  <img src={r.img} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-forest/30 shadow-md" />
                  <div>
                    <div className="font-sans font-bold text-[#17211B] text-[17px]">{r.name}</div>
                    <div className="text-[#59635D] text-[14px] mt-0.5">{r.place} • <span className="text-forest font-mono font-bold">{r.crop}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
