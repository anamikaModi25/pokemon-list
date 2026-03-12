import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonListPage } from "./pages/PokemonListPage";
import { http, HttpResponse } from "msw";
import { server } from "@/test/server";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { routes } from "@/router"; // we’ll adjust this if needed

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

test("shows loading state while fetching pokemon", async () => {
  renderWithClient(<PokemonListPage />);

  // Immediately after render, before data resolves
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("shows error state when API fails", async () => {
  server.use(
    http.get("https://pokeapi.co/api/v2/pokemon", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  renderWithClient(<PokemonListPage />);

  expect(await screen.findByRole("alert")).toBeInTheDocument();
});

test("renders all pokemon as list items", async () => {
  renderWithClient(<PokemonListPage />);

  expect(
    await screen.findByRole("list", { name: /pokemon list/i }),
  ).toBeInTheDocument();

  expect(await screen.findAllByRole("listitem")).toHaveLength(2);
});

test("navigates to pokemon detail page when clicked", async () => {
  const user = userEvent.setup();

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  // Wait for list to render
  const pikachu = await screen.findByText(/pikachu/i);

  await user.click(pikachu);

  expect(router.state.location.pathname).toBe("/pokemon/pikachu");
});
