"use client";

import React from "react";
import { Code2 } from "lucide-react";

interface BrandProps {
  showVersion?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Brand: React.FC<BrandProps> = ({
  showVersion = true,
  size = "lg",
  className = "",
}) => {
  const sizeClasses = {
    sm: {
      icon: "w-6 h-6",
      title: "text-xl font-black",
      subtitle: "text-xs",
      iconContainer: "p-2",
    },
    md: {
      icon: "w-7 h-7",
      title: "text-2xl font-black",
      subtitle: "text-sm",
      iconContainer: "p-2.5",
    },
    lg: {
      icon: "w-8 h-8 lg:w-10 lg:h-10",
      title: "text-3xl lg:text-4xl font-black",
      subtitle: "text-sm lg:text-base",
      iconContainer: "p-3",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-3 lg:space-x-4 ${className}`}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div
          className={`relative bg-white/90 ${classes.iconContainer} rounded-2xl shadow-lg`}
        >
          <Code2
            className={`${classes.icon} text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text`}
          />
        </div>
      </div>
      <div>
        <h1
          className={`${classes.title} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight`}
        >
          Flashot
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <p className={`${classes.subtitle} text-gray-600 font-medium`}>
            Code to Beautiful Images
          </p>
          {showVersion && (
            <div className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50">
              v2.0
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
