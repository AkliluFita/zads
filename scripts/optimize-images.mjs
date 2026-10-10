import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
for (const [source, name] of [
  ["sesame-editorial", "sesame"],
  ["beans", "beans"],
  ["oils", "oils"],
  ["textiles", "textiles"],
]) {
  await sharp(`design-assets/${source}.png`)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/images/${name}.webp`);
}
