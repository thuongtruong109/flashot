"use client";

import React from "react";
import {
  Code,
  Palette,
  Zap,
  FileImage,
  Settings,
  Layers,
  Terminal,
  Camera,
  Sparkles,
  Highlighter,
  Download,
  Github,
} from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-5 h-5 text-blue-400" />,
      title: "100+ Languages",
      description:
        "JavaScript, TypeScript, Python, Java, C++ and more with perfect syntax highlighting",
      color: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: "Multiple Themes",
      description:
        "GitHub Dark, Dracula, Monokai, Solarized and many beautiful themes",
      color: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: <FileImage className="w-5 h-5 text-green-400" />,
      title: "Multi-format Support",
      description:
        "Export as PNG, JPEG, WebP, AVIF with custom quality settings",
      color: "bg-green-500/10 border-green-500/20",
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Blazing Fast",
      description:
        "Optimized rendering with caching, generates images in ~135ms",
      color: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-400" />,
      title: "Highly Customizable",
      description:
        "Control fonts, padding, border radius, line numbers and colors",
      color: "bg-gray-500/10 border-gray-500/20",
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Dual Module Support",
      description: "Works with ESM and CommonJS with TypeScript definitions",
      color: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      title: "CLI & API Ready",
      description:
        "Use as Node.js package or command-line tool for any workflow",
      color: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: <Camera className="w-5 h-5 text-pink-400" />,
      title: "High Quality Output",
      description:
        "Generate crisp, professional images perfect for documentation",
      color: "bg-pink-500/10 border-pink-500/20",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      title: "Line Numbers",
      description: "Display and customize line numbers with custom colors",
      color: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: <Highlighter className="w-5 h-5 text-orange-400" />,
      title: "Syntax Highlighting",
      description: "Advanced highlighting with custom backgrounds and effects",
      color: "bg-orange-500/10 border-orange-500/20",
    },
    {
      icon: <Download className="w-5 h-5 text-teal-400" />,
      title: "Multiple Input Types",
      description: "Support for inline code, file paths, URLs, and buffer data",
      color: "bg-teal-500/10 border-teal-500/20",
    },
    {
      icon: <Github className="w-5 h-5 text-violet-400" />,
      title: "Open Source",
      description:
        "MIT licensed with comprehensive documentation and community",
      color: "bg-violet-500/10 border-violet-500/20",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
            <Sparkles className="w-4 h-4" />
            Features & Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to create professional, shareable code visuals
            with
            <span className="text-blue-400"> stunning themes</span> and
            <span className="text-purple-400"> pixel-perfect quality</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white/[0.02] border border-white/[0.08] hover:${feature.color} rounded-xl p-4 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/[0.08] rounded-lg group-hover:bg-white/[0.12] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-white text-sm group-hover:text-blue-200 transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed group-hover:text-white/75 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
