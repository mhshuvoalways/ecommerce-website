import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Star, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MyReviews = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState<any>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["my-reviews", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          products (name, image_url)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: orderedProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["ordered-products-without-reviews", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          order_items (
            product_id,
            products (id, name, image_url)
          )
        `)
        .eq("user_id", user.id);

      if (ordersError) throw ordersError;

      const productIds = new Set<string>();
      orders?.forEach((order: any) => {
        order.order_items?.forEach((item: any) => {
          if (item.product_id) productIds.add(item.product_id);
        });
      });

      const reviewedProductIds = new Set(reviews?.map(r => r.product_id) || []);
      
      const unreviewed = Array.from(productIds)
        .filter(id => !reviewedProductIds.has(id))
        .map(id => {
          const product = orders
            ?.flatMap((o: any) => o.order_items || [])
            .find((item: any) => item.product_id === id)?.products;
          return product;
        })
        .filter(Boolean);

      return unreviewed;
    },
    enabled: !!user && !reviewsLoading,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, rating, comment }: any) => {
      const { error } = await supabase
        .from("reviews")
        .update({ rating, comment })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      toast({ title: "Review updated successfully" });
      setEditingReview(null);
    },
    onError: () => {
      toast({ title: "Failed to update review", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["ordered-products-without-reviews"] });
      toast({ title: "Review deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete review", variant: "destructive" });
    },
  });

  if (authLoading || reviewsLoading || productsLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

        {orderedProducts && orderedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Products Waiting for Your Review</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {orderedProducts.map((product: any) => (
                <Card key={product.id} className="flex items-center gap-4 p-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Write a Review
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
        {!reviews || reviews.length === 0 ? (
          <p className="text-muted-foreground">You haven't written any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <img
                        src={review.products?.image_url}
                        alt={review.products?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <CardTitle className="text-lg">{review.products?.name}</CardTitle>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-primary text-primary" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingReview(review);
                              setEditComment(review.comment || "");
                              setEditRating(review.rating);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Review</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Rating</label>
                              <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setEditRating(star)}
                                  >
                                    <Star
                                      className={`h-6 w-6 cursor-pointer ${
                                        star <= editRating
                                          ? "fill-primary text-primary"
                                          : "text-muted"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Comment</label>
                              <Textarea
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                className="mt-2"
                              />
                            </div>
                            <Button
                              onClick={() =>
                                updateMutation.mutate({
                                  id: editingReview.id,
                                  rating: editRating,
                                  comment: editComment,
                                })
                              }
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyReviews;
