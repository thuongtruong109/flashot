"use client";

import { useEffect } from "react";
import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { useLocalization } from "../../LocalizationContext";

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  const { t } = useLocalization();
  useEffect(() => {
    if (isOpen) {
      // Wait for DOM to be fully ready
      const timeout = setTimeout(() => {
        // Build steps dynamically, only include elements that exist
        const allSteps: DriveStep[] = [
          {
            element: "[data-tour='brand']",
            popover: {
              title: t("tourGuide.steps.welcome.title"),
              description: t("tourGuide.steps.welcome.description"),
              side: "bottom",
              align: "start",
            },
          },
          {
            element: "[data-tour='action-bar']",
            popover: {
              title: t("tourGuide.steps.actionBar.title"),
              description: t("tourGuide.steps.actionBar.description"),
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "[data-tour='export-button']",
            popover: {
              title: t("tourGuide.steps.exportButton.title"),
              description: t("tourGuide.steps.exportButton.description"),
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='more-menu']",
            popover: {
              title: t("tourGuide.steps.moreMenu.title"),
              description: t("tourGuide.steps.moreMenu.description"),
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "[data-tour='dark-mode-toggle']",
            popover: {
              title: t("tourGuide.steps.darkModeToggle.title"),
              description: t("tourGuide.steps.darkModeToggle.description"),
              side: "bottom",
              align: "end",
            },
          },
          {
            element: "[data-tour='background-selector']",
            popover: {
              title: t("tourGuide.steps.backgroundSelector.title"),
              description: t("tourGuide.steps.backgroundSelector.description"),
              side: "right",
              align: "center",
            },
          },
          {
            element: "[data-tour='code-editor']",
            popover: {
              title: t("tourGuide.steps.codeEditor.title"),
              description: t("tourGuide.steps.codeEditor.description"),
              side: "right",
              align: "center",
            },
          },
          {
            element: "[data-tour='settings-panel']",
            popover: {
              title: t("tourGuide.steps.settingsPanel.title"),
              description: t("tourGuide.steps.settingsPanel.description"),
              side: "left",
              align: "center",
            },
          },
          {
            popover: {
              title: t("tourGuide.steps.proTips.title"),
              description: t("tourGuide.steps.proTips.description"),
              side: "bottom",
              align: "center",
            },
          },
          {
            popover: {
              title: t("tourGuide.steps.finish.title"),
              description: t("tourGuide.steps.finish.description"),
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
          nextBtnText: t("tourGuide.buttons.next"),
          prevBtnText: t("tourGuide.buttons.previous"),
          doneBtnText: t("tourGuide.buttons.done"),
          progressText: t("tourGuide.buttons.progress"),
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
  }, [isOpen, onClose, t]);

  return null;
};

export default TourGuide;
