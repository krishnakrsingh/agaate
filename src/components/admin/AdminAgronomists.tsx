import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  MapPin,
  ArrowRight,
  Edit2,
  Phone,
  LayoutGrid,
  List,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    rating: "4.9",
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
    rating: "5.0",
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
    rating: "4.8",
  },
];

export function AdminAgronomists() {
  const toast = useToast();
  const [agronomists, setAgronomists] = useState<Agronomist[]>(INITIAL_AGRONOMISTS);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [editSpecialist, setEditSpecialist] = useState<Agronomist | null>(null);

  const [editForm, setEditForm] = useState({
    territory: "",
    specialization: "",
  });

  const filtered = agronomists.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.territory.toLowerCase().includes(query.toLowerCase()) ||
      a.specialization.toLowerCase().includes(query.toLowerCase())
  );

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSpecialist) return;
    setAgronomists((prev) =>
      prev.map((a) =>
        a.id === editSpecialist.id
          ? { ...a, territory: editForm.territory, specialization: editForm.specialization }
          : a
      )
    );
    toast.success("Specialist Updated", `Saved territory allocation for ${editSpecialist.name}`);
    setEditSpecialist(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agronomists Team</h2>
          <p className="text-xs text-muted-foreground">
            Manage field specialists, active case workloads, and regional territory allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setAddOpen(true)}
            className="h-8.5 rounded-lg px-4 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold text-xs"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            <span>Add Specialist</span>
          </Button>

          <div className="inline-flex items-center rounded-lg bg-muted/60 p-0.5 border border-border/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-1.5 transition-all ${
                viewMode === "grid" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded-md p-1.5 transition-all ${
                viewMode === "table" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search agronomists, territories, specialties..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8.5 rounded-lg px-3 w-[160px] lg:w-[260px] text-xs bg-card border-border shadow-xs"
        />
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agro) => (
            <div key={agro.id} className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-sidebar-accent transition-all space-y-4">
              <div className="flex items-center gap-3.5">
                <Avatar className="h-10 w-10 rounded-xl border border-border shrink-0">
                  <AvatarFallback className="rounded-xl text-xs font-semibold bg-muted text-foreground">
                    {agro.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold truncate text-foreground">{agro.name}</h4>
                    <span className="inline-flex items-center rounded-md bg-sidebar-accent/60 px-2 py-0.5 text-[10px] font-semibold text-sidebar-accent-foreground shrink-0">
                      ★ {agro.rating}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{agro.role}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Territory</span>
                  <span className="font-medium flex items-center gap-1.5 truncate text-foreground bg-muted/20 rounded-lg px-2.5 py-1 border border-border/50">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{agro.territory}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Specialization</span>
                  <p className="font-medium line-clamp-2 text-foreground">{agro.specialization}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                  <div className="rounded-xl bg-muted/20 border border-border/50 p-2.5">
                    <span className="text-muted-foreground block text-[10px]">Active Cases</span>
                    <span className="text-lg font-bold tabular-nums text-foreground">{agro.activeCases}</span>
                  </div>
                  <div className="rounded-xl bg-muted/20 border border-border/50 p-2.5">
                    <span className="text-muted-foreground block text-[10px]">Audits Done</span>
                    <span className="text-lg font-bold tabular-nums text-foreground">{agro.completedVisits}</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setEditSpecialist(agro);
                      setEditForm({ territory: agro.territory, specialization: agro.specialization });
                    }}
                    className="h-7.5 rounded-lg px-2.5 text-xs bg-card border-border shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Edit2 className="mr-1.5 h-3 w-3 text-muted-foreground" />
                    <span>Edit Territory</span>
                  </Button>

                  <Button variant="ghost" size="xs" asChild className="h-7.5 rounded-lg px-2.5 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Link to="/agaate-admin/contacts">
                      <span>Pipeline</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-xs">Agronomist</TableHead>
                <TableHead className="text-xs">Territory Coverage</TableHead>
                <TableHead className="text-xs">Domain Specialization</TableHead>
                <TableHead className="text-xs">Active Cases</TableHead>
                <TableHead className="text-xs">Total Audits</TableHead>
                <TableHead className="text-xs">Rating</TableHead>
                <TableHead className="text-right text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((agro) => (
                <TableRow key={agro.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border border-border">
                        <AvatarFallback className="text-[10px] font-semibold bg-muted text-foreground">
                          {agro.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-xs text-foreground">{agro.name}</p>
                        <p className="text-[11px] text-muted-foreground">{agro.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{agro.territory}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{agro.specialization}</TableCell>
                  <TableCell className="font-bold text-xs tabular-nums text-foreground">{agro.activeCases}</TableCell>
                  <TableCell className="text-xs tabular-nums text-foreground">{agro.completedVisits}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-medium">★ {agro.rating}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setEditSpecialist(agro);
                        setEditForm({ territory: agro.territory, specialization: agro.specialization });
                      }}
                      className="h-7 text-xs"
                    >
                      <Edit2 className="mr-1 h-3 w-3" />
                      <span>Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Specialist Modal */}
      {editSpecialist && (
        <Dialog open={Boolean(editSpecialist)} onOpenChange={(open) => !open && setEditSpecialist(null)}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Edit Agronomist Allocation</DialogTitle>
              <DialogDescription className="text-xs">
                Update territory assignments and agronomy domain specializations for {editSpecialist.name}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSave} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="agro-terr" className="text-xs font-medium">Territory Coverage</Label>
                <Input
                  id="agro-terr"
                  required
                  value={editForm.territory}
                  onChange={(e) => setEditForm({ ...editForm, territory: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="agro-spec" className="text-xs font-medium">Domain Specialization</Label>
                <Input
                  id="agro-spec"
                  required
                  value={editForm.specialization}
                  onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditSpecialist(null)}
                  className="h-8 text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="h-8 text-xs">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
