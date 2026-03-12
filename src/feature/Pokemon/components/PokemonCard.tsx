import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  return (
    <li>
      <Link to={`/pokemon/${name}`}>{name}</Link>
    </li>
  );
}
