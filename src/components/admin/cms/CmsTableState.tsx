import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

export function CmsTableLoadingRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-28 text-center text-sm text-muted-foreground">
        Loading…
      </TableCell>
    </TableRow>
  );
}

export function CmsTableEmptyRow({
  colSpan,
  title,
  description,
  action,
}: {
  colSpan: number;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="mx-auto max-w-sm space-y-2">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
          {action ? <div className="pt-1">{action}</div> : null}
        </div>
      </TableCell>
    </TableRow>
  );
}

export function CmsTableEmptyAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" size="sm" onClick={onClick}>
      {label}
    </Button>
  );
}
