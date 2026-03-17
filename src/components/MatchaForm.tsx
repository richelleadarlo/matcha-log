import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface MatchaFormProps {
  onAdd: (name: string, rating: number, notes: string) => void;
}

/** Form component for adding a new matcha entry */
const MatchaForm = ({ onAdd }: MatchaFormProps) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a matcha name");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    onAdd(name, rating, notes);
    setName("");
    setRating(0);
    setNotes("");
    toast.success("Matcha added! 🍵");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-sm border border-border space-y-4">
      <h2 className="text-xl font-display font-semibold text-foreground">Add New Matcha</h2>

      {/* Matcha name input */}
      <Input
        placeholder="e.g. Uji Ceremonial Matcha"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-background"
      />

      {/* Star rating selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Rating:</span>
        <StarRating rating={rating} onRate={setRating} size={24} />
      </div>

      {/* Optional notes */}
      <Textarea
        placeholder="Notes: taste, aroma, origin... (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="bg-background resize-none"
        rows={2}
      />

      <Button type="submit" className="w-full gap-2">
        <Plus size={18} />
        Add Matcha
      </Button>
    </form>
  );
};

export default MatchaForm;
