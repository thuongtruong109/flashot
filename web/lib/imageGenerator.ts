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

    // For transparent background option, temporarily remove the grid pattern
    let originalBackground: string = "";
    let originalBackgroundColor: string = "";
    let originalBackgroundImage: string = "";

    if (options.showBackground && options.background === "transparent") {
      originalBackground = elementRef.style.background;
      originalBackgroundColor = elementRef.style.backgroundColor;
      originalBackgroundImage = elementRef.style.backgroundImage;

      // Remove transparent grid pattern for export
      elementRef.style.background = "transparent";
      elementRef.style.backgroundColor = "transparent";
      elementRef.style.backgroundImage = "none";
    }

    // Determine background based on format
    // ALWAYS use null for wrapper background to ensure transparency
    const backgroundColor =
      format === "jpg" || format === "jpeg"
        ? "#ffffff" // JPG doesn't support transparency
        : null; // PNG, WebP, AVIF - transparent wrapper

    // Capture with transparent wrapper
    const canvas = await html2canvas(elementRef, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: backgroundColor, // This controls the WRAPPER background
      onclone: (clonedDoc: Document) => {
        try {
          // Hide resize handles during export
          const resizeHandles = clonedDoc.querySelectorAll(
            "[data-export-ignore]"
          );
          resizeHandles.forEach((handle) => {
            (handle as HTMLElement).style.display = "none";
          });

          // Only fix vertical alignment - don't touch any other styles
          const filenameEl = clonedDoc.querySelector(
            "[data-export-filename]"
          ) as HTMLElement | null;
          const linecountEl = clonedDoc.querySelector(
            "[data-export-linecount]"
          ) as HTMLElement | null;

          if (filenameEl) {
            filenameEl.style.transform = "translateY(-7px)";
            filenameEl.style.overflow = "visible";
            filenameEl.style.lineHeight = "normal";
          }

          if (linecountEl) {
            linecountEl.style.transform = "translateY(-8px)";
            linecountEl.style.overflow = "visible";
            linecountEl.style.lineHeight = "normal";
          }
        } catch (e) {
          // Ignore clone styling errors
        }
      },
    } as any);

    // Restore original background for transparent grid pattern
    if (options.showBackground && options.background === "transparent") {
      elementRef.style.background = originalBackground;
      elementRef.style.backgroundColor = originalBackgroundColor;
      elementRef.style.backgroundImage = originalBackgroundImage;
    }

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
