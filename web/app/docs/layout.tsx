"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  BookOpen,
  Download,
  Package,
  Terminal,
  Globe,
  FileText,
  Settings,
  Github,
  Menu,
  X,
  Code2,
  ExternalLink,
} from "lucide-react";
import { ThemeProvider } from "../components/ThemeProvider";
import ThemeToggle from "./_components/ThemeToggle";
import Logo from "./_components/Logo";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Overview",
    href: "/docs",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Installation",
    href: "/docs/installation",
    icon: Download,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "NPM Usage",
    href: "/docs/npm-usage",
    icon: Package,
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "CLI Usage",
    href: "/docs/cli-usage",
    icon: Terminal,
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "API Reference",
    href: "/docs/api-reference",
    icon: Globe,
    color: "from-cyan-500 to-teal-600",
  },
  {
    name: "Examples",
    href: "/docs/examples",
    icon: FileText,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Configuration",
    href: "/docs/configuration",
    icon: Settings,
    color: "from-indigo-500 to-purple-600",
  },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 transition-colors">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-800/60 shadow-sm transition-colors">
          <div className="max-w-8xl mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <Logo />
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link
                  href="/playground"
                  className="inline-flex items-center space-x-2 px-2 py-[7px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-200"
                >
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:block">
                    Playground
                  </span>
                </Link>
                <a
                  href="https://github.com/thuongtruong109/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:block">
                    GitHub
                  </span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-8xl mx-auto px-2 md:px-4 py-2 lg:py-4">
          <div className="flex gap-4 lg:gap-6">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20 h-[calc(100vh-6rem)] flex flex-col">
                <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-gray-800/60 shadow-md dark:shadow-xl p-4 transition-colors">
                  <ul className="space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all duration-200 group border border-transparent"
                        >
                          {item.icon && (
                            <div
                              className={`p-1 bg-gradient-to-br ${item.color} rounded-md mr-2.5 transition-all duration-200 shadow-sm`}
                            >
                              <item.icon className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <aside
              className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-slate-50 dark:bg-gray-950/98 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-800/60 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}
            >
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Logo size="sm" showFullName={false} />
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200 group"
                        >
                          {item.icon && (
                            <div
                              className={`p-1 bg-gradient-to-br ${item.color} rounded-md mr-2.5 transition-all duration-200 shadow-sm`}
                            >
                              <item.icon className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-gray-800/60 shadow-md dark:shadow-xl overflow-hidden transition-colors">
                <div
                  className="prose prose-slate dark:prose-invert max-w-none p-4 sm:p-5 lg:p-6 xl:p-8
                  prose-headings:text-slate-900 dark:prose-headings:text-gray-50
                  prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
                  prose-h2:text-lg sm:prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3
                  prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-medium
                  prose-p:text-slate-700 dark:prose-p:text-gray-100 prose-p:leading-relaxed
                  prose-a:text-indigo-600 dark:prose-a:text-indigo-300 prose-a:no-underline hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-200
                  prose-code:text-indigo-600 dark:prose-code:text-indigo-200 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-950/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:text-sm
                  prose-pre:bg-slate-900 dark:prose-pre:bg-gray-950 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-gray-800
                  prose-img:rounded-lg prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950/30 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                  prose-table:text-sm prose-thead:bg-slate-50 dark:prose-thead:bg-gray-800 prose-th:p-3 prose-td:p-3
                  prose-strong:text-slate-900 dark:prose-strong:text-gray-50
                  prose-em:text-slate-800 dark:prose-em:text-gray-100
                "
                >
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
