import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { routes } from "@/router";
import { server } from "@/test/server";
import { http, HttpResponse } from "msw";

function renderWithClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const router = createMemoryRouter(routes, {
    initialEntries: ["/pokemon/pikachu"],
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

test("renders pokemon detail page with data", async () => {
  renderWithClient();
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});

test("shows loading state while fetching pokemon detail", async () => {
  renderWithClient();

  // Immediately check for loading state
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("shows error state when pokemon detail API fails", async () => {
  server.use(
    http.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  renderWithClient();

  // Immediately check for loading state
  expect(await screen.findByRole("alert")).toBeInTheDocument();
});
