import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));

    if (offset === 0) {
      return HttpResponse.json({
        results: [
          { name: "pikachu", url: "/pokemon/pikachu" },
          { name: "bulbasaur", url: "/pokemon/bulbasaur" },
        ],
      });
    }

    if (offset === 20) {
      return HttpResponse.json({
        results: [
          { name: "charmander", url: "/pokemon/charmander" },
          { name: "squirtle", url: "/pokemon/squirtle" },
        ],
      });
    }

    return HttpResponse.json({ results: [] });
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
    return HttpResponse.json({
      name: params.name,
      height: 4,
      weight: 60,
      types: [{ type: { name: "electric" } }],
    });
  }),
];
