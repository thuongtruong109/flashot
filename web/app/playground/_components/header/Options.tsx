"use client";

import React from "react";
import {
  Download,
  FileText,
  Palette,
  Type,
  Move,
  CornerRightDown,
  Layers,
  Sun,
  Moon,
  Paintbrush,
  Monitor,
  Hash,
  BarChart3,
  Folder,
  WrapText,
  MessageSquare,
  AlignCenter,
} from "lucide-react";

export type SettingOption = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  category?: string;
  hint?: string;
};

const SETTINGS: SettingOption[] = [
  {
    key: "exportFormat",
    label: "Export Format",
    icon: <Download className="w-4 h-4 text-green-600" />,
  },
  {
    key: "fileName",
    label: "File Name",
    icon: <FileText className="w-4 h-4 text-blue-600" />,
  },
  {
    key: "language",
    label: "Programming Language",
    icon: <FileText className="w-4 h-4 text-gray-600" />,
  },
  {
    key: "theme",
    label: "Editor Theme",
    icon: <Palette className="w-4 h-4 text-purple-600" />,
  },
  {
    key: "fontFamily",
    label: "Font Family",
    icon: <Type className="w-4 h-4 text-orange-600" />,
  },
  {
    key: "fontSize",
    label: "Font Size",
    icon: <Type className="w-4 h-4 text-orange-600" />,
  },
  {
    key: "padding",
    label: "Padding",
    icon: <Move className="w-4 h-4 text-pink-600" />,
  },
  {
    key: "borderRadius",
    label: "Border Radius",
    icon: <CornerRightDown className="w-4 h-4 text-teal-600" />,
  },
  {
    key: "width",
    label: "Width",
    icon: <Move className="w-4 h-4 text-blue-600" />,
  },
  {
    key: "height",
    label: "Height",
    icon: <BarChart3 className="w-4 h-4 text-green-600" />,
  },
  {
    key: "showBackground",
    label: "Show Background",
    icon: <Paintbrush className="w-4 h-4 text-purple-600" />,
  },
  {
    key: "background",
    label: "Background",
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
  },
  {
    key: "showWindowControls",
    label: "Window Controls",
    icon: <Monitor className="w-4 h-4 text-blue-600" />,
  },
  {
    key: "lineNumbers",
    label: "Line Numbers",
    icon: <Hash className="w-4 h-4 text-green-600" />,
  },
  {
    key: "showLineCount",
    label: "Line Count",
    icon: <BarChart3 className="w-4 h-4 text-orange-600" />,
  },
  {
    key: "showFileName",
    label: "Show File Name",
    icon: <Folder className="w-4 h-4 text-yellow-600" />,
  },
  {
    key: "wordWrap",
    label: "Word Wrap",
    icon: <WrapText className="w-4 h-4 text-blue-600" />,
  },
  {
    key: "showCaption",
    label: "Show Caption",
    icon: <MessageSquare className="w-4 h-4 text-indigo-600" />,
  },
  {
    key: "captionText",
    label: "Caption Text",
    icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
  },
  {
    key: "captionStyle",
    label: "Caption Style",
    icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
  },
  {
    key: "captionOpacity",
    label: "Caption Opacity",
    icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
  },
  {
    key: "captionPosition",
    label: "Caption Position",
    icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
  },
];

export default SETTINGS;
