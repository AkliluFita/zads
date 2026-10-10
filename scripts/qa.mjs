import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
let staticServer;
let base = process.env.QA_URL || "http://127.0.0.1:5174";
if (process.argv.includes("--production")) {
  staticServer = http.createServer(async (req, res) => {
    let file = path.resolve(
      "dist",
      "." + new URL(req.url, "http://localhost").pathname,
    );
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
      const data = await readFile(file);
      const mime = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".webp": "image/webp",
        ".png": "image/png",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
      };
      res.writeHead(200, {
        "content-type": mime[path.extname(file)] || "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404, { "content-type": "text/html" });
      res.end(await readFile("dist/404.html"));
    }
  });
  await new Promise((resolve) => staticServer.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${staticServer.address().port}`;
}

await mkdir("/tmp/zads-qa", { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const errors = [];
const requests = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  if (process.argv.includes("--screenshots")) {
    for (const [name, route, width, height] of [
      ["home-top", "/", 1440, 1000],
      ["home-mobile-top", "/", 390, 844],
      ["contact-mobile", "/contact", 390, 844],
      ["markets-mobile", "/export-history", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(base + route);
      await page.locator("h1").waitFor();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `/tmp/zads-qa/${name}.png`,
        fullPage: false,
      });
    }
    await context.close();
    await browser.close();
    console.log("Captured final viewport screenshots.");
    process.exit(0);
  }
  const routes = [
    "/",
    "/about",
    "/products",
    "/products/sesame",
    "/products/beans",
    "/products/oils",
    "/products/textiles",
    "/products/construction-materials",
    "/services",
    "/export-history",
    "/news",
    "/news/from-source-to-shipment",
    "/news/quality-at-every-stage",
    "/news/our-sourcing-regions",
    "/contact",
    "/privacy",
    "/terms",
    "/shipping",
    "/missing-page",
  ];
  for (const route of routes) {
    await page.goto(base + route);
    await page.locator("h1").waitFor();
    await page.waitForTimeout(150);
    assert.equal(await page.locator("h1").count(), 1, `one h1: ${route}`);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `desktop overflow: ${route}`,
    );
    assert.equal(
      await page
        .locator("img")
        .evaluateAll(
          (imgs) =>
            imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
        ),
      0,
      `broken image: ${route}`,
    );
  }
  await page.goto(base + "/");
  await page.screenshot({
    path: "/tmp/zads-qa/home-desktop.png",
    fullPage: true,
  });
  await page.goto(base + "/products");
  await page.getByRole("tab", { name: "Imports", exact: true }).click();
  assert.equal(await page.locator("[role=tabpanel] .product-card").count(), 2);
  await page.getByRole("tab", { name: "All products" }).click();
  await page.getByRole("searchbox").fill("no-such-product");
  await page.getByRole("heading", { name: "No matching products" }).waitFor();
  await page.getByRole("button", { name: "Clear search" }).click();
  assert.equal(await page.locator("[role=tabpanel] .product-card").count(), 5);
  await page.goto(base + "/products/beans");
  await page
    .getByRole("link", { name: "Request a quotation", exact: true })
    .click();
  assert.equal(
    await page.locator("select[name=product]").inputValue(),
    "Ethiopian beans",
  );
  assert.equal(await page.locator("select[name=type]").inputValue(), "RFQ");
  await page.locator("input[name=name]").fill("QA Buyer");
  await page.locator("input[name=email]").fill("qa@example.invalid");
  await page.locator("input[name=country]").fill("Ethiopia");
  await page
    .locator("textarea[name=message]")
    .fill("Review-only static inquiry.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await page.getByRole("dialog").waitFor();
  assert.match(
    await page.locator(".draft-reference").innerText(),
    /ZADS-INQ-\d{8}-[A-F0-9]{4}/,
  );
  assert.match(
    await page
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href"),
    /^mailto:/,
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download draft" }).click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /ZADS-INQ-.*\.txt/);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.getByRole("button", { name: "አማ", exact: true }).click();
  assert.equal(await page.locator("form").getAttribute("lang"), "am");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(base + route);
    await page.locator("h1").waitFor();
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `mobile overflow: ${route}`,
    );
  }
  await page.goto(base + "/");
  await page.screenshot({
    path: "/tmp/zads-qa/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Products", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Quality travels both ways." })
    .waitFor();
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.screenshot({
    path: "/tmp/zads-qa/products-mobile.png",
    fullPage: true,
  });
  assert.equal(
    requests.filter((url) => url.includes("/api/")).length,
    0,
    "static frontend must not call API",
  );
  assert.deepEqual(errors, [], "browser runtime errors");
  console.log(
    `PASS: ${routes.length} routes at desktop/mobile, image loading, filtering, RFQ prefill/validation/draft/download, EN/AM form, mobile navigation, no API calls or runtime errors.`,
  );
} finally {
  await browser.close();
  if (staticServer) await new Promise((resolve) => staticServer.close(resolve));
}
