import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Building2 } from "lucide-react";
import { Button } from "./ui/button";

/* ============================================================
   REVEAL — scroll-triggered fade-up animation
   ============================================================ */
export function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   EYEBROW — small uppercase label
   ============================================================ */
export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#6e6e6e] mb-4 ${className}`}
    >
      {children}
    </p>
  );
}

/* ============================================================
   PAGE HERO — reusable inner-page hero
   ============================================================ */
export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="max-w-[1320px] mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-medium leading-[1.05] tracking-tight max-w-4xl">
        {title}
      </h1>
      {children && (
        <div className="mt-7 max-w-2xl text-lg lg:text-xl leading-relaxed text-[#3b3b3b]">
          {children}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   PRODUCT IMAGE — image or fallback material art
   ============================================================ */
export function ProductImage({ product, priority = false, className = "" }) {
  return product.image ? (
    <img
      className={className}
      src={product.image}
      alt={`Illustrative ${product.shortName.toLowerCase()} product image`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      width="800"
      height="800"
    />
  ) : (
    <div
      className={`relative flex flex-col items-center justify-center gap-4 w-full h-full bg-gradient-to-br from-[#eae5dd] to-[#d9d1c5] text-[#8a7e6e] ${className}`}
      role="img"
      aria-label="Construction materials illustration"
    >
      <Building2 size={86} strokeWidth={0.7} />
      <span className="text-center text-[0.7rem] tracking-[0.18em] uppercase font-semibold leading-relaxed">
        MATERIALS FOR
        <br />
        WHAT COMES NEXT.
      </span>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD — used on home, products & detail pages
   ============================================================ */
export function ProductCard({ product }) {
  return (
    <article className="group bg-white rounded-[32px] overflow-hidden border border-black/[0.02] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_50px_-12px_rgba(0,0,0,0.12)]">
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-[#eae5dd]"
        aria-label={`Explore ${product.name}`}
      >
        <ProductImage
          product={product}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* category tag */}
        <span className="absolute top-5 left-5 inline-flex items-center px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[0.68rem] tracking-[0.14em] uppercase font-semibold text-[#b45f3b] shadow-sm">
          {product.category}
        </span>

        {/* hover arrow */}
        <span className="absolute bottom-5 right-5 flex items-center justify-center w-11 h-11 rounded-full bg-[#1e1e1e] text-white shadow-lg opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-[#b45f3b]">
          <ArrowUpRight size={20} />
        </span>
      </Link>

      <div className="p-7 lg:p-8">
        <p className="text-[0.68rem] tracking-[0.16em] uppercase font-semibold text-[#8a8a8a] mb-2.5">
          {product.origin}
        </p>
        <h3 className="text-2xl font-medium leading-tight mb-2.5">
          <Link
            to={`/products/${product.slug}`}
            className="transition-colors duration-300 group-hover:text-[#b45f3b]"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-[#5a5a5a]">
          {product.description}
        </p>
      </div>
    </article>
  );
}

/* ============================================================
   CONTACT CTA — reusable closing call-to-action
   ============================================================ */
export function ContactCTA() {
  return (
    <section className="bg-[#1e1e1e] text-white rounded-[48px] py-20 lg:py-24 my-10 lg:my-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <Eyebrow className="text-white/60">
          A CONVERSATION IS A GOOD BEGINNING
        </Eyebrow>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight text-white max-w-3xl">
          Let's build your next
          <br />
          <em className="font-serif italic font-normal text-[#d9b8a4]">
            trade connection.
          </em>
        </h2>
        <p className="mt-7 max-w-2xl text-lg lg:text-xl leading-relaxed text-[#c6c6c6]">
          Tell us what you're looking for. Our team is ready to discuss your
          product, sourcing and shipment requirements.
        </p>
        <div className="mt-10">
          <Button
            asChild
            className="rounded-full px-8 py-6 text-base bg-white text-[#1e1e1e] hover:bg-[#f2f2f2] gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Link to="/contact">
              Start a conversation <ArrowUpRight size={17} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TEXT LINK — inline arrow link
   ============================================================ */
export function TextLink({ to, children, className = "" }) {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-[0.95rem] font-medium text-[#1e1e1e] border-b border-transparent pb-0.5 transition-all duration-300 hover:gap-3.5 hover:border-[#b45f3b] hover:text-[#b45f3b] ${className}`}
      to={to}
    >
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}