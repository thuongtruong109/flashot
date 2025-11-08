"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  Loader2,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLocalization } from "../../LocalizationContext";

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (code: string, language: string) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const { t } = useLocalization();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const detectLanguageFromUrl = (url: string): string => {
    const extension = url.split(".").pop()?.toLowerCase().split("?")[0];

    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      cs: "csharp",
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
      swift: "swift",
      kt: "kotlin",
      scala: "scala",
      html: "html",
      css: "css",
      scss: "scss",
      sass: "scss",
      json: "json",
      xml: "xml",
      yaml: "yaml",
      yml: "yaml",
      sql: "sql",
      sh: "shell",
      bash: "shell",
      ps1: "powershell",
      dockerfile: "dockerfile",
      md: "markdown",
      vue: "javascript",
      svelte: "javascript",
    };

    return languageMap[extension || ""] || "javascript";
  };

  const detectLanguageFromContent = (content: string): string => {
    // Simple heuristic-based language detection
    const trimmedContent = content.trim();

    // Check for shebang
    if (trimmedContent.startsWith("#!")) {
      if (trimmedContent.includes("python")) return "python";
      if (trimmedContent.includes("node")) return "javascript";
      if (trimmedContent.includes("bash") || trimmedContent.includes("sh"))
        return "shell";
    }

    // Check for common patterns
    if (trimmedContent.includes("<?php")) return "php";
    if (
      trimmedContent.includes("<!DOCTYPE html>") ||
      trimmedContent.includes("<html")
    )
      return "html";
    if (trimmedContent.startsWith("{") || trimmedContent.startsWith("[")) {
      try {
        JSON.parse(trimmedContent);
        return "json";
      } catch {}
    }

    // Check for imports/requires
    if (/import\s+.*\s+from/.test(trimmedContent)) return "javascript";
    if (/const\s+.*\s+=\s+require\(/.test(trimmedContent)) return "javascript";
    if (
      /import\s+\w+/.test(trimmedContent) &&
      /from\s+['"].*['"]/.test(trimmedContent)
    )
      return "typescript";
    if (/def\s+\w+\s*\(/.test(trimmedContent)) return "python";
    if (/func\s+\w+\s*\(/.test(trimmedContent)) return "go";
    if (/fn\s+\w+\s*\(/.test(trimmedContent)) return "rust";
    if (/package\s+\w+;/.test(trimmedContent)) return "java";

    return "javascript"; // Default fallback
  };

  const handleImport = async () => {
    if (!url.trim()) {
      setError(t("importDialog.urlRequired"));
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `${t("importDialog.fetchFailed")}: ${response.status} ${
            response.statusText
          }`
        );
      }

      const content = await response.text();

      if (!content || content.trim().length === 0) {
        throw new Error(t("importDialog.emptyContent"));
      }

      // Detect language from URL first, then from content
      let detectedLanguage = detectLanguageFromUrl(url);
      if (detectedLanguage === "javascript") {
        // If URL detection defaulted to javascript, try content detection
        const contentLanguage = detectLanguageFromContent(content);
        if (contentLanguage !== "javascript") {
          detectedLanguage = contentLanguage;
        }
      }

      setSuccess(true);

      // Wait a bit to show success state
      setTimeout(() => {
        onImport(content, detectedLanguage);
        handleClose();
      }, 500);
    } catch (err) {
      console.error("Import error:", err);
      setError(
        err instanceof Error ? err.message : t("importDialog.importError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    setError(null);
    setSuccess(false);
    setIsLoading(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleImport();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
              <Download className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t("importDialog.title")}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("importDialog.subtitle")}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <X className="size-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-4">
          {/* URL Input */}
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("importDialog.placeholder")}
            disabled={isLoading}
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />

          {/* Error Message */}
          {error && (
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="size-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle2 className="size-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                {t("importDialog.successMessage")}
              </p>
            </div>
          )}

          {/* Examples */}
          <div className="space-x-3 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap flex-1">
              {t("importDialog.exampleLabel")}
            </p>
            <button
              onClick={() =>
                setUrl(
                  "https://raw.githubusercontent.com/thuongtruong109/flashot/main/README.md"
                )
              }
              disabled={isLoading}
              className="text-xs text-left text-blue-600 dark:text-blue-400 hover:underline block truncate w-full disabled:opacity-50"
            >
              {t("importDialog.exampleGithub")}
            </button>
            <button
              onClick={() =>
                setUrl(
                  "https://gist.githubusercontent.com/anonymous/example/raw/file.js"
                )
              }
              disabled={isLoading}
              className="text-xs text-left text-blue-600 dark:text-blue-400 hover:underline block truncate w-full disabled:opacity-50"
            >
              {t("importDialog.exampleGist")}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("importDialog.cancel")}
          </button>
          <button
            onClick={handleImport}
            disabled={isLoading || !url.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{t("importDialog.importing")}</span>
              </>
            ) : (
              <>
                <Download className="size-4" />
                <span>{t("importDialog.import")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;
