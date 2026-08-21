"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import { EssayMeta } from "@/lib/essays";

// Slides constant removed — this component now renders from the `essays` prop.

export default function Hero({
  essays,
}: {
  essays: EssayMeta[];
}) {
  const [index, setIndex] = useState(0);
  const essaysLen = essays?.length ?? 0;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const timerRef = useRef<number | null>(null);
  // base pixel threshold; we'll scale it with viewport width for consistent UX
  const BASE_SWIPE_THRESHOLD = 30; // minimum px

  const startTimer = () => {
    if (essaysLen === 0) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % essaysLen);
    }, 7000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = currentX - touchStartX.current;
    const dy = currentY - (touchStartY.current ?? 0);
    // Require horizontal movement greater than vertical to consider it a swipe
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      isDragging.current = true;
      // prevent accidental vertical scrolling while swiping horizontally
      e.preventDefault();
    }
  };

  // Pointer (mouse) handlers so drag/swipe works on desktop and laptops
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isDragging.current = false;
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (touchStartX.current == null) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const dx = currentX - touchStartX.current;
    const dy = currentY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      isDragging.current = true;
      e.preventDefault();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.clientX;
    const dx = touchStartX.current - endX;
    // scale threshold with viewport width for consistent feel across resolutions
    const threshold = Math.max(BASE_SWIPE_THRESHOLD, (window.innerWidth || 375) * 0.03);
    if (isDragging.current) {
      // swipe right (dx < -threshold) -> next; swipe left (dx > threshold) -> prev
      if (dx < -threshold) {
        setIndex((prev) => (prev + 1) % essaysLen);
        startTimer();
      } else if (dx > threshold) {
        setIndex((prev) => (prev - 1 + essaysLen) % essaysLen);
        startTimer();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const dx = touchStartX.current - touchEndX;
    // Only act if the gesture was recognized as a horizontal drag
    if (isDragging.current) {
      const threshold = Math.max(BASE_SWIPE_THRESHOLD, (window.innerWidth || 375) * 0.03);
      // swipe right (dx < -threshold) -> next; swipe left (dx > threshold) -> prev
      if (dx < -threshold) {
        setIndex((prev) => (prev + 1) % essaysLen);
        startTimer();
      } else if (dx > threshold) {
        setIndex((prev) => (prev - 1 + essaysLen) % essaysLen);
        startTimer();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Kept as in your original — auto-advance timer was commented out there too.
  useEffect(() => {
    // start/refresh timer when essays list changes
    startTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [essaysLen]);

  // If essays changes (or becomes empty), ensure index is valid.
  useEffect(() => {
    if (!essays || essaysLen === 0) {
      setIndex(0);
      return;
    }
    if (index >= essaysLen) {
      setIndex(0);
    }
  }, [essaysLen]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black mt-[-50px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <AnimatePresence mode="popLayout">
        {essays && essays.length > 0 && (
          <motion.div
            key={index}
            initial={{ x: "100%" ,opacity: 0.8,}}
            animate={{ x: 0 ,opacity: 1}}
            exit={{ x: "-100%" ,opacity: 0.8,}}
            transition={{ duration: 1.2,  ease: [0.22, 1, 0.36, 1],}}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${essays[index].image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

<div className="relative h-full gap-2 sm:gap-4 flex flex-col justify-end items-center md:items-start text-center px-6 md:px-24 pb-[clamp(150px,12vw,180px)]">

              <a
                href={`/essays/${essays[index].slug}`}
                className="group flex flex-col justify-end items-center md:items-start text-center"
                aria-label={essays[index].title}
              >
                <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-white text-3xl md:text-5xl font-bold mb-4 transition-colors duration-200 group-hover:text-accent"
              >
                {essays[index].title}
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                className="text-gray-200 text-lg md:text-2xl font-bold max-w-xl transition-colors duration-200 group-hover:text-accent"
                style={{ direction: "rtl" }}
              >
                {essays[index].excerpt}
              </motion.div>
              </a>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="text-gray-200 max-w-xl w-full"
                style={{ direction: "rtl" }}
              >
                <div className="flex py-4 sm:justify-start justify-center">
                  <a href="https://castbox.fm/" className="px-4 text-gray-200 hover:text-accent transition-colors duration-200" aria-label="Castbox">
                    <SiCastbox size={42} />
                  </a>
                  <a href="https://youtube.com/" className="text-gray-200 hover:text-accent transition-colors duration-200" aria-label="YouTube">
                    <FaYoutube size={48} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {(essays || []).map((_, i) => (
          <motion.button
            key={i}
            onClick={(e) => {
             e.preventDefault();
              setIndex(i);
              console.log('on click', i)
              startTimer();
            }}
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
