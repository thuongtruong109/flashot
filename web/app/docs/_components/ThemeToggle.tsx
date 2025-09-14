"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ] as const;

  return (
    <div className="flex items-center space-x-0.5 border-0 lg:border rounded-lg p-0 lg:p-0.5 border-slate-200/40 dark:border-slate-700/40 bg-none lg:bg-slate-50/90 lg:dark:bg-slate-800/90 backdrop-blur-sm">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            p-1.5 rounded-md lg:rounded transition-all duration-200
            ${
              theme === value
                ? "bg-amber-50 dark:bg-slate-700 text-amber-500 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }
          `}
          title={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon
            className={`size-[18px] ${
              theme === value
                ? value === "light"
                  ? "text-amber-500"
                  : "text-blue-500"
                : " opacity-60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
