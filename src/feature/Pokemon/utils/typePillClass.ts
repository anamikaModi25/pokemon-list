export function typePillClass(type: string) {
  switch (type.toLowerCase()) {
    case "grass":
      return "bg-green-200 text-green-800";
    case "poison":
      return "bg-purple-200 text-purple-800";
    case "fire":
      return "bg-orange-200 text-orange-800";
    case "water":
      return "bg-sky-200 text-sky-800";
    case "electric":
      return "bg-yellow-200 text-yellow-800";
    default:
      return "bg-ink-100 text-ink-700";
  }
}
