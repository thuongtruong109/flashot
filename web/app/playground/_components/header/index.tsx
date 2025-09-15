"use client";

import React from "react";
import { CodeSettings } from "@/types";
import {
  Move,
  Palette,
  Layers,
  Monitor,
  Folder,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

import MenuButton from "@/app/playground/_components/header/MenuButton";

interface HeaderTopProps {
  settings: Partial<CodeSettings> & Record<string, any>;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onOpenMainPanel?: (
    menuLabel: string,
    item: {
      key: string;
      label: string;
      icon?: React.ReactNode;
      hint?: string;
      [k: string]: any;
    }
  ) => void;
  activePanelMenu?: string;
}

export default function HeaderTop({
  settings,
  onUpdateSetting,
  onOpenMainPanel,
  activePanelMenu,
}: HeaderTopProps) {
  const menuAssignments: {
    label: string;
    icon: React.ReactNode;
    activeColorClass: string;
    activeColorValue: string;
  }[] = [
    {
      label: "File",
      icon: <Folder className="w-4 h-4 text-yellow-600" />,
      activeColorClass: "text-yellow-600",
      activeColorValue: "#ca8a04",
    },
    {
      label: "Edit",
      icon: <Move className="w-4 h-4 text-blue-600" />,
      activeColorClass: "text-blue-600",
      activeColorValue: "#2563eb",
    },
    {
      label: "Select",
      icon: <Palette className="w-4 h-4 text-purple-600" />,
      activeColorClass: "text-purple-600",
      activeColorValue: "#7c3aed",
    },
    {
      label: "View",
      icon: <Monitor className="w-4 h-4 text-blue-600" />,
      activeColorClass: "text-blue-600",
      activeColorValue: "#2563eb",
    },
    {
      label: "Background",
      icon: <Layers className="w-4 h-4 text-cyan-600" />,
      activeColorClass: "text-cyan-600",
      activeColorValue: "#06b6d4",
    },
    {
      label: "Caption",
      icon: <MessageSquare className="w-4 h-4 text-indigo-600" />,
      activeColorClass: "text-indigo-600",
      activeColorValue: "#4f46e5",
    },
  ];

  const handleToggle = (idx: number) => {
    const menu = menuAssignments[idx];
    // Always notify parent; parent in page.tsx maps this to activeMenuLabel/state
    if (typeof onOpenMainPanel === "function" && menu) {
      onOpenMainPanel(menu.label, {
        key: `menu:${menu.label}`,
        label: menu.label,
      } as any);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto flex items-center text-sm space-x-6 select-none">
      {menuAssignments.map((menu, idx) => (
        <MenuButton
          key={menu.label}
          label={menu.label}
          index={idx}
          isOpen={false}
          forwardedRef={() => null}
          onToggle={handleToggle}
          active={activePanelMenu === menu.label}
          icon={menu.icon}
          activeColorClass={menu.activeColorClass}
          activeColorValue={menu.activeColorValue}
        />
      ))}
    </div>
  );
}
