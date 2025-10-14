import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

interface ShopFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const categories = [
  { id: "furniture", label: "Furniture" },
  { id: "decor", label: "Decor" },
  { id: "lighting", label: "Lighting" },
  { id: "textiles", label: "Textiles" },
];

const ShopFilters = ({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
}: ShopFiltersProps) => {
  return (
    <aside className="w-full space-y-8 rounded-lg border bg-card p-6 shadow-sm lg:w-64">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Category
        </h4>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => onCategoryChange(category.id)}
            />
            <Label
              htmlFor={category.id}
              className="cursor-pointer text-sm font-normal"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h4>
        <div className="space-y-4 pt-2">
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">${priceRange[0]}</span>
            <span className="text-muted-foreground">to</span>
            <span className="font-medium">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <div
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onRatingChange(rating)}
            >
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="cursor-pointer text-sm font-normal flex items-center gap-1"
              >
                {rating > 0 ? (
                  <>
                    {rating}
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    & up
                  </>
                ) : (
                  "All ratings"
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => {
            onCategoryChange("");
            onPriceChange([0, 500]);
            onRatingChange(0);
          }}
          className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      </div>
    </aside>
  );
};

export default ShopFilters;
