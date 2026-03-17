import { useState, useMemo } from "react";
import { useMatchaStore } from "@/hooks/useMatchaStore";
import { SortOption } from "@/types/matcha";
import MatchaForm from "@/components/MatchaForm";
import MatchaCard from "@/components/MatchaCard";
import SortControls from "@/components/SortControls";
import matchaHero from "@/assets/matcha-hero.jpg";

/**
 * Matcha Log — main page
 * Log your favorite matcha tins with name, rating, and notes.
 */
const Index = () => {
  const { entries, addEntry, deleteEntry, toggleFavorite } = useMatchaStore();
  const [sort, setSort] = useState<SortOption>("highest");

  // Find the highest rating to highlight top entries
  const maxRating = useMemo(
    () => (entries.length ? Math.max(...entries.map((e) => e.rating)) : 0),
    [entries]
  );

  // Sort entries based on selected option
  const sorted = useMemo(() => {
    const copy = [...entries];
    switch (sort) {
      case "highest":
        return copy.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return copy.sort((a, b) => a.rating - b.rating);
      case "alphabetical":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [entries, sort]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <header className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={matchaHero}
          alt="Matcha latte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              🍵 Matcha Log
            </h1>
            <p className="mt-2 text-primary-foreground/80 font-body">
              Track your favorite matcha tins
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Add form */}
        <MatchaForm onAdd={addEntry} />

        {/* List section */}
        {entries.length > 0 && (
          <section className="space-y-4">
            <SortControls sort={sort} onSortChange={setSort} count={entries.length} />
            <div className="space-y-3">
              {sorted.map((entry) => (
                <MatchaCard
                  key={entry.id}
                  entry={entry}
                  isTopRated={entry.rating === maxRating && maxRating >= 4}
                  onDelete={deleteEntry}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {entries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-3">🍃</p>
            <p className="font-display text-lg">No matcha logged yet</p>
            <p className="text-sm mt-1">Add your first entry above!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
