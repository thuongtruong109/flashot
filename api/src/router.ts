import { bufferToImg, codeToImg, pathToImg, urlToImg } from "flashot";
import { Hono } from "hono";

const router = new Hono();

// Helper function to determine content type based on format
const getContentType = (format = "webp"): string => {
  switch (format.toLowerCase()) {
    case "png":
      return "image/png";
    case "jpeg":
    case "jpg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    default:
      return "image/webp";
  }
};

// Helper function to get file extension based on format
const getFileExtension = (format = "webp"): string => {
  switch (format.toLowerCase()) {
    case "png":
      return "png";
    case "jpeg":
    case "jpg":
      return "jpg";
    case "webp":
      return "webp";
    case "avif":
      return "avif";
    default:
      return "webp";
  }
};

// Convert code string to image
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { code, options } = body;

    if (!code) {
      return c.json({ error: "Code is required" }, 400);
    }

    const buffer = await codeToImg(code, options);
    const uint8Array = new Uint8Array(buffer);
    const format = options?.format || "webp";

    return new Response(uint8Array, {
      headers: {
        "Content-Type": getContentType(format),
        "Content-Disposition": `attachment; filename="flashot-code.${getFileExtension(
          format,
        )}"`,
      },
    });
  } catch (error) {
    console.error("Error generating code image:", error);
    return c.json({ error: "Failed to generate image" }, 500);
  }
});

// Convert code from URL to image
router.post("/url", async (c) => {
  try {
    const body = await c.req.json();
    const { url, options } = body;

    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    const buffer = await urlToImg(url, options);
    const uint8Array = new Uint8Array(buffer);
    const format = options?.format || "webp";

    return new Response(uint8Array, {
      headers: {
        "Content-Type": getContentType(format),
        "Content-Disposition": `attachment; filename="flashot-url.${getFileExtension(
          format,
        )}"`,
      },
    });
  } catch (error) {
    console.error("Error generating image from URL:", error);
    return c.json({ error: "Failed to generate image from URL" }, 500);
  }
});

// Convert code from file path to image
router.post("/file", async (c) => {
  try {
    const body = await c.req.json();
    const { path, options } = body;

    if (!path) {
      return c.json({ error: "File path is required" }, 400);
    }

    const buffer = await pathToImg(path, options);
    const uint8Array = new Uint8Array(buffer);
    const format = options?.format || "webp";

    return new Response(uint8Array, {
      headers: {
        "Content-Type": getContentType(format),
        "Content-Disposition": `attachment; filename="flashot-file.${getFileExtension(
          format,
        )}"`,
      },
    });
  } catch (error) {
    console.error("Error generating image from file:", error);
    return c.json({ error: "Failed to generate image from file" }, 500);
  }
});

// Convert code from hex buffer to image
router.post("/buffer", async (c) => {
  try {
    const body = await c.req.json();
    const { buffer, options } = body;

    if (!buffer) {
      return c.json({ error: "Buffer is required" }, 400);
    }

    const imageBuffer = await bufferToImg(buffer, options);
    const uint8Array = new Uint8Array(imageBuffer);
    const format = options?.format || "webp";

    return new Response(uint8Array, {
      headers: {
        "Content-Type": getContentType(format),
        "Content-Disposition": `attachment; filename="flashot-buffer.${getFileExtension(
          format,
        )}"`,
      },
    });
  } catch (error) {
    console.error("Error generating image from buffer:", error);
    return c.json({ error: "Failed to generate image from buffer" }, 500);
  }
});

// Get available options and defaults
router.get("/options", async (c) => {
  try {
    const availableOptions = {
      languages: [
        "javascript",
        "typescript",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "go",
        "rust",
        "php",
        "ruby",
        "kotlin",
        "swift",
        "dart",
        "scala",
        "html",
        "css",
        "scss",
        "sass",
        "less",
        "json",
        "xml",
        "yaml",
        "toml",
        "markdown",
        "sql",
        "bash",
        "shell",
        "powershell",
        "dockerfile",
      ],
      themes: [
        "github-dark",
        "github-light",
        "dracula",
        "monokai",
        "nord",
        "one-dark-pro",
        "solarized-dark",
        "solarized-light",
        "material-theme",
        "atom-one-dark",
        "atom-one-light",
        "vs-code-dark",
        "vs-code-light",
      ],
      formats: ["png", "jpeg", "webp", "avif"],
      fonts: {
        JetBrainsMono:
          "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
        UbuntuSansMono:
          "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2",
        Abeezee:
          "https://fonts.bunny.net/abeezee/files/abeezee-latin-400-normal.woff2",
      },
      defaultOptions: {
        lang: "js",
        theme: "dracula",
        format: "webp",
        quality: 100,
        gap: 1,
        style: {
          padding: 25,
          borderRadius: 8,
        },
        lineNumbers: {
          enabled: false,
          startFrom: 1,
          color: "#7b7f8b",
          marginRight: 0,
        },
        highlight: {
          enabled: false,
          backgroundColor: "#347faa23",
          borderRadius: 0,
          at: 1,
          depth: 1,
        },
      },
    };

    return c.json(availableOptions);
  } catch (error) {
    console.error("Error getting options:", error);
    return c.json({ error: "Failed to get options" }, 500);
  }
});

// Health check endpoint
router.get("/health", async (c) => {
  return c.json({
    status: "healthy",
    service: "flashot-api",
    timestamp: new Date().toISOString(),
  });
});

export default router;
