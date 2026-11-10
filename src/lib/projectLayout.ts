// Reparto de proyectos en la sección: filas destacadas, tarjetas compactas y enlace a /proyectos.
// Sin imports de Astro para poder testearla con Node (tests/unit/projectLayout.test.ts).

export const MAX_FEATURED = 3;
export const MAX_CARDS = 6;

/** Separa destacados (dentro del tope, en orden) del resto (en orden). Regla común a la home y /proyectos. */
function partition<T extends { featured?: boolean }>(items: T[]): { featured: T[]; rest: T[] } {
  const featured: T[] = [];
  const rest: T[] = [];
  for (const item of items) {
    if (item.featured && featured.length < MAX_FEATURED) featured.push(item);
    else rest.push(item);
  }
  return { featured, rest };
}

export function splitProjects<T extends { featured?: boolean }>(
  items: T[],
): { featured: T[]; cards: T[]; showViewAll: boolean } {
  const { featured, rest } = partition(items);
  if (rest.length <= MAX_CARDS) return { featured, cards: rest, showViewAll: false };
  // La última posición de la cuadrícula se reserva para la tarjeta "Ver todos".
  return { featured, cards: rest.slice(0, MAX_CARDS - 1), showViewAll: true };
}

/** Orden de la lista completa (/proyectos): destacados dentro del tope primero, luego el resto en orden. */
export function orderProjects<T extends { featured?: boolean }>(items: T[]): T[] {
  const { featured, rest } = partition(items);
  return [...featured, ...rest];
}
