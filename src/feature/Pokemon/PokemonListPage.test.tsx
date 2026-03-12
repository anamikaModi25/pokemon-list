import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonListPage } from "./pages/PokemonListPage";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

test("shows loading state while fetching pokemon", async () => {
  renderWithClient(<PokemonListPage />);

  // Immediately after render, before data resolves
  expect(screen.getByRole("status")).toBeInTheDocument();

  expect(await screen.findByRole("alert")).toBeInTheDocument();
});
