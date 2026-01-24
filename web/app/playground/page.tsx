"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings } from "@/types";
import { copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "@/app/playground/_components/SettingsPanel";
import TipsModal from "@/app/playground/_components/header/TipsModal";
import ShortcutsModal from "@/app/playground/_components/header/ShortcutsModal";
import CodeEditor from "@/app/playground/_components/editor";
import Header from "@/app/playground/_components/header";
import TourGuide from "@/app/playground/_components/header/TourGuide";
import ImportDialog from "@/app/playground/_components/header/ImportDialog";
import Image from "next/image";
import { DEFAULT_CODE_SETTINGS } from "@/shared";
import GradientBg from "@/app/playground/_components/GradientBg";
import { LocalizationProvider } from "./LocalizationContext";
import ToastItem from "@/app/playground/_components/ToastItem";

const defaultCode = `function mergeAndUniqueArrays(arrays) {
  if (!Array.isArray(arrays) || arrays.length === 0) return [];

  const combinedArray = arrays.reduce((accumulator, currentArray) => {
    return accumulator.concat(currentArray);
  }, []);

  const uniqueSet = new Set(combinedArray);

  return [...uniqueSet];
}`;

export default function Page() {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<CodeSettings>(DEFAULT_CODE_SETTINGS);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [fileName, setFileName] = useState(settings.fileName);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false); // Start with false to prevent SSR issues
  const [isClient, setIsClient] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const [editorWidth, setEditorWidth] = useState(0);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });
  const [editorSize, setEditorSize] = useState({ width: 600, height: 400 });
  const [isEditorHovered, setIsEditorHovered] = useState(false);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle position change from CodeEditor
  const handleEditorPositionChange = useCallback(
    (position: { x: number; y: number }) => {
      setEditorPosition(position);
    },
    [],
  );

  // Handle size change from CodeEditor
  const handleEditorSizeChange = useCallback(
    (size: { width: number; height: number }) => {
      setEditorSize(size);
    },
    [],
  );

  useEffect(() => {
    setIsClient(true);
    // Always show settings panel on desktop (>= 1024px)
    if (typeof window !== "undefined") {
      const isDesktop = window.innerWidth >= 1024;
      setShowSettingsPanel(isDesktop);
    }
  }, []);

  // Keep settings panel always visible on desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
          setShowSettingsPanel(true); // Always visible on desktop
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      setEditorWidth(editorSize.width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [settings.width, editorSize.width]);

  // Đảm bảo editorSize luôn đúng ngay khi mount
  useEffect(() => {
    if (codeRef.current) {
      const rect = codeRef.current.getBoundingClientRect();
      if (
        rect.width !== editorSize.width ||
        rect.height !== editorSize.height
      ) {
        setEditorSize({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    }
  }, [codeRef, editorSize.width, editorSize.height]);

  // Use ResizeObserver to track CodeEditor width changes
  useEffect(() => {
    if (!codeRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setEditorWidth(entry.contentRect.width);
        // Position is now handled by CodeEditor's onPositionChange callback
      }
    });

    resizeObserver.observe(codeRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Close settings panel when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node) &&
        showSettingsPanel &&
        typeof window !== "undefined" &&
        window.innerWidth < 1024 // Only on mobile
      ) {
        setShowSettingsPanel(false);
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [showSettingsPanel]);

  const updateSetting = useCallback(
    <K extends keyof CodeSettings>(key: K, value: CodeSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const [activeMenuLabel, setActiveMenuLabel] = useState<string | undefined>(
    undefined,
  );
  const [highlightItemId, setHighlightItemId] = useState<string | undefined>(
    undefined,
  );

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleImportJSON = (data: { code: string; settings: CodeSettings }) => {
    setCode(data.code);
    setSettings(data.settings);
    if (data.settings.fileName) {
      setFileName(data.settings.fileName);
    }
  };

  const handleImportFromURL = (code: string, language: string) => {
    setCode(code);
    updateSetting("language", language);
  };

  const handleUploadCode = async (file: File) => {
    try {
      const text = await file.text();
      setCode(text);

      // Detect language from file extension
      const extension = file.name.split(".").pop()?.toLowerCase();
      const languageMap: Record<string, string> = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        java: "java",
        cpp: "cpp",
        c: "c",
        go: "go",
        rs: "rust",
        rb: "ruby",
        php: "php",
        html: "html",
        css: "css",
        json: "json",
        xml: "xml",
        yaml: "yaml",
        yml: "yaml",
        md: "markdown",
        txt: "plaintext",
      };

      if (extension && languageMap[extension]) {
        updateSetting("language", languageMap[extension]);
      }

      // Update filename
      setFileName(file.name);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleExportJSON = () => {
    const jsonData = {
      code,
      settings,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = useCallback(
    async (format?: string) => {
      // Handle file export
      const getExtension = (lang: string) => {
        const extensions: Record<string, string> = {
          javascript: "js",
          typescript: "ts",
          python: "py",
          java: "java",
          cpp: "cpp",
          c: "c",
          csharp: "cs",
          php: "php",
          ruby: "rb",
          go: "go",
          rust: "rs",
          swift: "swift",
          kotlin: "kt",
          scala: "scala",
          html: "html",
          css: "css",
          scss: "scss",
          json: "json",
          xml: "xml",
          yaml: "yaml",
          sql: "sql",
          shell: "sh",
          powershell: "ps1",
          dockerfile: "dockerfile",
          markdown: "md",
        };
        return extensions[lang] || "txt";
      };

      const exportFormat = format || settings.exportFormat || "webp";

      if (settings.exportFormat === "original") {
        // Only export the code file, do not export image
        const extension = getExtension(settings.language);
        const filename = `${fileName}.${extension}`;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }

      // Export plain text file if exportFormat is 'plain'
      if (settings.exportFormat === "plain") {
        const filename = `${fileName}.txt`;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return;
      }

      // Handle image export
      if (!codeRef.current) return;
      setIsGenerating(true);
      try {
        const success = await generateAndDownloadImage(
          codeRef.current,
          { ...settings, code },
          `${fileName}.${exportFormat}`,
        );

        if (success) {
          setToastMessage(
            `Image exported successfully as ${exportFormat.toUpperCase()}!`,
          );
          setShowToast(true);
        } else {
          alert("Failed to generate image. Please try again.");
        }
      } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to generate image. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    },
    [code, settings, fileName],
  );

  // Keyboard shortcuts handler inspired by ray.so
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs or textareas
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Cmd/Ctrl + C - Copy editor as image (only when not typing)
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "c" &&
        !isTyping &&
        !e.shiftKey
      ) {
        e.preventDefault();
        if (codeRef.current) {
          try {
            const { generateCodeImage } = await import("@/lib/imageGenerator");
            const base64Image = await generateCodeImage(
              codeRef.current,
              { ...settings, code },
              "png",
            );

            if (base64Image) {
              const response = await fetch(base64Image);
              const blob = await response.blob();

              if (navigator.clipboard && ClipboardItem) {
                await navigator.clipboard.write([
                  new ClipboardItem({
                    "image/png": blob,
                  }),
                ]);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
              }
            }
          } catch (error) {
            console.error("Failed to copy image:", error);
          }
        }
        return;
      }

      // Cmd/Ctrl + Shift + C - Copy URL
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        if (codeRef.current) {
          try {
            const { generateCodeImage } = await import("@/lib/imageGenerator");
            const base64Image = await generateCodeImage(
              codeRef.current,
              { ...settings, code },
              "png",
            );

            if (base64Image) {
              const jsonData = {
                image: base64Image,
                code: code,
                settings: settings,
                timestamp: new Date().toISOString(),
              };

              const jsonString = JSON.stringify(jsonData);
              const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString)));
              const shareableLink = `${window.location.origin}${window.location.pathname}?share=${jsonBase64}`;

              await navigator.clipboard.writeText(shareableLink);
              setCopySuccess(true);
              setTimeout(() => setCopySuccess(false), 2000);
            }
          } catch (error) {
            console.error("Failed to copy URL:", error);
          }
        }
        return;
      }

      // Cmd/Ctrl + S - Save PNG
      if ((e.metaKey || e.ctrlKey) && e.key === "s" && !e.shiftKey) {
        e.preventDefault();
        handleDownloadImage("png");
        return;
      }

      // Cmd/Ctrl + Shift + S - Save SVG (fallback to PNG)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "S") {
        e.preventDefault();
        handleDownloadImage("png"); // SVG not yet implemented
        return;
      }

      // Cmd/Ctrl + K - Toggle export menu
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowTipsModal(true);
        return;
      }

      // Don't trigger single-key shortcuts when typing
      if (isTyping) return;

      switch (e.key.toLowerCase()) {
        case "f":
          // Focus text editor
          e.preventDefault();
          setIsEditorFocused(true);
          // Find and focus the textarea in the editor
          const textarea = document.querySelector(
            'textarea[placeholder="Paste or type your code here..."]',
          ) as HTMLTextAreaElement;
          if (textarea) {
            textarea.focus();
            // Trigger click on the code editor
            const editorEl = codeRef.current;
            if (editorEl) {
              editorEl.click();
            }
          }
          break;

        case "c":
          // Change colors (cycle through themes)
          e.preventDefault();
          const themeNames = [
            "dark",
            "light",
            "monokai",
            "github",
            "dracula",
            "nord",
            "material",
            "one-dark",
          ];
          const currentIndex = themeNames.indexOf(settings.theme);
          const nextIndex = (currentIndex + 1) % themeNames.length;
          updateSetting("theme", themeNames[nextIndex]);
          break;

        case "b":
          // Toggle background
          e.preventDefault();
          updateSetting("showBackground", !settings.showBackground);
          break;

        case "d":
          // Toggle dark mode (cycle through themes)
          e.preventDefault();
          updateSetting("theme", settings.theme === "dark" ? "light" : "dark");
          break;

        case "n":
          // Toggle line numbers
          e.preventDefault();
          updateSetting("showLineNumbers", !settings.showLineNumbers);
          break;

        case "p":
          // Change padding (cycle through common values)
          e.preventDefault();
          const paddingValues = [16, 32, 48, 64, 80];
          const currentPaddingIndex = paddingValues.indexOf(settings.padding);
          const nextPaddingIndex =
            (currentPaddingIndex + 1) % paddingValues.length;
          updateSetting("padding", paddingValues[nextPaddingIndex]);
          break;

        case "l":
          // Change language (cycle through common ones)
          e.preventDefault();
          const commonLanguages = [
            "javascript",
            "typescript",
            "python",
            "java",
            "cpp",
            "html",
            "css",
            "json",
          ];
          const currentLangIndex = commonLanguages.indexOf(settings.language);
          const nextLangIndex = (currentLangIndex + 1) % commonLanguages.length;
          updateSetting("language", commonLanguages[nextLangIndex]);
          break;

        case "?":
          e.preventDefault();
          setShowShortcutsModal(true);
          break;

        default:
          break;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [code, settings, handleDownloadImage, updateSetting]);

  useEffect(() => {
    const onExport = () => {
      handleDownloadImage();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("flashot:export", onExport as any);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("flashot:export", onExport as any);
      }
    };
  }, [handleDownloadImage]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleToggleSettings = () => {
    // Only allow toggle on mobile (< 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setShowSettingsPanel(!showSettingsPanel);
    }
  };

  const handleNavigateToSection = (section: string, itemId?: string) => {
    // Open settings panel if not already open
    setShowSettingsPanel(true);
    setActiveMenuLabel(section);
    if (itemId) {
      setHighlightItemId(itemId);
      setTimeout(() => {
        setHighlightItemId(undefined);
      }, 500);
    }
  };

  return (
    <LocalizationProvider>
      <div className="h-screen bg-white dark:bg-gray-950 bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden flex flex-col">
        <GradientBg />

        <Header
          onCopy={handleCopyCode}
          onDownload={handleDownloadImage}
          onShowSettings={handleToggleSettings}
          onShowJSON={() => {}}
          onShowTips={() => setShowTipsModal(true)}
          onShowGuide={() => setShowTourGuide(true)}
          onShowShortcuts={() => setShowShortcutsModal(true)}
          onNavigateToSection={handleNavigateToSection}
          copySuccess={copySuccess}
          isGenerating={isGenerating}
          fileName={fileName}
          onFileNameChange={setFileName}
          showSettingsPanel={showSettingsPanel}
          showJSONPanel={false}
          settings={settings}
          onUpdateSetting={updateSetting}
        />

        {/* Main Container with Sidebar Layout */}
        <div className="flex-1 flex h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] transition-all duration-300 w-full">
          {/* Main Content Area */}
          <div className="flex-1 transition-all duration-300 ease-in-out relative h-full max-h-[calc(100vh-3rem)] overflow-y-auto">
            <div
              data-tour="background-selector"
              className="absolute inset-0 pointer-events-none grid-background opacity-60"
            />
            <Image
              src="/playground_bg.svg"
              alt="grad_bg"
              className="absolute inset-0 size-full"
              fill
            />

            <CodeEditor
              data-tour="code-editor"
              ref={codeRef}
              code={code}
              onChange={handleCodeChange}
              settings={settings}
              fileName={fileName}
              onUpdateSetting={updateSetting}
              onPositionChange={handleEditorPositionChange}
              onSizeChange={handleEditorSizeChange}
              onHoverChange={setIsEditorHovered}
              onShowImport={() => setShowImportDialog(true)}
              onUploadCode={handleUploadCode}
            />
          </div>

          <SettingsPanel
            data-tour="settings-panel"
            settings={settings}
            fileName={fileName}
            code={code}
            isVisible={showSettingsPanel}
            activeMenu={activeMenuLabel}
            highlightItemId={highlightItemId}
            onChangeActiveMenu={(m) => setActiveMenuLabel(m)}
            onUpdateSetting={updateSetting}
            onFileNameChange={setFileName}
            onCodeChange={setCode}
            onToggleVisibility={handleToggleSettings}
            onImportTemplate={handleImportJSON}
            onExportTemplate={handleExportJSON}
          />
        </div>

        <TipsModal
          isOpen={showTipsModal}
          onClose={() => setShowTipsModal(false)}
        />

        <ShortcutsModal
          isOpen={showShortcutsModal}
          onClose={() => setShowShortcutsModal(false)}
        />

        <TourGuide
          isOpen={showTourGuide}
          onClose={() => setShowTourGuide(false)}
        />

        <ImportDialog
          isOpen={showImportDialog}
          onClose={() => setShowImportDialog(false)}
          onImport={handleImportFromURL}
        />

        <ToastItem
          message={toastMessage}
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      </div>
    </LocalizationProvider>
  );
}
