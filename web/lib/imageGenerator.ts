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
      (format === "png" || format === "webp" || format === "avif") &&
      options.showBackground &&
      options.background === "transparent"
    ) {
      // PNG, WebP, AVIF with transparent background - only make the outer container transparent
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
        onclone: (clonedDoc: Document) => {
          try {
            const header = clonedDoc.querySelector(
              "[data-export-header]"
            ) as HTMLElement | null;
            if (header) {
              // Apply explicit export-safe styles to avoid rendering differences
              header.style.height = "40px";
              header.style.display = "flex";
              header.style.alignItems = "center";
              header.style.fontFamily =
                "Arial, system-ui, -apple-system, sans-serif";
              header.style.fontSize = "14px";
              header.style.paddingLeft = "16px";
              header.style.paddingRight = "16px";
            }
            // Target specific header children for pixel adjustments
            const traffic = clonedDoc.querySelector(
              "[data-export-traffic]"
            ) as HTMLElement | null;
            const filenameEl = clonedDoc.querySelector(
              "[data-export-filename]"
            ) as HTMLElement | null;
            const linecountEl = clonedDoc.querySelector(
              "[data-export-linecount]"
            ) as HTMLElement | null;

            if (traffic) {
              traffic.style.display = "flex";
              traffic.style.alignItems = "center";
            }

            if (filenameEl) {
              // Nudge up more to match on-screen baseline
              filenameEl.style.transform = "translateY(-3px)";
              filenameEl.style.marginTop = "0px";
            }

            if (linecountEl) {
              linecountEl.style.transform = "translateY(-3px)";
              linecountEl.style.marginTop = "0px";
            }

            // Replace header content with SVG for pixel-perfect rendering
            if (header && filenameEl && linecountEl && traffic) {
              const filenameText = filenameEl.textContent || "";
              const linecountText = linecountEl.textContent || "";
              const align = header.dataset.windowHeaderAlign || "left";

              let trafficX = [16, 32, 48];
              let filenameX = 70;
              if (align === "right") {
                trafficX = [320, 336, 352]; // After line count on right
                filenameX = 70; // Keep filename on left
              }

              // Create SVG with exact positioning
              const svg = `
                <svg width="100%" height="40" xmlns="http://www.w3.org/2000/svg">
                  <!-- Traffic lights -->
                  <circle cx="${trafficX[0]}" cy="20" r="6" fill="#ef4444"/>
                  <circle cx="${trafficX[1]}" cy="20" r="6" fill="#facc15"/>
                  <circle cx="${trafficX[2]}" cy="20" r="6" fill="#22c55e"/>
                  <!-- Filename -->
                  <text x="${filenameX}" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#52525b">${filenameText}</text>
                  <!-- Line count -->
                  <text x="100%" y="24" dx="-16" text-anchor="end" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">${linecountText}</text>
                </svg>
              `;

              header.innerHTML = svg;
              header.style.padding = "0";
            }
          } catch (e) {
            // Ignore clone styling errors
          }
        },
      } as any);

      // Restore main element styles
      elementRef.style.background = mainOriginalStyles.background;
      elementRef.style.backgroundColor = mainOriginalStyles.backgroundColor;
      elementRef.style.backgroundImage = mainOriginalStyles.backgroundImage;

      // Return with appropriate format and transparency
      switch (format.toLowerCase()) {
        case "webp":
          return canvas.toDataURL("image/webp", 0.95);
        case "avif":
          if (canvas.toDataURL("image/avif")) {
            return canvas.toDataURL("image/avif", 0.85);
          }
          return canvas.toDataURL("image/webp", 0.85);
        case "png":
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
      onclone: (clonedDoc: Document) => {
        try {
          const header = clonedDoc.querySelector(
            "[data-export-header]"
          ) as HTMLElement | null;
          if (header) {
            header.style.height = "40px";
            header.style.display = "flex";
            header.style.alignItems = "center";
            header.style.fontFamily =
              "Arial, system-ui, -apple-system, sans-serif";
            header.style.fontSize = "14px";
            header.style.paddingLeft = "12px";
            header.style.paddingRight = "12px";
          }

          const traffic = clonedDoc.querySelector(
            "[data-export-traffic]"
          ) as HTMLElement | null;
          const filenameEl = clonedDoc.querySelector(
            "[data-export-filename]"
          ) as HTMLElement | null;
          const linecountEl = clonedDoc.querySelector(
            "[data-export-linecount]"
          ) as HTMLElement | null;

          if (traffic) {
            traffic.style.display = "flex";
            traffic.style.alignItems = "center";
          }

          if (filenameEl) {
            filenameEl.style.transform = "translateY(-3px)";
            filenameEl.style.marginTop = "0px";
          }

          if (linecountEl) {
            linecountEl.style.transform = "translateY(-3px)";
            linecountEl.style.marginTop = "0px";
          }

          // Replace header content with SVG for pixel-perfect rendering
          if (header && filenameEl && linecountEl && traffic) {
            const filenameText = filenameEl.textContent || "";
            const linecountText = linecountEl.textContent || "";
            const align = header.dataset.windowHeaderAlign || "left";
            const showColor = header.dataset.showTrafficLightsColor !== "false";

            // Measure text widths
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            let trafficX: number[] = [16, 32, 48];
            let filenameX = 70;
            let linecountX: string | number = "100%";
            let linecountAnchor = "end";
            let linecountDx = "-16";

            if (ctx) {
              ctx.font = "14px Arial, sans-serif";
              const filenameWidth = ctx.measureText(filenameText).width;
              const linecountWidth = ctx.measureText(linecountText).width;
              const trafficWidth = 44; // Approximate width of traffic lights
              const margin = 16;
              const headerWidth = header.clientWidth;

              if (align === "left") {
                trafficX = [16, 32, 48];
                filenameX = 16 + trafficWidth + margin;
                linecountX = "100%";
                linecountAnchor = "end";
                linecountDx = "-16";
              } else {
                filenameX = 16;
                // Position line count and traffic on the far right
                const groupWidth = linecountWidth + margin + trafficWidth;
                linecountX = headerWidth - groupWidth + 24 - 40;
                trafficX = [
                  (linecountX as number) + linecountWidth + margin + 5,
                  (linecountX as number) + linecountWidth + margin + 5 + 16,
                  (linecountX as number) + linecountWidth + margin + 5 + 32,
                ];
                linecountAnchor = "start";
                linecountDx = "0";
              }
            } else {
              // Fallback to fixed positions
              if (align === "right") {
                filenameX = 16;
                linecountX = 284; // Shifted left by 20 more
                linecountAnchor = "start";
                linecountDx = "0";
                trafficX = [349, 365, 381]; // Keep position
              }
            }

            // Create SVG with exact positioning
            const svg = `
              <svg width="100%" height="40" xmlns="http://www.w3.org/2000/svg">
                <!-- Traffic lights -->
                <circle cx="${trafficX[0]}" cy="20" r="6" fill="${
              showColor ? "#ef4444" : "#4b5563"
            }"/>
                <circle cx="${trafficX[1]}" cy="20" r="6" fill="${
              showColor ? "#facc15" : "#4b5563"
            }"/>
                <circle cx="${trafficX[2]}" cy="20" r="6" fill="${
              showColor ? "#22c55e" : "#4b5563"
            }"/>
                <!-- Filename -->
                <text x="${filenameX}" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#52525b">${filenameText}</text>
                <!-- Line count -->
                <text x="${linecountX}" y="24" dx="${linecountDx}" text-anchor="${linecountAnchor}" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">${linecountText}</text>
              </svg>
            `;

            header.innerHTML = svg;
            header.style.padding = "0";
          }
        } catch (e) {
          // ignore
        }
      },
    } as any);

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
