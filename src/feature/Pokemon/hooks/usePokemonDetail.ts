import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "../api/pokemonApi";

export function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetail(name),
    enabled: !!name,
  });
}
