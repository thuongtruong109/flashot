"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings } from "@/types";
import { copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "@/app/playground/_components/SettingsPanel";
import JSONDataSection from "@/app/playground/_components/JSONDataSection";
import TipsModal from "@/app/playground/_components/TipsModal";
import CodeEditor from "@/app/playground/_components/editor";
import ActionBar from "@/app/playground/_components/header/ActionBar";
import Brand from "@/app/playground/_components/header/Brand";
import TourGuide from "@/app/playground/_components/TourGuide";
import Image from "next/image";
import { DEFAULT_CODE_SETTINGS } from "@/shared";
import HeaderNavigation from "@/app/playground/_components/header";
import WidthRuler from "@/app/playground/_components/WidthRuler";

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
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
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
    setShowSettingsPanel(true);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      // Initialize with default width, will be updated by ResizeObserver
      setEditorWidth(editorSize.width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [settings.width, editorSize.width]);

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

  // When a tab is clicked in the header, open the settings panel
  const handleOpenMainPanel = useCallback((menuLabel: string) => {
    setActiveMenuLabel(menuLabel);
    setShowSettingsPanel(true);
  }, []);

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCopyJSON = async () => {
    const jsonData = {
      code,
      settings,
      timestamp: new Date().toISOString(),
    };
    const success = await copyToClipboard(JSON.stringify(jsonData, null, 2));
    if (success) {
      setJsonCopySuccess(true);
      setTimeout(() => setJsonCopySuccess(false), 2000);
    }
  };

  const handleDownloadImage = useCallback(
    async (format?: string) => {
      if (settings.exportType === "file") {
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

        const extension =
          settings.exportFormat === "original"
            ? getExtension(settings.language)
            : "txt";
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

      // Handle image export
      if (!codeRef.current) return;

      const exportFormat = format || settings.exportFormat || "webp";
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

  return (
    <div className="h-screen bg-white bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-100 relative overflow-hidden flex flex-col">
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm px-2 sm:px-4 lg:px-6 flex items-center justify-between py-2 w-full gap-4">
        <div data-tour="brand" className="flex-shrink-0">
          <Brand showVersion={true} />
        </div>

        <HeaderNavigation
          settings={settings}
          onUpdateSetting={updateSetting}
          onOpenMainPanel={handleOpenMainPanel}
          activePanelMenu={activeMenuLabel}
        />

        <div data-tour="action-bar" className="flex-shrink-0">
          <ActionBar
            onCopy={handleCopyCode}
            onDownload={handleDownloadImage}
            onShowSettings={() => {
              // Only toggle settings panel on mobile screens
              if (typeof window !== "undefined" && window.innerWidth < 1024) {
                setShowSettingsPanel(!showSettingsPanel);
              }
            }}
            onShowJSON={() => setShowJSONModal(true)}
            onShowTips={() => setShowTipsModal(true)}
            onShowGuide={() => setShowTourGuide(true)}
            copySuccess={copySuccess}
            isGenerating={isGenerating}
            fileName={fileName}
            onFileNameChange={setFileName}
            showSettingsPanel={showSettingsPanel}
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
            />
          </div>
        </div>

        <SettingsPanel
          data-tour="settings-panel"
          settings={settings}
          fileName={fileName}
          isVisible={showSettingsPanel}
          activeMenu={activeMenuLabel}
          onChangeActiveMenu={(m) => setActiveMenuLabel(m)}
          onUpdateSetting={updateSetting}
          onFileNameChange={setFileName}
          onToggleVisibility={() => setShowSettingsPanel(!showSettingsPanel)}
        />
      </div>

      <JSONDataSection
        code={code}
        settings={settings}
        onCopyJSON={handleCopyJSON}
        copySuccess={jsonCopySuccess}
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
      />

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
