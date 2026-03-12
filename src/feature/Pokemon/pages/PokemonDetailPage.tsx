import { useNavigate, useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import Skeleton from "@/components/Skeleton";
import { typePillClass } from "../utils/typePillClass";
import ErrorCard from "@/components/ErrorCard";

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = usePokemonDetail(name ?? "");
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Error loading pokemon detail"
        message="Please refresh and try again."
      />
    );
  }

  if (!data) {
    return null;
  }

  const imageUrl = `https://img.pokemondb.net/artwork/large/${data.name}.jpg`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="group flex w-fit cursor-pointer items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-ink-400 hover:text-ink-900"
      >
        <span className="text-ink-400 transition group-hover:-translate-x-1 group-hover:text-ink-700">
          ‹
        </span>
        Back to list
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-500">
            <span className="pill">Pokemon Profile</span>
            <span className="rounded-full bg-mango-200 px-3 py-1 text-[10px] text-ink-700">
              Official Art
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <img
              src={imageUrl}
              alt={data.name}
              className="h-64 w-64 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-8">
            <h1 className="text-4xl font-semibold capitalize tracking-tight text-ink-900">
              {data.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              A mysterious creature with unique powers. Dive into its stats,
              types, and battle profile below.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${typePillClass(t.type.name)}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-sky-500 p-6 text-white shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  Height
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.height}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  Weight
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.weight}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  Category
                </p>
                <p className="mt-2 text-lg font-semibold">Unknown</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  Abilities
                </p>
                <p className="mt-2 text-lg font-semibold">TBD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
