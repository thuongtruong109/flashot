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
  {
    id: "hexagons",
    name: "Hexagons",
    svg: `<svg width="60" height="52" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons-new-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="60" height="52" fill="url(#hexagons-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "zigzag",
    name: "Zigzag",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="zigzag-new-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 L10 10 L20 20 L30 10 L40 20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.15"/>
          <path d="M0 40 L10 30 L20 40 L30 30 L40 40" stroke="currentColor" stroke-width="1" fill="none" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#zigzag-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "waves",
    name: "Waves",
    svg: `<svg width="100" height="20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="waves-new-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q25 0 50 10 T100 10" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="100" height="20" fill="url(#waves-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "crosses",
    name: "Crosses",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="crosses-new-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="15" y1="10" x2="15" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <line x1="10" y1="15" x2="20" y2="15" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#crosses-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "triangles",
    name: "Triangles",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="triangles-new-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 10 L40 40 L10 40 Z" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#triangles-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "squares-tilted",
    name: "Tilted Squares",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="squares-tilted-new-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#squares-tilted-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: "stars",
    name: "Stars",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="stars-new-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 15 L27 22 L34 22 L28 27 L30 34 L25 29 L20 34 L22 27 L16 22 L23 22 Z" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#stars-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  },
  {
    id: "circuit",
    name: "Circuit",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit-new-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.2"/>
          <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.2"/>
          <circle cx="20" cy="60" r="2" fill="currentColor" opacity="0.2"/>
          <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.2"/>
          <line x1="20" y1="20" x2="60" y2="20" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="20" x2="20" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <line x1="60" y1="20" x2="60" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="20" x2="60" y2="60" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#circuit-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    id: "plus",
    name: "Plus Signs",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="plus-new-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="15" y1="8" x2="15" y2="22" stroke="currentColor" stroke-width="1" opacity="0.15"/>
          <line x1="8" y1="15" x2="22" y2="15" stroke="currentColor" stroke-width="1" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#plus-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)",
  },
  {
    id: "dots-grid",
    name: "Dots Grid",
    svg: `<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots-grid-new-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="12.5" cy="12.5" r="1.5" fill="currentColor" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="25" height="25" fill="url(#dots-grid-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "mesh",
    name: "Mesh",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mesh-new-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="60" y2="60" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
          <line x1="0" y1="60" x2="60" y2="0" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
          <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
          <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#mesh-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)",
  },
  {
    id: "chevron",
    name: "Chevron",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="chevron-new-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 L20 10 L40 20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
          <path d="M0 30 L20 20 L40 30" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#chevron-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #ff5722 0%, #ff9800 100%)",
  },
  {
    id: "brick",
    name: "Brick Wall",
    svg: `<svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="brick-new-pattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="30" y="0" width="30" height="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="-15" y="20" width="30" height="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="15" y="20" width="30" height="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="45" y="20" width="30" height="20" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="40" fill="url(#brick-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
  },
  {
    id: "polka-dots",
    name: "Polka Dots",
    svg: `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="polka-new-pattern" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
          <circle cx="17.5" cy="17.5" r="3" fill="currentColor" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="35" height="35" fill="url(#polka-new-pattern)"/>
    </svg>`,
    background: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
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
