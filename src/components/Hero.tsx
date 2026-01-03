import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from "@/assets/logo.jpg";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
}

const DefaultHero = () => (
  <section className="relative min-h-[600px] w-full overflow-hidden bg-[#F5F1E8]">
    {/* Decorative geometric shapes */}
    <div className="absolute top-8 left-[15%] w-32 h-32 bg-[#E8B4BC] rounded-tl-full opacity-80" />
    <div className="absolute top-12 left-[22%] w-24 h-24 bg-[#9DD9D2] opacity-80" />
    <div className="absolute top-16 left-[29%] w-20 h-20 bg-[#4A6B7C] opacity-80" />

    <div className="absolute top-6 right-[5%] w-16 h-16 bg-[#E8773D] rounded-tr-[50%] opacity-80" />
    <div className="absolute top-12 right-[3%] flex flex-col gap-2">
      <div className="w-3 h-3 rounded-full bg-[#4A6B7C]" />
      <div className="w-3 h-3 rounded-full bg-[#4A6B7C]" />
      <div className="w-3 h-3 rounded-full bg-[#4A6B7C]" />
      <div className="w-3 h-3 rounded-full bg-[#4A6B7C]" />
    </div>

    <div className="absolute bottom-32 left-[5%] flex gap-2">
      <div className="w-4 h-4 rounded-full bg-[#4A6B7C]" />
      <div className="w-4 h-4 rounded-full bg-[#4A6B7C]" />
    </div>
    <div className="absolute bottom-36 left-[8%] flex gap-2">
      <div className="w-4 h-4 rounded-full bg-[#E8B4BC]" />
      <div className="w-4 h-4 rounded-full bg-[#E8B4BC]" />
    </div>
    <div className="absolute bottom-40 left-[11%] flex gap-2">
      <div className="w-4 h-4 rounded-full bg-[#9DD9D2]" />
      <div className="w-4 h-4 rounded-full bg-[#9DD9D2]" />
    </div>

    <div className="absolute bottom-[40%] left-[8%] w-32 h-32 bg-[#4A6B7C] rounded-full opacity-80" />

    <div className="absolute bottom-48 right-[15%]">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-[#E8B973] rounded-full" />
        <div className="absolute inset-0 bg-[#9DD9D2] rounded-full translate-x-16" />
      </div>
    </div>

    <div className="absolute bottom-[55%] right-[25%] rotate-12">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path
          d="M30 0L36.18 23.82L60 30L36.18 36.18L30 60L23.82 36.18L0 30L23.82 23.82L30 0Z"
          fill="#E8B4BC"
        />
      </svg>
    </div>

    <div className="absolute top-8 right-[35%] h-2 w-96 flex gap-1">
      <div className="flex-1 bg-[#E8B973]" />
      <div className="flex-[2] bg-[#E8B4BC]" />
    </div>

    <div className="container relative mx-auto px-4 md:px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className="space-y-6 text-center md:text-left">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#4A6B7C] mb-2">
              KINBO MART
            </h1>
            <p className="text-2xl md:text-3xl tracking-wide text-[#E8B4BC] font-medium">
              ONLINE SHOPPING MALL
            </p>
          </div>

          <p className="text-base leading-relaxed text-gray-800 max-w-xl">
            Welcome to KinboMart, your trusted online marketplace designed to
            make shopping easier, faster, and smarter. We bring together a
            wide range of quality products—from daily essentials to lifestyle
            needs—all in one convenient location.
          </p>

          <div className="space-y-4">
            <p className="text-sm tracking-widest text-gray-800 font-medium">
              WWW.KINBOMART.SHOP
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#4A6B7C] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#4A6B7C] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#4A6B7C] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#4A6B7C] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        {/* Right side - Logo */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[350px] h-[350px] bg-white rounded-full flex items-center justify-center shadow-lg">
            <img
              src={logo}
              alt="KinboMart Logo"
              className="w-[280px] h-[280px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Hero = () => {
  const autoplayRef = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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

  // Show default hero if no slides
  if (slides.length === 0) {
    return <DefaultHero />;
  }

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
              <div className="relative min-h-[500px] md:min-h-[600px] w-full overflow-hidden">
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container mx-auto px-4 md:px-6 h-full min-h-[500px] md:min-h-[600px] flex items-center">
                  <div className="max-w-2xl text-white space-y-4">
                    {slide.subtitle && (
                      <p className="text-lg md:text-xl font-medium text-white/90">
                        {slide.subtitle}
                      </p>
                    )}
                    <h1 className="text-4xl md:text-6xl font-bold">
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className="text-base md:text-lg text-white/90 max-w-xl">
                        {slide.description}
                      </p>
                    )}
                    {slide.button_text && slide.button_link && (
                      <div className="pt-4">
                        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                          <Link to={slide.button_link}>{slide.button_text}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
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
