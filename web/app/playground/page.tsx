"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { themes, copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "app/playground/_components/SettingsPanel";
import JSONDataSection from "app/playground/_components/JSONDataSection";
import TipsModal from "app/playground/_components/TipsModal";
import CodeEditor from "app/playground/_components/CodeEditor";
import ActionBar from "app/playground/_components/ActionBar";
import Footer from "app/components/Footer";
import Brand from "app/playground/_components/Brand";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

export default function Page() {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<CodeSettings>({
    language: "javascript",
    theme: "dark",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    showBackground: true,
    padding: 32,
    borderRadius: 8,
    showWindowControls: true,
    fontFamily: "Fira Code",
    fontSize: 14,
    showLineCount: true,
    showFileName: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [fileName, setFileName] = useState("flashot-code-snippet");
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);
  const codeRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  // Close settings panel when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node) &&
        showSettingsPanel &&
        window.innerWidth < 1024 // Only on mobile
      ) {
        setShowSettingsPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettingsPanel]);

  // Set initial settings panel visibility based on screen size
  // and keep it always open on desktop
  useEffect(() => {
    const handleResize = () => {
      // On desktop (lg screens), always show the panel
      if (window.innerWidth >= 1024) {
        setShowSettingsPanel(true);
      } else {
        setShowSettingsPanel(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
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
    async (format: string = "png") => {
      if (!codeRef.current) return;

      setIsGenerating(true);
      try {
        const success = await generateAndDownloadImage(
          codeRef.current,
          { ...settings, code },
          `${fileName}.${format}`
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
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 lg:py-4">
          {/* Brand Component */}
          <Brand showVersion={true} />

          {/* Enhanced Action Bar */}
          <ActionBar
            onCopy={handleCopyCode}
            onDownload={handleDownloadImage}
            onShowSettings={() => {
              // Only toggle settings panel on mobile screens
              if (window.innerWidth < 1024) {
                setShowSettingsPanel(!showSettingsPanel);
              }
            }}
            onShowJSON={() => setShowJSONModal(true)}
            onShowTips={() => setShowTipsModal(true)}
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
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 h-full flex justify-center">
          <div
            ref={codeRef}
            className="w-full max-w-3xl"
            style={{ height: "33vh" }}
          >
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              settings={settings}
              showLineNumbers={showLineNumbers}
              fileName={fileName}
              onFileNameChange={setFileName}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Fixed Settings Sidebar */}
        <SettingsPanel
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
    </div>
  );
}
