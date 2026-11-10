// R5: la barra superior móvil tiene fondo (los títulos no pasan por debajo de los controles)
// y el menú desplegado es legible. En escritorio la barra no se muestra.
export const widths = [[375, 812], [390, 844], [768, 1024], [1024, 768]];

const alpha = (color) => {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return color === "transparent" ? 0 : 1;
  const parts = m[1].split(/[ ,/]+/).filter(Boolean);
  return parts.length > 3 ? parseFloat(parts[3]) : 1;
};

export default async function check(page, { width }) {
  const errors = [];
  const info = await page.evaluate(() => {
    const header = document.querySelector("header");
    const bar = document.getElementById("mobile-menu-toggle")?.closest("div.flex")?.parentElement;
    return {
      headerVisible: header && getComputedStyle(header).display !== "none",
      barBg: bar ? getComputedStyle(bar).backgroundColor : null,
    };
  });
  if (width >= 1024) {
    if (info.headerVisible) errors.push("mobile header visible on desktop");
    return errors;
  }
  if (alpha(info.barBg) < 0.7) errors.push(`header bar background alpha ${alpha(info.barBg)} < 0.7 (${info.barBg})`);
  await page.click("#mobile-menu-toggle");
  const menuBg = await page.evaluate(() => {
    const m = document.getElementById("mobile-menu");
    return { visible: m && !m.classList.contains("hidden") && m.offsetParent !== null, bg: m && getComputedStyle(m).backgroundColor };
  });
  if (!menuBg.visible) errors.push("mobile menu did not open");
  else if (alpha(menuBg.bg) < 0.8) errors.push(`open menu background alpha ${alpha(menuBg.bg)} < 0.8`);
  return errors;
}
