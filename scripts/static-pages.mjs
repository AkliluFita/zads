import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { products, articles } from "../src/data.js";
const template = await readFile("dist/index.html", "utf8");
const pages = [
  [
    "about",
    "Our story",
    "Discover the story, mission, values and leadership of ZADS PLC.",
  ],
  [
    "products",
    "Our products",
    "Explore Ethiopian agricultural exports and textile and construction material imports.",
  ],
  [
    "services",
    "Trade services",
    "Export workflows, quality checks and client-specific import sourcing.",
  ],
  [
    "export-history",
    "Markets & export history",
    "Trade connections across Middle Asia, Southern Europe and Eastern Asia.",
  ],
  [
    "news",
    "Insights & company stories",
    "Explore ZADS sourcing regions, quality practices and agricultural trade guides.",
  ],
  [
    "contact",
    "Contact & request a quotation",
    "Discuss product specifications, sourcing and shipment requirements with ZADS PLC.",
  ],
  [
    "privacy",
    "Privacy information",
    "How this website handles your enquiry draft.",
  ],
  [
    "terms",
    "Website terms",
    "Product and enquiry information for ZADS PLC visitors.",
  ],
  [
    "shipping",
    "Shipping information",
    "Export preparation and shipment coordination.",
  ],
  ...products.map((p) => [`products/${p.slug}`, p.name, p.description]),
  ...articles.map((a) => [`news/${a.slug}`, a.title, a.intro]),
];
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const [path, title, description] of pages) {
  await mkdir(`dist/${path}`, { recursive: true });
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)} | ZADS PLC</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*/,
      `$1${esc(description)}`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*/,
      `$1${esc(title)} | ZADS PLC`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*/,
      `$1${esc(description)}`,
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*/,
      `$1https://zadsplc.com/${path}`,
    );
  await writeFile(`dist/${path}/index.html`, html);
}
await copyFile("dist/index.html", "dist/404.html");
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["", ...pages.map((p) => p[0])].map((p) => `<url><loc>https://zadsplc.com/${p}</loc></url>`).join("")}</urlset>`,
);
console.log(`Generated ${pages.length} static route entry pages and sitemap.`);
