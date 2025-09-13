"use client";

import React from "react";
import { Terminal, Github, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
    <section className="container mx-auto px-6 pt-16 pb-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-8 backdrop-blur-sm cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            ⚡
          </motion.span>
          Blazing-fast image generation
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl mb-8 tracking-tight font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            Flash
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            o
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            t
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-white/70 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Transform your code snippets into{" "}
          <motion.span
            className="text-blue-400 font-medium"
            whileHover={{
              color: "#60a5fa",
              textShadow: "0 0 8px rgba(96, 165, 250, 0.5)",
            }}
          >
            stunning, shareable images
          </motion.span>{" "}
          with elegant design, flawless performance and{" "}
          <motion.span
            className="text-purple-400 font-medium"
            whileHover={{
              color: "#c084fc",
              textShadow: "0 0 8px rgba(192, 132, 252, 0.5)",
            }}
          >
            professional highlighting
          </motion.span>
          .
        </motion.p>

        <motion.div
          className="mb-16 flex flex-wrap justify-center items-center gap-8 text-sm text-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span>800+ downloads</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 8px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span>MIT Licensed</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span>TypeScript ready</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/playground"
              className="group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Try playground</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/docs"
              className="group flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Documentation</span>
            </Link>
          </motion.div>

          <motion.button
            onClick={() =>
              window.open(
                "https://github.com/thuongtruong109/flashot",
                "_blank"
              )
            }
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white/90 hover:text-white text-sm font-medium rounded-md backdrop-blur-sm transition-all duration-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>View on GitHub</span>
            <motion.div
              className="w-0 group-hover:w-4 transition-all duration-200 overflow-hidden"
              whileHover={{ width: 16 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
