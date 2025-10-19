"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const driverObj = driver({
        showProgress: true,
        showButtons: ["next", "previous", "close"],
        nextBtnText: "Next →",
        prevBtnText: "← Previous",
        doneBtnText: "Done ✓",
        progressText: "{{current}} of {{total}}",
        allowClose: true,
        overlayColor: "rgba(0, 0, 0, 0.75)",
        smoothScroll: true,
        disableActiveInteraction: false,
        onDestroyed: onClose,
        popoverClass: "driver-popover-dark",
        onDeselected: (element, step, options) => {
          // Custom logic when step is deselected
        },
        steps: [
          {
            element: "[data-tour='brand']",
            popover: {
              title: "🎨 Flashot Playground",
              description:
                "Welcome to Flashot! This is a tool for creating beautiful and professional code screenshots.",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='code-editor']",
            popover: {
              title: "📝 Code Editor",
              description:
                "Main area to input your code. You can click to edit, resize the frame by dragging borders, and customize everything.",
              side: "top",
              align: "center",
            },
          },
          {
            element: "[data-tour='floating-buttons']",
            popover: {
              title: "🚀 Floating Actions",
              description:
                "Three quick buttons: Share, Guide, and Report Issue. Always available to help you!",
              side: "right",
              align: "center",
            },
          },
          {
            element: "[data-tour='action-bar']",
            popover: {
              title: "🛠️ Action Bar",
              description:
                "Main toolbar with functions: Copy code, Download image, Settings, JSON export, and Tips.",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='settings-panel']",
            popover: {
              title: "⚙️ Settings Panel",
              description:
                "Settings panel with full options: language, theme, background, padding, font, and much more!",
              side: "left",
              align: "center",
            },
          },
          {
            element: "[data-tour='background-selector']",
            popover: {
              title: "🎨 Background Selector",
              description:
                "Choose beautiful backgrounds for your image. Many amazing gradients and patterns available!",
              side: "left",
              align: "center",
            },
          },
        ],
      });

      driverObj.drive();
    }
  }, [isOpen, onClose]);

  return null;
};

export default TourGuide;
