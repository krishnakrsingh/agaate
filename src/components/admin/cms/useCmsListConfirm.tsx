import { useCallback, useState } from "react";
import { CmsConfirmDialog } from "@/components/admin/cms/CmsConfirmDialog";

type ConfirmRequest = {
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  action: () => Promise<void>;
};

export function useCmsListConfirm() {
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null);
  const [loading, setLoading] = useState(false);

  const requestConfirm = useCallback((request: ConfirmRequest) => {
    setConfirm(request);
  }, []);

  const runConfirm = useCallback(async () => {
    if (!confirm) return;
    setLoading(true);
    await confirm.action();
    setLoading(false);
    setConfirm(null);
  }, [confirm]);

  const confirmDialog = (
    <CmsConfirmDialog
      open={Boolean(confirm)}
      title={confirm?.title ?? ""}
      description={confirm?.description ?? ""}
      confirmLabel={confirm?.confirmLabel}
      destructive={confirm?.destructive}
      loading={loading}
      onConfirm={runConfirm}
      onOpenChange={(open) => {
        if (!open) setConfirm(null);
      }}
    />
  );

  return { requestConfirm, confirmDialog };
}
