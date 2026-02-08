"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { ArrowUp, Loader } from "lucide-react";
import useAiChatStore from "@/store/AiChatStore";
import useChatStore from "@/store/ChatStore";
import { Conversation } from "@/types";
import ai from "@/lib/ai";

function AiInput() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const { conv, addConversation } = useAiChatStore();
  const { getCurrentChat } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === "") return;

    // Handle the prompt submission logic here
    console.log("Prompt submitted:", prompt);

    addConversation("user", prompt);

    setLoading(true);
    // Clear the input field after submission
    setPrompt("");

    const name = getCurrentChat()?.name as string;
    const conversations = getCurrentChat()?.conversations as Conversation[];

    const historyOfTwoPeople = conversations
      .map((c) => `${c.sender}: ${c.message}`)
      .join("\n");

    const convWithYou = conv.map((c) => `${c.sender}: ${c.message}`).join("\n");

    const command = `here is a conversation between me and ${name}:
${
  historyOfTwoPeople || "No prior messages."
} and here is my conversation with you : ${convWithYou}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: command,
        config: {
          systemInstruction: `
You are Beru, an AI copilot designed to assist users with ongoing conversations. 

Your role is to:
- Understand and analyze chat history between the user and another person.
- Provide suggestions for replies, summaries, or clarification upon request.
- Offer actionable advice, helpful insights, and natural message drafts.
- Respond with empathy, clarity, and professionalism.
- Always refer to the conversation as something you're helping the user with — never impersonate the other person.

If the user asks:
- "What should I say?" — provide a concise, helpful response ready to be sent.
- "Summarize this" — give a clear summary of the dialogue.
- "What's the issue here?" — explain the conflict or main concern in plain terms.
- "What's next?" — recommend a next step.

Never break character. Always speak as Beru — a reliable assistant focused on conversations.
  `.trim(),
        },
      });

      const res = response.text;

      if (res) {
        addConversation("model", res);
      } else {
        addConversation("model", "Sorry, I couldn't find a response.");
      }
    } catch (err) {
      console.error("Error generating response:", err);
      addConversation("model", "Sorry, I couldn't find a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-10 p-4 border-t border-zinc-200">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question..."
            className="pr-10 bg-white border border-zinc-400"
          />
          <Button
            type="submit"
            variant="ghost"
            disabled={prompt.trim() === ""}
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <ArrowUp
                className={`h-4 w-4 ${
                  prompt.trim() === "" && "text-gray-500"
                } `}
              />
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default AiInput;
