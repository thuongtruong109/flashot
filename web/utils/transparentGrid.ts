/**
 * Generate a transparent grid pattern as a data URL
 * @param size - Size of each grid square in pixels
 * @param color1 - First color (light)
 * @param color2 - Second color (dark)
 * @returns Data URL string for the grid pattern
 */
export const generateTransparentGrid = (
  size: number = 16,
  color1: string = "#f3f4f6",
  color2: string = "#e5e7eb"
): string => {
  try {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      // Fallback to CSS gradient if canvas is not available
      return `repeating-conic-gradient(${color2} 0deg 90deg, ${color1} 90deg 180deg) 0 0/${size}px ${size}px`;
    }

    // Set canvas size to 2x2 grid squares
    canvas.width = size * 2;
    canvas.height = size * 2;

    // Fill with first color
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add checkerboard squares with second color
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, size, size); // Top-left
    ctx.fillRect(size, size, size, size); // Bottom-right

    // Convert to data URL
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.warn("Failed to generate transparent grid pattern:", error);
    // Fallback to CSS gradient
    return `repeating-conic-gradient(${color2} 0deg 90deg, ${color1} 90deg 180deg) 0 0/${size}px ${size}px`;
  }
};

/**
 * Generate different grid patterns for various use cases
 */
export const transparentGridPatterns = {
  // For background selector button - subtle and small
  selector: () => generateTransparentGrid(12, "#f9fafb", "#e5e7eb"),

  // For code editor background - larger and more visible
  editor: () => generateTransparentGrid(20, "#f8fafc", "#e2e8f0"),

  // Small pattern for compact areas
  small: () => generateTransparentGrid(8, "#f1f5f9", "#e2e8f0"),

  // Large pattern for backgrounds
  large: () => generateTransparentGrid(32, "#fafafa", "#e4e4e7"),

  // High contrast for better visibility
  contrast: () => generateTransparentGrid(16, "#ffffff", "#d1d5db"),
};

/**
 * Get transparent grid as CSS background image
 */
export const getTransparentGridCSS = (
  pattern: "selector" | "editor" | "small" | "large" | "contrast" = "editor"
) => {
  const dataUrl = transparentGridPatterns[pattern]();
  return {
    backgroundImage: `url("${dataUrl}")`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
  };
};
