import sharp from "sharp";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "public/optimized");
await mkdir(output, { recursive: true });
const manifest = {};
let originalBytes = 0;
let previewBytes = 0;

for (const folder of ["factory-ai", "header-art"]) {
  const publicOutput = path.join(root, "public", folder);
  await mkdir(publicOutput, { recursive: true });
  for (const file of await readdir(path.join(root, "assets", folder))) {
    if (!file.endsWith(".png")) continue;
    const isHomepageHero = file === "kudamalana-homepage-hero-v2.png";
    await sharp(path.join(root, "assets", folder, file))
      .webp({ quality: isHomepageHero ? 94 : 90, effort: 6 })
      .toFile(path.join(publicOutput, `${path.parse(file).name}.webp`));
  }
}

for (const folder of ["factory-ai", "header-art", "product-photos", "brand"]) {
  for (const file of (await readdir(path.join(root, "public", folder))).sort()) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    // Encode directly from the generated master to avoid repeated lossy compression.
    const source = ["factory-ai", "header-art"].includes(folder)
      ? path.join(root, "assets", folder, `${path.parse(file).name}.png`)
      : path.join(root, "public", folder, file);
    const buffer = await readFile(source);
    const { width, height } = await sharp(buffer).metadata();
    const widths = folder === "brand" ? [160] : [320, 640, 960, width].filter((w, i, all) => w <= width && all.indexOf(w) === i).sort((a, b) => a - b);
    const variants = [];
    for (const targetWidth of widths) {
      const quality = file === "kudamalana-homepage-hero-v2.webp" ? 92 : 86;
      const encoded = await sharp(buffer).resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      const hash = createHash("sha256").update(encoded).digest("hex").slice(0, 10);
      const name = `${path.parse(file).name}-${targetWidth}-${hash}.webp`;
      await writeFile(path.join(output, name), encoded);
      variants.push({ src: `/optimized/${name}`, width: targetWidth, bytes: encoded.length });
    }
    const preview = variants.find((item) => item.width >= 640) || variants.at(-1);
    manifest[`/${folder}/${file}`] = { width, height, src: preview.src, srcSet: variants.map((item) => `${item.src} ${item.width}w`).join(", ") };
    originalBytes += buffer.length;
    previewBytes += preview.bytes;
  }
}
await sharp(path.join(root, "public/brand/kudamalana-logo.png")).resize(48, 48, { fit: "contain" }).png().toFile(path.join(output, "favicon-48.png"));
await writeFile(path.join(root, "src/data/imageManifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Image originals: ${(originalBytes / 1024 / 1024).toFixed(2)} MB; 640px previews: ${(previewBytes / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - previewBytes / originalBytes) * 100)}% smaller).`);
