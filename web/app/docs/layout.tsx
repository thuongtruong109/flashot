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
import ThemeToggle from "../components/ThemeToggle";

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
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-800/60 shadow-sm transition-colors">
          <div className="max-w-8xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    <span className="hidden sm:inline">Flashot</span>
                    <span className="sm:hidden">Docs</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <a
                  href="https://github.com/thuongtruong109/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transition-all duration-200 group shadow-sm"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:block">
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6">
          <div className="flex gap-4 lg:gap-6">
            {/* Desktop Sidebar */}
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

                {/* Try Playground Button - Fixed at Bottom */}
                <div className="mt-auto pt-3">
                  <Link
                    href="/playground"
                    className="flex items-center justify-between w-full px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div className="flex items-center">
                      <div className="p-1 bg-white/20 rounded mr-2 group-hover:bg-white/30 transition-colors">
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium">
                        Try Playground
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Mobile Sidebar */}
            <aside
              className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-800/60 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}
            >
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Documentation
                    </h2>
                  </div>
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

                {/* Try Playground Button - Fixed at Bottom Mobile */}
                <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-gray-700/60">
                  <Link
                    href="/playground"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div className="flex items-center">
                      <div className="p-1 bg-white/20 rounded mr-2 group-hover:bg-white/30 transition-colors">
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium">
                        Try Playground
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
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
