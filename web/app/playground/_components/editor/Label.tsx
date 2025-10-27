"use client";

import React from "react";
import { cn } from "@/utils";

interface LabelProps {
  text: string;
  alignment: "left" | "center" | "right";
  opacity: number;
  color: string;
  fontSize: number;
  show: boolean;
}

const Label: React.FC<LabelProps> = ({
  text,
  alignment,
  opacity,
  color,
  fontSize,
  show,
}) => {
  if (!show || !text) return null;

  const alignmentStyles = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  return (
    <div
      className={cn(
        "absolute bottom-1 left-0 right-0 flex px-4 pointer-events-none z-50",
        alignmentStyles[alignment]
      )}
    >
      <p
        style={{
          opacity,
          color,
          fontSize: `${fontSize}px`,
          fontFamily: "inherit",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        }}
        className="font-normal tracking-normal select-none"
      >
        {text}
      </p>
    </div>
  );
};

export default Label;
