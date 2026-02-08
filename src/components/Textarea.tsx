import { Command } from "lucide-react";
import { useEffect, useRef } from "react";

interface CommandTextareaProps {
  message: string;
  setMessage: (message: string) => void;
}

export default function CommandTextarea({
  message,
  setMessage,
}: CommandTextareaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCmdK =
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k");

      if (isCmdK) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="relative w-full">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 resize-none outline-none border-none focus:outline-none focus:ring-0 focus:border-none placeholder-gray-400 placeholder:text-sm text-sm bg-transparent"
        placeholder="Use ⌘K for shortcuts"
        rows={1}
      />
      <div
        className="absolute left-2 top-2 pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <Command className="w-4 h-4 inline-block mr-1" />
        <span style={{ fontSize: "1px" }}>K for shortcuts</span>
      </div>
    </div>
  );
}
