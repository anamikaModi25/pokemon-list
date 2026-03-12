import { Link } from "react-router-dom";
import { typePillClass } from "../utils/typePillClass";

interface PokemonCardProps {
  name: string;
  id?: number;
  types?: string[];
}

export function PokemonCard({ name, id, types }: PokemonCardProps) {
  const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

  return (
    <li>
      <Link
        to={`/pokemon/${name}`}
        className="group relative block overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-xl"
        aria-label={`Open ${name} details`}
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-50 to-white" />
        <div className="relative p-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-500">
            <span>#{id?.toString().padStart(4, "0") ?? "????"}</span>
            <span className="rounded-full bg-mango-200 px-3 py-1 text-[10px] text-ink-700">
              Official
            </span>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="relative h-28 w-28">
              <img
                src={imageUrl}
                alt={name}
                loading="lazy"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="mt-4">
            <span className="block text-xl font-semibold capitalize text-ink-900 transition group-hover:text-ink-700">
              {name}
            </span>
            {types?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {types.map((type) => (
                  <span
                    key={type}
                    className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${typePillClass(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
