// Mismo control de desborde a 640 px que 02, pero con la página en inglés (textos distintos).
import base from "./02-project-rows.mjs";
export const widths = [[640, 900]];

export default async function check(page, size) {
  await page.evaluate(() => localStorage.setItem("lang", "en"));
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const lang = await page.evaluate(() => document.documentElement.lang);
  const errors = lang === "en" ? [] : [`page did not switch to English (lang=${lang})`];
  errors.push(...(await base(page, size)).map((e) => `[EN] ${e}`));
  await page.evaluate(() => localStorage.removeItem("lang"));
  return errors;
}
