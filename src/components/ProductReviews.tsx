import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_name?: string;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, [productId, user?.id]);

  const fetchReviews = async () => {
    const { data: reviewsData, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    // Fetch user names for each review
    const reviewsWithNames = await Promise.all(
      (reviewsData || []).map(async (review) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', review.user_id)
          .single();
        
        return {
          ...review,
          user_name: profile?.full_name || 'Anonymous'
        };
      })
    );

    setReviews(reviewsWithNames);

    // Pre-fill form if user already reviewed
    if (user) {
      const existing = reviewsWithNames.find((r) => r.user_id === user.id);
      if (existing) {
        setRating(existing.rating);
        setComment(existing.comment || '');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Please login to leave a review', variant: 'destructive' });
      navigate('/auth');
      return;
    }

    if (rating === 0) {
      toast({ title: 'Please select a rating', variant: 'destructive' });
      return;
    }

    const isUpdate = reviews.some((r) => r.user_id === user.id);
    setLoading(true);
    const { error } = await supabase
      .from('reviews')
      .upsert(
        { product_id: productId, user_id: user.id, rating, comment },
        { onConflict: 'product_id,user_id' }
      );

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: isUpdate ? 'Review updated successfully!' : 'Review submitted successfully!' });
      setRating(0);
      setComment('');
      fetchReviews();
    }
    setLoading(false);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <div>
          <label className="block mb-2 font-medium">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Your Review</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.user_name}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            {review.comment && <p className="text-muted-foreground">{review.comment}</p>}
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};
