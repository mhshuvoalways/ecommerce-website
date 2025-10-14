import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Featured collection"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
      </div>
      <div className="container relative mx-auto flex h-full items-center px-4 md:px-6">
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
            New Collection
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our latest arrivals. Thoughtfully designed pieces that bring elegance to your everyday life.
          </p>
          <div className="flex gap-4">
            <Button variant="hero" size="lg">
              Shop Now
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
