import React from "react";
import { CodeSettings } from "@/types";
import ActionBar from "./ActionBar";
import Brand from "./Brand";

interface HeaderProps {
  onCopy: () => Promise<void>;
  onDownload: (format?: string) => Promise<void>;
  onShowSettings: () => void;
  onShowJSON: () => void;
  onShowTips: () => void;
  onShowGuide: () => void;
  onShowShortcuts?: () => void;
  onNavigateToSection?: (section: string, itemId?: string) => void;
  copySuccess: boolean;
  isGenerating: boolean;
  fileName: string;
  onFileNameChange: (name: string) => void;
  showSettingsPanel: boolean;
  showJSONPanel: boolean;
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

export default function Header({
  onCopy,
  onDownload,
  onShowSettings,
  onShowJSON,
  onShowTips,
  onShowGuide,
  onShowShortcuts,
  onNavigateToSection,
  copySuccess,
  isGenerating,
  fileName,
  onFileNameChange,
  showSettingsPanel,
  showJSONPanel,
  settings,
  onUpdateSetting,
}: HeaderProps) {
  return (
    <div className="relative bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-sm px-2 sm:px-4 flex items-center justify-between py-2 w-full gap-4">
      <div data-tour="brand" className="flex-shrink-0">
        <Brand />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div data-tour="action-bar" className="flex-shrink-0">
          <ActionBar
            onCopy={onCopy}
            onDownload={onDownload}
            onShowSettings={onShowSettings}
            onShowJSON={onShowJSON}
            onShowTips={onShowTips}
            onShowGuide={onShowGuide}
            onShowShortcuts={onShowShortcuts}
            onNavigateToSection={onNavigateToSection}
            copySuccess={copySuccess}
            isGenerating={isGenerating}
            fileName={fileName}
            onFileNameChange={onFileNameChange}
            showSettingsPanel={showSettingsPanel}
            showJSONPanel={showJSONPanel}
            settings={settings}
            onUpdateSetting={onUpdateSetting as any}
            className="w-full lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
