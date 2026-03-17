import { MatchaEntry } from "@/types/matcha";
import StarRating from "@/components/StarRating";
import { Trash2, Heart } from "lucide-react";

interface MatchaCardProps {
  entry: MatchaEntry;
  isTopRated: boolean;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

/** Card component for a single matcha entry */
const MatchaCard = ({ entry, isTopRated, onDelete, onToggleFavorite }: MatchaCardProps) => {
  return (
    <div
      className={`group relative bg-card rounded-xl p-5 shadow-sm border transition-all hover:shadow-md ${
        isTopRated ? "border-primary ring-1 ring-primary/20" : "border-border"
      }`}
    >
      {/* Top-rated badge */}
      {isTopRated && (
        <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-xs font-body px-2.5 py-0.5 rounded-full">
          ⭐ Top Rated
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Matcha name */}
          <h3 className="font-display font-semibold text-lg text-foreground truncate">
            {entry.name}
          </h3>

          {/* Star rating display */}
          <div className="mt-1">
            <StarRating rating={entry.rating} size={16} />
          </div>

          {/* Notes if present */}
          {entry.notes && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {entry.notes}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={() => onToggleFavorite(entry.id)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart
              size={18}
              className={entry.favorite ? "fill-accent text-accent" : "text-muted-foreground"}
            />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
            aria-label="Delete entry"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchaCard;
