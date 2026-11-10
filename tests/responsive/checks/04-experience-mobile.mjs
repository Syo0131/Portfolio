// R4: en móvil la experiencia usa un riel a la izquierda con texto a ancho completo y
// alineado a la izquierda; desde 768 px sigue la timeline horizontal de escritorio.
export const widths = [[375, 812], [390, 844], [768, 1024]];

export default async function check(page, { width }) {
  return page.evaluate((width) => {
    const errors = [];
    const mobileList = document.querySelector("#experiencia .md\\:hidden");
    const scroller = document.getElementById("scroll-container");
    if (width >= 768) {
      if (getComputedStyle(mobileList).display !== "none") errors.push("mobile timeline visible at tablet width");
      if (!scroller || scroller.offsetParent === null) errors.push("desktop timeline hidden at tablet width");
      return errors;
    }
    const listW = mobileList.querySelector("ul").getBoundingClientRect().width;
    for (const h3 of mobileList.querySelectorAll("h3")) {
      const w = h3.getBoundingClientRect().width;
      const align = getComputedStyle(h3).textAlign;
      const name = h3.textContent.trim();
      if (w < 0.7 * listW) errors.push(`"${name}" block is ${Math.round(w)}px, < 70% of ${Math.round(listW)}px`);
      if (align !== "left" && align !== "start") errors.push(`"${name}" is ${align}-aligned`);
    }
    return errors;
  }, width);
}
