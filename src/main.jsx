import React, { Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles.css";
import { Layout } from "./components/layout";
import Home from "./pages/home";
import { Products, ProductDetail, NotFound } from "./pages/products";
import { About, Services } from "./pages/company";
import { News, Article } from "./pages/news";
import Contact from "./pages/contact";
import Legal from "./pages/legal";
import { products, articles } from "./data";
const Markets = lazy(() => import("./pages/markets"));
const meta = {
  "/": [
    "Ethiopian origins. Global connections.",
    "ZADS PLC connects Ethiopian agricultural excellence to global markets through sesame, beans and oils exports and textile and construction material imports.",
  ],
  "/about": [
    "Our story",
    "Discover the story, mission, values and leadership of ZADS PLC, an Ethiopian import-export company.",
  ],
  "/products": [
    "Our products",
    "Explore Ethiopian sesame, beans, agricultural oils, textiles and construction material sourcing.",
  ],
  "/services": [
    "Trade services",
    "Explore ZADS PLC’s export workflow, quality checks and client-specific import services.",
  ],
  "/export-history": [
    "Markets & export history",
    "ZADS trade connections across Middle Asia, Southern Europe and Eastern Asia.",
  ],
  "/news": [
    "Insights & stories",
    "Explore ZADS sourcing regions, quality practices and agricultural trade guides.",
  ],
  "/contact": [
    "Contact & request a quotation",
    "Discuss your product, sourcing and shipment requirements with ZADS PLC.",
  ],
  "/privacy": [
    "Privacy information",
    "How this static ZADS website handles your enquiry draft.",
  ],
  "/terms": [
    "Website terms",
    "Product and enquiry information for visitors to ZADS PLC.",
  ],
  "/shipping": [
    "Shipping information",
    "Export preparation and shipment coordination at ZADS PLC.",
  ],
};
function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const clean = pathname.replace(/\/$/, "") || "/";
    const product = products.find((p) => clean === `/products/${p.slug}`),
      article = articles.find((a) => clean === `/news/${a.slug}`);
    const [title, description] = product
      ? [product.name, product.description]
      : article
        ? [article.title, article.intro]
        : meta[clean] || ["Page not found", "Find your way back to ZADS PLC."];
    document.title = `${title} | ZADS PLC`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content =
      document.title;
    document.querySelector('meta[property="og:description"]').content =
      description;
    document.querySelector('link[rel="canonical"]').href =
      `https://zadsplc.com${clean === "/" ? "" : clean}`;
  }, [pathname]);
  return null;
}
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Metadata />
        <Suspense
          fallback={
            <div className="shell loading-state" role="status">
              Loading ZADS…
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="export-history" element={<Markets />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<Article />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Legal type="privacy" />} />
              <Route path="terms" element={<Legal type="terms" />} />
              <Route path="shipping" element={<Legal type="shipping" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
createRoot(document.getElementById("root")).render(<App />);
