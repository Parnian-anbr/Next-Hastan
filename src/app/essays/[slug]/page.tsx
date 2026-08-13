import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEssays, getEssayBySlug } from "@/lib/essays";

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  return { title: essay?.title ?? "مقاله" };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  if (!essay) notFound();

  return (
    <article className="relative max-w-3xl mx-auto px-6 py-12" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-4">{essay.title}</h1>
        <div className="flex items-center justify-start gap-3 mb-4">
          <span className="text-sm font-semibold text-[var(--color-accent)]">{essay.author}</span>
          <span className="text-[var(--color-accent-light)]">•</span>
          <time className="text-sm text-[var(--color-dark)] opacity-70">{essay.date}</time>
        </div>
        <div className="w-full h-[2px] bg-black/10 mb-6" />
      </div>

      <div className="prose prose-lg max-w-none">
        {essay.image && (
          <img src={essay.image} alt={essay.title} className="w-full h-auto rounded-md mb-6" />
        )}
        <div dangerouslySetInnerHTML={{ __html: essay.contentHtml }} />
      </div>
    </article>
  );
}
