import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonListPage } from "./pages/PokemonListPage";
import { http, HttpResponse } from "msw";
import { server } from "@/test/server";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { routes } from "@/router";
import { vi } from "vitest";

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

function renderWithRouter(initialEntries: string[]) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const router = createMemoryRouter(routes, { initialEntries });
  return {
    router,
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
  };
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

  const { router } = renderWithRouter(["/"]);

  // Wait for list to render
  const pikachu = await screen.findByText(/pikachu/i);

  await user.click(pikachu);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe("/pokemon/pikachu");
  });
});

test("filters pokemon after debounce delay", async () => {
  renderWithClient(<PokemonListPage />);

  await screen.findByText("pikachu");

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "pika");

  // Immediately after typing, both should still exist
  expect(screen.getByText("pikachu")).toBeInTheDocument();
  expect(screen.getByText("bulbasaur")).toBeInTheDocument();

  // Wait for debounce to elapse
  await new Promise((res) => setTimeout(res, 350));

  // Now filtering should apply
  await waitFor(() => {
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });
});

test("shows empty state when no pokemon match filter", async () => {
  renderWithClient(<PokemonListPage />);

  // Wait for initial data
  await screen.findByText("pikachu");

  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  // Type something that doesn't match
  await user.clear(input);
  await user.type(input, "xyz");

  // Wait for debounce to elapse
  await new Promise((res) => setTimeout(res, 350));

  await waitFor(() => {
    // No list items should remain
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);

    // Empty state message should appear
    expect(screen.getByText(/no pokemon found/i)).toBeInTheDocument();
  });
});

test("navigates between pages using pagination buttons", async () => {
  const user = userEvent.setup();

  renderWithClient(<PokemonListPage />);

  // First page
  expect(await screen.findByText("pikachu")).toBeInTheDocument();

  const nextButton = screen.getByRole("button", { name: /next/i });

  await user.click(nextButton);

  // Second page
  expect(await screen.findByText("charmander")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
  });

  const prevButton = screen.getByRole("button", { name: /previous/i });

  await user.click(prevButton);

  // Back to first page
  expect(await screen.findByText("pikachu")).toBeInTheDocument();
});
