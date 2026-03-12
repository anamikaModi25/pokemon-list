import { type PokemonListResponse } from "../types/pokemon.types";

export async function fetchPokemonList(): Promise<PokemonListResponse> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return response.json();
}
