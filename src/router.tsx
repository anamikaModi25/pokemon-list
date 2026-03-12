import { createBrowserRouter } from "react-router-dom";
import PokemonListPage from "@/feature/Pokemon/pages/PokemonListPage";
import PokemonDetailPage from "@/feature/Pokemon/pages/PokemonDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonListPage />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetailPage />,
  },
]);
