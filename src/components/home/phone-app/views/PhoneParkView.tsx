interface PhoneParkViewProps {
  onReserveTour: () => void;
}

export function PhoneParkView({ onReserveTour }: PhoneParkViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-3 overflow-y-auto bg-[#fffdf4] p-3.5">
      <div className="rounded-xl bg-[#143d31] p-3 text-white">
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white">
          Gurugram 6-Acre Farm
        </span>
        <p className="mt-2 text-sm font-extrabold">Walk the Living Agri Park</p>
        <p className="mt-1 text-[11px] text-white/70">
          Live Bio-Boosted Nursery, drip trials, drone spraying & partner demo plots.
        </p>
      </div>

      <div className="space-y-2 rounded-xl border border-[#143d31]/10 bg-white p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#143d31]">Next Open Farmer Tour:</span>
          <span className="font-mono font-bold text-[#5d7d37]">This Saturday</span>
        </div>
        <p className="text-[11px] text-[#536253]">
          Free entry for registered Agaate Parivaar farmers.
        </p>
        <button
          type="button"
          onClick={onReserveTour}
          className="w-full rounded-lg bg-[#143d31] py-2 text-xs font-bold text-white transition-colors hover:bg-[#3a6b28]"
        >
          Reserve Visitor Slot
        </button>
      </div>
    </div>
  );
}
