"use client";
import {
  Bookmark,
  ChevronDown,
  Loader,
  MessageSquareText,
  Smile,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandTextarea from "@/components/Textarea";
import { useState } from "react";
import useChatStore from "@/store/ChatStore";
import ai from "@/lib/ai";
import { buildPrompt } from "@/lib/generatePrompt";
import { Conversation } from "@/types";

const ChatInputArea = () => {
  const [message, setMessage] = useState("");
  const { addMessageToCurrentChat } = useChatStore();
  const [loading, setLoading] = useState(false);
  const { getCurrentChat } = useChatStore();

  const handleSubmit = async () => {
    if (!message.trim()) return;
    // update the chat store with the new message
    addMessageToCurrentChat("Me", message);
    setLoading(true);
    setMessage("");

    const name = getCurrentChat()?.name as string;
    const context = getCurrentChat()?.context as string;
    const conversations = getCurrentChat()?.conversations as Conversation[];

    const prompt = buildPrompt({ name, context, conversations });

    console.log("Prompt:", prompt);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const res = response.text;

      if (res) {
        addMessageToCurrentChat(name, res);
      } else {
        addMessageToCurrentChat(name, "Sorry, I couldn't find a response.");
      }
    } catch (err) {
      console.error("Error generating response:", err);
      addMessageToCurrentChat(name, "Sorry, I couldn't find a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-t border-gray-200 px-4 py-2 bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex cursor-pointer items-center justify-center"
          >
            <MessageSquareText />
            <span>Chat</span>
            <ChevronDown />
          </Button>
        </div>
        <CommandTextarea message={message} setMessage={setMessage} />

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center">
            <Button variant="ghost">
              <Zap fill="black" className="h-4 w-4" />
            </Button>
            <div className="h-[17px] mx-2 w-px bg-gray-200" />
            <div className="flex items-center justify-center">
              <Button variant="ghost">
                <Bookmark fill="black" className="h-4 w-4" />
              </Button>
              <Button variant="ghost">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <div className="h-8 flex  items-center justify-center">
              <Button
                disabled={!message.trim()}
                onClick={handleSubmit}
                variant="ghost"
                className={`h-8 ${
                  !message.trim() && "text-gray-300"
                } cursor-pointer`}
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <span className="text-sm">Send</span>
                )}
              </Button>
              <div className="h-[17px] w-px bg-gray-200" />
              <Button variant="ghost" className="h-8">
                <ChevronDown />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInputArea;
