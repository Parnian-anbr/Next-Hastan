"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import styles from "@/styles/layout.module.css";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1781461241820-a32cf22e10dd?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Design Your Future",
    desc: "Innovative solutions for modern brands.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1781357087497-0df2563025f5?q=80&w=1489&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Scale Your Vision",
    desc: "Data-driven strategies that actually work.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1602102343512-13a7022f10a3?q=80&w=1698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "سخنرانی دکتر کاضم سامی",
    desc: "21 دی ماه 1357 ، مسجد گیشا",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Kept as in your original — auto-advance timer was commented out there too.
  useEffect(() => {
    // const timer = setInterval(() => {
    //     setIndex((prev) => (prev + 1) % slides.length);
    // }, 5000);
    // return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black mt-[-50px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].img})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full flex flex-col justify-end items-start text-center px-24 pb-52">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-white text-3xl md:text-5xl font-bold mb-4"
            >
              {slides[index].title}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="text-gray-200 text-lg md:text-2xl font-bold max-w-xl"
              style={{ direction: "rtl" }}
            >
              {slides[index].desc}
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="text-gray-200 max-w-xl w-full"
              style={{ direction: "rtl" }}
            >
              <div className="flex py-4 sm:justify-end justify-center">
                <a href="#" className={`${styles.socialLink} px-4`} aria-label="Castbox">
                  <SiCastbox size={38} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <FaYoutube size={48} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className="h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
            animate={{
              width: i === index ? 40 : 10,
              backgroundColor: i === index ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
