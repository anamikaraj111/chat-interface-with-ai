"use client";

import { useEffect, useRef } from "react";
import useAiChatStore from "@/store/AiChatStore";
import { Brain } from "lucide-react";
import MessageViewer from "../MessageViewer";

function AiView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { conv } = useAiChatStore();

  useEffect(() => {
    console.log(scrollRef.current);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conv?.length]);

  return (
    <>
      <div
        ref={scrollRef}
        className={`relative ${
          !(conv.length > 0)
            ? "flex flex-col items-center justify-center"
            : "space-y-3"
        } scrollbar-gradient z-10 flex-1 overflow-y-auto px-4 py-6`}
      >
        {conv.length > 0 ? (
          conv.map((item, index) => (
            <div
              key={index}
              className={`max-w-[80%] text-sm px-4 py-2 rounded-md break-words whitespace-pre-wrap ${
                item.sender === "user"
                  ? "bg-gray-200 ml-auto"
                  : "bg-blue-100 text-left"
              }`}
              style={{ width: "fit-content" }}
            >
              {/* {index === conv.length - 1 &&
              item.sender !== "Me" &&
              prompt === "" ? (
                <TypingAnimation fullText={item.message} />
              ) : ( */}
              <MessageViewer message={item.message} />
            </div>
          ))
        ) : (
          <>
            <div className="mb-6">
              <Brain
                className="h-12 w-12 text-gray-300 mx-auto"
                strokeWidth={1}
              />
            </div>
            <h3 className="text-base font-bold">
              Hi, I&apos;m Beru AI Copilot
            </h3>
            <p className="text-sm text-center text-gray-500 mt-1">
              Start by typing &quot;HI&quot; and then ask anything about the
              conversation
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default AiView;
