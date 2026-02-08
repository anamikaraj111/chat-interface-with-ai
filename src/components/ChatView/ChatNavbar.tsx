"use client";

import { MoreHorizontal, Clock, CopyPlus, PanelLeftClose } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import useChatStore from "@/store/ChatStore";
import useSidebarStore from "@/store/SidebarStore";

function ChatNavbar() {
  const {
    currentChatId,
    setCurrentChatId,
    getCurrentChat,
    addBadgeToCurrentChat,
  } = useChatStore();
  const { toggleSidebar, isOpen } = useSidebarStore();

  const currentChat = getCurrentChat();

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-medium">
          {currentChatId == 0 ? "" : currentChat?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => addBadgeToCurrentChat("3min")}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Clock className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              setCurrentChatId(0);
            }}
            size="sm"
            className="h-8 flex items-center justify-center rounded-md"
          >
            <CopyPlus />
            <span>Close</span>
          </Button>
          {!isOpen && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 flex cursor-pointer items-center justify-center rounded-md"
              onClick={() => toggleSidebar()}
            >
              <PanelLeftClose />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatNavbar;
