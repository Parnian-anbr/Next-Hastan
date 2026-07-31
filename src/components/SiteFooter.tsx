import * as React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import styles from "@/styles/layout.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.footerTitle}>ارتباط با ما</h2>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="Facebook">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="Telegram">
            <FaTelegramPlane size={24} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="YouTube">
            <FaYoutube size={24} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="Castbox">
            <SiCastbox size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
