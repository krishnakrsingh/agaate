import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Phone,
  ArrowRight,
  Plus,
  CheckCircle2,
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
  const [newOpen, setNewOpen] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Consultation | null>(null);
  const [prescription, setPrescription] = useState("");

  const [newConsult, setNewConsult] = useState({
    farmer: "",
    phone: "",
    crop: "",
    topic: "",
    urgency: "Medium" as const,
    summary: "",
  });

  const filtered = consultations.filter(
    (c) =>
      c.farmer.toLowerCase().includes(query.toLowerCase()) ||
      c.crop.toLowerCase().includes(query.toLowerCase()) ||
      c.topic.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsult.farmer || !newConsult.topic) return;
    const added: Consultation = {
      id: Date.now(),
      farmer: newConsult.farmer,
      phone: newConsult.phone || "+91 98765 00000",
      crop: newConsult.crop || "General Crop",
      topic: newConsult.topic,
      urgency: newConsult.urgency,
      status: "Open",
      summary: newConsult.summary || "Crop diagnostic case logged by agronomy triage desk.",
      created_at: "Just now",
    };
    setConsultations([added, ...consultations]);
    toast.success("Consultation Opened", `Diagnostic case created for ${newConsult.farmer}`);
    setNewOpen(false);
    setNewConsult({
      farmer: "",
      phone: "",
      crop: "",
      topic: "",
      urgency: "Medium",
      summary: "",
    });
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;
    setConsultations((prev) =>
      prev.map((c) => (c.id === selectedCase.id ? { ...c, status: "Resolved" as const } : c))
    );
    toast.success("Consultation Resolved", `Advisory prescription dispatched to ${selectedCase.farmer}`);
    setResolveOpen(false);
    setSelectedCase(null);
    setPrescription("");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Crop Consultations</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Technical crop health triage, soil fertility balancing, and precision pest surveillance advisory.
          </p>
        </div>

        <Button size="sm" onClick={() => setNewOpen(true)} className="h-8.5 rounded-lg px-4 bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-xs hover:opacity-90 font-semibold text-xs">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>New Consultation</span>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter consultations..."
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
              <TableHead className="text-xs">Farmer / Crop</TableHead>
              <TableHead className="text-xs">Diagnostic Subject</TableHead>
              <TableHead className="text-xs">Urgency</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Received</TableHead>
              <TableHead className="text-right text-xs">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                <TableCell>
                  <p className="font-semibold text-xs text-foreground">{item.farmer}</p>
                  <p className="text-[11px] text-muted-foreground">{item.crop}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs font-semibold text-foreground">{item.topic}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-md">{item.summary}</p>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs select-none ${
                      item.urgency === "High"
                        ? "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium"
                        : item.urgency === "Medium"
                        ? "border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-300"
                        : "border-border bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.urgency === "High"
                          ? "bg-rose-500"
                          : item.urgency === "Medium"
                          ? "bg-amber-500"
                          : "bg-muted-foreground"
                      }`}
                    />
                    {item.urgency}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium select-none ${
                      item.status === "Resolved"
                        ? "border-sidebar-primary/20 bg-sidebar-primary/10 text-sidebar-primary dark:text-primary font-medium"
                        : "border-border bg-muted/40 text-foreground"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Resolved" ? "bg-sidebar-primary dark:bg-primary" : "bg-muted-foreground"}`} />
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono text-[11px]">
                  {item.created_at}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-xs" asChild title="Call" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <a href={`tel:${item.phone}`}>
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    </Button>
                    {item.status !== "Resolved" ? (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => {
                          setSelectedCase(item);
                          setResolveOpen(true);
                        }}
                        className="h-7 text-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-xs"
                      >
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-sidebar-primary dark:text-primary" />
                        <span>Prescribe</span>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="xs" asChild className="h-7 text-xs">
                        <Link to="/agaate-admin/contacts/$id" params={{ id: String(item.id) }}>
                          <span>Details</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-xs text-muted-foreground">
                  No consultation cases matching the filter criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* New Consultation Modal */}
      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">New Crop Diagnostic Case</DialogTitle>
            <DialogDescription className="text-xs">
              Log a pest alert, deficiency symptom, or foliar spray advisory request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-farmer" className="text-xs font-medium">Farmer Name *</Label>
                <Input
                  id="c-farmer"
                  required
                  placeholder="e.g. Fatima Khan"
                  value={newConsult.farmer}
                  onChange={(e) => setNewConsult({ ...newConsult, farmer: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-phone" className="text-xs font-medium">Phone Number</Label>
                <Input
                  id="c-phone"
                  placeholder="+91 98765 00000"
                  value={newConsult.phone}
                  onChange={(e) => setNewConsult({ ...newConsult, phone: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-crop" className="text-xs font-medium">Crop Affected *</Label>
                <Input
                  id="c-crop"
                  required
                  placeholder="e.g. Cotton, Tomato"
                  value={newConsult.crop}
                  onChange={(e) => setNewConsult({ ...newConsult, crop: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-urgency" className="text-xs font-medium">Triage Urgency</Label>
                <select
                  id="c-urgency"
                  value={newConsult.urgency}
                  onChange={(e) => setNewConsult({ ...newConsult, urgency: e.target.value as any })}
                  className="w-full h-8 rounded-md border border-input bg-transparent px-2.5 py-1 text-xs text-foreground outline-none"
                >
                  <option value="High">High (Immediate Triage)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                  <option value="Low">Low (General Advisory)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-topic" className="text-xs font-medium">Diagnostic Subject *</Label>
              <Input
                id="c-topic"
                required
                placeholder="e.g. Pink Bollworm IPM / Nitrogen Yellowing"
                value={newConsult.topic}
                onChange={(e) => setNewConsult({ ...newConsult, topic: e.target.value })}
                className="h-8 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-summary" className="text-xs font-medium">Field Symptom Observations</Label>
              <Textarea
                id="c-summary"
                rows={3}
                placeholder="Leaf curl pattern, infestation percentage, soil moisture..."
                value={newConsult.summary}
                onChange={(e) => setNewConsult({ ...newConsult, summary: e.target.value })}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Log Diagnostic Case
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Resolve / Prescribe Modal */}
      <Dialog open={resolveOpen} onOpenChange={setResolveOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Agronomist Advisory Prescription</DialogTitle>
            <DialogDescription className="text-xs">
              Record diagnosis and advisory prescription for {selectedCase?.farmer} ({selectedCase?.crop}).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResolveSubmit} className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="rx-notes" className="text-xs font-medium">Prescription & Spray / Irrigation Regimen *</Label>
              <Textarea
                id="rx-notes"
                rows={4}
                required
                placeholder="Recommended bio-fungicide dosage, micro-nutrient spray frequency, soil drenching guidelines..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="text-xs"
              />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setResolveOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                Dispatch & Mark Resolved
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
