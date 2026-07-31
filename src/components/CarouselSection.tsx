"use client";

import React, { useRef } from "react";
import { RiArrowLeftWideFill, RiArrowRightWideLine } from "react-icons/ri";

// PLACEHOLDER icons — originals weren't uploaded, see /public/images
const fistSvg = "/images/fist-svgrepo-com.svg";
const calendarSvg = "/images/calendar-svgrepo-com.svg";
const communismSvg = "/images/communism-svgrepo-com.svg";
const hastanSvg = "/images/hastanexportsvg.svg";

const CarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveBy = clientWidth * 0.8;
      const target = direction === "left" ? scrollLeft - moveBy : scrollLeft + moveBy;
      scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  const topics = [
    { id: 1, name: "تقویم هستان", path: "/tech", logo: calendarSvg },
    { id: 2, name: "فلسطین", path: "/design", logo: hastanSvg },
    { id: 3, name: "افغانستان", path: "/business", logo: communismSvg },
    { id: 4, name: "کوردستان", path: "/lifestyle", logo: fistSvg },
    { id: 5, name: "رخداد روز", path: "/gaming", logo: fistSvg },
    { id: 6, name: "زنان", path: "/women", logo: fistSvg },
    { id: 7, name: "آنامنِسیس", path: "/anamnesis", logo: communismSvg },
    { id: 8, name: "هنر مستقل", path: "/art", logo: fistSvg },
    { id: 9, name: "ناشهروندان", path: "/refugees", logo: fistSvg },
    { id: 10, name: "فضای سایبر", path: "/cyber", logo: communismSvg },
    { id: 11, name: "پداگوژی انتقادی", path: "/critical-pedagogy", logo: fistSvg },
  ];

  return (
    <div className="flex items-center gap-4 w-full mx-auto px-2 lg:px-32 bg-dark py-12 relative overflow-hidden">
      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full
                   bg-white/5 border border-white/10 backdrop-blur-md
                   text-accent hover:bg-accent hover:text-white
                   transition-all duration-500 ease-out shadow-xl"
        aria-label="Scroll left"
      >
        <RiArrowLeftWideFill size={32} />
      </button>
      <div
        ref={scrollRef}
        className="flex-1 flex flex-row-reverse gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-6"
      >
        {topics.map((topic) => (
          <a
            key={topic.id}
            href={topic.path}
            className="group flex-none flex flex-col items-center gap-3 transition-all hover:-translate-y-2"
          >
            <div
              className="w-48 h-40 relative flex items-center justify-center rounded-2xl
                          bg-white/[0.1] border border-white/30 backdrop-blur-lg
                          group-hover:bg-accent/20 group-hover:border-accent/50
                          shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                          transition-all duration-500 overflow-hidden"
            >
              <img
                src={topic.logo}
                alt="Brand Logo"
                className="h-16 w-16 object-contain z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
                           transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span
              className="text-sm font-medium text-white/60 tracking-wide
                         group-hover:text-accent group-hover:scale-105 transition-all duration-300"
            >
              {topic.name}
            </span>
          </a>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full
                   bg-white/5 border border-white/10 backdrop-blur-md
                   text-accent hover:bg-accent hover:text-white
                   transition-all duration-500 ease-out shadow-xl"
        aria-label="Scroll right"
      >
        <RiArrowRightWideLine size={32} />
      </button>
    </div>
  );
};

export default CarouselSection;
