"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { themes, copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "app/playground/_components/SettingsPanel";
import JSONDataSection from "app/playground/_components/JSONDataSection";
import TipsModal from "app/playground/_components/TipsModal";
import CodeEditor from "@/app/playground/_components/editor";
import ActionBar from "app/playground/_components/ActionBar";
import Brand from "app/playground/_components/Brand";
import FloatingButtons from "app/playground/_components/FloatingButtons";
import TourGuide from "app/playground/_components/TourGuide";
import Image from "next/image";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

export default function Page() {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<CodeSettings>({
    language: "javascript",
    theme: "dracula",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    showBackground: true,
    padding: 32,
    borderRadius: 10,
    showWindowControls: true,
    fontFamily: "Fira Code",
    fontSize: 14,
    showLineCount: true,
    showFileName: true,
    exportFormat: "webp",
    width: undefined, // Auto-fit by default
    height: undefined, // Auto-fit by default
    wordWrap: false, // Default word wrap disabled
    showCaption: false, // Default caption disabled
    captionText: "Figure: Sample code snippet", // Default caption text
    captionStyle: "normal", // Default normal style
    captionOpacity: 0.5, // Default half opacity
    captionPosition: "bottom", // Default bottom position
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [fileName, setFileName] = useState("index");
  const [showSettingsPanel, setShowSettingsPanel] = useState(false); // Start with false to prevent SSR issues
  const [isClient, setIsClient] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    // Set initial settings panel state based on screen size
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setShowSettingsPanel(true);
    }
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
  useEffect(() => {
    const handleResize = () => {
      // On desktop (lg screens), always show the panel
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setShowSettingsPanel(true);
        } else {
          setShowSettingsPanel(false);
        }
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const updateSetting = <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

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
      showLineNumbers,
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
      if (!codeRef.current) return;

      const exportFormat = format || settings.exportFormat || "png";
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

  // Handle code changes from the CodeEditor component
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const currentTheme = themes[settings.theme as ThemeName];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-100 relative overflow-hidden flex flex-col">
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm px-2 sm:px-4 lg:px-6 flex items-center justify-between py-2 w-full gap-4">
        <div data-tour="brand" className="flex-shrink-0">
          <Brand showVersion={true} />
        </div>

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

          {/* Floating Action Buttons */}
          <FloatingButtons
            data-tour="floating-buttons"
            onShowTips={() => setShowTipsModal(true)}
            // onShowGuide={() => setShowTourGuide(true)}
          />

          <div
            data-tour="code-editor"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-10"
            style={{
              height: "auto",
              minHeight: "400px",
              padding: "20px",
            }}
          >
            <CodeEditor
              ref={codeRef}
              code={code}
              onChange={handleCodeChange}
              settings={settings}
              showLineNumbers={showLineNumbers}
              fileName={fileName}
              className="w-full h-full"
              onUpdateSetting={updateSetting}
            />
          </div>
        </div>

        {/* Fixed Settings Sidebar */}
        <SettingsPanel
          data-tour="settings-panel"
          settings={settings}
          showLineNumbers={showLineNumbers}
          fileName={fileName}
          isVisible={showSettingsPanel}
          onUpdateSetting={updateSetting}
          onToggleLineNumbers={setShowLineNumbers}
          onFileNameChange={setFileName}
          onToggleVisibility={() => setShowSettingsPanel(!showSettingsPanel)}
        />
      </div>

      {/* JSON Data Sheet Component */}
      <JSONDataSection
        code={code}
        settings={settings}
        showLineNumbers={showLineNumbers}
        onCopyJSON={handleCopyJSON}
        copySuccess={jsonCopySuccess}
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
      />

      {/* Tips Modal Component */}
      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
      />

      {/* Tour Guide Component */}
      <TourGuide
        isOpen={showTourGuide}
        onClose={() => setShowTourGuide(false)}
      />
    </div>
  );
}
