// Comprobaciones responsive con Chrome real (Playwright, canal "chrome").
// Sirve dist/ con `astro preview`, recorre tests/responsive/checks/*.mjs y, para cada ancho
// que declara cada check, abre la página y ejecuta su función. Cada error se imprime como
// `FAIL: [archivo @WxH] mensaje`. Sale con 1 si hubo algún error.
//
// Contrato de un check:
//   export const widths = [[375, 812], ...];          // anchos y altos a probar
//   export const path = "/";                           // opcional
//   export default async function check(page, { width, height }) { return ["error", ...]; }
import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const PORT = 4410;
const BASE = `http://127.0.0.1:${PORT}`;

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["astro", "preview", "--host", "127.0.0.1", "--port", String(PORT)], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      // Grupo de procesos propio: `npx` lanza a su vez a astro, y matar sólo a npx lo dejaría vivo.
      detached: true,
    });
    const timer = setTimeout(() => reject(new Error("astro preview no arrancó en 30 s")), 30_000);
    const onData = (buf) => {
      const text = buf.toString();
      if (text.includes(`:${PORT}`) && text.includes("Local")) {
        clearTimeout(timer);
        resolve(proc);
      }
      if (/in use/i.test(text)) {
        clearTimeout(timer);
        reject(new Error(`el puerto ${PORT} está ocupado`));
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("exit", (code) => reject(new Error(`astro preview terminó (código ${code})`)));
  });
}

const files = (await readdir(join(here, "checks"))).filter((f) => f.endsWith(".mjs")).sort();
let server;

// Apagar el servidor aunque el proceso termine de golpe (p. ej. salida cortada con `| head`).
const stopServer = () => {
  if (!server) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    // ya terminó
  }
  server = undefined;
};
process.on("exit", stopServer);
for (const sig of ["SIGINT", "SIGTERM", "SIGPIPE", "SIGHUP"]) {
  process.on(sig, () => process.exit(1));
}
process.stdout.on("error", () => process.exit(1)); // EPIPE
let browser;
let failures = 0;

try {
  server = await startPreview();
  browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  for (const file of files) {
    const mod = await import(pathToFileURL(join(here, "checks", file)).href);
    for (const [width, height] of mod.widths) {
      await page.setViewportSize({ width, height });
      await page.goto(BASE + (mod.path ?? "/"), { waitUntil: "networkidle" });
      const errors = await mod.default(page, { width, height });
      for (const e of errors) {
        console.log(`FAIL: [${file} @${width}x${height}] ${e}`);
        failures++;
      }
    }
  }
} catch (err) {
  console.log(`FAIL: responsive harness: ${err.message}`);
  failures++;
} finally {
  await browser?.close();
  stopServer();
}

process.exit(failures ? 1 : 0);
