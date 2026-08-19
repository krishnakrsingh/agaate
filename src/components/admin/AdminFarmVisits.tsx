import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  UserCheck,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";

type Visit = {
  id: number;
  farmer: string;
  phone: string;
  district: string;
  acreage: string;
  crop: string;
  date: string;
  time: string;
  agronomist: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Follow-up Needed";
  objective: string;
  notes: string;
};

const INITIAL_VISITS: Visit[] = [
  {
    id: 1,
    farmer: "Sunita Devi",
    phone: "+91 98765 00002",
    district: "Nashik, Maharashtra",
    acreage: "55 Acres",
    crop: "Tomato & Polyhouse",
    date: "2026-08-19",
    time: "02:30 PM",
    agronomist: "Aman Verma",
    status: "Scheduled",
    objective: "Polyhouse topography inspection and automated drip fertigation baseline audit.",
    notes: "Farmer is ready with soil test reports. Requires drone topography elevation scan.",
  },
  {
    id: 2,
    farmer: "Ramesh Patel",
    phone: "+91 98765 00001",
    district: "Varanasi, Uttar Pradesh",
    acreage: "20 Acres",
    crop: "Chilli G4",
    date: "2026-08-20",
    time: "10:00 AM",
    agronomist: "Rahul Sharma",
    status: "Scheduled",
    objective: "Verify nursery pre-order hardening site and nursery tray planting schedule.",
    notes: "Requested 45,000 bio-boosted saplings delivery in 15 days.",
  },
  {
    id: 3,
    farmer: "Naveen Rao",
    phone: "+91 98765 00015",
    district: "Warangal, Telangana",
    acreage: "30 Acres",
    crop: "Maize & Cotton",
    date: "2026-08-21",
    time: "11:30 AM",
    agronomist: "Aman Verma",
    status: "Scheduled",
    objective: "Bio-fertigation injector testing and organic soil carbon amendment check.",
    notes: "Enrolled in Carbon Credit baseline monitoring.",
  },
  {
    id: 4,
    farmer: "Harpreet Singh",
    phone: "+91 98765 00003",
    district: "Ludhiana, Punjab",
    acreage: "35 Acres",
    crop: "Direct Seeded Rice (DSR)",
    date: "2026-08-17",
    time: "04:00 PM",
    agronomist: "Aman Verma",
    status: "Completed",
    objective: "MRV carbon verification and weed management triage for DSR block.",
    notes: "Verified soil moisture sensors. Farmer satisfied with germination rate.",
  },
];

export function AdminFarmVisits() {
  const toast = useToast();
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filtered = visits.filter((v) => {
    const matchesQuery =
      v.farmer.toLowerCase().includes(query.toLowerCase()) ||
      v.district.toLowerCase().includes(query.toLowerCase()) ||
      v.crop.toLowerCase().includes(query.toLowerCase()) ||
      v.agronomist.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = selectedStatus === "All" || v.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  const markComplete = (id: number) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Completed" as const } : v)),
    );
    toast.success("Visit Completed", "Marked field inspection as completed.");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Field Operations
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Farm Visits & Field Audits</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Coordinate onsite agronomist inspections, soil profiling, and precision equipment installations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => toast.info("Schedule Visit", "Select a contact request to book a visit date.")}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-all shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Schedule Farm Visit</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            placeholder="Search farmer, district, crop, agronomist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200/90 bg-white pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["All", "Scheduled", "Completed"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedStatus === status
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "bg-white border border-stone-200/80 text-stone-600 hover:bg-stone-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Visits Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((visit) => (
          <div
            key={visit.id}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">{visit.farmer}</h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-stone-400 shrink-0" />
                    <span>{visit.district}</span>
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    visit.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-teal-50 text-teal-800 ring-1 ring-teal-600/20"
                  }`}
                >
                  {visit.status}
                </span>
              </div>

              <div className="mt-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between bg-stone-50/80 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-semibold text-stone-800">{visit.date} · {visit.time}</span>
                  </div>
                  <span className="text-[11px] font-medium text-stone-500">{visit.acreage}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50/40 text-stone-700">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Audit Focus</p>
                  <p className="mt-0.5 text-xs text-stone-800 font-medium">{visit.objective}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-500">Lead: <span className="font-semibold text-stone-700">{visit.agronomist}</span></span>
              {visit.status === "Scheduled" && (
                <button
                  type="button"
                  onClick={() => markComplete(visit.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Mark Done</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
