// Minor 1: el padding que reserva el menú lateral sólo aplica donde hay menú lateral.
// La 404 no lo tiene: su contenido debe quedar centrado en la ventana.
export const widths = [[1024, 768], [1280, 800], [1920, 1080]];
export const path = "/esta-pagina-no-existe";

export default async function check(page, { width }) {
  return page.evaluate((width) => {
    const h1 = document.querySelector("h1");
    if (!h1) return ["no h1 on the 404 page"];
    if (document.querySelector("#main-sidebar")) return ["404 page unexpectedly has the side menu"];
    const r = h1.getBoundingClientRect();
    const off = Math.round((r.left + r.right) / 2 - document.documentElement.clientWidth / 2);
    return Math.abs(off) > 4 ? [`404 content is ${off}px off-centre`] : [];
  }, width);
}
