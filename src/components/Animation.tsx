"use client";
import React, { useEffect, useState } from "react";

const LoadingDots: React.FC<{ text: string }> = ({ text }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-lg font-mono text-gray-500">
      {text}
      {dots}
    </span>
  );
};

export default LoadingDots;
