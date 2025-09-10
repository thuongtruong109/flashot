"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/app/components/HeroSection";
import GetStartedSection from "@/app/components/GetStartedSection";
import DemoSection from "@/app/components/DemoSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import TechnologyStackSection from "@/app/components/TechnologyStackSection";
import Footer from "@/app/components/Footer";

const FlashotLanding: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window?.addEventListener("mousemove", handleMouseMove);
    return () => window?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0">
        {/* Main floating orbs */}
        <div
          className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/8 via-purple-500/6 to-cyan-500/4 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.015 + "%",
            top: mousePosition.y * 0.015 + "%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-purple-500/6 via-pink-500/8 to-red-500/4 rounded-full blur-3xl"
          style={{
            right: (1920 - mousePosition.x) * 0.012 + "px",
            bottom: (1080 - mousePosition.y) * 0.012 + "px",
          }}
        />

        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/4 to-fuchsia-500/3 rounded-full blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10">
        <HeroSection isVisible={isVisible} />
        <DemoSection activeDemo={activeDemo} setActiveDemo={setActiveDemo} />
        <GetStartedSection />
        <FeaturesSection />
        <TechnologyStackSection />
        <Footer />
      </div>
    </div>
  );
};

export default FlashotLanding;
