import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", async () => {
    await new Promise((res) => setTimeout(res, 200));
    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: "pikachu", url: "/pokemon/pikachu" },
        { name: "bulbasaur", url: "/pokemon/bulbasaur" },
      ],
    });
  }),
];
