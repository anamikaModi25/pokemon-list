import { render, screen } from "@testing-library/react";
import PokemonListPage from "./pages/PokemonListPage";

test("renders pokemon list", async () => {
  render(<PokemonListPage />);

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});
