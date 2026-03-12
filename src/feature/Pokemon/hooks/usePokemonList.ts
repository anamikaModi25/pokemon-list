import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemonApi";

export function usePokemonList(page: number) {
  return useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => fetchPokemonList(page),
  });
}
