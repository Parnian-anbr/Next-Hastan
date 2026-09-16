"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { SiCastbox } from "react-icons/si";
import { EssayMeta } from "@/lib/essays";

type HeroProps = {
  essays: EssayMeta[];
};

const AUTO_ADVANCE_MS = 7000;
const BASE_SWIPE_THRESHOLD = 30;

export default function Hero({ essays }: HeroProps) {
  const [index, setIndex] = useState(0);

  const essaysLen = essays?.length ?? 0;

  // ---------------------------------------------------------------------------
  // Gesture state
  // ---------------------------------------------------------------------------

  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const isPointerDown = useRef(false);
  const isHorizontalGesture = useRef(false);

  const pointerId = useRef<number | null>(null);

  // Prevent touch + pointer events from causing the same swipe twice.
  const lastGestureTime = useRef(0);

  // ---------------------------------------------------------------------------
  // Timer
  // ---------------------------------------------------------------------------

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();

    if (essaysLen <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % essaysLen);
    }, AUTO_ADVANCE_MS);
  }, [essaysLen, stopTimer]);

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (essaysLen === 0) return;

      const normalizedIndex =
        ((nextIndex % essaysLen) + essaysLen) % essaysLen;

      setIndex(normalizedIndex);
      startTimer();
    },
    [essaysLen, startTimer]
  );

  const goNext = useCallback(() => {
    if (essaysLen <= 1) return;

    setIndex((prev) => (prev + 1) % essaysLen);
    startTimer();
  }, [essaysLen, startTimer]);

  const goPrevious = useCallback(() => {
    if (essaysLen <= 1) return;

    setIndex((prev) => (prev - 1 + essaysLen) % essaysLen);
    startTimer();
  }, [essaysLen, startTimer]);

  // ---------------------------------------------------------------------------
  // Swipe helpers
  // ---------------------------------------------------------------------------

  const getSwipeThreshold = () => {
    if (typeof window === "undefined") {
      return BASE_SWIPE_THRESHOLD;
    }

    return Math.max(
      BASE_SWIPE_THRESHOLD,
      window.innerWidth * 0.03
    );
  };

  const resetGesture = () => {
    startX.current = null;
    startY.current = null;
    isPointerDown.current = false;
    isHorizontalGesture.current = false;
    pointerId.current = null;
  };

  const finishSwipe = useCallback(
    (endX: number) => {
      if (
        startX.current === null ||
        !isHorizontalGesture.current ||
        essaysLen <= 1
      ) {
        resetGesture();
        return;
      }

      const dx = endX - startX.current;
      const threshold = getSwipeThreshold();

      /*
       * dx > threshold  = swipe right  = previous
       * dx < -threshold = swipe left   = next
       */

      if (Math.abs(dx) >= threshold) {
        const now = Date.now();

        // Avoid touch/pointer duplicate events.
        if (now - lastGestureTime.current > 250) {
          lastGestureTime.current = now;

          if (dx < 0) {
            goPrevious();
          } else {
            goNext();
          }
        }
      }

      resetGesture();
    },
    [essaysLen, goNext, goPrevious]
  );

  // ---------------------------------------------------------------------------
  // Pointer events
  // ---------------------------------------------------------------------------

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    // Only primary mouse/finger/stylus pointer.
    if (!e.isPrimary) return;

    startX.current = e.clientX;
    startY.current = e.clientY;

    isPointerDown.current = true;
    isHorizontalGesture.current = false;
    pointerId.current = e.pointerId;
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPointerDown.current) return;
    if (startX.current === null || startY.current === null) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Don't decide anything until the pointer has moved enough.
    if (
      !isHorizontalGesture.current &&
      Math.abs(dx) < 10 &&
      Math.abs(dy) < 10
    ) {
      return;
    }

    /*
     * Horizontal movement wins only when it is clearly greater
     * than vertical movement.
     *
     * This allows normal page scrolling.
     */
    if (!isHorizontalGesture.current) {
      if (Math.abs(dx) <= Math.abs(dy)) {
        return;
      }

      isHorizontalGesture.current = true;

      // Once we've established a horizontal gesture,
      // capture the pointer so the gesture remains reliable.
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture is not supported everywhere.
      }
    }

    // We only prevent default after determining this is a horizontal gesture.
    e.preventDefault();
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPointerDown.current) return;

    /*
     * IMPORTANT:
     * A simple click on a navigation dot never reaches this element,
     * because the dots live outside the swipe surface.
     */
    finishSwipe(e.clientX);

    if (pointerId.current !== null) {
      try {
        if (e.currentTarget.hasPointerCapture(pointerId.current)) {
          e.currentTarget.releasePointerCapture(pointerId.current);
        }
      } catch {
        // Ignore pointer-capture cleanup errors.
      }
    }
  };

  const handlePointerCancel = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (pointerId.current !== null) {
      try {
        if (e.currentTarget.hasPointerCapture(pointerId.current)) {
          e.currentTarget.releasePointerCapture(pointerId.current);
        }
      } catch {
        // Ignore pointer-capture cleanup errors.
      }
    }

    resetGesture();
  };

  // ---------------------------------------------------------------------------
  // Touch events
  // ---------------------------------------------------------------------------

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];

    if (!touch) return;

    startX.current = touch.clientX;
    startY.current = touch.clientY;

    isPointerDown.current = true;
    isHorizontalGesture.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    if (startX.current === null || startY.current === null) return;

    const touch = e.touches[0];

    if (!touch) return;

    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    if (
      !isHorizontalGesture.current &&
      Math.abs(dx) < 10 &&
      Math.abs(dy) < 10
    ) {
      return;
    }

    if (!isHorizontalGesture.current) {
      // Vertical gesture = let the browser scroll normally.
      if (Math.abs(dx) <= Math.abs(dy)) {
        return;
      }

      isHorizontalGesture.current = true;
    }

    /*
     * We only prevent scrolling after we've established
     * that the gesture is horizontal.
     */
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;

    const touch = e.changedTouches[0];

    if (!touch) {
      resetGesture();
      return;
    }

    finishSwipe(touch.clientX);
  };

  // ---------------------------------------------------------------------------
  // Start/restart auto-advance
  // ---------------------------------------------------------------------------

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  // ---------------------------------------------------------------------------
  // Keep index valid when essays changes
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (essaysLen === 0) {
      setIndex(0);
      return;
    }

    setIndex((current) => {
      if (current >= essaysLen) {
        return 0;
      }

      return current;
    });
  }, [essaysLen]);

  // ---------------------------------------------------------------------------
  // Empty state
  // ---------------------------------------------------------------------------

  if (essaysLen === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-black mt-[-50px]" />
    );
  }

  const currentEssay = essays[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black mt-[-50px]">
      {/* ------------------------------------------------------------------ */}
      {/* Swipe / slide area                                                 */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="absolute inset-0 touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentEssay.slug ?? index}
            initial={{
              x: "100%",
              opacity: 0.8,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "-100%",
              opacity: 0.8,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentEssay.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Hero content                                                      */}
            {/* ---------------------------------------------------------------- */}

            <div className="relative flex h-full flex-col items-center justify-end gap-2 px-6 pb-[clamp(150px,12vw,180px)] text-center sm:gap-4 md:items-start md:px-24 md:text-left">
              <a
                href={`/essays/${currentEssay.slug}`}
                className="group flex flex-col items-center justify-end text-center md:items-start md:text-left"
                aria-label={currentEssay.title}
              >
                <motion.h1
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="mb-4 text-3xl font-bold text-white transition-colors duration-200 group-hover:text-accent md:text-5xl"
                >
                  {currentEssay.title}
                </motion.h1>

                <motion.div
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.9,
                    ease: "easeOut",
                  }}
                  className="max-w-xl text-lg font-bold text-gray-200 transition-colors duration-200 group-hover:text-accent md:text-2xl"
                  style={{
                    direction: "rtl",
                  }}
                >
                  {currentEssay.excerpt}
                </motion.div>
              </a>

              {/* ---------------------------------------------------------------- */}
              {/* Social links                                                      */}
              {/* ---------------------------------------------------------------- */}

              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: "easeOut",
                }}
                className="w-full max-w-xl text-gray-200"
                style={{
                  direction: "rtl",
                }}
              >
                <div className="flex justify-center py-4 sm:justify-start">
                  <a
                    href="https://castbox.fm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 text-gray-200 transition-colors duration-200 hover:text-accent"
                    aria-label="Castbox"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <SiCastbox size={42} />
                  </a>

                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 transition-colors duration-200 hover:text-accent"
                    aria-label="YouTube"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <FaYoutube size={48} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Navigation dots                                                      */}
      {/* -------------------------------------------------------------------- */}

      <div
        className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
        onPointerDown={(e) => {
          /*
           * Keep navigation completely separate from the swipe surface.
           */
          e.stopPropagation();
        }}
      >
        {essays.map((essay, i) => (
          <motion.button
            key={essay.slug ?? i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              goToSlide(i);
            }}
            className="h-2 rounded-full bg-white/50 transition-colors hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            animate={{
              width: i === index ? 40 : 10,
              backgroundColor:
                i === index
                  ? "#ffffff"
                  : "rgba(255,255,255,0.4)",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}