"use client";

import React from "react";
import Image from "next/image";
import { _VERSION } from "@/shared";

interface BrandProps {
  className?: string;
}

const Brand: React.FC<BrandProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/favicon.png"
        alt="Flashot"
        width={28}
        height={28}
        className="hidden xs:inline-flex"
      />
      <h1 className="bg-gradient-to-r from-purple-600 via-orange-600 to-pink-600 bg-clip-text text-transparent tracking-tight font-bold text-2xl">
        Flashot
      </h1>
    </div>
  );
};

export default Brand;
