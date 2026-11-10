// R3: en Habilidades, las etiquetas de los iconos no se pisan ni desbordan su celda.
export const widths = [[390, 844], [768, 1024], [1024, 768], [1280, 800], [1366, 768], [1440, 900]];

export default async function check(page) {
  return page.evaluate(() => {
    const errors = [];
    if (document.querySelectorAll(".skill-category .skill-item").length === 0) return ["no skill items found (check would pass vacuously)"];
    const cross = (a, b) => a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1;
    for (const cat of document.querySelectorAll(".skill-category")) {
      const title = cat.querySelector("h3")?.textContent.trim();
      const items = [...cat.querySelectorAll(".skill-item")];
      const labels = items.map((it) => it.querySelector("span"));
      items.forEach((it, i) => {
        if (labels[i].scrollWidth > it.clientWidth + 1) {
          errors.push(`${title}: "${labels[i].textContent.trim()}" is wider than its cell`);
        }
      });
      for (let i = 0; i < labels.length; i++)
        for (let j = i + 1; j < labels.length; j++)
          if (cross(labels[i].getBoundingClientRect(), labels[j].getBoundingClientRect()))
            errors.push(`${title}: "${labels[i].textContent.trim()}" overlaps "${labels[j].textContent.trim()}"`);
    }
    return errors;
  });
}
