import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Plus,
  Search,
  Phone,
  ArrowRight,
  User,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  },
  {
    id: 2,
    farmer: "Ramesh Patel",
    phone: "+91 98765 00001",
    district: "Varanasi, UP",
    acreage: "20 Acres",
    crop: "Chilli G4",
    date: "2026-08-20",
    time: "10:00 AM",
    agronomist: "Rahul Sharma",
    status: "Scheduled",
    objective: "Verify nursery pre-order hardening site and nursery tray planting schedule.",
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
  },
  {
    id: 4,
    farmer: "Harpreet Singh",
    phone: "+91 98765 00003",
    district: "Ludhiana, Punjab",
    acreage: "35 Acres",
    crop: "Direct Seeded Rice",
    date: "2026-08-17",
    time: "04:00 PM",
    agronomist: "Aman Verma",
    status: "Completed",
    objective: "MRV carbon verification and weed management triage for DSR block.",
  },
];

export function AdminFarmVisits() {
  const toast = useToast();
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [completionNotes, setCompletionNotes] = useState("");

  const [newVisit, setNewVisit] = useState({
    farmer: "",
    phone: "",
    district: "",
    acreage: "",
    crop: "",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00 AM",
    agronomist: "Aman Verma",
    objective: "",
  });

  const filtered = visits.filter((v) => {
    const matchesQuery =
      v.farmer.toLowerCase().includes(query.toLowerCase()) ||
      v.district.toLowerCase().includes(query.toLowerCase()) ||
      v.crop.toLowerCase().includes(query.toLowerCase()) ||
      v.agronomist.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = selectedStatus === "All" || v.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisit) return;
    setVisits((prev) =>
      prev.map((v) => (v.id === selectedVisit.id ? { ...v, status: "Completed" as const } : v))
    );
    toast.success("Visit Completed", `Field inspection for ${selectedVisit.farmer} marked done.`);
    setCompleteOpen(false);
    setSelectedVisit(null);
    setCompletionNotes("");
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisit.farmer || !newVisit.district) return;
    const created: Visit = {
      id: Date.now(),
      farmer: newVisit.farmer,
      phone: newVisit.phone || "+91 98765 00000",
      district: newVisit.district,
      acreage: newVisit.acreage || "10 Acres",
      crop: newVisit.crop || "Mixed Crops",
      date: newVisit.date,
      time: newVisit.time,
      agronomist: newVisit.agronomist,
      status: "Scheduled",
      objective: newVisit.objective || "General field inspection and soil baseline audit.",
    };
    setVisits([created, ...visits]);
    toast.success("Visit Scheduled", `Booked field visit for ${newVisit.farmer} on ${newVisit.date}`);
    setScheduleOpen(false);
    setNewVisit({
      farmer: "",
      phone: "",
      district: "",
      acreage: "",
      crop: "",
      date: new Date().toISOString().slice(0, 10),
      time: "10:00 AM",
      agronomist: "Aman Verma",
      objective: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Farm Visits & Audits</h2>
          <p className="text-xs text-muted-foreground">
            Coordinate onsite agronomist inspections, soil profiling, and precision equipment installations.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setScheduleOpen(true)}
          className="h-8.5 rounded-lg px-4 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold text-xs"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>Schedule Visit</span>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Input
            placeholder="Filter visits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8.5 rounded-lg px-3 w-[160px] lg:w-[260px] text-xs bg-card border-border shadow-xs"
          />
          <div className="inline-flex items-center rounded-lg bg-muted/60 p-0.5 border border-border/80 shadow-2xs">
            {["All", "Scheduled", "Completed"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs">Farmer</TableHead>
              <TableHead className="text-xs">Location</TableHead>
              <TableHead className="text-xs">Acreage & Crop</TableHead>
              <TableHead className="text-xs">Scheduled Date</TableHead>
              <TableHead className="text-xs">Lead Specialist</TableHead>
              <TableHead className="text-xs">Objective</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-right text-xs">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((visit) => (
              <TableRow key={visit.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-semibold text-xs text-foreground">
                  {visit.farmer}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {visit.district}
                </TableCell>
                <TableCell className="text-xs">
                  <span className="font-medium text-foreground">{visit.crop}</span>{" "}
                  <span className="text-muted-foreground">({visit.acreage})</span>
                </TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">
                  {visit.date} · {visit.time}
                </TableCell>
                <TableCell className="text-xs font-medium text-foreground">
                  {visit.agronomist}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                  {visit.objective}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium select-none ${
                      visit.status === "Completed"
                        ? "border-sidebar-primary/20 bg-sidebar-primary/10 text-sidebar-primary dark:text-primary font-medium"
                        : "border-border bg-muted/40 text-foreground"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${visit.status === "Completed" ? "bg-sidebar-primary dark:bg-primary" : "bg-muted-foreground"}`} />
                    {visit.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {visit.status === "Scheduled" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setCompleteOpen(true);
                      }}
                      className="h-7 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-sidebar-primary dark:text-primary" />
                      <span>Mark Done</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-xs text-muted-foreground">
                  No farm visits matching the filter criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Schedule Visit Modal */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Schedule Field Visit</DialogTitle>
            <DialogDescription className="text-xs">
              Book an onsite agronomist farm inspection and soil sampling audit.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleSubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="v-farmer" className="text-xs font-medium">Farmer Name *</Label>
                <Input
                  id="v-farmer"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newVisit.farmer}
                  onChange={(e) => setNewVisit({ ...newVisit, farmer: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="v-district" className="text-xs font-medium">District / State *</Label>
                <Input
                  id="v-district"
                  required
                  placeholder="e.g. Nashik, MH"
                  value={newVisit.district}
                  onChange={(e) => setNewVisit({ ...newVisit, district: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="v-crop" className="text-xs font-medium">Crop Variety</Label>
                <Input
                  id="v-crop"
                  placeholder="e.g. Tomato Polyhouse"
                  value={newVisit.crop}
                  onChange={(e) => setNewVisit({ ...newVisit, crop: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="v-acreage" className="text-xs font-medium">Acreage</Label>
                <Input
                  id="v-acreage"
                  placeholder="e.g. 50 Acres"
                  value={newVisit.acreage}
                  onChange={(e) => setNewVisit({ ...newVisit, acreage: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="v-date" className="text-xs font-medium">Visit Date</Label>
                <Input
                  id="v-date"
                  type="date"
                  required
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="v-agronomist" className="text-xs font-medium">Lead Agronomist</Label>
                <select
                  id="v-agronomist"
                  value={newVisit.agronomist}
                  onChange={(e) => setNewVisit({ ...newVisit, agronomist: e.target.value })}
                  className="w-full h-8 rounded-md border border-input bg-transparent px-2.5 py-1 text-xs text-foreground outline-none"
                >
                  <option value="Aman Verma">Aman Verma (West / South)</option>
                  <option value="Rahul Sharma">Rahul Sharma (North)</option>
                  <option value="Priya Nair">Priya Nair (Technical Lead)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="v-obj" className="text-xs font-medium">Audit Objective</Label>
              <Textarea
                id="v-obj"
                rows={2}
                placeholder="Key audit checkpoints (e.g. drip pressure testing, soil pH)"
                value={newVisit.objective}
                onChange={(e) => setNewVisit({ ...newVisit, objective: e.target.value })}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setScheduleOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Confirm Schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mark Complete Modal */}
      <Dialog open={completeOpen} onOpenChange={setCompleteOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Complete Field Inspection</DialogTitle>
            <DialogDescription className="text-xs">
              Record observation notes and mark visit for {selectedVisit?.farmer} as done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCompleteSubmit} className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="comp-notes" className="text-xs font-medium">Field Observations / Prescription</Label>
              <Textarea
                id="comp-notes"
                rows={3}
                required
                placeholder="Observed soil condition, drip uniformity, farmer satisfaction..."
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                className="text-xs"
              />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCompleteOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Save & Mark Complete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
