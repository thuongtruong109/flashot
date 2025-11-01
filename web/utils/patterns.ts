// Pattern backgrounds inspired by ray.so and other modern design tools
export const patternBackgrounds: Record<
  string,
  { background: string; svg: string }
> = {
  none: {
    background: "transparent",
    svg: "",
  },
  vercel: {
    background: "#000000",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="vercel-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.15"/>
          <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.15"/>
          <circle cx="40" cy="0" r="1.5" fill="white" opacity="0.15"/>
          <circle cx="0" cy="40" r="1.5" fill="white" opacity="0.15"/>
          <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#vercel-pattern)"/>
    </svg>`,
  },
  supabase: {
    background: "linear-gradient(135deg, #3ECF8E 0%, #1a1a1a 100%)",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="supabase-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 L30 0 L30 60 Z" fill="white" opacity="0.03"/>
          <path d="M30 30 L60 0 L60 60 Z" fill="white" opacity="0.03"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#supabase-pattern)"/>
    </svg>`,
  },
  tailwind: {
    background: "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tailwind-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 40 Q20 20 40 40 T80 40" stroke="white" stroke-width="1" fill="none" opacity="0.1"/>
          <path d="M0 20 Q20 0 40 20 T80 20" stroke="white" stroke-width="1" fill="none" opacity="0.08"/>
          <path d="M0 60 Q20 40 40 60 T80 60" stroke="white" stroke-width="1" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#tailwind-pattern)"/>
    </svg>`,
  },
  openai: {
    background: "linear-gradient(135deg, #10a37f 0%, #1a1a1a 100%)",
    svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="openai-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="30" stroke="white" stroke-width="0.5" fill="none" opacity="0.15"/>
          <circle cx="50" cy="50" r="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.12"/>
          <circle cx="50" cy="50" r="40" stroke="white" stroke-width="0.5" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#openai-pattern)"/>
    </svg>`,
  },
  mintlify: {
    background: "linear-gradient(135deg, #00D4AA 0%, #00A37D 100%)",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mintlify-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="25" height="25" fill="white" opacity="0.03"/>
          <rect x="25" y="25" width="25" height="25" fill="white" opacity="0.03"/>
          <line x1="0" y1="0" x2="50" y2="50" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="50" x2="50" y2="0" stroke="white" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#mintlify-pattern)"/>
    </svg>`,
  },
  prisma: {
    background: "linear-gradient(135deg, #2D3748 0%, #0C344B 100%)",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="prisma-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" stroke="white" stroke-width="0.5" fill="none" opacity="0.12"/>
          <path d="M20 10 L30 20 L20 30 L10 20 Z" stroke="white" stroke-width="0.5" fill="none" opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#prisma-pattern)"/>
    </svg>`,
  },
  clerk: {
    background: "linear-gradient(135deg, #6C47FF 0%, #4318FF 100%)",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="clerk-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="10" y="10" width="40" height="40" rx="4" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="20" y="20" width="20" height="20" rx="2" stroke="white" stroke-width="0.5" fill="none" opacity="0.12"/>
          <circle cx="30" cy="30" r="3" fill="white" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#clerk-pattern)"/>
    </svg>`,
  },
  eventlab: {
    background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="eventlab-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="white" opacity="0.15"/>
          <circle cx="60" cy="20" r="2" fill="white" opacity="0.15"/>
          <circle cx="20" cy="60" r="2" fill="white" opacity="0.15"/>
          <circle cx="60" cy="60" r="2" fill="white" opacity="0.15"/>
          <line x1="20" y1="20" x2="60" y2="20" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="60" x2="60" y2="60" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="20" x2="20" y2="60" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="60" y1="20" x2="60" y2="60" stroke="white" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#eventlab-pattern)"/>
    </svg>`,
  },
  resend: {
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="resend-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M0 25 L25 0 L50 25 L25 50 Z" stroke="white" stroke-width="1" fill="none" opacity="0.08"/>
          <line x1="25" y1="0" x2="25" y2="50" stroke="white" stroke-width="0.5" opacity="0.05"/>
          <line x1="0" y1="25" x2="50" y2="25" stroke="white" stroke-width="0.5" opacity="0.05"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#resend-pattern)"/>
    </svg>`,
  },
  trigger: {
    background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="trigger-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 L30 15 L60 30 L30 45 Z" stroke="white" stroke-width="1" fill="none" opacity="0.1"/>
          <circle cx="30" cy="30" r="4" fill="white" opacity="0.15"/>
          <circle cx="0" cy="30" r="2" fill="white" opacity="0.1"/>
          <circle cx="60" cy="30" r="2" fill="white" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#trigger-pattern)"/>
    </svg>`,
  },
  grid: {
    background: "#1a1a1a",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="40" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="20" y1="0" x2="20" y2="40" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="40" y1="0" x2="40" y2="40" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="0" x2="40" y2="0" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="white" stroke-width="0.5" opacity="0.1"/>
          <line x1="0" y1="40" x2="40" y2="40" stroke="white" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#grid-pattern)"/>
    </svg>`,
  },
  "dots-dense": {
    background: "#0f172a",
    svg: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots-dense-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="20" height="20" fill="url(#dots-dense-pattern)"/>
    </svg>`,
  },
  "diagonal-lines": {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="0" y1="30" x2="30" y2="0" stroke="white" stroke-width="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#diagonal-pattern)"/>
    </svg>`,
  },
};

/**
 * Get the pattern background data for a given pattern ID
 */
export const getPatternBackground = (patternId: string): string => {
  const pattern = patternBackgrounds[patternId];
  if (!pattern || patternId === "none") {
    return "transparent";
  }

  // Convert SVG to data URL
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(pattern.svg)}`;

  // Return combined background with pattern overlay
  if (
    pattern.background.startsWith("linear-gradient") ||
    pattern.background.startsWith("#")
  ) {
    return `${pattern.background}`;
  }

  return pattern.background;
};

/**
 * Get the pattern SVG as a data URL
 */
export const getPatternSvgDataUrl = (patternId: string): string => {
  const pattern = patternBackgrounds[patternId];
  if (!pattern || patternId === "none" || !pattern.svg) {
    return "";
  }

  return `data:image/svg+xml;base64,${btoa(pattern.svg)}`;
};

/**
 * Check if a pattern requires overlay (has SVG pattern)
 */
export const hasPatternOverlay = (patternId: string): boolean => {
  const pattern = patternBackgrounds[patternId];
  return !!(pattern && pattern.svg && patternId !== "none");
};
