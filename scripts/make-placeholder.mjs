// Genera una imagen temporal de proyecto (1600x900) mientras llega la captura real.
// Uso: node scripts/make-placeholder.mjs <salida.png> "<Nombre del proyecto>"
import sharp from "sharp";

const [, , out, name] = process.argv;
if (!out || !name) {
  console.error('Uso: node scripts/make-placeholder.mjs <salida.png> "<Nombre>"');
  process.exit(1);
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#16212e" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="#04bbe3" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#04bbe3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="#0b1118"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <text x="800" y="440" text-anchor="middle" font-family="Sora, DejaVu Sans, sans-serif" font-size="96" font-weight="700" fill="#e6edf3">${esc(name)}</text>
  <text x="800" y="520" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="30" letter-spacing="6" fill="#8b98a8">CAPTURA PRÓXIMAMENTE</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`placeholder escrito en ${out}`);
