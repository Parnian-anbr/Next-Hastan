import AboutPageClient from "./AboutPageClient";
import { getAboutContent, type Language } from "@/lib/about";

export function generateStaticParams() {
  return [{ language: "fa" }, { language: "en" }];
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ language: Language }>;
}) {
  const { language } = await params;
  const content = await getAboutContent(language);
  return <AboutPageClient language={language} content={content} />;
}
