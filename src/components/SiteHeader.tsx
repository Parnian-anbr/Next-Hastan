"use client";

import * as React from "react";
import Link from "next/link";


// Gatsby version pulled this from siteMetadata via a GraphQL query.
// Next.js static sites don't have that query layer, so it's just a
// constant — change it here, or later move it into a shared config file.
const SITE_TITLE = "هستان";

const hastanSvg = "/images/hastanlogo.svg"; // PLACEHOLDER — see /public/images

const dropdownOptions = [
  " تقویم هستان",
  " فلسطین",
  " افغانستان",
  " کوردستان",
  " رخداد روز",
  " زنان",
  " آنامنِسیس",
  " هنر مستقل",
  "ناشهروندان",
  " فضای سایبر",
  " پداگوژی انتقادی",
  " رفیق‌نوشت",
  " دیالکتیک",
  " سیاست‌نامه",
  " هرمس",
  " کاتارسیس",
];

export default function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border border-indigo-600 py-4">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <img
              src={hastanSvg}
              alt={SITE_TITLE}
              className="h-10 object-contain transition-transform hover:scale-105 brightness-0 invert"
            />
          </div>

          <nav>
            <ul className="flex gap-8 justify-end items-center">
              <li>
                <Link href="/" className="text-light hover:text-accent transition-colors duration-300 text-base text-lg">
                  خانه
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link href="#" className="text-light hover:text-accent transition-colors duration-300 text-base text-lg">
                  وضعیت
                </Link>

                <div
                  className={`fixed left-0 right-0 top-full bg-dark/95 backdrop-blur-sm border-t border-indigo-600 z-40 overflow-hidden transition-all duration-700 ${
                    isDropdownOpen ? "opacity-100 visible max-h-[500px]" : "invisible opacity-0 max-h-0"
                  }`}
                >
                  <ul className="grid grid-cols-4 gap-0 px-4 py-4 w-[50rem]">
                    {dropdownOptions.map((option, index) => (
                      <li key={index} className="flex px-2 py-2">
                        <span className="bg-white h-full w-[1px] rounded-full inline-block mr-2" />
                        <Link href="#" className="text-light/80 hover:text-accent transition-colors duration-300 text-base px-2 py-1 block border border-indigo-600/30 hover:-translate-x-3 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                          {option}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link href="#" className="text-light hover:text-accent transition-colors duration-300 text-base text-lg">
                  پادکست هستان
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light hover:text-accent transition-colors duration-300 text-base text-lg">
                  عضویت در هستان
                </Link>
              </li>
              <li>
                <Link href="/about/fa" className="text-light hover:text-accent transition-colors duration-300 text-base text-lg">
                  درباره ما
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
