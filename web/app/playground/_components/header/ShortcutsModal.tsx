"use client";

import React from "react";
import { Keyboard } from "lucide-react";
import Modal from "@/app/playground/_components/base/Modal";
import { useLocalization } from "../../LocalizationContext";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLocalization();

  const shortcuts = [
    {
      category: t("shortcutsModal.categories.editor.title"),
      color: "from-blue-500 to-cyan-500",
      items: t("shortcutsModal.categories.editor.shortcuts"),
    },
    {
      category: t("shortcutsModal.categories.appearance.title"),
      color: "from-purple-500 to-pink-500",
      items: t("shortcutsModal.categories.appearance.shortcuts"),
    },
    {
      category: t("shortcutsModal.categories.exportShare.title"),
      color: "from-emerald-500 to-teal-500",
      items: t("shortcutsModal.categories.exportShare.shortcuts"),
    },
    {
      category: t("shortcutsModal.categories.navigation.title"),
      color: "from-orange-500 to-red-500",
      items: t("shortcutsModal.categories.navigation.shortcuts"),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("shortcutsModal.title")}
      icon={
        <div className="p-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md">
          <Keyboard className="w-3.5 h-3.5 text-white" />
        </div>
      }
      maxWidth="4xl"
    >
      <div className="p-4">
        {/* Masonry/Bento Grid Layout - columns instead of grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {shortcuts.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="break-inside-avoid-column bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/70 dark:hover:border-gray-600/70 transition-all duration-200 mb-3"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`w-1 h-5 bg-gradient-to-b ${section.color} rounded-full shadow-sm`}
                />
                <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {section.category}
                </h3>
              </div>

              {/* Shortcuts List - Simple vertical stack */}
              <div className="space-y-1.5">
                {section.items.map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="group flex items-center justify-between gap-2 py-1 px-2 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/40 dark:border-gray-700/40 hover:border-gray-300/60 dark:hover:border-gray-600/60 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-150"
                  >
                    <span className="text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                      {item.description}
                    </span>
                    <kbd className="px-1.5 py-0.5 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 rounded text-[9px] font-bold shadow-sm border border-gray-300/40 dark:border-gray-600/40 group-hover:shadow-md transition-shadow whitespace-nowrap flex-shrink-0">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip - Compact version */}
        <div className="mt-3 flex items-start space-x-2 p-2.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200/40 dark:border-blue-800/40">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <Keyboard className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-semibold text-gray-900 dark:text-white mb-0.5">
              {t("shortcutsModal.proTip.title")}
            </h4>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("shortcutsModal.proTip.description")}{" "}
              <kbd className="px-1 py-0.5 bg-white/80 dark:bg-gray-700/80 rounded text-[9px] font-bold shadow-sm">
                {t("shortcutsModal.proTip.escKey")}
              </kbd>{" "}
              {t("shortcutsModal.proTip.exitText")}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShortcutsModal;
