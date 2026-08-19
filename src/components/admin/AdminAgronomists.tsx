import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  UserCheck,
  Search,
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";

type Agronomist = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  territory: string;
  specialization: string;
  activeCases: number;
  completedVisits: number;
  rating: string;
};

const INITIAL_AGRONOMISTS: Agronomist[] = [
  {
    id: 1,
    name: "Aman Verma",
    role: "Senior Field Agronomist",
    email: "aman@agaate.in",
    phone: "+91 98765 44001",
    territory: "Maharashtra & Telangana (Nashik, Guntur, Warangal)",
    specialization: "Polyhouse Turnkey, Micro-Irrigation, DSR Carbon MRV",
    activeCases: 8,
    completedVisits: 64,
    rating: "4.9 / 5.0",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Agronomy Lead & Supervisor",
    email: "rahul@agaate.in",
    phone: "+91 98765 44002",
    territory: "North India (Varanasi, Punjab, Haryana)",
    specialization: "Bio-Boosted Nursery Hardening, Commercial Orchards",
    activeCases: 6,
    completedVisits: 92,
    rating: "5.0 / 5.0",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Agronomy Technical Support Executive",
    email: "priya@agaate.in",
    phone: "+91 98765 44003",
    territory: "South & West India (Kurnool, Dindori, Gujarat)",
    specialization: "Crop Nutrition Diagnostics, Kisan Wholesale Procurement",
    activeCases: 5,
    completedVisits: 48,
    rating: "4.8 / 5.0",
  },
];

export function AdminAgronomists() {
  const toast = useToast();
  const [agronomists, setAgronomists] = useState<Agronomist[]>(INITIAL_AGRONOMISTS);
  const [query, setQuery] = useState("");

  const filtered = agronomists.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.territory.toLowerCase().includes(query.toLowerCase()) ||
      a.specialization.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Technical Staff
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Agronomist Specialist Team</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage field specialists, active case workloads, and regional territory allocations.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
        <input
          placeholder="Search agronomist, territory, specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-stone-200/90 bg-white pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 shadow-2xs"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agro) => (
          <div
            key={agro.id}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                    {agro.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 leading-tight">{agro.name}</h3>
                    <p className="text-[11px] text-emerald-700 font-medium">{agro.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-700">
                  ⭐ {agro.rating}
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Territory Coverage</p>
                  <p className="text-xs text-stone-800 font-medium mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                    <span>{agro.territory}</span>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Domain Focus</p>
                  <p className="text-xs text-stone-800 font-medium mt-0.5">{agro.specialization}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-xl bg-emerald-50/80 p-2 border border-emerald-100">
                  <p className="text-lg font-bold text-emerald-900">{agro.activeCases}</p>
                  <p className="text-[10px] font-semibold text-emerald-700 uppercase">Active Cases</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-2 border border-stone-100">
                  <p className="text-lg font-bold text-stone-900">{agro.completedVisits}</p>
                  <p className="text-[10px] font-semibold text-stone-500 uppercase">Audits Completed</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <a
                href={`mailto:${agro.email}`}
                className="text-[11px] text-stone-500 hover:text-stone-800 truncate"
              >
                {agro.email}
              </a>
              <Link
                to="/agaate-admin/contacts"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View Pipeline
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
