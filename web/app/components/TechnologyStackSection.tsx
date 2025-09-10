"use client";

import React from "react";
import Image from "next/image";

const TechnologyStackSection: React.FC = () => {
  const technologies = [
    {
      name: "Bun",
      desc: "Fast all-in-one JavaScript runtime",
      icon: "https://bun.sh/logo.svg",
      color: "from-orange-500/20 to-yellow-500/20",
    },
    {
      name: "TypeScript",
      desc: "Type-safe development with strict mode",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      name: "Vite",
      desc: "Lightning-fast build tool",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      name: "Tsdown",
      desc: "Powerful TypeScript package tool",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      color: "from-gray-500/20 to-blue-500/20",
    },
    {
      name: "Vitest",
      desc: "Blazing fast unit testing framework",
      icon: "https://vitest.dev/logo.svg",
      color: "from-green-500/20 to-yellow-500/20",
    },
    {
      name: "Shiki",
      desc: "Beautiful syntax highlighting",
      icon: "https://shiki.style/logo.svg",
      color: "from-pink-500/20 to-purple-500/20",
    },
    {
      name: "Takumi",
      desc: "Render container highlighting",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      name: "Biome",
      desc: "Fast formatter and linter",
      icon: "https://biomejs.dev/img/favicon.svg",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      name: "ESLint",
      desc: "Advanced linting with TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg",
      color: "from-purple-500/20 to-indigo-500/20",
    },
    {
      name: "Commander",
      desc: "Command-line interface builder",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Tinybench",
      desc: "Tiny benchmarking library",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      color: "from-red-500/20 to-orange-500/20",
    },
    {
      name: "Lefthook",
      desc: "Automated Git hooks",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-light text-white mb-3">
          Built with Modern Technologies
        </h2>
        <p className="text-white/60 text-sm mb-8">
          Leveraging the best tools for performance, reliability and developer
          experience
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${tech.color} bg-white/[0.02] border border-white/[0.08] rounded-lg p-3 hover:bg-white/[0.04] transition-all duration-200 group`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 flex-shrink-0 relative">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} logo`}
                    width={24}
                    height={24}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback: hide image if it fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="font-medium text-white text-sm">
                  {tech.name}
                </div>
              </div>
              <div className="text-white/50 text-xs">{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStackSection;
