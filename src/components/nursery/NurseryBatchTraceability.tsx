import { useState } from "react";
import { CheckCircle, MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { MOCK_BATCHES, type BatchInfo } from "./nursery-data";

export function NurseryBatchTraceability() {
  const [searchBatchId, setSearchBatchId] = useState("AG-2026-N8");
  const [activeBatch, setActiveBatch] = useState<BatchInfo | null>(MOCK_BATCHES["AG-2026-N8"]);
  const [searchError, setSearchError] = useState(false);

  const handleBatchSearch = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (MOCK_BATCHES[cleanId]) {
      setActiveBatch(MOCK_BATCHES[cleanId]);
      setSearchError(false);
    } else {
      setActiveBatch(null);
      setSearchError(true);
    }
  };

  return (
    <section id="batch-traceability" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="SEEDLING DIGITAL PASSPORT"
        title="Live Batch Traceability."
        description="Every tray dispatched carries a unique Batch ID. Verify chamber temperature logs, root vigor ratings, and biological inoculation data in real time."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Search Bar & Sample ID Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-bone px-4 py-2">
            <MagnifyingGlass className="h-4 w-4 text-forest/60" />
            <input
              type="text"
              value={searchBatchId}
              onChange={(e) => setSearchBatchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBatchSearch(searchBatchId)}
              placeholder="Enter Batch ID (e.g. AG-2026-N8)"
              className="w-full bg-transparent font-mono text-xs font-bold text-forest-deep outline-none"
            />
            <button
              type="button"
              onClick={() => handleBatchSearch(searchBatchId)}
              className="rounded-full bg-forest-deep px-4 py-1.5 font-mono text-xs font-bold text-cream transition-colors hover:bg-forest"
            >
              Verify
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-forest/50">Try:</span>
            {["AG-2026-N8", "AG-2026-W4", "AG-2026-C2", "AG-2026-T1"].map((bId) => (
              <button
                key={bId}
                type="button"
                onClick={() => {
                  setSearchBatchId(bId);
                  handleBatchSearch(bId);
                }}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-bold text-forest hover:border-forest"
              >
                {bId}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Result Display */}
        {activeBatch ? (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-moss">
                  BATCH PASSPORT VERIFIED
                </span>
                <h3 className="font-serif text-3xl font-bold text-forest-deep">
                  {activeBatch.variety} ({activeBatch.crop})
                </h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-1.5 font-mono text-xs font-bold text-emerald-800">
                {activeBatch.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  GERMINATION DATE
                </span>
                <p className="mt-1 font-serif text-lg font-bold text-forest-deep">
                  {activeBatch.germinationDate}
                </p>
                <span className="text-[11px] text-forest/70">{activeBatch.origin}</span>
              </div>

              <div className="rounded-2xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  CHAMBER CONDITIONS
                </span>
                <p className="mt-1 font-serif text-lg font-bold text-forest-deep">
                  {activeBatch.chamberTemp}
                </p>
                <span className="text-[11px] text-forest/70">{activeBatch.humidity}</span>
              </div>

              <div className="rounded-2xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  ROOT VIGOR SCORE
                </span>
                <p className="mt-1 font-serif text-lg font-bold text-emerald-700">
                  {activeBatch.rootScore}
                </p>
                <span className="text-[11px] text-forest/70">Bio-Assay Approved</span>
              </div>

              <div className="rounded-2xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  DISPATCH WINDOW
                </span>
                <p className="mt-1 font-serif text-lg font-bold text-forest-deep">
                  {activeBatch.dispatchWindow}
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold">AC Doorstep Van</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-600/20 bg-emerald-50/60 p-4 text-xs font-medium text-emerald-900">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>
                <strong className="font-bold">Biological Protection Log:</strong>{" "}
                {activeBatch.bioBoostLog}
              </span>
            </div>
          </div>
        ) : searchError ? (
          <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
            <Warning className="h-5 w-5 shrink-0 text-red-600" />
            <span>
              Batch ID not found in current nursery cycle. Please check your tray receipt tag.
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
