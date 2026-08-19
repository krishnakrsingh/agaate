import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Search,
  MapPin,
  Sprout,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  company: string;
  acreage: string;
  crops: string[];
  totalTickets: number;
  joined: string;
  tier: "Enterprise" | "Commercial" | "Progressive";
};

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Sunita Devi",
    phone: "+91 98765 00002",
    email: "sunita.farms@outlook.com",
    location: "Nashik, Maharashtra",
    company: "Devi Agro Estates",
    acreage: "55 Acres",
    crops: ["Tomato", "Capsicum", "Polyhouse"],
    totalTickets: 4,
    joined: "June 2025",
    tier: "Enterprise",
  },
  {
    id: 2,
    name: "Ramesh Patel",
    phone: "+91 98765 00001",
    email: "ramesh.patel@gmail.com",
    location: "Varanasi, UP",
    company: "Patel Agrofarms Pvt Ltd",
    acreage: "20 Acres",
    crops: ["Chilli G4", "Teja Chilli"],
    totalTickets: 3,
    joined: "Aug 2025",
    tier: "Commercial",
  },
  {
    id: 3,
    name: "Harpreet Singh",
    phone: "+91 98765 00003",
    email: "harpreet.singh@kisan.in",
    location: "Ludhiana, Punjab",
    company: "Singh Regenerative Farms",
    acreage: "35 Acres",
    crops: ["DSR Rice", "Wheat", "Carbon Program"],
    totalTickets: 2,
    joined: "Jan 2026",
    tier: "Commercial",
  },
  {
    id: 4,
    name: "Meena Joshi",
    phone: "+91 98765 00004",
    email: "meena.joshi@agritech.org",
    location: "Dindori, Nashik",
    company: "Sahyadri Bio Co-op",
    acreage: "10 Acres",
    crops: ["Export Onion", "Garlic"],
    totalTickets: 5,
    joined: "Nov 2024",
    tier: "Progressive",
  },
];

export function AdminCustomers() {
  const toast = useToast();
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [query, setQuery] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.crops.some((crop) => crop.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Grower Directory
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Registered Farmers & Clients</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Complete database of landholdings, ongoing advisory programs, and order history.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
        <input
          placeholder="Search farmer name, farm company, location, crop..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-stone-200/90 bg-white pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 shadow-2xs"
        />
      </div>

      {/* Customers Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:shadow-sm transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900">{customer.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      customer.tier === "Enterprise"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {customer.tier}
                  </span>
                </div>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <Building className="h-3 w-3 text-stone-400 shrink-0" />
                  <span>{customer.company}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${customer.phone}`}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-stone-50/70 p-3 rounded-xl border border-stone-100 text-xs">
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-semibold">Total Landholding</p>
                <p className="font-bold text-emerald-900 mt-0.5">{customer.acreage}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-semibold">Location</p>
                <p className="font-semibold text-stone-800 mt-0.5 truncate">{customer.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {customer.crops.map((crop) => (
                <span
                  key={crop}
                  className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-700"
                >
                  {crop}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{customer.totalTickets} Active Inquiries</span>
              <Link
                to="/agaate-admin/contacts"
                className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                <span>View Requests</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
