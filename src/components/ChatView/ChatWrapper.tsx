"use client";

import useChatStore from "@/store/ChatStore";
import ChatNavbar from "./ChatNavbar";
import ChatInputArea from "./ChatInputArea";
import ChatContent from "./ChatContent";

const ChatWrapper = () => {
  const { currentChatId } = useChatStore();

  if (currentChatId <= 0) {
    return (
      <div className="text-gray-500 flex-1 flex items-center justify-center text-center py-8">
        Select a conversation to view messages.
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col h-full">
        <ChatNavbar />
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Scrollable chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <ChatContent />
          </div>
          {/* Fixed input area */}
          <ChatInputArea />
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
