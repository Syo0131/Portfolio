// Ningún ancho probado debe tener scroll horizontal.
export const widths = [
  [375, 812], [390, 844], [768, 1024], [900, 700], [1024, 768],
  [1152, 800], [1280, 800], [1366, 768], [1440, 900], [1536, 864],
];

export default async function check(page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  return scrollWidth > clientWidth ? [`horizontal scroll: ${scrollWidth}px > ${clientWidth}px`] : [];
}
