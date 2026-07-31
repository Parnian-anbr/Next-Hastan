"use client";

import * as React from "react";
import Link from "next/link";
import styles from "@/styles/layout.module.css";

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
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img
            src={hastanSvg}
            alt={SITE_TITLE}
            className="h-10 object-contain transition-transform hover:scale-105 brightness-0 invert"
          />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>
                خانه
              </Link>
            </li>
            <li
              className={styles.dropdownContainer}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link href="#" className={styles.navLink}>
                وضعیت
              </Link>
              <div
                className={`${styles.dropdown} ${isDropdownOpen ? styles.dropdownOpen : ""}`}
              >
                <ul className={styles.dropdownList}>
                  {dropdownOptions.map((option, index) => (
                    <li key={index} className="flex px-2 py-2">
                      <span className=" bg-white h-full w-[1px] rounded-full inline-block mr-2 "></span>
                      <Link href="#" className={styles.dropdownLink}>
                        {option}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="#" className={styles.navLink}>
                پادکست هستان
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.navLink}>
                عضویت در هستان
              </Link>
            </li>
            <li>
              <Link href="/about/fa" className={styles.navLink}>
                درباره ما
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
