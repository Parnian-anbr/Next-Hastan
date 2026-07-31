import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ABOUT_DIR = path.join(process.cwd(), "content", "about");

export type Language = "fa" | "en";

export async function getAboutContent(language: Language) {
  const filePath = path.join(ABOUT_DIR, `${language}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);

  return {
    title: data.title ?? "",
    contentHtml: processed.toString(),
  };
}
