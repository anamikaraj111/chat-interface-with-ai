"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useChatStore from "@/store/ChatStore";
import { useEffect, useRef } from "react";
import MessageViewer from "../MessageViewer";

export default function ChatContent() {
  const { getCurrentChat } = useChatStore();
  const chat = getCurrentChat();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chat?.conversations.length]);

  if (!chat) return null;

  return (
    <div
      className="space-y-6 overflow-y-auto font-[font-name:var(--font-geist-sans)]"
      ref={containerRef}
    >
      {chat?.conversations.length > 0 ? (
        chat?.conversations.map((conv, idx) => (
          <div
            key={idx}
            className={
              conv.sender === "Me"
                ? "flex items-start gap-3 justify-end"
                : "flex items-start gap-3"
            }
          >
            {conv.sender !== "Me" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className={` ${chat.avatarColor} font-[family-name:var(--font-geist-mono)]`}
                >
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={
                conv.sender === "Me" ? "flex-1 flex justify-end" : "flex-1"
              }
            >
              <div className="max-w-[80%] w-fit">
                <div
                  className={` text-sm ${
                    conv.sender == "Me" ? "bg-blue-100" : "bg-gray-200"
                  } rounded-lg p-3`}
                >
                  <MessageViewer message={conv.message} />
                </div>
                <div
                  className={
                    conv.sender === "Me"
                      ? "flex items-center justify-end gap-2 mt-1"
                      : "flex items-center mt-1"
                  }
                >
                  <span className="text-xs text-gray-500">
                    {conv.sender === "Me" ? "You" : chat.name}
                  </span>
                </div>
              </div>
            </div>
            {conv.sender === "Me" && (
              <Avatar className="h-8 w-8 ml-3">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-sm text-gray-500 mt-1">
            Start a conversation with {chat.name}! by saying &quot;HI&quot;
          </p>
        </div>
      )}
    </div>
  );
}
