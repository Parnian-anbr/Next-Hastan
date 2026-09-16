import React from "react";
import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";

export default function RecentEssaySection({
  essays,
}: {
  essays: EssayMeta[];
}) {
  const recentEssays = essays.slice(0, 4).map((essay) => ({
    id: essay.slug,
    title: essay.title,
    author: essay.author,
    date: essay.date,
    image: essay.image,
    path: `/essays/${essay.slug}`,
  }));

  if (recentEssays.length === 0) {
    return (
      <section className="w-full py-12 flex justify-center">
        <div className="w-full max-w-5xl px-6 text-center text-gray-500">
          <h2 className="text-3xl font-bold mb-4">Recent Essays</h2>
          <p>هنوز مقاله‌ای منتشر نشده.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <Link href="/essays" className="inline-block transition-colors duration-200 hover:text-accent">
          <h2 className="text-3xl font-bold mb-8">آخرین مقالات</h2>
        </Link>

        {/* Mobile: horizontal carousel only on small screens */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-6">
            {recentEssays.map((essay) => (
              <a
                key={essay.id}
                href={essay.path}
                className="group flex-none snap-start w-64 h-64 relative overflow-hidden rounded-md bg-gray-200"
              >
                <img
                  src={essay.image}
                  alt={essay.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Mobile overlay: only show title (no pull-up, no details) */}
                <div
                  className="absolute inset-x-0 bottom-0 bg-gray-700/60 text-white p-3 md:hidden"
                  style={{ direction: "rtl" }}
                >
                  <h3 className="text-lg font-bold mb-0 text-light whitespace-normal">{essay.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Desktop / tablet: single-row 4-column layout with pull-up overlay */}
        {/* <div className="hidden md:grid md:grid-cols-4 gap-6"> */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentEssays.map((essay) => (
            <a
              key={essay.id}
              href={essay.path}
              className="group relative h-64 overflow-hidden rounded-md bg-gray-200"
            >
              <img
                src={essay.image}
                alt={essay.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Desktop overlay: pull-up with author/date revealed on hover */}
              <div
                className="hidden md:block absolute inset-x-0 bottom-0 bg-gray-500/60 text-white p-6
                translate-y-8 transition-transform duration-300 ease-out rounded-t-3xl
                group-hover:translate-y-0"
                style={{ direction: "rtl" }}
              >
                <h3 className="text-xl font-bold mb-1 text-light">{essay.title}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-sm text-gray-300">
                  <p>By {essay.author}</p>
                  <p>{essay.date}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
