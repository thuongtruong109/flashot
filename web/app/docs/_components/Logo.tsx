import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showFullName = true,
  className = "",
}: LogoProps) {
  const sizeConfig = {
    sm: {
      imageSize: 21,
      textSize: "text-sm font-bold",
    },
    md: {
      imageSize: 28,
      textSize: "text-lg sm:text-xl font-bold",
    },
    lg: {
      imageSize: 36,
      textSize: "text-xl sm:text-2xl font-bold",
    },
  };

  const config = sizeConfig[size];

  return (
    <Link href="/" className={`flex items-end ${className}`}>
      <Image
        src="/favicon.png"
        alt="Flashot Logo"
        width={config.imageSize}
        height={config.imageSize}
        className="rounded-lg"
      />
      <h1
        className={`${config.textSize} bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent`}
      >
        {showFullName ? (
          <>
            <span className="hidden sm:inline">Flashot</span>
            <span className="sm:hidden">Docs</span>
          </>
        ) : (
          "Flashot"
        )}
      </h1>
    </Link>
  );
}
