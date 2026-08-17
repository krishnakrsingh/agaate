import { useState } from "react";
import {
  ChatCircleText,
  CheckCircle,
  Image as ImageIcon,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";

const SIMULATED_WORKFLOWS = [
  {
    id: "stage-guidance",
    title: "Stage-Wise Guidance",
    desc: "Personalized daily alerts mapped to your crop lifecycle.",
    chats: [
      {
        from: "sathi",
        text: "Namaste Ramesh Ji! Your Watermelon crop is entering Flowering Stage today (Day 32).",
      },
      { from: "farmer", text: "What is the recommended fertigation for this stage?" },
      {
        from: "sathi",
        text: "Apply NPK 13:40:13 @ 3kg/acre along with Calcium Boron spray. Stage-wise advisory sheet attached.",
      },
      { from: "farmer", text: "Received! Thank you. Direct WhatsApp advice makes it so simple." },
    ],
  },
  {
    id: "photo-diagnosis",
    title: "Photo Disease Diagnosis",
    desc: "Snap a photo of leaf spots for instant 30-min treatment protocol.",
    chats: [
      {
        from: "farmer",
        text: "Yellowing and white spots on chilli leaves. Sending field photo.",
        hasImage: true,
      },
      {
        from: "sathi",
        text: "Image scanned. Diagnosis: Early Powdery Mildew due to high morning humidity.",
      },
      {
        from: "sathi",
        text: "Prescription: Spray Biocure F @ 3ml/L before sunrise. Repeat after 5 days if humidity stays above 80%.",
      },
      { from: "farmer", text: "Starting spray now. Thanks for the rapid response!" },
    ],
  },
  {
    id: "buyback-market",
    title: "Guaranteed Buyback Linkage",
    desc: "Real-time crop market pricing and pickup confirmation.",
    chats: [
      {
        from: "farmer",
        text: "My Watermelon lot (Grade A) will be ready for harvest on Thursday. What is the current buyback rate?",
      },
      {
        from: "sathi",
        text: "Current Agaate Buyback Rate for Grade A Watermelon: ₹18.50/kg direct pickup at your farm gate.",
      },
      {
        from: "sathi",
        text: "Transport truck scheduled for Thursday 9:00 AM. No middleman deductions.",
      },
      { from: "farmer", text: "Confirmed! Excellent price security." },
    ],
  },
];

export function WhatsAppWorkflowSimulator() {
  const [activeWorkflowId, setActiveWorkflowId] = useState("photo-diagnosis");
  const activeWorkflow =
    SIMULATED_WORKFLOWS.find((w) => w.id === activeWorkflowId) || SIMULATED_WORKFLOWS[0];

  return (
    <section id="whatsapp-simulator" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="ON-GROUND ADVISORY DESK"
        title="Live Agronomist Support On WhatsApp."
        description="Experience the rapid 30-minute response speed and precision prescriptions our Parivaar growers receive every day."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Workflow Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-border pb-6">
          {SIMULATED_WORKFLOWS.map((wf) => {
            const isActive = activeWorkflowId === wf.id;
            return (
              <button
                key={wf.id}
                type="button"
                onClick={() => setActiveWorkflowId(wf.id)}
                className={`cursor-pointer rounded-full px-5 py-2.5 font-mono text-xs font-bold transition-all ${
                  isActive
                    ? "bg-forest-deep text-cream shadow-md"
                    : "border border-border bg-bone text-forest/70 hover:border-forest/40"
                }`}
              >
                {wf.title}
              </button>
            );
          })}
        </div>

        {/* Chat Simulator Workbench */}
        <div className="mx-auto mt-8 max-w-xl space-y-4 rounded-3xl border border-emerald-600/20 bg-[#e5ddd5] p-6 shadow-inner">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white">
                <ChatCircleText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-slate-900">Agaate Kisan Sathi</p>
                <span className="text-[10px] text-emerald-800">Online · Advisory Active</span>
              </div>
            </div>
            <span className="font-mono text-[10px] font-bold text-slate-600">Encrypted Chat</span>
          </div>

          <div className="space-y-3 py-2">
            {activeWorkflow.chats.map((msg, i) => {
              const isSathi = msg.from === "sathi";
              return (
                <div key={i} className={`flex ${isSathi ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs ${
                      isSathi
                        ? "rounded-tl-xs bg-white text-slate-900"
                        : "rounded-tr-xs bg-[#dcf8c6] text-slate-900"
                    }`}
                  >
                    {msg.hasImage && (
                      <div className="mb-2 flex items-center gap-2 rounded-xl bg-emerald-100/70 p-2 text-[11px] font-semibold text-emerald-900">
                        <ImageIcon className="h-4 w-4" />
                        <span>Chilli_Field_Sample_04.jpg</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="mt-1 block text-right font-mono text-[9px] text-slate-400">
                      10:{30 + i} AM · Delivered
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white p-2">
            <input
              type="text"
              disabled
              placeholder="Live demo session. Tap tabs above to switch scenarios..."
              className="w-full bg-transparent px-3 text-xs text-slate-600 outline-none"
            />
            <button
              type="button"
              disabled
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white opacity-80"
            >
              <PaperPlaneRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
