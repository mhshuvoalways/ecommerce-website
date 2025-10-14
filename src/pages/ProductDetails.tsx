import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";

import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const allProducts = [
  {
    id: "1",
    image: product1,
    name: "Modern Accent Chair",
    price: 299,
    category: "Furniture",
    description: "A beautifully crafted accent chair that combines modern design with exceptional comfort. Perfect for any contemporary living space.",
    features: ["Premium fabric upholstery", "Solid wood frame", "Ergonomic design", "Easy assembly"],
  },
  {
    id: "2",
    image: product2,
    name: "Ceramic Vase",
    price: 89,
    category: "Decor",
    description: "Handcrafted ceramic vase with a unique textured finish. Perfect for displaying fresh or dried flowers.",
    features: ["Handcrafted ceramic", "Unique texture", "Waterproof finish", "Elegant design"],
  },
  {
    id: "3",
    image: product3,
    name: "Table Lamp",
    price: 129,
    category: "Lighting",
    description: "Contemporary table lamp with adjustable brightness. Creates the perfect ambiance for any room.",
    features: ["Dimmable LED", "Touch control", "Energy efficient", "Modern design"],
  },
  {
    id: "4",
    image: product4,
    name: "Coffee Table",
    price: 399,
    category: "Furniture",
    description: "Sleek coffee table with a minimalist design. Features ample storage space and a durable surface.",
    features: ["Solid wood construction", "Storage shelf", "Easy to clean", "Modern aesthetic"],
  },
  {
    id: "5",
    image: product5,
    name: "Decorative Cushion",
    price: 49,
    category: "Textiles",
    description: "Soft and comfortable decorative cushion with a contemporary pattern. Adds style to any sofa or bed.",
    features: ["Premium fabric", "Removable cover", "Machine washable", "Includes insert"],
  },
  {
    id: "6",
    image: product6,
    name: "Wall Mirror",
    price: 179,
    category: "Decor",
    description: "Elegant wall mirror with a sleek frame. Enhances light and space in any room.",
    features: ["Premium glass", "Durable frame", "Easy installation", "Modern design"],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === id);

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

              <p className="text-3xl font-bold">${product.price}</p>

              <div>
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>

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
