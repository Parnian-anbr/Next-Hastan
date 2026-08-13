import * as React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-dark py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-light/80 text-xl font-semibold pl-12 mb-2">ارتباط با ما</h2>
        <div className="flex gap-8 ml-6">
          <a href="#" className="text-light/80 hover:text-accent transition-colors duration-300" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-light/80 hover:text-accent transition-colors duration-300" aria-label="Facebook">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-light/80 hover:text-accent transition-colors duration-300" aria-label="Telegram">
            <FaTelegramPlane size={24} />
          </a>
          <a href="#" className="text-light/80 hover:text-accent transition-colors duration-300" aria-label="YouTube">
            <FaYoutube size={24} />
          </a>
          <a href="#" className="text-light/80 hover:text-accent transition-colors duration-300" aria-label="Castbox">
            <SiCastbox size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
