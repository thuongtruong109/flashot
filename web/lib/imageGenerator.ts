import { CodeSettings } from "@/types";

export interface ImageGenerationOptions extends CodeSettings {
  code: string;
}

export const generateCodeImage = async (
  elementRef: HTMLElement | null,
  options: ImageGenerationOptions,
  format: string = "png"
): Promise<string | null> => {
  if (!elementRef || typeof window === "undefined") {
    console.error("Element reference is null or running in SSR");
    return null;
  }

  try {
    const html2canvas = (await import("html2canvas")).default;

    // Determine background based on user settings and format
    let backgroundColor: string | undefined = undefined;

    if (format === "jpg" || format === "jpeg") {
      // JPG doesn't support transparency, use checkered pattern for transparent backgrounds
      if (options.showBackground && options.background === "transparent") {
        backgroundColor = "#ffffff"; // Use white background for JPG when transparent is selected
      } else {
        backgroundColor = "#ffffff"; // Default white for JPG
      }
    } else if (
      format === "png" &&
      options.showBackground &&
      options.background === "transparent"
    ) {
      // PNG with transparent background - only make the outer container transparent
      // Store original styles of the main element only
      const mainOriginalStyles = {
        background: elementRef.style.background,
        backgroundColor: elementRef.style.backgroundColor,
        backgroundImage: elementRef.style.backgroundImage,
      };

      // Make only the main element transparent (keep code editor backgrounds)
      elementRef.style.background = "none";
      elementRef.style.backgroundColor = "transparent";
      elementRef.style.backgroundImage = "none";

      // Capture with transparent outer background but preserve inner content backgrounds
      const canvas = await html2canvas(elementRef, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null, // Set to null for transparent background per docs
      } as any);

      // Restore main element styles
      elementRef.style.background = mainOriginalStyles.background;
      elementRef.style.backgroundColor = mainOriginalStyles.backgroundColor;
      elementRef.style.backgroundImage = mainOriginalStyles.backgroundImage;

      // Return early with transparent PNG
      return canvas.toDataURL("image/png", 1.0);
    } else if (options.showBackground && options.background === "transparent") {
      // Other formats (WebP, AVIF) with transparent background - use checkered pattern
      // We need to temporarily modify the element to show checkered pattern
      const originalBackground = elementRef.style.background;
      elementRef.style.background =
        "repeating-conic-gradient(#808080 0deg 90deg, transparent 90deg 180deg) 0 0/20px 20px";

      // Capture with the checkered pattern
      const canvas = await html2canvas(elementRef, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        background: undefined,
      });

      // Restore original background
      elementRef.style.background = originalBackground;

      // Return early with the checkered pattern result
      switch (format.toLowerCase()) {
        case "webp":
          return canvas.toDataURL("image/webp", 0.95);
        case "avif":
          if (canvas.toDataURL("image/avif")) {
            return canvas.toDataURL("image/avif", 0.85);
          }
          return canvas.toDataURL("image/webp", 0.85);
        case "svg":
          return canvas.toDataURL("image/png", 1.0);
        default:
          return canvas.toDataURL("image/png", 1.0);
      }
    } else {
      // All other cases - let html2canvas capture the element's actual background
      backgroundColor = undefined;
    }

    // Simple approach - just capture the element
    const canvas = await html2canvas(elementRef, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      background: backgroundColor,
    });

    // Handle different formats
    switch (format.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return canvas.toDataURL("image/jpeg", 0.95);
      case "webp":
        return canvas.toDataURL("image/webp", 0.95);
      case "avif":
        // AVIF support is limited, fallback to WebP
        if (canvas.toDataURL("image/avif")) {
          return canvas.toDataURL("image/avif", 0.85);
        }
        return canvas.toDataURL("image/webp", 0.85);
      case "svg":
        // SVG generation is complex, fallback to PNG for now
        return canvas.toDataURL("image/png", 1.0);
      case "png":
      default:
        return canvas.toDataURL("image/png", 1.0);
    }
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
};

export const downloadImage = (
  dataUrl: string,
  filename: string = "code-snippet.png"
): void => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateAndDownloadImage = async (
  elementRef: HTMLElement | null,
  options: ImageGenerationOptions,
  filename?: string
): Promise<boolean> => {
  // Extract format from filename
  const format = filename ? filename.split(".").pop() || "png" : "png";
  const dataUrl = await generateCodeImage(elementRef, options, format);

  if (dataUrl) {
    downloadImage(dataUrl, filename);
    return true;
  }

  return false;
};
