import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products = [
  {
    id: "1",
    image: product1,
    name: "Modern Accent Chair",
    price: 299,
    category: "Furniture",
  },
  {
    id: "2",
    image: product2,
    name: "Ceramic Vase",
    price: 89,
    category: "Decor",
  },
  {
    id: "3",
    image: product3,
    name: "Table Lamp",
    price: 129,
    category: "Lighting",
  },
  {
    id: "4",
    image: product4,
    name: "Coffee Table",
    price: 399,
    category: "Furniture",
  },
  {
    id: "5",
    image: product5,
    name: "Decorative Cushion",
    price: 49,
    category: "Textiles",
  },
  {
    id: "6",
    image: product6,
    name: "Wall Mirror",
    price: 179,
    category: "Decor",
  },
];

const ProductGrid = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Featured Products
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Carefully curated pieces that combine form and function
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
