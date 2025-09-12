import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Overview", href: "/docs", icon: BookOpenIcon },
  { name: "Installation", href: "/docs/installation" },
  { name: "NPM Usage", href: "/docs/npm-usage" },
  { name: "CLI Usage", href: "/docs/cli-usage" },
  { name: "API Reference", href: "/docs/api-reference" },
  { name: "Examples", href: "/docs/examples" },
  { name: "Configuration", href: "/docs/configuration" },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex items-center space-x-2">
                <BookOpenIcon className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">
                  Flashot Documentation
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/thuongtruong109/flashot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                  Documentation
                </h2>
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors group"
                      >
                        {item.icon && (
                          <item.icon className="w-4 h-4 mr-3 text-slate-500 group-hover:text-slate-700" />
                        )}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
              <div className="prose prose-slate max-w-none p-8 lg:p-12">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
