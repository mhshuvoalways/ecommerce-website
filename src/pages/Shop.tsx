import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import product1 from "@/assets/product-1.jpg";

const placeholderImages = [product1];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categories = searchParams.get("categories");
    return categories ? categories.split(",") : [];
  });
  const [priceRange, setPriceRange] = useState<number[]>(() => {
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    return [min ? Number(min) : 0, max ? Number(max) : 500];
  });
  const [minRating, setMinRating] = useState<number>(() => {
    const rating = searchParams.get("rating");
    return rating ? Number(rating) : 0;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    
    if (priceRange[0] !== 0 || priceRange[1] !== 500) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    }
    
    if (minRating > 0) {
      params.set("rating", minRating.toString());
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategories, priceRange, minRating, setSearchParams]);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("status", "Active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((product, index) => ({
        id: product.id,
        image: product.image_url || placeholderImages[index % placeholderImages.length],
        name: product.name,
        price: Number(product.price),
        categoryName: product.categories?.name || "uncategorized",
        category: product.categories?.name?.toLowerCase() || "uncategorized",
      }));
    },
  });

  const handleCategoryChange = (category: string) => {
    if (category === "") {
      setSelectedCategories([]);
      return;
    }
    
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryName);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const ratingMatch = minRating === 0;
    return categoryMatch && priceMatch && ratingMatch;
  });

  const filterComponent = (
    <ShopFilters
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      minRating={minRating}
      onRatingChange={setMinRating}
    />
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Shop</h1>
            <p className="text-muted-foreground">
              Discover our full collection of thoughtfully designed products
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Desktop Filters */}
            <div className="hidden lg:block">{filterComponent}</div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background">
                  {filterComponent}
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    No products match your filters
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 500]);
                      setMinRating(0);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
