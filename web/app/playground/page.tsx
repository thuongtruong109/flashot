"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings } from "@/types";
import { copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "@/app/playground/_components/SettingsPanel";
import TipsModal from "@/app/playground/_components/TipsModal";
import CodeEditor from "@/app/playground/_components/editor";
import ActionBar from "@/app/playground/_components/header/ActionBar";
import Brand from "@/app/playground/_components/header/Brand";
import TourGuide from "@/app/playground/_components/TourGuide";
import Image from "next/image";
import { DEFAULT_CODE_SETTINGS } from "@/shared";
import WidthRuler from "@/app/playground/_components/editor/WidthRuler";
import HeightRuler from "@/app/playground/_components/editor/HeightRuler";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

export default function Page() {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<CodeSettings>(DEFAULT_CODE_SETTINGS);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [fileName, setFileName] = useState(settings.fileName);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false); // Start with false to prevent SSR issues
  const [isClient, setIsClient] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const [editorWidth, setEditorWidth] = useState(0);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });
  const [editorSize, setEditorSize] = useState({ width: 600, height: 400 });

  // Handle position change from CodeEditor
  const handleEditorPositionChange = useCallback(
    (position: { x: number; y: number }) => {
      setEditorPosition(position);
    },
    []
  );

  // Handle size change from CodeEditor
  const handleEditorSizeChange = useCallback(
    (size: { width: number; height: number }) => {
      setEditorSize(size);
    },
    []
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

  // Set initial settings panel visibility based on screen size
  // and keep it always open on desktop
  // Removed auto-open/close logic for desktop/mobile
  // Panel will only open/close via user action

  const updateSetting = <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const [activeMenuLabel, setActiveMenuLabel] = useState<string | undefined>(
    undefined
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
          `${fileName}.${exportFormat}`
        );

        if (!success) {
          alert("Failed to generate image. Please try again.");
        }
      } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to generate image. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    },
    [code, settings, fileName]
  );

  // Bridge export event from SettingsPanel
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

  return (
    <div className="h-screen bg-white dark:bg-gray-950 bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden flex flex-col">
      <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-sm px-2 sm:px-4 lg:px-6 flex items-center justify-between py-2 w-full gap-4">
        <div data-tour="brand" className="flex-shrink-0">
          <Brand showVersion={true} />
        </div>

        <div data-tour="action-bar" className="flex-shrink-0 ml-auto">
          <ActionBar
            onCopy={handleCopyCode}
            onDownload={handleDownloadImage}
            onShowSettings={handleToggleSettings}
            onShowJSON={() => {}}
            onShowTips={() => setShowTipsModal(true)}
            onShowGuide={() => setShowTourGuide(true)}
            copySuccess={copySuccess}
            isGenerating={isGenerating}
            fileName={fileName}
            onFileNameChange={setFileName}
            showSettingsPanel={showSettingsPanel}
            showJSONPanel={false}
            settings={settings}
            onUpdateSetting={updateSetting as any}
            className="w-full lg:w-auto"
          />
        </div>
      </div>

      {/* Main Container with Sidebar Layout */}
      <div className="flex-1 flex h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] transition-all duration-300 w-full">
        {/* Main Content Area */}
        <div className="flex-1 transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 h-full relative">
          {/* Grid Background */}
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

          {/* Code Editor and Ruler Container */}
          <div data-tour="code-editor" className="absolute inset-0 z-10">
            <CodeEditor
              ref={codeRef}
              code={code}
              onChange={handleCodeChange}
              settings={settings}
              fileName={fileName}
              className="w-full h-full"
              onUpdateSetting={updateSetting}
              onPositionChange={handleEditorPositionChange}
              onSizeChange={handleEditorSizeChange}
            />

            {/* Width Ruler - positioned below with fixed spacing */}
            <WidthRuler
              width={editorSize.width}
              height={editorSize.height}
              editorPosition={editorPosition}
              showJSONPanel={false}
            />

            {/* Height Ruler - positioned left with fixed spacing */}
            <HeightRuler
              width={editorSize.width}
              height={editorSize.height}
              editorPosition={editorPosition}
              showJSONPanel={false}
            />
          </div>
        </div>

        <SettingsPanel
          data-tour="settings-panel"
          settings={settings}
          fileName={fileName}
          code={code}
          isVisible={showSettingsPanel}
          activeMenu={activeMenuLabel}
          onChangeActiveMenu={(m) => setActiveMenuLabel(m)}
          onUpdateSetting={updateSetting}
          onFileNameChange={setFileName}
          onToggleVisibility={handleToggleSettings}
          onImportTemplate={handleImportJSON}
          onExportTemplate={handleExportJSON}
        />
      </div>

      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
      />

      <TourGuide
        isOpen={showTourGuide}
        onClose={() => setShowTourGuide(false)}
      />
    </div>
  );
}
