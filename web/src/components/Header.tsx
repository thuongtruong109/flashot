"use client";

import React from "react";
import { Code2 } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Flashot</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
