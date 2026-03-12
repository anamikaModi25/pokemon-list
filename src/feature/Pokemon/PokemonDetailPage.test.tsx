import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { routes } from "@/router";

test("renders pokemon detail page with data", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/pokemon/pikachu"],
  });

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});
