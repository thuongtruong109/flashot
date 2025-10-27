"use client";

import { useEffect } from "react";
import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Wait for DOM to be fully ready
      const timeout = setTimeout(() => {
        // Build steps dynamically, only include elements that exist
        const allSteps: DriveStep[] = [
          {
            element: "[data-tour='brand']",
            popover: {
              title: "🎨 Welcome to Flashot Playground",
              description:
                "Welcome to Flashot! A powerful tool for creating beautiful, professional code screenshots with extensive customization options. Let's take a quick tour of all the features!",
              side: "bottom",
              align: "start",
            },
          },
          {
            element: "[data-tour='action-bar']",
            popover: {
              title: "🛠️ Main Action Bar",
              description:
                "Your command center with essential tools for managing your code screenshots. Let's explore each button in detail!",
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "[data-tour='export-button']",
            popover: {
              title: "📥 Export Button",
              description:
                "Download your code screenshot in various formats: PNG, JPG, WebP, AVIF for images, or Original/Plain Text for code. Click the dropdown to choose your preferred format. Each format has different quality and file size characteristics.",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='more-menu']",
            popover: {
              title: "⚙️ More Menu",
              description:
                "Access additional features: Guide (restart this tour), Info (quick tips and shortcuts), Share (share the page), and Report Issue (submit feedback on GitHub).",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='dark-mode-toggle']",
            popover: {
              title: "🌓 Dark Mode Toggle",
              description:
                "Switch between light and dark themes. Your preference is saved automatically for future visits.",
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "[data-tour='background-selector']",
            popover: {
              title: "🎨 Background Canvas",
              description:
                "This is the canvas area where your code editor sits. The background can be customized from the Makeup tab in Settings. Choose solid colors, beautiful gradients, or even transparent backgrounds. The grid helps you align your code perfectly.",
              side: "right",
              align: "center",
            },
          },
          {
            element: "[data-tour='code-editor']",
            popover: {
              title: "📝 Interactive Code Editor",
              description:
                "This is your main workspace. Click anywhere on the code to start editing. You can drag the borders to resize, and the editor supports syntax highlighting for 26+ programming languages with real-time preview. Click on the filename to edit it!",
              side: "right",
              align: "center",
            },
          },
          {
            element: "[data-tour='settings-panel']",
            popover: {
              title: "⚙️ Settings Panel",
              description:
                "Customize every aspect of your code screenshot here. Includes sections for: View (dimensions, language), Theme (editor themes), Makeup (colors, fonts), Decorate (window controls, shadows), and Templates (save/load presets). On desktop, this panel is always visible on the right side.",
              side: "left",
              align: "center",
            },
          },
          {
            popover: {
              title: " Pro Tips",
              description:
                "Remember: Use Ctrl+Enter or Esc to exit edit mode, Tab/Shift+Tab to indent/unindent code. Your editor position and size are preserved as you work. Export supports multiple formats with different compression levels. Click on filename to edit it directly!",
              side: "bottom",
              align: "center",
            },
          },
          {
            popover: {
              title: "🎉 You're All Set!",
              description:
                "You now know all the features of Flashot Playground! Start creating beautiful code screenshots. If you need help anytime, click the Guide option in the More menu. Happy coding! 🚀",
              side: "bottom",
              align: "center",
            },
          },
        ];

        // Filter out steps that require elements that don't exist
        const validSteps = allSteps.filter((step) => {
          if (step.element && typeof step.element === "string") {
            const element = document.querySelector(step.element);
            if (!element) {
              console.warn(`Element not found, skipping step: ${step.element}`);
              return false;
            }
          }
          return true;
        });

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
          disableActiveInteraction: true, // Disable interaction with highlighted elements
          onDestroyed: onClose,
          popoverClass: "driver-popover-dark",
          // Prevent popover from being destroyed on outside click
          onPopoverRender: (popover, { config, state }) => {
            // Prevent clicks outside from closing or affecting the tour
            const overlay = document.querySelector(".driver-overlay");
            if (overlay) {
              overlay.addEventListener("click", (e) => {
                e.stopPropagation();
              });
            }
          },
          steps: validSteps,
        });

        driverObj.drive();
      }, 300); // Increased delay to ensure all elements are rendered

      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  return null;
};

export default TourGuide;
