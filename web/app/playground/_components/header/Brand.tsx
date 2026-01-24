"use client";

import React from "react";
import Image from "next/image";
import { _VERSION } from "@/shared";

interface BrandProps {
  className?: string;
}

const Brand: React.FC<BrandProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center drop-shadow-sm ${className}`}>
      <Image
        src="/favicon.png"
        alt="Flashot"
        width={26}
        height={26}
        className="hidden xs:inline-flex"
      />
      <h1 className="bg-gradient-to-r from-yellow-600 via-[#ff1e56] to-[#0096ff] bg-clip-text text-transparent tracking-tight font-bold text-2xl">
        Flashot
      </h1>
    </div>
  );
};

export default Brand;
