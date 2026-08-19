import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  Sprout,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";

type Consultation = {
  id: number;
  farmer: string;
  phone: string;
  crop: string;
  topic: string;
  urgency: "High" | "Medium" | "Low";
  status: "Open" | "In Review" | "Resolved";
  summary: string;
  created_at: string;
};

const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 1,
    farmer: "Fatima Khan",
    phone: "+91 98765 00006",
    crop: "Bt Cotton & Pigeon Pea",
    topic: "Pink Bollworm IPM & Foliar Schedule",
    urgency: "High",
    status: "Open",
    summary: "Requesting agronomy consultation on pheromone trap monitoring and bio-fungicide rotation.",
    created_at: "2 hours ago",
  },
  {
    id: 2,
    farmer: "Harpreet Singh",
    phone: "+91 98765 00003",
    crop: "Direct Seeded Rice",
    topic: "Carbon MRV Baseline Soil Organic Carbon",
    urgency: "Medium",
    status: "In Review",
    summary: "Soil core sampling protocol review for carbon credit certification.",
    created_at: "1 day ago",
  },
  {
    id: 3,
    farmer: "Meena Joshi",
    phone: "+91 98765 00004",
    crop: "Export Onion",
    topic: "Post-Harvest Curing & Bio-Stimulants",
    urgency: "Low",
    status: "Resolved",
    summary: "Provided spray recommendation for micro-nutrient balancing and curing storage prep.",
    created_at: "3 days ago",
  },
];

export function AdminConsultations() {
  const toast = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>(INITIAL_CONSULTATIONS);
  const [query, setQuery] = useState("");

  const filtered = consultations.filter(
    (c) =>
      c.farmer.toLowerCase().includes(query.toLowerCase()) ||
      c.crop.toLowerCase().includes(query.toLowerCase()) ||
      c.topic.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Agronomy Advisory
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Crop Diagnostic Consultations</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Technical crop health triage, soil fertility balancing, and precision pest management advisory.
          </p>
        </div>

        <Link
          to="/agaate-admin/contacts"
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Consultation</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
        <input
          placeholder="Search crop, diagnosis topic, farmer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-stone-200/90 bg-white pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 shadow-2xs"
        />
      </div>

      {/* Consultations List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900">{item.farmer}</span>
                <span className="text-stone-300">·</span>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {item.crop}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.status === "Resolved"
                      ? "bg-stone-100 text-stone-600"
                      : item.status === "In Review"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-sky-50 text-sky-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-stone-800">{item.topic}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{item.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${item.phone}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 transition-colors"
                title="Call"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/agaate-admin/contacts/$id"
                params={{ id: String(item.id) }}
                className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
              >
                <span>Open Case</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
