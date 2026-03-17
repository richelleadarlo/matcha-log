import { SortOption } from "@/types/matcha";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortControlsProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  count: number;
}

/** Sorting controls for the matcha list */
const SortControls = ({ sort, onSortChange, count }: SortControlsProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {count} {count === 1 ? "entry" : "entries"}
      </p>
      <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="highest">Highest Rating</SelectItem>
          <SelectItem value="lowest">Lowest Rating</SelectItem>
          <SelectItem value="alphabetical">Alphabetical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortControls;
