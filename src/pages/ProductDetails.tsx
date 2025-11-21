import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import product1 from "@/assets/product-1.jpg";
import { useCurrencySymbol } from "@/hooks/useCurrencySymbol";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const currencySymbol = useCurrencySymbol();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category: data.categories?.name || "Uncategorized",
        image: data.image_url || product1,
        stock: data.stock,
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Product not found</h2>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  {product.name}
                </h1>
              </div>

              <p className="text-3xl font-bold">{currencySymbol}{product.price}</p>

              {product.description && (
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              )}

              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
