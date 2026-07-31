"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/about.module.css";

type Language = "en" | "fa";

const availableLanguages: Language[] = ["fa", "en"];

export default function AboutPageClient({
  language,
  content,
}: {
  language: Language;
  content: { title: string; contentHtml: string };
}) {
  const router = useRouter();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as Language;
    router.push(`/about/${newLanguage}`);
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <div className={styles.languageSelector}>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className={styles.select}
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
        className={styles.content}
      >
        <h1>{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
      </div>
    </div>
  );
}
