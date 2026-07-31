import Hero from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import RecentEssaySection from "@/components/RecentEssaysSection";
import { getAllEssays } from "@/lib/essays";

export default function HomePage() {
  const essays = getAllEssays();

  return (
    <>
      <Hero />
      <RecentEssaySection essays={essays} />
      <CarouselSection />
    </>
  );
}
