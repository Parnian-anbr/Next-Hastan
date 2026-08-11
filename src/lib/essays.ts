import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");

export type EssayMeta = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  featured: boolean;
  featuredOrder: number;
};

export type Essay = EssayMeta & {
  contentHtml: string;
};

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }
  return typeof value === "string" ? value : "";
}

// Reads every markdown file in content/essays/. Runs at BUILD time only
// (this is a static export — there's no server reading these at request
// time), so adding/editing a file requires a rebuild+redeploy, which is
// exactly what happens automatically when Decap CMS commits to GitHub
// and Cloudflare Pages picks up the push.
export function getAllEssays(): EssayMeta[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];

  const files = fs.readdirSync(ESSAYS_DIR).filter((f) => f.endsWith(".md"));

  const essays = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(ESSAYS_DIR, filename), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      author: data.author ?? "",
      date: normalizeDate(data.date),
      excerpt: data.excerpt ?? "",
      image: data.image ?? "",
      featured: data.featured ?? false,
      featuredOrder: data.featuredOrder ?? 0,
    };
  });

  // Most recent first
  return essays.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedEssays(): EssayMeta[] {
  return getAllEssays()
    .filter((essay) => essay.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  const filePath = path.join(ESSAYS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? slug,
    author: data.author ?? "",
    date: normalizeDate(data.date),
    excerpt: data.excerpt ?? "",
    image: data.image ?? "",
    featured: data.featured ?? false,
    featuredOrder: data.featuredOrder ?? 0,
    contentHtml: processed.toString(),
  };
}
