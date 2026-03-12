import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = usePokemonDetail(name ?? "");

  if (isLoading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error loading pokemon detail</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <p>Types: {data.types.map((t) => t.type.name).join(", ")}</p>
    </div>
  );
}

export default PokemonDetailPage;
