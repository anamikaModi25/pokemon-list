import { useMemo, useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { Link } from "react-router-dom";
import { PokemonCard } from "../components/PokemonCard";

export function PokemonListPage() {
  const { data, isLoading, error } = usePokemonList();
  const [filter, setFilter] = useState("");

  const filteredPokemon = useMemo(
    () =>
      data?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase()),
      ) ?? [],
    [data?.results, filter],
  );

  if (isLoading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error loading pokemon</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>

      <input
        type="text"
        placeholder="Filter pokemon"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredPokemon.length === 0 ? (
        <p>No pokemon found</p>
      ) : (
        <ul aria-label="pokemon list">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonListPage;
