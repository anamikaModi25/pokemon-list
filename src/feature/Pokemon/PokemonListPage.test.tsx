import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonListPage } from "./pages/PokemonListPage";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

test("renders pokemon list", async () => {
  renderWithClient(<PokemonListPage />);

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});
