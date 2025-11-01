"use client";

import React from "react";
import { cn } from "@/utils";

interface PatternSelectorProps {
  selectedPattern: string;
  onPatternChange: (pattern: string) => void;
}

// SVG Pattern Definitions inspired by ray.so
const patterns = [
  {
    id: "none",
    name: "None",
    svg: null,
    background: "transparent",
  },
  {
    id: "vercel",
    name: "Vercel",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="vercel-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.15"/>
          <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.15"/>
          <circle cx="40" cy="0" r="1.5" fill="currentColor" opacity="0.15"/>
          <circle cx="0" cy="40" r="1.5" fill="currentColor" opacity="0.15"/>
          <circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#vercel-pattern)"/>
    </svg>`,
    background: "#000000",
  },
  {
    id: "supabase",
    name: "Supabase",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="supabase-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 L30 0 L30 60 Z" fill="currentColor" opacity="0.03"/>
          <path d="M30 30 L60 0 L60 60 Z" fill="currentColor" opacity="0.03"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#supabase-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #3ECF8E 0%, #1a1a1a 100%)",
  },
  {
    id: "tailwind",
    name: "Tailwind",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tailwind-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 40 Q20 20 40 40 T80 40" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
          <path d="M0 20 Q20 0 40 20 T80 20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.08"/>
          <path d="M0 60 Q20 40 40 60 T80 60" stroke="currentColor" stroke-width="1" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#tailwind-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
  },
  {
    id: "openai",
    name: "OpenAI",
    svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="openai-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.15"/>
          <circle cx="50" cy="50" r="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.12"/>
          <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#openai-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #10a37f 0%, #1a1a1a 100%)",
  },
  {
    id: "mintlify",
    name: "Mintlify",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mintlify-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="25" height="25" fill="currentColor" opacity="0.03"/>
          <rect x="25" y="25" width="25" height="25" fill="currentColor" opacity="0.03"/>
          <line x1="0" y1="0" x2="50" y2="50" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="50" x2="50" y2="0" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#mintlify-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #00D4AA 0%, #00A37D 100%)",
  },
  {
    id: "prisma",
    name: "Prisma",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="prisma-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.12"/>
          <path d="M20 10 L30 20 L20 30 L10 20 Z" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#prisma-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #2D3748 0%, #0C344B 100%)",
  },
  {
    id: "clerk",
    name: "Clerk",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="clerk-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="40" height="40" rx="4" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="20" y="20" width="20" height="20" rx="2" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.12"/>
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#clerk-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #6C47FF 0%, #4318FF 100%)",
  },
  {
    id: "eventlab",
    name: "EventLab",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="eventlab-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="20" cy="60" r="2" fill="currentColor" opacity="0.15"/>
          <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.15"/>
          <line x1="20" y1="20" x2="60" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="20" x2="20" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="60" y1="20" x2="60" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#eventlab-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
  },
  {
    id: "resend",
    name: "Resend",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="resend-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M0 25 L25 0 L50 25 L25 50 Z" stroke="currentColor" stroke-width="1" fill="none" opacity="0.08"/>
          <line x1="25" y1="0" x2="25" y2="50" stroke="currentColor" stroke-width="0.5" opacity="0.05"/>
          <line x1="0" y1="25" x2="50" y2="25" stroke="currentColor" stroke-width="0.5" opacity="0.05"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#resend-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
  },
  {
    id: "trigger",
    name: "Trigger.dev",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="trigger-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 L30 15 L60 30 L30 45 Z" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
          <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.15"/>
          <circle cx="0" cy="30" r="2" fill="currentColor" opacity="0.1"/>
          <circle cx="60" cy="30" r="2" fill="currentColor" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#trigger-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
  },
  {
    id: "grid",
    name: "Grid",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="40" y1="0" x2="40" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="40" x2="40" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#grid-pattern)"/>
    </svg>`,
    background: "#1a1a1a",
  },
  {
    id: "dots-dense",
    name: "Dots Dense",
    svg: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots-dense-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="20" height="20" fill="url(#dots-dense-pattern)"/>
    </svg>`,
    background: "#0f172a",
  },
  {
    id: "diagonal-lines",
    name: "Diagonal Lines",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="0" y1="30" x2="30" y2="0" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#diagonal-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  },
];

const PatternSelector: React.FC<PatternSelectorProps> = ({
  selectedPattern,
  onPatternChange,
}) => {
  const renderPatternButton = (pattern: (typeof patterns)[0]) => {
    const isSelected = selectedPattern === pattern.id;
    const isNone = pattern.id === "none";

    return (
      <button
        key={pattern.id}
        onClick={() => onPatternChange(pattern.id)}
        className={cn(
          "group relative overflow-hidden transition-all duration-200 ease-out",
          "w-full aspect-square rounded-lg cursor-pointer",
          isSelected
            ? "ring-[1.5px] ring-blue-500 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-950"
            : "ring-1 ring-black/[0.06] dark:ring-white/[0.06] hover:ring-black/[0.12] dark:hover:ring-white/[0.12]"
        )}
        title={pattern.name}
      >
        {/* Pattern Preview */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: pattern.background,
          }}
        >
          {pattern.svg && (
            <div
              className="absolute inset-0 text-white"
              dangerouslySetInnerHTML={{ __html: pattern.svg }}
            />
          )}
          {isNone && (
            <div className="absolute inset-0 bg-[repeating-conic-gradient(#e5e7eb_0deg_90deg,#f9fafb_90deg_180deg)] dark:bg-[repeating-conic-gradient(#374151_0deg_90deg,#1f2937_90deg_180deg)] bg-[length:12px_12px]" />
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 shadow-lg">
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6l2.5 2.5L10 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-200" />
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
        Pattern Backgrounds
      </p>
      <div className="grid grid-cols-5 gap-2.5">
        {patterns.map((pattern) => renderPatternButton(pattern))}
      </div>
    </div>
  );
};

export default PatternSelector;
