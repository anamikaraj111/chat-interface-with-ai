"use client";
import { useState, useEffect } from "react";

function TypingAnimation({ fullText }: { fullText: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 25); // Adjust the interval for typing speed

    return () => clearInterval(interval);
  }, [fullText]);

  return <div>{displayedText}</div>;
}

export default TypingAnimation;
