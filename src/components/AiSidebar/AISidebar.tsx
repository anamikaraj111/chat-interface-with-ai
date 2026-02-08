"use client";

import AICopilot from "@/components/AiSidebar/AiCopilot";

import { useState } from "react";
import useSidebarStore from "@/store/SidebarStore";
import AiNavbar from "./AiNavbar";

function AISideBar() {
  const [tab, setTab] = useState<0 | 1>(0);
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={`transition-all duration-300 ease-in-out border-l border-gray-200 flex flex-col bg-white font-[family-name:var(--font-geist-sans)] ${
        isOpen ? "w-[350px]" : "w-0 overflow-hidden"
      }`}
    >
      <AiNavbar tab={tab} setTab={setTab} />

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === 0 ? (
          <AICopilot />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Customer details would appear here.
          </div>
        )}
      </div>
    </div>
  );
}

export default AISideBar;
