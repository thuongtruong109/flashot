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

    const canvas = await html2canvas(elementRef, {
      height: elementRef.offsetHeight,
      width: elementRef.offsetWidth,
      useCORS: true,
      allowTaint: true,
      logging: false,
      background: format === "jpg" ? "#ffffff" : undefined, // White background for JPG
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
