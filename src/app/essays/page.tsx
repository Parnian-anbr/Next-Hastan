import Link from "next/link";
import type { Metadata } from "next";
import styles from "@/styles/blog.module.css";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "مقالات",
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <div className={styles.essayList}>
      {essays.map((essay) => (
        <article className={styles.essayCard} key={essay.slug}>
          <div className={styles.essayContent}>
            <div className={styles.essayMeta}>
              <span>{essay.date}</span>
              <span> • </span>
              <span>{essay.author}</span>
            </div>

            <h2 className={styles.essayTitle}>
              <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
            </h2>

            {essay.excerpt && <p className={styles.essayExcerpt}>{essay.excerpt}</p>}

            <Link className={styles.readMore} href={`/essays/${essay.slug}`}>
              ادامه مطالعه
            </Link>
          </div>

          <div className={styles.essayImage}>
            <img src={essay.image} alt={essay.title} />
          </div>
        </article>
      ))}
    </div>
  );
}
