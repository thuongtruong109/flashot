import React from "react";

type Props = {
  settings: {
    captionPosition?: "top" | "bottom" | "left" | "right";
    captionOpacity?: number;
    captionStyle?: "normal" | "italic";
    fontSize?: number;
    fontFamily?: string;
    captionText?: string;
  };
  currentTheme: {
    foreground: string;
  };
};

const Caption = (props: Props) => {
  return (
    <div
      className={`transition-all duration-300 pointer-events-none text-center`}
      style={{
        opacity: props.settings?.captionOpacity || 1,
        color: props.currentTheme.foreground,
        fontStyle:
          props.settings?.captionStyle === "italic" ? "italic" : "normal",
        fontSize: `${Math.max(11, props.settings?.fontSize || 14)}px`,
        fontFamily: props.settings?.fontFamily,
        writingMode:
          props.settings?.captionPosition === "left" ||
          props.settings?.captionPosition === "right"
            ? "vertical-rl"
            : "horizontal-tb",
        textOrientation:
          props.settings?.captionPosition === "left" ||
          props.settings?.captionPosition === "right"
            ? "mixed"
            : "initial",
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        letterSpacing: "0.025em",
      }}
    >
      {props.settings?.captionText}
    </div>
  );
};

export default Caption;
