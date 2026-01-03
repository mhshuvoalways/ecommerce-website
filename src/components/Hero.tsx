import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroSlide {
  id: string;
  image_url: string;
}

const Hero = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const { data: slides = [] } = useQuery({
    queryKey: ["hero-slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  return (
    <section className="relative w-full">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full overflow-hidden aspect-video">
                <img
                  src={slide.image_url}
                  alt="Hero slide"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {slides.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
          </>
        )}
      </Carousel>
    </section>
  );
};

export default Hero;
