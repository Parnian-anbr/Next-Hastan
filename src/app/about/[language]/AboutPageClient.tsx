"use client";

import { useRouter } from "next/navigation";

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
    <div className="relative max-w-3xl mx-auto p-8">
      <div className="relative">
        <div className="flex items-center justify-end gap-4 mt-6">
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="bg-[rgba(79,73,60,0.05)] text-[var(--color-dark)] px-4 py-2 rounded-md border-2 border-[var(--color-accent-light)] transition-all shadow-sm font-medium text-sm opacity-70 hover:border-[var(--color-accent)]"
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
        className="bg-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] leading-8 text-center rounded-md px-10 py-12 mt-6"
      >
        <h1 className="text-2xl font-bold mb-6">{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
      </div>
    </div>
  );
}
