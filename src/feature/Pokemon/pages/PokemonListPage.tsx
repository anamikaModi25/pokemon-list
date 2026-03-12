import { usePokemonList } from "../hooks/usePokemonList";

export function PokemonListPage() {
  const { data, isLoading, error } = usePokemonList();
  console.log(data, isLoading, error);
  if (isLoading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div>Error loading pokemon</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {data?.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonListPage;
