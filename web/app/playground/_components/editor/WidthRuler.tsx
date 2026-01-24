import { round2Dec } from "@/helpers";

interface WidthRulerProps {
  width: number;
  height: number;
  editorPosition: { x: number; y: number };
  showJSONPanel?: boolean;
  isHovered?: boolean;
}

export default function WidthRuler({
  width,
  height,
  editorPosition,
  showJSONPanel = false,
  isHovered = false,
}: WidthRulerProps) {
  return (
    <div
      className={`absolute left-0 -bottom-10 transform h-3 bg-transparent transition-opacity duration-200 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: `${width}px`,
      }}
    >
      <div className="absolute left-0 top-0 w-0 h-full border-l border-gray-400 dark:border-gray-500 border-dashed"></div>
      <div className="absolute right-0 top-0 w-0 h-full border-r border-gray-400 dark:border-gray-500 border-dashed"></div>
      <div className="absolute top-1/2 left-0 right-0 h-0 border-b border-gray-400 dark:border-gray-500 border-dashed"></div>
      <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
        {round2Dec(width)}px
      </div>
    </div>
  );
}
