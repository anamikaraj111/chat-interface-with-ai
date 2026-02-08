"use client";
import { Bot, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/SidebarStore";

interface AiNavbarProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<0 | 1>>;
}

function AiNavbar({ tab, setTab }: AiNavbarProps) {
  const { isOpen, toggleSidebar } = useSidebarStore();
  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-5">
            <button
              className={`flex py-3 gap-2 cursor-pointer text-sm ${
                tab === 0 ? "border-b border-blue-500 text-blue-500" : ""
              } items-center justify-center`}
              onClick={() => setTab(0)}
            >
              <Bot size={20} />
              <span>AI Copilot</span>
            </button>
            <button
              className={`flex py-3 gap-2 cursor-pointer text-sm ${
                tab === 1 ? "border-b border-blue-500 text-blue-500" : ""
              } items-center justify-center`}
              onClick={() => setTab(1)}
            >
              Details
            </button>
          </div>
          {isOpen && (
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <PanelRightClose />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default AiNavbar;
