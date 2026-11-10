// R1: el menú lateral fijo (#main-sidebar, visible desde lg) no debe tapar contenido.
export const widths = [[1024, 768], [1152, 800], [1280, 800], [1366, 768], [1440, 900], [1536, 864]];

const SELECTORS = [
  ".project-case",
  ".project-card",
  ".cert-card",
  ".skill-category",
  "#experiencia .surface",
  "#contacto .surface",
  "footer nav",
];

export default async function check(page) {
  return page.evaluate((selectors) => {
    const sidebar = document.querySelector("#main-sidebar");
    if (!sidebar || getComputedStyle(sidebar).display === "none") return [];
    const navLeft = sidebar.querySelector("nav").getBoundingClientRect().left;
    const scroller = document.getElementById("scroll-container");
    const errors = [];
    for (const sel of selectors) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.offsetParent === null) continue; // oculto (p. ej. certificaciones extra o variante móvil)
        let right = el.getBoundingClientRect().right;
        // En la timeline horizontal sólo cuenta lo que se ve dentro de su contenedor con scroll.
        if (scroller && scroller.contains(el)) {
          right = Math.min(right, scroller.getBoundingClientRect().right);
        }
        const overlap = Math.round(right - (navLeft - 8));
        if (overlap > 0) errors.push(`${sel} overlaps sidebar by ${overlap}px`);
      }
    }
    return [...new Set(errors)];
  }, SELECTORS);
}
