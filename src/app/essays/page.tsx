import Link from "next/link";
import type { Metadata } from "next";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "مقالات",
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <div className="w-full">
      <div className="w-full max-w-[1100px] mx-auto py-12 px-4">
        {essays.map((essay) => (
          <article className="flex flex-row-reverse items-center gap-10 py-7 border-b border-[rgba(165,128,60,0.15)]" key={essay.slug}>
            <div className="flex-1 text-right">
              <div className="text-sm text-[var(--color-dark)] mb-2 opacity-80">
                <span>{essay.date}</span>
                <span> • </span>
                <span>{essay.author}</span>
              </div>

              <h2 className="m-0 text-2xl font-bold leading-tight">
                <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
              </h2>

              {essay.excerpt && <p className="mt-4 text-[var(--color-dark)] leading-7 text-lg line-clamp-3">{essay.excerpt}</p>}

              <Link className="inline-block mt-4 text-accent font-semibold" href={`/essays/${essay.slug}`}>
                ادامه مطالعه
              </Link>
            </div>

            <div className="flex-shrink-0 w-[340px]">
              <img src={essay.image} alt={essay.title} className="w-[340px] h-[220px] rounded-lg object-cover overflow-hidden" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
