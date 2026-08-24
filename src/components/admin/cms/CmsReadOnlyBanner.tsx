import { Eye } from "lucide-react";

export function CmsReadOnlyBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <Eye className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        You are in <strong>view-only</strong> mode. Contact an administrator if you need permission
        to edit website content.
      </p>
    </div>
  );
}
