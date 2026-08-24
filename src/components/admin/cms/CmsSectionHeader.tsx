import type { ReactNode } from "react";
import { CmsTranslateToHindiButton } from "@/components/admin/cms/CmsFormAssist";

export function CmsSectionHeader({
  title,
  icon,
  translate,
}: {
  title: string;
  icon?: ReactNode;
  translate?: {
    disabled?: boolean;
    enTexts: string[];
    onTranslated: (translations: string[]) => void;
    hint?: string;
  };
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {translate ? (
        <div className="shrink-0 sm:max-w-xs">
          <CmsTranslateToHindiButton
            variant="inline"
            disabled={translate.disabled}
            enTexts={translate.enTexts}
            onTranslated={translate.onTranslated}
            hint={translate.hint}
          />
        </div>
      ) : null}
    </div>
  );
}
