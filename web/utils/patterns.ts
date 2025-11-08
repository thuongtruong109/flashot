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
  hexagons: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    svg: `<svg width="60" height="52" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" stroke="white" stroke-width="0.5" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="60" height="52" fill="url(#hexagons-pattern)"/>
    </svg>`,
  },
  zigzag: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="zigzag-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 L10 10 L20 20 L30 10 L40 20" stroke="white" stroke-width="1" fill="none" opacity="0.15"/>
          <path d="M0 40 L10 30 L20 40 L30 30 L40 40" stroke="white" stroke-width="1" fill="none" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#zigzag-pattern)"/>
    </svg>`,
  },
  waves: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    svg: `<svg width="100" height="20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="waves-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q25 0 50 10 T100 10" stroke="white" stroke-width="1" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="100" height="20" fill="url(#waves-pattern)"/>
    </svg>`,
  },
  crosses: {
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="crosses-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="15" y1="10" x2="15" y2="20" stroke="white" stroke-width="0.5" opacity="0.15"/>
          <line x1="10" y1="15" x2="20" y2="15" stroke="white" stroke-width="0.5" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#crosses-pattern)"/>
    </svg>`,
  },
  triangles: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="triangles-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 10 L40 40 L10 40 Z" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#triangles-pattern)"/>
    </svg>`,
  },
  "squares-tilted": {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="squares-tilted-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" stroke="white" stroke-width="0.5" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#squares-tilted-pattern)"/>
    </svg>`,
  },
  stars: {
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    svg: `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="stars-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M25 15 L27 22 L34 22 L28 27 L30 34 L25 29 L20 34 L22 27 L16 22 L23 22 Z" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="50" height="50" fill="url(#stars-pattern)"/>
    </svg>`,
  },
  circuit: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    svg: `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="white" opacity="0.2"/>
          <circle cx="60" cy="20" r="2" fill="white" opacity="0.2"/>
          <circle cx="20" cy="60" r="2" fill="white" opacity="0.2"/>
          <circle cx="60" cy="60" r="2" fill="white" opacity="0.2"/>
          <line x1="20" y1="20" x2="60" y2="20" stroke="white" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="60" x2="60" y2="60" stroke="white" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="20" x2="20" y2="60" stroke="white" stroke-width="0.5" opacity="0.15"/>
          <line x1="60" y1="20" x2="60" y2="60" stroke="white" stroke-width="0.5" opacity="0.15"/>
          <line x1="20" y1="20" x2="60" y2="60" stroke="white" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#circuit-pattern)"/>
    </svg>`,
  },
  plus: {
    background: "linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)",
    svg: `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="plus-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <line x1="15" y1="8" x2="15" y2="22" stroke="white" stroke-width="1" opacity="0.15"/>
          <line x1="8" y1="15" x2="22" y2="15" stroke="white" stroke-width="1" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="30" height="30" fill="url(#plus-pattern)"/>
    </svg>`,
  },
  "dots-grid": {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    svg: `<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots-grid-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="12.5" cy="12.5" r="1.5" fill="white" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="25" height="25" fill="url(#dots-grid-pattern)"/>
    </svg>`,
  },
  mesh: {
    background: "linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)",
    svg: `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mesh-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="60" y2="60" stroke="white" stroke-width="0.3" opacity="0.1"/>
          <line x1="0" y1="60" x2="60" y2="0" stroke="white" stroke-width="0.3" opacity="0.1"/>
          <line x1="30" y1="0" x2="30" y2="60" stroke="white" stroke-width="0.3" opacity="0.1"/>
          <line x1="0" y1="30" x2="60" y2="30" stroke="white" stroke-width="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#mesh-pattern)"/>
    </svg>`,
  },
  chevron: {
    background: "linear-gradient(135deg, #ff5722 0%, #ff9800 100%)",
    svg: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="chevron-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 L20 10 L40 20" stroke="white" stroke-width="1" fill="none" opacity="0.12"/>
          <path d="M0 30 L20 20 L40 30" stroke="white" stroke-width="1" fill="none" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="40" height="40" fill="url(#chevron-pattern)"/>
    </svg>`,
  },
  brick: {
    background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
    svg: `<svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="brick-pattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="30" height="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="30" y="0" width="30" height="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="-15" y="20" width="30" height="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="15" y="20" width="30" height="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
          <rect x="45" y="20" width="30" height="20" stroke="white" stroke-width="0.5" fill="none" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="60" height="40" fill="url(#brick-pattern)"/>
    </svg>`,
  },
  "polka-dots": {
    background: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
    svg: `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="polka-pattern" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
          <circle cx="17.5" cy="17.5" r="3" fill="white" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="35" height="35" fill="url(#polka-pattern)"/>
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
