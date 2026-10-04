"use client";

import { Icon } from "@/components/ui/Icon";
import { useInquiryModal } from "./InquiryModal";

/**
 * Kept as its own tiny client component so the surrounding banner can stay
 * a server component; only this button needs browser-side interactivity.
 */
export function CustomDevelopmentButton() {
  const openInquiry = useInquiryModal();

  return (
    <button
      type="button"
      onClick={() =>
        openInquiry({
          title: "Custom Footwear Pattern & Last Development",
          subtitle: "Client-Commissioned Bespoke Blueprint",
        })
      }
      className="w-full py-4 px-6 bg-secondary hover:bg-on-secondary-fixed text-on-secondary transition-colors duration-200 text-center type-label-md uppercase tracking-[0.2em] shadow-xs flex items-center justify-center gap-2"
    >
      <span>Discuss Custom Footwear Development</span>
      <Icon name="engineering" className="text-[18px]" />
    </button>
  );
}
