"use client";

import React, { useRef } from "react";
import {
  Upload,
  Download,
  FileJson,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { CodeSettings } from "@/types";
import { useLocalization } from "../../../LocalizationContext";

interface TemplateSectionProps {
  code: string;
  settings: CodeSettings;
  fileName: string;
  onImportTemplate: (data: { code: string; settings: CodeSettings }) => void;
  onExportTemplate: () => void;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

// Predefined popular templates
const POPULAR_TEMPLATES = [
  {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    description: "High-contrast neon with futuristic vibes",
    icon: "�",
    settings: {
      theme: "monokai",
      background:
        "linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #0070f3 100%)",
      padding: 50,
      borderRadius: 20,
      fontFamily: "Fira Code",
      fontSize: 16,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "minimal-zen",
    name: "Minimal Zen",
    description: "Ultra-clean white space design",
    icon: "🎋",
    settings: {
      theme: "github",
      background: "#f8f9fa",
      padding: 60,
      borderRadius: 0,
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      showWindowHeader: false,
      showLineNumbers: false,
      showBackground: false,
    },
  },
  {
    id: "retro-sunset",
    name: "Retro Sunset",
    description: "Warm 80s sunset vibes",
    icon: "🌇",
    settings: {
      theme: "one-dark",
      background:
        "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)",
      padding: 45,
      borderRadius: 25,
      fontFamily: "Cascadia Code",
      fontSize: 15,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "arctic-ice",
    name: "Arctic Ice",
    description: "Cool Nordic-inspired frost theme",
    icon: "❄️",
    settings: {
      theme: "nord",
      background:
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #b4e4ff 100%)",
      padding: 40,
      borderRadius: 15,
      fontFamily: "Source Code Pro",
      fontSize: 13,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "dark-hacker",
    name: "Dark Hacker",
    description: "Matrix-style terminal look",
    icon: "💻",
    settings: {
      theme: "dracula",
      background: "#0d1117",
      padding: 25,
      borderRadius: 8,
      fontFamily: "Fira Code",
      fontSize: 13,
      showWindowHeader: false,
      showLineNumbers: true,
      showBackground: false,
    },
  },
  {
    id: "pastel-dream",
    name: "Pastel Dream",
    description: "Soft dreamy pastel colors",
    icon: "🍭",
    settings: {
      theme: "material",
      background:
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)",
      padding: 55,
      borderRadius: 30,
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      showWindowHeader: true,
      showLineNumbers: false,
      showBackground: true,
    },
  },
  {
    id: "forest-mystique",
    name: "Forest Mystique",
    description: "Deep forest with magical glow",
    icon: "�",
    settings: {
      theme: "one-dark",
      background:
        "linear-gradient(135deg, #134e4a 0%, #10b981 50%, #064e3b 100%)",
      padding: 42,
      borderRadius: 18,
      fontFamily: "Cascadia Code",
      fontSize: 14,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Luxurious deep purple theme",
    icon: "👑",
    settings: {
      theme: "dracula",
      background:
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5b21b6 100%)",
      padding: 48,
      borderRadius: 22,
      fontFamily: "Fira Code",
      fontSize: 15,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
];

const TemplateSection: React.FC<TemplateSectionProps> = ({
  code,
  settings,
  fileName,
  onImportTemplate,
  onExportTemplate,
  onUpdateSetting,
}) => {
  const { t } = useLocalization();
  const [importSuccess, setImportSuccess] = React.useState(false);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.code && data.settings) {
            onImportTemplate(data);
            setImportSuccess(true);
            setImportError(null);
            setTimeout(() => setImportSuccess(false), 3000);
          } else {
            setImportError(t("template.invalidTemplateFormat"));
            setTimeout(() => setImportError(null), 3000);
          }
        } catch (error) {
          setImportError(t("template.errorParsingJson"));
          setTimeout(() => setImportError(null), 3000);
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApplyTemplate = (templateSettings: Partial<CodeSettings>) => {
    // Apply each setting sequentially with a small delay to ensure proper state updates
    const entries = Object.entries(templateSettings);
    entries.forEach(([key, value], index) => {
      setTimeout(() => {
        onUpdateSetting(key as keyof CodeSettings, value);
      }, index * 10); // 10ms delay between each setting
    });
  };

  const jsonData = {
    code,
    settings,
    timestamp: new Date().toISOString(),
  };

  const formattedJSON = JSON.stringify(jsonData, null, 2);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t("template.description")}
        </p>
      </div>

      {/* Status Messages */}
      {importSuccess && (
        <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-xs text-green-700 dark:text-green-300 font-medium">
            {t("template.importSuccess")}
          </p>
        </div>
      )}

      {importError && (
        <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-700 dark:text-red-300 font-medium">
            {importError}
          </p>
        </div>
      )}

      {/* Action Buttons - Horizontal Layout */}
      <div className="flex items-center gap-2 text-xs">
        {/* Export Button */}
        <button
          onClick={onExportTemplate}
          className="flex-1 group relative flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Download className="size-3.5 group-hover:scale-110 transition-transform" />
          <span>{t("template.export")}</span>
        </button>

        {/* Import Button */}
        <button
          onClick={handleImportClick}
          className="flex-1 group relative flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Upload className="size-3.5 group-hover:scale-110 transition-transform" />
          <span>{t("template.import")}</span>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Current Template Info - Collapsible Details */}
      <details className="group" open={isExpanded}>
        <summary
          className="cursor-pointer list-none"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <FileJson className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400" />
              {t("template.currentTemplate")}
            </p>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </summary>

        {/* JSON Preview with scrollable area */}
        <div className="mt-2 bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-sm border border-gray-700/50 dark:border-gray-800/50 rounded-lg overflow-hidden shadow-lg">
          <div className="relative">
            <pre className="text-xs text-gray-300 dark:text-gray-400 font-mono leading-relaxed overflow-y-auto max-h-64 p-3">
              <code className="language-json">
                {formattedJSON.split("\n").map((line, index) => (
                  <div key={index} className="flex">
                    <span className="text-gray-600 select-none w-8 text-right pr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span
                      className="flex-1"
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(
                            /(".*?")/g,
                            '<span class="text-green-400">$1</span>'
                          )
                          .replace(
                            /(:\s*)(true|false|null|\d+)/g,
                            '$1<span class="text-blue-400">$2</span>'
                          )
                          .replace(
                            /([{}[\],])/g,
                            '<span class="text-gray-500">$1</span>'
                          ),
                      }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </details>

      {/* Popular Templates */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-500 dark:text-yellow-400" />
            {t("template.popularTemplates")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {POPULAR_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleApplyTemplate(template.settings)}
              className="group relative flex items-start p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-gray-800/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-200 hover:shadow-md text-left"
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                {template.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                  {template.name}
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                    {template.settings.theme}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                    {template.settings.fontFamily}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                    {template.settings.fontSize}px
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;
