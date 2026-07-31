import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "@/styles/blog.module.css";
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
    <article className={styles.blogPostContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{essay.title}</h1>
        <div className={styles.metadata}>
          <span className={styles.author}>{essay.author}</span>
          <span className={styles.separator}>•</span>
          <time className={styles.date}>{essay.date}</time>
        </div>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.content}>
        {essay.image && (
          <img src={essay.image} alt={essay.title} className={styles.blogImage} />
        )}
        <div dangerouslySetInnerHTML={{ __html: essay.contentHtml }} />
      </div>
    </article>
  );
}
