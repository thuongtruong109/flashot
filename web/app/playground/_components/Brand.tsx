"use client";

import React from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";

interface BrandProps {
  showVersion?: boolean;
  className?: string;
}

const Brand: React.FC<BrandProps> = ({
  showVersion = true,
  className = "",
}) => {
  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <Image
        src="/favicon.png"
        alt="Flashot"
        width={36}
        height={20}
        className="hidden xs:inline-flex"
      />
      <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight font-bold text-2xl">
        Flashot <span className="hidden sm:inline-flex">playground</span>
      </h1>
      {showVersion && (
        <div className="hidden xs:block px-2 py-0.5 !ml-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50">
          v1.4.1
        </div>
      )}
    </div>
  );
};

export default Brand;
