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
              title: "🎨 Welcome to Flashot Playground",
              description:
                "Welcome to Flashot! A powerful tool for creating beautiful, professional code screenshots with extensive customization options. Let's take a quick tour of all the features!",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='code-editor']",
            popover: {
              title: "📝 Interactive Code Editor",
              description:
                "This is your main workspace. Click anywhere on the code to start editing. You can drag the borders to resize, move the entire editor by dragging, and the editor supports syntax highlighting for 25+ programming languages with real-time preview.",
              side: "top",
              align: "center",
            },
          },
          {
            element: "[data-tour='action-bar']",
            popover: {
              title: "�️ Main Action Bar",
              description:
                "Your command center with essential tools: Copy Code (copy to clipboard), Download (export as image), Settings (toggle panel), JSON (export/import config), and Tips (quick help). Everything you need is just one click away!",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='settings-panel']",
            popover: {
              title: "⚙️ Comprehensive Settings Panel",
              description:
                "Customize every aspect of your code screenshot here. Includes sections for: View settings (dimensions, scale), Theme (editor themes), Makeup (colors, fonts), Decorate (window controls, shadows), and Templates (save/load presets). Desktop users will see this panel permanently on the right.",
              side: "left",
              align: "center",
            },
          },
          {
            popover: {
              title: "🎯 View Settings Tab",
              description:
                "Control basic editor properties: Select your programming language from 25+ options, adjust canvas dimensions (width & height), manage padding around your code, toggle line numbers, and set export format (PNG, JPG, WebP, AVIF, or plain text).",
              side: "left",
              align: "start",
            },
          },
          {
            popover: {
              title: "🎨 Theme Tab",
              description:
                "Choose from dozens of beautiful syntax highlighting themes including popular ones like VS Code Dark+, Dracula, Monokai, Solarized, GitHub, Nord, and many more. Each theme is carefully crafted for optimal readability and aesthetics.",
              side: "left",
              align: "start",
            },
          },
          {
            popover: {
              title: "💄 Makeup Tab",
              description:
                "Fine-tune the appearance: Select from multiple font families (Fira Code, JetBrains Mono, Source Code Pro, etc.), adjust font size for perfect readability, customize background colors or choose from stunning gradient presets, and control opacity for transparency effects.",
              side: "left",
              align: "start",
            },
          },
          {
            popover: {
              title: "✨ Decorate Tab",
              description:
                "Add professional finishing touches: Enable window controls (macOS-style traffic lights or Windows buttons), add drop shadows with adjustable blur and spread, customize corner radius for rounded edges, and toggle editor title bar display.",
              side: "left",
              align: "start",
            },
          },
          {
            popover: {
              title: "📦 Template Tab",
              description:
                "Save time with templates: Export your current configuration as JSON to save your favorite presets, import previously saved templates to quickly apply settings, share configurations with your team, or reset to default settings anytime.",
              side: "left",
              align: "start",
            },
          },
          {
            element: "[data-tour='background-selector']",
            popover: {
              title: "🎨 Background Canvas",
              description:
                "This is the canvas area where your code editor sits. The background can be customized from the Makeup tab in Settings. Choose solid colors, beautiful gradients, or even transparent backgrounds. The grid helps you align your code perfectly.",
              side: "left",
              align: "center",
            },
          },
          {
            element: "[data-tour='floating-buttons']",
            popover: {
              title: "🚀 Quick Access Floating Buttons",
              description:
                "These buttons are always accessible: Share your screenshot on social media, restart this guided tour anytime, or report issues/suggest features. Perfect for quick actions without opening menus!",
              side: "left",
              align: "center",
            },
          },
          {
            popover: {
              title: "🎓 Pro Tips",
              description:
                "Remember: Use Ctrl+Enter or Esc to exit edit mode, Tab/Shift+Tab to indent/unindent code, F11 for fullscreen view. Your editor position and size are preserved as you work. Export supports multiple formats with different compression levels!",
              side: "bottom",
              align: "center",
            },
          },
          {
            popover: {
              title: "🎉 You're All Set!",
              description:
                "You now know all the features of Flashot Playground! Start creating beautiful code screenshots. If you need help anytime, click the Tips button in the action bar or restart this tour from the floating guide button. Happy coding!",
              side: "bottom",
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
