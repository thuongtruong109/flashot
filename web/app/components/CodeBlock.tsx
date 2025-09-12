"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 z-10 p-1.5 bg-gray-800/80 hover:bg-gray-700/80 dark:bg-gray-600/80 dark:hover:bg-gray-500/80 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-gray-600/50 dark:border-gray-400/50"
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-gray-300 hover:text-white" />
      )}
    </button>
  );
}

interface CodeBlockWrapperProps {
  children: React.ReactNode;
  code: string;
}

export default function CodeBlockWrapper({
  children,
  code,
}: CodeBlockWrapperProps) {
  return (
    <div className="relative group">
      <CopyButton text={code} />
      {children}
    </div>
  );
}
