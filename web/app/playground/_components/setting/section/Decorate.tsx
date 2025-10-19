import { Stamp, Upload, X } from "lucide-react";
import React, { useRef } from "react";
import type { CodeSettings } from "@/types";

interface DecorateSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const DecorateSection: React.FC<DecorateSectionProps> = ({
  settings,
  onUpdateSetting,
}) => {
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);

  const handleWatermarkImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateSetting("watermark", {
          ...settings.watermark!,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkImageUrlChange = (url: string) => {
    onUpdateSetting("watermark", {
      ...settings.watermark!,
      imageUrl: url,
    });
  };

  const handleResetWatermarkImage = () => {
    onUpdateSetting("watermark", {
      ...settings.watermark!,
      imageUrl: "",
    });
    if (watermarkImageInputRef.current) {
      watermarkImageInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* Watermark Section */}
      <div>
        <label className="flex items-center justify-between cursor-pointer mb-3">
          <div className="flex items-center gap-2">
            <Stamp
              className={`size-4 transition-colors ${
                settings.watermark?.enabled
                  ? "text-rose-600 group-hover:text-rose-700"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                settings.watermark?.enabled
                  ? "text-rose-600 group-hover:text-rose-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              Watermark
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.watermark?.enabled || false}
              onChange={(e) =>
                onUpdateSetting("watermark", {
                  type: "text",
                  text: "Flashot",
                  opacity: 0.1,
                  color: "#000000",
                  x: 50,
                  y: 50,
                  rotation: -45,
                  fontSize: 48,
                  fontWeight: 800,
                  imageUrl: "",
                  imageWidth: 100,
                  imageHeight: 100,
                  ...(settings.watermark || {}),
                  enabled: e.target.checked,
                })
              }
              className="sr-only peer"
            />
            <div
              className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                settings.watermark?.enabled
                  ? "bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-800 dark:to-rose-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                  : ""
              }`}
            >
              <svg
                className={`size-3 text-rose-700 dark:text-rose-300 font-bold transition-opacity duration-200 ${
                  settings.watermark?.enabled ? "opacity-100" : "opacity-0"
                }`}
                fill="currentColor"
                stroke="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>
        </label>

        {settings.watermark?.enabled && (
          <div className="space-y-3">
            {/* Type Toggle */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Type
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onUpdateSetting("watermark", {
                      ...settings.watermark!,
                      type: "text",
                    })
                  }
                  className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                    (settings.watermark?.type || "text") === "text"
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white shadow-md font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() =>
                    onUpdateSetting("watermark", {
                      ...settings.watermark!,
                      type: "image",
                    })
                  }
                  className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                    settings.watermark?.type === "image"
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white shadow-md font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Image
                </button>
              </div>
            </div>

            {(settings.watermark?.type || "text") === "text" ? (
              <>
                {/* Watermark Text */}
                <input
                  type="text"
                  value={settings.watermark?.text || ""}
                  onChange={(e) =>
                    onUpdateSetting("watermark", {
                      ...settings.watermark!,
                      text: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                  placeholder="Enter watermark text"
                />

                {/* Color */}
                <div className="flex justify-between items-center space-x-3">
                  <label className="text-xs text-gray-600 dark:text-gray-400">
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.watermark?.color || "#000000"}
                      onChange={(e) =>
                        onUpdateSetting("watermark", {
                          ...settings.watermark!,
                          color: e.target.value,
                        })
                      }
                      className="w-12 h-7 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={settings.watermark?.color || "#000000"}
                      onChange={(e) =>
                        onUpdateSetting("watermark", {
                          ...settings.watermark!,
                          color: e.target.value,
                        })
                      }
                      className="flex-1 px-2 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Font Size */}
                <div className="flex justify-between items-center space-x-3">
                  <label className="text-xs flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 w-24">
                      Font Size
                    </span>
                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                      {settings.watermark?.fontSize || 48}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min={12}
                    max={120}
                    step={1}
                    value={settings.watermark?.fontSize || 48}
                    onChange={(e) =>
                      onUpdateSetting("watermark", {
                        ...settings.watermark!,
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                      [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>

                {/* Font Weight */}
                <div className="flex justify-between items-center">
                  <label className="text-xs text-gray-600 dark:text-gray-400 w-24">
                    Font Weight
                  </label>
                  <div className="flex items-center space-x-2">
                    {[
                      { value: 300, label: "Thin" },
                      { value: 500, label: "Normal" },
                      { value: 800, label: "Bold" },
                    ].map((weight) => (
                      <button
                        key={weight.value}
                        onClick={() =>
                          onUpdateSetting("watermark", {
                            ...settings.watermark!,
                            fontWeight: weight.value,
                          })
                        }
                        className={`px-2 py-1 rounded-md text-xs transition-all duration-200 ${
                          (settings.watermark?.fontWeight || 800) ===
                          weight.value
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 font-bold text-white shadow-md"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {weight.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Image Upload */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={watermarkImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleWatermarkImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => watermarkImageInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-md hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm"
                    >
                      <Upload className="size-3" />
                      Upload
                    </button>
                    {settings.watermark?.imageUrl && (
                      <button
                        onClick={handleResetWatermarkImage}
                        className="flex items-center gap-1 px-2 py-1.5 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-all"
                      >
                        <X className="size-3" />
                        Reset
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={settings.watermark?.imageUrl || ""}
                    onChange={(e) =>
                      handleWatermarkImageUrlChange(e.target.value)
                    }
                    placeholder="Or enter image URL..."
                    className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                  />
                </div>

                {/* Image Size */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Width
                      </span>
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                        {settings.watermark?.imageWidth || 100}px
                      </span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      step={5}
                      value={settings.watermark?.imageWidth || 100}
                      onChange={(e) =>
                        onUpdateSetting("watermark", {
                          ...settings.watermark!,
                          imageWidth: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                        [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                    />
                  </div>
                  <div>
                    <label className="text-xs flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Height
                      </span>
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                        {settings.watermark?.imageHeight || 100}px
                      </span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      step={5}
                      value={settings.watermark?.imageHeight || 100}
                      onChange={(e) =>
                        onUpdateSetting("watermark", {
                          ...settings.watermark!,
                          imageHeight: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                        [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Position X
                  </span>
                  <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                    {settings.watermark?.x || 0}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={settings.watermark?.x || 50}
                  onChange={(e) =>
                    onUpdateSetting("watermark", {
                      ...settings.watermark!,
                      x: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>
              <div>
                <label className="text-xs flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Position Y
                  </span>
                  <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                    {settings.watermark?.y || 0}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={settings.watermark?.y || 50}
                  onChange={(e) =>
                    onUpdateSetting("watermark", {
                      ...settings.watermark!,
                      y: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                />
              </div>
            </div>

            {/* Opacity */}
            <div className="flex items-center space-x-3">
              <label className="text-xs flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 w-24">
                  Opacity
                </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                  {Math.round((settings.watermark?.opacity || 0.1) * 100)}%
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={settings.watermark?.opacity || 0.1}
                onChange={(e) =>
                  onUpdateSetting("watermark", {
                    ...settings.watermark!,
                    opacity: parseFloat(e.target.value),
                  })
                }
                className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
            </div>

            {/* Rotation */}
            <div className="flex justify-between items-center space-x-3">
              <label className="text-xs flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 w-24">
                  Rotation
                </span>
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-bold">
                  {settings.watermark?.rotation || 0}°
                </span>
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={settings.watermark?.rotation || 0}
                onChange={(e) =>
                  onUpdateSetting("watermark", {
                    ...settings.watermark!,
                    rotation: parseInt(e.target.value),
                  })
                }
                className="w-full h-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-pink-500
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DecorateSection;
