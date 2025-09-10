"use client";

import React from "react";
import { Terminal, ArrowRight, Star } from "lucide-react";

const GetStartedSection: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 text-sm text-green-300 mb-6">
          <Terminal className="w-4 h-4" />
          Quick Setup
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get started in{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            seconds
          </span>
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Install via your favorite package manager and start generating
          <span className="text-blue-400"> beautiful code images</span>{" "}
          instantly
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="group bg-green-500/5 border border-green-500/20 hover:border-green-400/30 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm font-medium">NPM</span>
              <div className="ml-auto px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">
                Popular
              </div>
            </div>
            <code className="text-green-400 font-mono text-sm">
              $ npm install flashot
            </code>
          </div>

          <div className="group bg-blue-500/5 border border-blue-500/20 hover:border-blue-400/30 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-blue-300 text-sm font-medium">JSR</span>
              <div className="ml-auto px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">
                Modern
              </div>
            </div>
            <code className="text-blue-400 font-mono text-sm">
              $ npx jsr add @thuongtruong/flashot
            </code>
          </div>

          <div className="group bg-yellow-500/5 border border-yellow-500/20 hover:border-yellow-400/30 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-yellow-300 text-sm font-medium">YARN</span>
            </div>
            <code className="text-yellow-400 font-mono text-sm">
              $ yarn add flashot
            </code>
          </div>

          <div className="group bg-orange-500/5 border border-orange-500/20 hover:border-orange-400/30 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <span className="text-orange-300 text-sm font-medium">BUN</span>
              <div className="ml-auto px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-300">
                Fast
              </div>
            </div>
            <code className="text-orange-400 font-mono text-sm">
              $ bun install flashot
            </code>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5 mb-8 backdrop-blur-sm">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 font-medium text-sm">
                🚀 Quick CLI Demo
              </span>
              <div className="ml-auto px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">
                Try it now
              </div>
            </div>
            <div className="space-y-2">
              <code className="text-green-400 font-mono text-sm block">
                $ npm install -g flashot
              </code>
              <code className="text-blue-300 font-mono text-sm block">
                $ flashot code &quot;console.log(&apos;Hello world&apos;)&quot;
                -o hello.png
              </code>
              <div className="flex items-center gap-2 text-xs text-white/60 mt-3">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>Image generated in ~135ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() =>
              window.open("https://www.jsdocs.io/package/flashot", "_blank")
            }
            className="group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-200 hover:scale-105"
          >
            <span>View Documentation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
