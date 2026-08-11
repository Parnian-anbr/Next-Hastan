"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import styles from "@/styles/layout.module.css";
import { EssayMeta } from "@/lib/essays";

// Slides constant removed — this component now renders from the `essays` prop.

export default function Hero({
  essays,
}: {
  essays: EssayMeta[];
}) {
  const [index, setIndex] = useState(0);

  // Kept as in your original — auto-advance timer was commented out there too.
  useEffect(() => {
    // const timer = setInterval(() => {
    //     setIndex((prev) => (prev + 1) % essays.length);
    // }, 5000);
    // return () => clearInterval(timer);
  }, []);

  // If essays changes (or becomes empty), ensure index is valid.
  useEffect(() => {
    if (!essays || essays.length === 0) {
      setIndex(0);
      return;
    }
    if (index >= essays.length) {
      setIndex(0);
    }
  }, [essays.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black mt-[-50px]">
      <AnimatePresence mode="popLayout">
        {essays && essays.length > 0 && (
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
              style={{ backgroundImage: `url(${essays[index].image})` }}
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
                {essays[index].title}
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                className="text-gray-200 text-lg md:text-2xl font-bold max-w-xl"
                style={{ direction: "rtl" }}
              >
                {essays[index].excerpt}
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="text-gray-200 max-w-xl w-full"
                style={{ direction: "rtl" }}
              >
                <div className="flex py-4 sm:justify-start justify-center">
                  <a href="#" className={` px-4`} aria-label="Castbox">
                    <SiCastbox size={42} />
                  </a>
                  <a href="#"  aria-label="YouTube">
                    <FaYoutube size={48} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {essays.map((_, i) => (
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
