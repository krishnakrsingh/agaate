import { useCallback, useEffect } from "react";

export function useCmsDirtyGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const confirmDiscard = useCallback(() => {
    if (!dirty) return true;
    return window.confirm("You have unsaved changes. Discard them?");
  }, [dirty]);

  const handleSheetOpenChange = useCallback(
    (open: boolean, setOpen: (value: boolean) => void) => {
      if (open) {
        setOpen(true);
        return;
      }
      if (confirmDiscard()) {
        setOpen(false);
      }
    },
    [confirmDiscard],
  );

  return { confirmDiscard, handleSheetOpenChange };
}
