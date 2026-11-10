// T2: certificaciones en 2 columnas desde 640 px (3 desde 1024), sección acotada en altura
// y sin solapes entre la insignia de estado y el ícono o el título de cada tarjeta.
export const widths = [[390, 844], [640, 900], [700, 800], [744, 1133], [767, 1024], [1024, 768]];

export default async function check(page, { width, height }) {
  return page.evaluate(({ width, height }) => {
    const errors = [];
    const grid = document.getElementById("certifications-grid");
    if (!grid) return ["#certifications-grid not found"];
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const want = width < 640 ? 1 : width < 1024 ? 2 : 3;
    if (cols !== want) errors.push(`${cols} column(s), expected ${want}`);
    const secH = document.getElementById("certifications").getBoundingClientRect().height;
    if (width >= 640 && secH > 2 * height) errors.push(`section ${Math.round(secH)}px > 2 screens (${2 * height}px)`);
    const cross = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const cards = [...document.querySelectorAll(".cert-card")].filter((c) => c.offsetParent !== null);
    if (cards.length === 0) return [...errors, "no visible .cert-card (check would pass vacuously)"];
    for (const card of cards) {
      const badge = card.querySelector(".absolute.top-4.right-4 span.rounded-full")?.getBoundingClientRect();
      const icon = card.querySelector(".mb-4.mt-2 > div")?.getBoundingClientRect();
      const title = card.querySelector("h3")?.getBoundingClientRect();
      const name = card.querySelector("h3")?.textContent.trim().slice(0, 25);
      if (!badge) continue;
      if (icon && cross(badge, icon)) errors.push(`"${name}…": status badge overlaps the icon`);
      if (title && cross(badge, title)) errors.push(`"${name}…": status badge overlaps the title`);
    }
    return errors;
  }, { width, height });
}
