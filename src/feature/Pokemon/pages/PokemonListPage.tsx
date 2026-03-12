import { useMemo, useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { PokemonCard } from "../components/PokemonCard";
import useDebounce from "@/hooks/useDebounce";
import Skeleton from "@/components/Skeleton";
import ErrorCard from "@/components/ErrorCard";
import Pagination from "@/components/Pagination";

export function PokemonListPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = usePokemonList(page);

  const typeHints: Record<string, string[]> = {
    bulbasaur: ["grass", "poison"],
    ivysaur: ["grass", "poison"],
    venusaur: ["grass", "poison"],
    charmander: ["fire"],
    squirtle: ["water"],
    pikachu: ["electric"],
  };

  const extractId = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\/?$/);
    return match ? Number(match[1]) : null;
  };

  const debouncedFilter = useDebounce(filter, 300);

  const filteredPokemon = useMemo(
    () =>
      data?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
      ) ?? [],
    [data?.results, debouncedFilter],
  );

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Error loading pokemon"
        message="Please check your connection and try again."
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-12">
      <header className="glass-panel rounded-3xl p-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="pill">Pokedex Lab</span>
          <span className="pill">Generation Explorer</span>
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Pokemon List
        </h1>
        <p className="mt-3 max-w-2xl text-base text-ink-600">
          Browse the roster, filter by name, and jump between pages to explore
          the lineup.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label
              htmlFor="pokemon-filter"
              className="text-xs font-semibold uppercase tracking-wide text-ink-600"
            >
              Filter Pokemon
            </label>
            <input
              id="pokemon-filter"
              type="text"
              aria-label="Filter pokemon by name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Type a name..."
              className="mt-2 w-full rounded-2xl border border-ink-200 bg-white/80 px-4 py-3 text-base text-ink-800 shadow-sm outline-none transition focus:border-ink-400 focus:ring-2 focus:ring-ink-200"
            />
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white/70 px-5 py-4 text-sm text-ink-600">
            Page <span className="font-semibold text-ink-800">{page + 1}</span>
          </div>
        </div>
      </header>

      {filteredPokemon.length === 0 ? (
        <div className="glass-panel rounded-3xl p-10 text-center">
          <p className="text-lg font-semibold text-ink-700">
            No pokemon found
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Try a different spelling or explore another page.
          </p>
        </div>
      ) : (
        <ul
          aria-label="pokemon list"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          {filteredPokemon.map((pokemon, index) => {
            const id = extractId(pokemon.url) ?? page * 20 + index + 1;
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={id}
                types={typeHints[pokemon.name]}
              />
            );
          })}
        </ul>
      )}
      <Pagination
        page={page}
        onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}

export default PokemonListPage;

