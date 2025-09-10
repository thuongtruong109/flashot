"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { themes, copyToClipboard } from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import SettingsPanel from "@/components/SettingsPanel";
import JSONDataSection from "@/components/JSONDataSection";
import TipsModal from "@/components/TipsModal";
import CodeEditor from "@/components/CodeEditor";
import ActionBar from "@/components/ActionBar";
import Footer from "@/components/Footer";
import Brand from "@/components/Brand";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

const CodeToImageConverter: React.FC = () => {
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
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [fileName, setFileName] = useState("flashot-code-snippet");
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
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
  useEffect(() => {
    const handleResize = () => {
      // Only auto-manage visibility if not manually toggled by user
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
      {/* Enhanced Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(99, 102, 241, 0.8) 1.5px, transparent 0),
            radial-gradient(circle at 80px 80px, rgba(139, 92, 246, 0.6) 1px, transparent 0)
          `,
            backgroundSize: "100px 100px",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(90deg, rgba(71, 85, 105, 0.1) 0.5px, transparent 0),
            linear-gradient(rgba(71, 85, 105, 0.08) 0.5px, transparent 0)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Enhanced Header with glassmorphism effect */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 lg:py-4">
          {/* Brand Component */}
          <Brand size="sm" showVersion={true} />

          {/* Enhanced Action Bar */}
          <ActionBar
            onCopy={handleCopyCode}
            onDownload={handleDownloadImage}
            onShowSettings={() => setShowSettingsPanel(!showSettingsPanel)}
            onShowJSON={() => setShowJSONModal(true)}
            onShowTips={() => setShowTipsModal(true)}
            copySuccess={copySuccess}
            isGenerating={isGenerating}
            fileName={fileName}
            onFileNameChange={setFileName}
            className="w-full lg:w-auto"
          />
        </div>
      </div>

      {/* Main Container with Sidebar Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-y-auto scroll-smooth custom-scrollbar transition-all duration-300 ease-in-out ${
            showSettingsPanel ? "lg:pr-80" : "lg:pr-0"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8 min-h-full">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {/* Code Editor Section */}
                <div className="flex justify-center">
                  <div ref={codeRef} className="w-full max-w-4xl">
                    <CodeEditor
                      code={code}
                      onChange={handleCodeChange}
                      settings={settings}
                      showLineNumbers={showLineNumbers}
                      fileName={fileName}
                      onFileNameChange={setFileName}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
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

      {/* Footer */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showSettingsPanel ? "lg:pr-80" : "lg:pr-0"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default CodeToImageConverter;
