import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
}

/** Reusable star rating display/input component */
const StarRating = ({ rating, onRate, size = 20 }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          disabled={!onRate}
          className={`transition-transform ${onRate ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={
              star <= rating
                ? "fill-star text-star"
                : "fill-transparent text-muted-foreground/40"
            }
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
