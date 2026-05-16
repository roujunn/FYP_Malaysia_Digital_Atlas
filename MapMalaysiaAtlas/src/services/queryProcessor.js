import { Scenarios } from "../data/mockAtlasData";

export function processQuery(query) {
  const n = query.toLowerCase();

  if (
    n.includes("kl") ||
    n.includes("kuala lumpur") ||
    n.includes("parliament") ||
    n.includes("representative") ||
    n.includes("constituency") ||
    n.includes("political") ||
    n.includes("dun")
  ) {
    if (
      n.includes("parliament") ||
      n.includes("representative") ||
      n.includes("constituency") ||
      n.includes("political") ||
      n.includes("dun")
    ) {
      return { ...Scenarios.klPolitical, query };
    }
  }

  if (
    (n.includes("kl") || n.includes("kuala lumpur")) &&
    (n.includes("visit") ||
      n.includes("tourism") ||
      n.includes("tourist") ||
      n.includes("attraction") ||
      n.includes("place"))
  ) {
    return { ...Scenarios.klTourism, query };
  }

  if (
    n.includes("melaka") &&
    (n.includes("visit") ||
      n.includes("tourism") ||
      n.includes("tourist") ||
      n.includes("attraction") ||
      n.includes("heritage"))
  ) {
    return { ...Scenarios.melakaTourism, query };
  }

  if (
    n.includes("penang") &&
    (n.includes("transport") ||
      n.includes("bus") ||
      n.includes("ferry") ||
      n.includes("road") ||
      n.includes("route"))
  ) {
    return { ...Scenarios.penangTransport, query };
  }

  if (
    n.includes("amenity") ||
    n.includes("amenities") ||
    n.includes("church") ||
    n.includes("school") ||
    n.includes("market") ||
    n.includes("socio")
  )
    return { ...Scenarios.socioeconomic, query };

  if (
    n.includes("kampung") ||
    n.includes("taman") ||
    n.includes("boundary") ||
    n.includes("boundaries") ||
    n.includes("district") ||
    n.includes("mukim") ||
    n.includes("administrative")
  )
    return { ...Scenarios.administrative, query };

  if (
    n.includes("river") ||
    n.includes("pahang") ||
    n.includes("terrain") ||
    n.includes("physical map") ||
    n.includes("mountain") ||
    n.includes("elevation")
  )
    return { ...Scenarios.physical, query };

  if (
    n.includes("highway") ||
    n.includes("industrial") ||
    n.includes("logistic") ||
    n.includes("road") ||
    n.includes("johor") ||
    n.includes("rail") ||
    n.includes("boat") ||
    n.includes("ferry") ||
    n.includes("transport")
  )
    return { ...Scenarios.logistics, query };

  return { ...Scenarios.general, query };
}
