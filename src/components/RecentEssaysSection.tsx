"use client";

import React, { useState } from "react";
import Link from "next/link";

import type { EssayMeta } from "@/lib/essays";

type Tab = "latest" | "popular" | "status";

export default function RecentEssaySection({
  essays,
}: {
  essays: EssayMeta[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("latest");

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
          <h2 className="text-3xl font-bold mb-4">آخرین مقالات</h2>
          <p>هنوز مقاله‌ای منتشر نشده.</p>
        </div>
      </section>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    {
      id: "latest",
      label: "آخرین مقالات",
    },
    {
      id: "popular",
      label: "پربازدیدترین مقالات",
    },
    {
      id: "status",
      label: "وضعیت",
    },
  ];

  return (
    <section className="w-full py-12 flex justify-center">
      <div className="w-full max-w-5xl px-6">

        {/* Heading */}
        {/* <div className="flex justify-end">
          <Link
            href="/essays"
            className="inline-block transition-colors duration-200 hover:text-[--color-accent-light]"
          >
            <h2
              className="text-3xl font-bold mb-6"
              dir="rtl"
            >
              آخرین مقالات
            </h2>
          </Link>
        </div> */}

        {/* Tabs */}
        <div
          className="w-full border-b border-gray-200 mb-8"
          dir="rtl"
        >
          <div
            role="tablist"
            aria-label="دسته‌بندی مقالات"
            className="flex justify-center gap-10"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative
                    inline-flex
                    items-center
                    pb-3
                    text-xl
                    font-semibold
                    transition-colors
                    duration-200
                    outline-none
                    ${
                      isActive
                        ? "text-[var(--color-accent-light)]"
                        : "text-gray-500 hover:text-[var(--color-accent-light)]"
                    }
                  `}
                >
                  {tab.label}

                  {/* Active tab underline */}
                  <span
                    className={`
                      absolute
                      right-0
                      bottom-0
                      h-[3px]
                      rounded-full
                      bg-[var(--color-accent-light)]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-2">
            {recentEssays.map((essay) => (
              <Link
                key={essay.id}
                href={essay.path}
                className="
                  group
                  flex-none
                  snap-start
                  w-64
                  h-64
                  relative
                  overflow-hidden
                  rounded-md
                  bg-gray-200
                "
              >
                <img
                  src={essay.image}
                  alt={essay.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                {/* Mobile overlay */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gray-700/60
                    text-white
                    p-3
                  "
                  dir="rtl"
                >
                  <h3 className="text-lg font-bold mb-0 text-white">
                    {essay.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop / Tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recentEssays.map((essay) => (
            <Link
              key={essay.id}
              href={essay.path}
              className="
                group
                relative
                h-64
                overflow-hidden
                rounded-md
                bg-gray-200
              "
            >
              <img
                src={essay.image}
                alt={essay.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              {/* Desktop overlay */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-gray-500/60
                  text-white
                  p-6
                  translate-y-8
                  transition-transform
                  duration-300
                  ease-out
                  rounded-t-3xl
                  group-hover:translate-y-0
                "
                dir="rtl"
              >
                <h3 className="text-xl font-bold mb-1 text-white">
                  {essay.title}
                </h3>

                <div
                  className="
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    delay-100
                    text-sm
                    text-gray-300
                  "
                >
                  <p>By {essay.author}</p>
                  <p>{essay.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}