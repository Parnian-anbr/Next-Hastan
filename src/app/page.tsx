import Hero from "@/components/HeroSection";
import CarouselSection from "@/components/CarouselSection";
import RecentEssaySection from "@/components/RecentEssaysSection";
import { getAllEssays, getFeaturedEssays } from "@/lib/essays";

export default function HomePage() {
  const essays = getAllEssays();
  const featuredEssays = getFeaturedEssays();

  return (
    <>
      <Hero essays={featuredEssays}/>
      <RecentEssaySection essays={essays} />
      <CarouselSection />
    </>
  );
}
