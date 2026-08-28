import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Crosshair,
  Link2,
  Loader2,
  MapPin,
} from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SiteFacilityConfig } from "@/lib/cms-types";
import {
  applyGeocodeToFacility,
  buildGoogleMapsSearchUrl,
  buildMapEmbedQuery,
  formatCoordLabels,
  geocodePlace,
  parseGoogleMapsUrl,
  searchPlaces,
  type GeocodeResult,
} from "@/lib/geocode";
import { cn } from "@/lib/utils";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function hasValidPin(facility: SiteFacilityConfig) {
  return (
    Number.isFinite(facility.lat) &&
    Number.isFinite(facility.lng) &&
    Math.abs(facility.lat) <= 90 &&
    Math.abs(facility.lng) <= 180 &&
    !(facility.lat === 0 && facility.lng === 0)
  );
}

export function AdminFacilityMapPicker({
  facility,
  canEdit,
  onChange,
}: {
  facility: SiteFacilityConfig;
  canEdit: boolean;
  onChange: (patch: Partial<SiteFacilityConfig>) => void;
}) {
  const toast = useToast();
  const [placeQuery, setPlaceQuery] = useState(facility.mapEmbedQuery || facility.nameEn || "");
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinned = hasValidPin(facility);

  useEffect(() => {
    setPlaceQuery(facility.mapEmbedQuery || facility.nameEn || "");
  }, [facility.id, facility.mapEmbedQuery, facility.nameEn]);

  const applyResult = useCallback(
    (result: GeocodeResult, options?: { fillAddress?: boolean; fillDistrict?: boolean }) => {
      onChange(applyGeocodeToFacility(result, options));
      setPlaceQuery(result.displayName.split(",").slice(0, 2).join(", "));
      setSuggestions([]);
      setShowSuggestions(false);
      toast.success("Location pinned", `${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}`);
    },
    [onChange, toast],
  );

  const runSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const clean = q.trim();
    if (clean.length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchPlaces(clean);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } finally {
        setSearching(false);
      }
    }, 350);
  }, []);

  async function pinFromAddress() {
    const parts = [facility.nameEn, facility.addressEn, facility.districtEn].filter(Boolean);
    const query = parts.join(", ");
    if (!query.trim()) return;
    setPinning(true);
    try {
      const result = await geocodePlace(query);
      if (result) {
        applyResult(result, { fillAddress: !facility.addressEn.trim(), fillDistrict: true });
      } else {
        toast.error("Not found", "Could not find that address. Try the place search above.");
      }
    } finally {
      setPinning(false);
    }
  }

  async function pinFromPlaceSearch() {
    const query = placeQuery.trim() || facility.mapEmbedQuery.trim();
    if (!query) return;
    setPinning(true);
    try {
      const result = await geocodePlace(query);
      if (result) applyResult(result, { fillDistrict: !facility.districtEn.trim() });
      else toast.error("Not found", "No matching place. Try a more specific search.");
    } finally {
      setPinning(false);
    }
  }

  function extractFromMapsUrl() {
    const coords = parseGoogleMapsUrl(facility.mapsUrl);
    if (!coords) {
      toast.error("Invalid link", "Paste a Google Maps URL with coordinates.");
      return;
    }
    const labels = formatCoordLabels(coords.lat, coords.lng);
    onChange({
      lat: coords.lat,
      lng: coords.lng,
      ...labels,
      mapEmbedQuery: facility.mapEmbedQuery || buildMapEmbedQuery(coords.lat, coords.lng),
      mapsUrl: facility.mapsUrl || buildGoogleMapsSearchUrl(coords.lat, coords.lng),
    });
    toast.success("Coordinates extracted", `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
  }

  function syncLinksFromCoords() {
    if (!pinned) return;
    const label = facility.nameEn || facility.mapEmbedQuery;
    onChange({
      mapEmbedQuery: buildMapEmbedQuery(facility.lat, facility.lng, label),
      mapsUrl: buildGoogleMapsSearchUrl(facility.lat, facility.lng, label),
      ...formatCoordLabels(facility.lat, facility.lng),
    });
  }

  const mapSrc = pinned
    ? `https://www.google.com/maps?q=${facility.lat},${facility.lng}&t=m&z=15&output=embed`
    : null;

  return (
    <div className="rounded-xl border bg-muted/20 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Map pin & coordinates</h3>
          {pinned ? (
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <CheckCircle2 className="h-3 w-3" />
              Pinned
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 text-[10px] text-amber-700 border-amber-300">
              <AlertCircle className="h-3 w-3" />
              Needs pin
            </Badge>
          )}
        </div>
        {pinned ? (
          <Button type="button" variant="ghost" size="sm" asChild>
            <a
              href={facility.mapsUrl || buildGoogleMapsSearchUrl(facility.lat, facility.lng, facility.nameEn)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
              Open in Maps
            </a>
          </Button>
        ) : null}
      </div>

      <div className="relative">
        <Field
          label="Search place"
          hint="Type a business name, address, or city — pick a suggestion or pin manually."
        >
          <div className="relative">
            <Input
              value={placeQuery}
              onChange={(e) => {
                setPlaceQuery(e.target.value);
                runSearch(e.target.value);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="e.g. Agaate Kisan Mall Gurugram"
              disabled={!canEdit}
              className="pr-9"
            />
            {searching ? (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : null}
          </div>
        </Field>

        {showSuggestions && suggestions.length > 0 ? (
          <ul className="absolute z-20 mt-1 w-full rounded-lg border bg-popover shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((item) => (
              <li key={`${item.lat}-${item.lng}-${item.displayName}`}>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    applyResult(item, {
                      fillAddress: !facility.addressEn.trim(),
                      fillDistrict: !facility.districtEn.trim(),
                    })
                  }
                >
                  <span className="font-medium block truncate">{item.displayName.split(",")[0]}</span>
                  <span className="text-xs text-muted-foreground truncate block">
                    {item.district} · {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="default"
          disabled={!canEdit || pinning}
          onClick={() => void pinFromPlaceSearch()}
        >
          {pinning ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Crosshair className="mr-1.5 h-4 w-4" />}
          Pin from search
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!canEdit || pinning || !facility.addressEn.trim()}
          onClick={() => void pinFromAddress()}
        >
          Pin from address
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!canEdit || !parseGoogleMapsUrl(facility.mapsUrl)}
          onClick={extractFromMapsUrl}
        >
          <Link2 className="mr-1.5 h-4 w-4" />
          Extract from Maps URL
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!canEdit || !pinned}
          onClick={syncLinksFromCoords}
        >
          Sync map links
        </Button>
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-xl border bg-stone-900 min-h-[200px]",
          !pinned && "flex items-center justify-center bg-muted",
        )}
      >
        {mapSrc ? (
          <iframe
            title={`Map preview — ${facility.nameEn}`}
            src={mapSrc}
            className="absolute inset-0 h-full w-full min-h-[200px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <p className="text-sm text-muted-foreground px-4 text-center">
            Search a place or pin from address to preview the map.
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Latitude">
          <Input
            type="number"
            step="any"
            value={facility.lat}
            onChange={(e) => {
              const lat = Number(e.target.value);
              onChange({ lat, ...formatCoordLabels(lat, facility.lng) });
            }}
            disabled={!canEdit}
          />
        </Field>
        <Field label="Longitude">
          <Input
            type="number"
            step="any"
            value={facility.lng}
            onChange={(e) => {
              const lng = Number(e.target.value);
              onChange({ lng, ...formatCoordLabels(facility.lat, lng) });
            }}
            disabled={!canEdit}
          />
        </Field>
        <Field label="Map embed query">
          <Input
            value={facility.mapEmbedQuery}
            onChange={(e) => onChange({ mapEmbedQuery: e.target.value })}
            disabled={!canEdit}
          />
        </Field>
        <Field label="Google Maps link">
          <Input
            value={facility.mapsUrl}
            onChange={(e) => onChange({ mapsUrl: e.target.value })}
            disabled={!canEdit}
            placeholder="https://www.google.com/maps/..."
          />
        </Field>
      </div>
    </div>
  );
}
