import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useCurrencySymbol } from "@/hooks/useCurrencySymbol";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  category?: string;
}

const ProductCard = ({ id, image, name, price, category }: ProductCardProps) => {
  const { addToCart } = useCart();
  const currencySymbol = useCurrencySymbol();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden border-none shadow-sm transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-3 p-4">
            <div>
              {category && (
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {category}
                </p>
              )}
              <h3 className="mt-1 font-medium">{name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{currencySymbol}{price}</p>
              <Button variant="ghost" size="sm" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
