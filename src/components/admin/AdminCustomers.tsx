import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Phone,
  ArrowRight,
  Plus,
  Building,
  MapPin,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const [addOpen, setAddOpen] = useState(false);
  const [detailGrower, setDetailGrower] = useState<Customer | null>(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    company: "",
    acreage: "",
    crops: "",
    tier: "Commercial" as const,
  });

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.crops.some((crop) => crop.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;
    const added: Customer = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email || "—",
      location: newCustomer.location || "General India",
      company: newCustomer.company || "Individual Grower",
      acreage: newCustomer.acreage || "10 Acres",
      crops: newCustomer.crops ? newCustomer.crops.split(",").map((c) => c.trim()) : ["Mixed Crops"],
      totalTickets: 1,
      joined: "Today",
      tier: newCustomer.tier,
    };
    setCustomers([added, ...customers]);
    toast.success("Grower Registered", `${newCustomer.name} added to directory.`);
    setAddOpen(false);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      location: "",
      company: "",
      acreage: "",
      crops: "",
      tier: "Commercial",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Growers Directory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete database of farmer landholdings, crop profiles, and ongoing advisory accounts.
          </p>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)} className="h-8.5 rounded-lg px-4 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold text-xs">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>Add Grower</span>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search growers, entities, crops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8.5 rounded-lg px-3 w-[160px] lg:w-[260px] text-xs bg-card border-border shadow-xs"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs">Grower / Company</TableHead>
              <TableHead className="text-xs">Location</TableHead>
              <TableHead className="text-xs">Total Landholding</TableHead>
              <TableHead className="text-xs">Active Crop Varieties</TableHead>
              <TableHead className="text-xs">Account Tier</TableHead>
              <TableHead className="text-xs">Inquiries</TableHead>
              <TableHead className="text-right text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setDetailGrower(customer)}
              >
                <TableCell>
                  <p className="font-semibold text-xs text-foreground">{customer.name}</p>
                  <p className="text-[11px] text-muted-foreground">{customer.company}</p>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {customer.location}
                </TableCell>
                <TableCell className="font-semibold text-xs tabular-nums text-foreground">
                  {customer.acreage}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {customer.crops.join(", ")}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs select-none ${
                      customer.tier === "Enterprise"
                        ? "border-sidebar-primary/20 bg-sidebar-primary/10 text-sidebar-primary dark:text-primary font-semibold"
                        : customer.tier === "Commercial"
                        ? "border-sidebar-border bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium"
                        : "border-border bg-muted/40 text-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        customer.tier === "Enterprise" || customer.tier === "Commercial"
                          ? "bg-sidebar-primary dark:bg-primary"
                          : "bg-muted-foreground"
                      }`}
                    />
                    {customer.tier}
                  </span>
                </TableCell>
                <TableCell className="text-xs tabular-nums text-muted-foreground">
                  {customer.totalTickets} inquiries
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()} className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-xs" asChild title="Call">
                      <a href={`tel:${customer.phone}`}>
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setDetailGrower(customer)}
                      className="h-7 text-xs"
                    >
                      <span>View</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                  No growers matching the filter criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Grower Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Register New Grower</DialogTitle>
            <DialogDescription className="text-xs">
              Add farmer details, total landholding acreage, and crop varieties.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="g-name" className="text-xs font-medium">Grower Name *</Label>
                <Input
                  id="g-name"
                  required
                  placeholder="e.g. Baldev Singh"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-phone" className="text-xs font-medium">Phone Number *</Label>
                <Input
                  id="g-phone"
                  required
                  placeholder="+91 98765 00000"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="g-company" className="text-xs font-medium">Farm / Entity Name</Label>
                <Input
                  id="g-company"
                  placeholder="e.g. Singh Agro Ventures"
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-location" className="text-xs font-medium">District, State</Label>
                <Input
                  id="g-location"
                  placeholder="e.g. Bathinda, Punjab"
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="g-acreage" className="text-xs font-medium">Total Landholding</Label>
                <Input
                  id="g-acreage"
                  placeholder="e.g. 40 Acres"
                  value={newCustomer.acreage}
                  onChange={(e) => setNewCustomer({ ...newCustomer, acreage: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-tier" className="text-xs font-medium">Account Tier</Label>
                <select
                  id="g-tier"
                  value={newCustomer.tier}
                  onChange={(e) => setNewCustomer({ ...newCustomer, tier: e.target.value as any })}
                  className="w-full h-8 rounded-md border border-input bg-transparent px-2.5 py-1 text-xs text-foreground outline-none"
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Enterprise">Enterprise (50+ Acres)</option>
                  <option value="Progressive">Progressive (High Tech)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="g-crops" className="text-xs font-medium">Crops Cultivated (comma separated)</Label>
              <Input
                id="g-crops"
                placeholder="e.g. DSR Rice, Wheat, Mustard"
                value={newCustomer.crops}
                onChange={(e) => setNewCustomer({ ...newCustomer, crops: e.target.value })}
                className="h-8 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAddOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Register Grower
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Grower Profile Modal */}
      {detailGrower && (
        <Dialog open={Boolean(detailGrower)} onOpenChange={(open) => !open && setDetailGrower(null)}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">{detailGrower.name}</DialogTitle>
              <DialogDescription className="text-xs">{detailGrower.company} · {detailGrower.location}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2 text-xs">
              <div className="grid grid-cols-2 gap-3 border rounded-md p-3 bg-muted/30">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Phone</span>
                  <span className="font-medium">{detailGrower.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Email</span>
                  <span className="font-medium">{detailGrower.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Total Landholding</span>
                  <span className="font-semibold text-primary">{detailGrower.acreage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Account Tier</span>
                  <span className="font-medium">{detailGrower.tier}</span>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                  Crop Varieties Under Management
                </span>
                <div className="flex flex-wrap gap-1">
                  {detailGrower.crops.map((crop) => (
                    <span key={crop} className="rounded-md border px-2 py-0.5 bg-background font-medium">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 flex items-center justify-between">
                <span className="text-muted-foreground">Member since {detailGrower.joined}</span>
                <Button size="sm" asChild className="h-7 text-xs">
                  <Link to="/agaate-admin/contacts">
                    <span>View Inquiries ({detailGrower.totalTickets})</span>
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
