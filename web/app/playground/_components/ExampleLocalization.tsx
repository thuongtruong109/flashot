// Example: How to use localization in a new component

import { useLocalization } from "../LocalizationContext";

export default function ExampleComponent() {
  const { t, language, setLanguage } = useLocalization();

  return (
    <div>
      {/* Simple translation */}
      <h1>{t("common.settings")}</h1>

      {/* Nested translation */}
      <p>{t("tipsModal.about.title")}</p>

      {/* Array translation */}
      <ul>
        {t("tipsModal.about.features").map((feature: string, index: number) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Object translation */}
      {t("tipsModal.about.whyItems").map((item: any, index: number) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {/* Dynamic translation based on format */}
      {["png", "jpg", "webp", "avif"].map((format) => (
        <div key={format}>
          <h4>{t(`tipsModal.exportFormats.${format}.name`)}</h4>
          <p>{t(`tipsModal.exportFormats.${format}.description`)}</p>
        </div>
      ))}

      {/* Change language programmatically */}
      <button onClick={() => setLanguage("es")}>Switch to Spanish</button>

      {/* Display current language */}
      <p>Current language: {language}</p>
    </div>
  );
}
