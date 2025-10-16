import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import product1 from "@/assets/product-1.jpg";

const Index = () => {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("status", "Active")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data.map((product, index) => ({
        id: product.id,
        image: product.image_url || product1,
        name: product.name,
        price: Number(product.price),
        category: product.categories?.name || "uncategorized",
      }));
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {featuredProducts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Products</h2>
                <p className="text-muted-foreground">Discover our handpicked selection</p>
              </div>
              <ProductGrid products={featuredProducts} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
