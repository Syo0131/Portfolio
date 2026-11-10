// R2/R6: filas de proyectos en 2 columnas desde 768 px, sin ocupar la pantalla entera,
// con texto suficientemente ancho a 900 px y datos clave (facts) que no se aplasten a 1024.
export const widths = [[768, 1024], [900, 700], [1024, 768], [1280, 800], [1440, 900], [1920, 1080], [390, 844]];

export default async function check(page, { width, height }) {
  return page.evaluate(({ width, height }) => {
    const errors = [];
    const rows = [...document.querySelectorAll(".project-case")];
    if (rows.length === 0) return ["no .project-case rows found (check would pass vacuously)"];
    rows.forEach((row, i) => {
      const cols = getComputedStyle(row).gridTemplateColumns.split(" ").length;
      const h = row.getBoundingClientRect().height;
      const frame = row.querySelector(".browser-frame");
      const text = [...row.children].find((c) => c !== frame);
      if (width >= 768) {
        if (cols !== 2) errors.push(`row ${i + 1}: ${cols} column(s), expected 2`);
        // Ventanas bajas (laptops de 700–768 px de alto): el texto mínimo legible de una fila
        // con 3 datos clave no baja del ~63 %, así que ahí el tope es 65 %.
        const cap = height >= 800 ? 0.6 : 0.65;
        if (h > cap * height) errors.push(`row ${i + 1}: ${Math.round(h)}px tall > ${cap * 100}% of ${height}px`);
      } else if (cols !== 1) {
        errors.push(`row ${i + 1}: ${cols} columns on mobile, expected 1`);
      }
      if (width === 900 && text.getBoundingClientRect().width < 300) {
        errors.push(`row ${i + 1}: text column ${Math.round(text.getBoundingClientRect().width)}px < 300px`);
      }
      if (width >= 768 && i % 2 === 1 && !(frame.getBoundingClientRect().left > text.getBoundingClientRect().left)) {
        errors.push(`row ${i + 1}: image should sit to the right of its text`);
      }
      if (width >= 768) {
        for (const dd of row.querySelectorAll("dd")) {
          const lh = parseFloat(getComputedStyle(dd).lineHeight) || 20;
          if (dd.getBoundingClientRect().height > 3 * lh + 1) {
            errors.push(`row ${i + 1}: fact "${dd.textContent.trim().slice(0, 30)}…" wraps to more than 3 lines`);
          }
        }
      }
    });
    return errors;
  }, { width, height });
}
