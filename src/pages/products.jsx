import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  PackageCheck,
  MapPin,
  ClipboardCheck,
} from "lucide-react";
import { products } from "../data";
import {
  PageHero,
  ProductCard,
  ProductImage,
  ContactCTA,
  Eyebrow,
} from "../components/common";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";

/* ============================================================
   PRODUCTS LIST PAGE
   ============================================================ */
export function Products() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="THE ZADS COLLECTION"
        title={
          <>
            Quality travels{" "}
            <em className="font-serif italic font-normal text-[#b45f3b]">
              both ways.
            </em>
          </>
        }
      >
        <p>
          Explore Ethiopian agricultural exports and sourcing services for the
          domestic market. Every product starts with a conversation about your
          requirements.
        </p>
      </PageHero>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-20">
        <Tabs defaultValue="all">
          {/* toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <TabsList aria-label="Product categories">
              <TabsTrigger value="all">All products</TabsTrigger>
              <TabsTrigger value="Export">Exports</TabsTrigger>
              <TabsTrigger value="Import">Imports</TabsTrigger>
            </TabsList>

            <label className="relative flex items-center w-full lg:w-80 group">
              <Search
                size={18}
                className="absolute left-5 text-[#8a8a8a] pointer-events-none transition-colors group-focus-within:text-[#b45f3b]"
              />
              <span className="sr-only">Search products</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a product…"
                type="search"
                className="w-full pl-13 pr-5 py-3.5 bg-white border border-black/[0.08] rounded-full text-base placeholder:text-[#9a9a9a] shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 focus:outline-none focus:border-[#b45f3b]/50 focus:shadow-[0_8px_24px_-6px_rgba(180,95,59,0.15)] focus:ring-4 focus:ring-[#b45f3b]/5"
                style={{ paddingLeft: "3.25rem" }}
              />
            </label>
          </div>

          {/* grids */}
          {["all", "Export", "Import"].map((category) => {
            const filtered = products.filter(
              (p) =>
                (category === "all" || p.category === category) &&
                `${p.name} ${p.origin}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            );

            return (
              <TabsContent value={category} key={category}>
                {filtered.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((p) => (
                      <ProductCard product={p} key={p.slug} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white rounded-[32px] border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#eae5dd] text-[#b45f3b] mb-6">
                      <Search size={28} />
                    </div>
                    <h2 className="text-2xl font-medium mb-2.5">
                      No matching products
                    </h2>
                    <p className="text-[#5a5a5a] text-lg max-w-sm mb-7">
                      Try "sesame", "beans" or another product name.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setQuery("")}
                      className="rounded-full px-7"
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <p className="text-center text-sm text-[#8a8a8a] mt-14 italic max-w-2xl mx-auto">
          Product imagery is illustrative. Batch specifications, grades and
          availability are confirmed with your quotation.
        </p>
      </section>

      <ContactCTA />
    </div>
  );
}

/* ============================================================
   PRODUCT DETAIL PAGE
   ============================================================ */
export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <NotFound />;

  const exported = product.category === "Export";

  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5a5a5a] mb-10 transition-all duration-300 hover:text-[#b45f3b] hover:gap-3"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ===== LEFT: IMAGE ===== */}
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="group relative w-full rounded-[36px] overflow-hidden bg-[#eae5dd] aspect-square shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_28px_50px_-12px_rgba(0,0,0,0.14)]"
                  aria-label={`Enlarge ${product.shortName} image`}
                >
                  <ProductImage
                    product={product}
                    priority
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full text-sm font-medium text-[#1e1e1e] shadow-lg opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View image <Search size={15} />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle className="font-display text-xl font-bold">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="my-3 text-sm text-stone-500">
                  Illustrative product imagery; not a specific shipment or
                  grade.
                </DialogDescription>
                <ProductImage
                  product={product}
                  className="max-h-[65dvh] w-full object-contain"
                />
              </DialogContent>
            </Dialog>

            <p className="text-xs text-[#8a8a8a] italic mt-4 text-center">
              Illustrative product image
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full text-sm font-medium border border-black/[0.04] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <MapPin size={17} className="text-[#b45f3b]" />
                {product.origin}
              </span>
              <span className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full text-sm font-medium border border-black/[0.04] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <PackageCheck size={17} className="text-[#b45f3b]" />
                {exported ? "Agricultural export" : "Import sourcing"}
              </span>
            </div>
          </div>

          {/* ===== RIGHT: DETAILS ===== */}
          <div className="lg:pt-2">
            <Eyebrow>
              {product.category.toUpperCase()} / {product.tag}
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight mb-6">
              {product.name}
            </h1>

            <p className="text-xl lg:text-2xl leading-snug font-medium text-[#2a2a2a] mb-8">
              {product.description}
            </p>

            <div className="bg-white rounded-[24px] p-7 border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)] mb-8">
              <strong className="block text-lg font-semibold mb-2">
                Contact for quotation
              </strong>
              <p className="text-[#5a5a5a] leading-relaxed">
                {exported
                  ? "Minimum order: 2 containers / 45,000 kg"
                  : "Specifications, quantities and pricing agreed individually."}
              </p>
            </div>

            <Button
              asChild
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link to={`/contact?type=RFQ&product=${product.slug}`}>
                Request a quotation <ArrowUpRight size={18} />
              </Link>
            </Button>

            <div className="mt-12 pt-10 border-t border-black/[0.08]">
              <h2 className="text-2xl lg:text-3xl font-medium mb-4">
                Considered from the start.
              </h2>
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                {product.details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECIFICATIONS (tinted) ===== */}
      <section className="bg-[#eae5dd] rounded-[48px] py-24 my-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Eyebrow>PRODUCT INFORMATION</Eyebrow>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
              The details
              <br />
              <em className="font-serif italic font-normal text-[#b45f3b]">
                make the difference.
              </em>
            </h2>
            <p className="text-[#4d4d4d] text-lg leading-relaxed mt-7">
              Share your intended use and quality requirements. Our team will
              confirm the product grade, inspection results, packaging and
              shipment arrangements before an order is agreed.
            </p>
            <p className="flex items-start gap-3 mt-8 text-sm font-medium text-[#b45f3b]">
              <ClipboardCheck size={22} className="shrink-0 mt-0.5" />
              Product-specific documentation available on request.
            </p>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <table className="w-full">
              <caption className="sr-only">
                {product.name} technical and commercial specifications
              </caption>
              <tbody>
                {product.specs.map(([key, value], i) => (
                  <tr
                    key={key}
                    className={`transition-colors duration-200 hover:bg-[#faf8f5] ${
                      i !== product.specs.length - 1
                        ? "border-b border-black/[0.06]"
                        : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="text-left px-7 py-5 text-sm font-semibold text-[#7a7a7a] uppercase tracking-wide w-2/5 align-top"
                    >
                      {key}
                    </th>
                    <td className="px-7 py-5 text-base text-[#1e1e1e] font-medium">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== RELATED PRODUCTS ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24">
        <div className="mb-14">
          <Eyebrow>CONTINUE EXPLORING</Eyebrow>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            More from{" "}
            <em className="font-serif italic font-normal text-[#b45f3b]">
              ZADS.
            </em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products
            .filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map((p) => (
              <ProductCard product={p} key={p.slug} />
            ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            brand: { "@type": "Brand", name: "ZADS PLC" },
            ...(product.image
              ? { image: `https://zadsplc.com${product.image}` }
              : {}),
          }),
        }}
      />
    </div>
  );
}

/* ============================================================
   NOT FOUND PAGE
   ============================================================ */
export function NotFound() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased min-h-[70vh] flex items-center justify-center">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 text-center py-24">
        <Eyebrow className="justify-center">404 / PAGE NOT FOUND</Eyebrow>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight my-7">
          Let's find your
          <br />
          <em className="font-serif italic font-normal text-[#b45f3b]">
            way back.
          </em>
        </h1>
        <p className="text-[#5a5a5a] text-lg lg:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          This page is not available. Explore our products or return home.
        </p>
        <Button
          asChild
          className="rounded-full px-8 py-6 text-base gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Link to="/">
            Back to ZADS <ArrowUpRight size={17} />
          </Link>
        </Button>
      </div>
    </div>
  );
}