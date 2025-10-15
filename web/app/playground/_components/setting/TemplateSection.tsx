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
    id: "modern-dark",
    name: "Modern Dark",
    description: "Sleek dark theme with vibrant gradients",
    icon: "🌙",
    settings: {
      theme: "dracula",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 40,
      borderRadius: 12,
      fontFamily: "Fira Code",
      fontSize: 14,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean and simple light design",
    icon: "☀️",
    settings: {
      theme: "github",
      background: "#ffffff",
      padding: 30,
      borderRadius: 8,
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: false,
    },
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Futuristic cyberpunk style",
    icon: "⚡",
    settings: {
      theme: "monokai",
      background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
      padding: 35,
      borderRadius: 16,
      fontFamily: "Fira Code",
      fontSize: 15,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Calm ocean-inspired palette",
    icon: "🌊",
    settings: {
      theme: "nord",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      padding: 32,
      borderRadius: 10,
      fontFamily: "Source Code Pro",
      fontSize: 14,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    description: "Warm sunset colors",
    icon: "🌅",
    settings: {
      theme: "one-dark",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      padding: 36,
      borderRadius: 14,
      fontFamily: "Cascadia Code",
      fontSize: 14,
      showWindowHeader: true,
      showLineNumbers: true,
      showBackground: true,
    },
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Nature-inspired green theme",
    icon: "🌲",
    settings: {
      theme: "material",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      padding: 34,
      borderRadius: 12,
      fontFamily: "Fira Code",
      fontSize: 14,
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
            setImportError("Invalid template format");
            setTimeout(() => setImportError(null), 3000);
          }
        } catch (error) {
          setImportError("Error parsing JSON file");
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
        <p className="text-xs text-gray-500">
          Save your current configuration as a template or load a previously
          saved one.
        </p>
      </div>

      {/* Status Messages */}
      {importSuccess && (
        <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 border border-green-200">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <p className="text-xs text-green-700 font-medium">
            Template imported successfully!
          </p>
        </div>
      )}

      {importError && (
        <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-xs text-red-700 font-medium">{importError}</p>
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
          <span>Export</span>
        </button>

        {/* Import Button */}
        <button
          onClick={handleImportClick}
          className="flex-1 group relative flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Upload className="size-3.5 group-hover:scale-110 transition-transform" />
          <span>Import</span>
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
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
            <p className="text-xs font-semibold text-gray-700 flex items-center">
              <FileJson className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              Current Template
            </p>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </summary>

        {/* JSON Preview with scrollable area */}
        <div className="mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-lg">
          <div className="relative">
            <pre className="text-xs text-gray-300 font-mono leading-relaxed overflow-y-auto max-h-64 p-3">
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
          <p className="text-xs font-semibold text-gray-700 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-500" />
            Popular Templates
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {POPULAR_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleApplyTemplate(template.settings)}
              className="group relative flex items-start p-3 rounded-lg border border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50 transition-all duration-200 hover:shadow-md text-left"
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                {template.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-800 group-hover:text-indigo-700">
                  {template.name}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">
                    {template.settings.theme}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                    {template.settings.fontFamily}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">
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
