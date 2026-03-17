/** Types for the Matcha Log app */
export interface MatchaEntry {
  id: string;
  name: string;
  rating: number; // 1-5
  notes: string;
  favorite: boolean;
  createdAt: string;
}

export type SortOption = "highest" | "lowest" | "alphabetical";
