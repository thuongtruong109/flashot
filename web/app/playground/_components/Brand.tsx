"use client";

import React from "react";
import Image from "next/image";
import { _VERSION } from "@/shared";

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
      <div className="flex items-end space-x-1.5">
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
      </div>
      {showVersion && (
        <span className="hidden xs:block px-2 py-px !ml-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-200/50">
          {_VERSION}
        </span>
      )}
    </div>
  );
};

export default Brand;
