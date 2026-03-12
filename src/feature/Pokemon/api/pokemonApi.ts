import type {
  PokemonListResponse,
  PokemonDetail,
} from "../types/pokemon.types";

export async function fetchPokemonList(
  page: number,
): Promise<PokemonListResponse> {
  const limit = 20;
  const offset = page * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  return response.json();
}

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon detail");
  }

  return response.json();
}
