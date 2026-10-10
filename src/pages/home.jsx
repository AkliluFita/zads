import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Sprout,
  Handshake,
  SlidersHorizontal,
  Truck,
  MessagesSquare,
  Check,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Reveal,
  Eyebrow,
  ProductCard,
  ContactCTA,
  TextLink,
} from "../components/common";
import Origins from "../components/origins";
import { products, qualityChecks } from "../data";

const reasons = [
  ["Consistent quality", "Careful checks, shipment after shipment.", ShieldCheck],
  ["Integrity & trust", "Transparent dealings at every stage.", Handshake],
  ["Trusted suppliers", "Established Ethiopian sourcing relationships.", Sprout],
  ["Meticulous preparation", "Cleaning, sorting and grading with care.", SlidersHorizontal],
  ["Dependable coordination", "Logistics planned around agreed delivery dates.", Truck],
  ["Clear communication", "Responsive contact throughout your order.", MessagesSquare],
];

export default function Home() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center pt-16 pb-10">
        <Reveal className="space-y-7">
          <Eyebrow>
            <span className="inline-block w-2 h-2 rounded-full bg-[#5f8b4b] shadow-[0_0_0_2px_rgba(95,139,75,0.15)] animate-pulse" />
            ETHIOPIAN ROOTS. GLOBAL REACH.
          </Eyebrow>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-medium leading-[1.05] tracking-tight">
            From our origins.
            <br />
            To your
            <br />
            <em className="font-serif italic font-normal text-[#b45f3b]">
              opportunities.
            </em>
          </h1>

          <p className="text-lg sm:text-xl text-[#3b3b3b] max-w-xl leading-relaxed">
            Connecting Ethiopian agricultural excellence to the world through
            considered sourcing, quality products and dependable trade.
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <Button asChild className="rounded-full px-8 py-6 text-base gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-lg">
              <Link to="/products">
                Explore our products <ArrowUpRight size={18} />
              </Link>
            </Button>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-medium border-b border-[#1e1e1e] pb-1 transition-all duration-300 hover:gap-3.5"
            >
              Our story <ArrowRight size={17} />
            </Link>
          </div>

          <div className="flex items-center gap-3.5 pt-6 text-[0.7rem] tracking-[0.18em] uppercase text-[#6e6e6e] font-medium">
            <span className="inline-block w-10 h-px bg-[#6e6e6e]" />
            AN IMPORT HERITAGE SINCE 2006
          </div>
        </Reveal>

        {/* Hero Photo */}
        <Reveal className="relative rounded-[36px] overflow-hidden bg-[#e3ddd4] shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] aspect-[1/1.15] group transition-transform duration-500 hover:scale-[1.01]">
          <img
            src="/images/sesame.webp"
            width="1000"
            height="1000"
            alt="Illustrative sesame seeds in a wooden bowl on natural linen"
            fetchPriority="high"
            className="w-full h-full object-cover brightness-[0.98] saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-6 left-7 right-7 flex justify-between text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] z-10">
            <span>THE ZADS COLLECTION</span>
            <span>01 / 03</span>
          </div>

          <div className="absolute bottom-7 left-7 right-7 bg-white/90 backdrop-blur-md rounded-3xl px-7 py-6 flex flex-wrap items-end justify-between gap-4 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.2)] z-10">
            <div>
              <span className="block text-[0.65rem] tracking-[0.14em] uppercase text-[#2b2b2b] font-semibold mb-2.5">
                SOURCED WITH CARE
              </span>
              <h2 className="text-[1.9rem] font-serif font-normal leading-tight text-[#1e1e1e]">
                Small seeds.
                <br />A world of possibility.
              </h2>
            </div>
            <Link
              to="/products/sesame"
              aria-label="Explore Ethiopian sesame"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1e1e1e] text-white transition-all duration-300 hover:scale-110 hover:rotate-45 hover:bg-[#b45f3b]"
            >
              <ArrowUpRight size={23} />
            </Link>
          </div>

          <span className="absolute bottom-3 right-7 text-[0.55rem] tracking-[0.1em] text-white/80 uppercase z-10">
            ILLUSTRATIVE PRODUCT IMAGE
          </span>
        </Reveal>
      </section>

      {/* ===== SCROLL HINT ===== */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 flex items-center justify-between pt-5 pb-16 border-t border-black/[0.06] mt-5 text-[0.7rem] tracking-[0.18em] uppercase font-medium text-[#6f6f6f]">
        <span>ROOTED IN QUALITY</span>
        <span className="flex-1 h-px bg-black/[0.12] mx-7" />
        <a
          href="#our-story"
          className="flex items-center gap-2 text-[#1e1e1e] transition-all duration-300 hover:gap-3"
        >
          SCROLL TO DISCOVER <ArrowDown size={12} />
        </a>
      </div>

      {/* ===== STORY ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24" id="our-story">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow>01 / A PARTNER IN YOUR PROGRESS</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Local knowledge.
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">
                  International outlook.
                </em>
              </h2>
            </div>
            <div>
              <p className="text-xl lg:text-2xl leading-snug font-medium mb-6">
                What began with a textile shop in Mercato has grown into a
                business connecting Ethiopia with the wider world.
              </p>
              <p className="text-[#4d4d4d] text-lg leading-relaxed mb-7">
                Today, ZADS PLC brings together two complementary trade lines:
                agricultural exports from Ethiopia and textiles and construction
                material imports for the domestic market.
              </p>
              <TextLink to="/about">Get to know ZADS</TextLink>
            </div>
          </div>

          {/* fact strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-10 border-t border-black/[0.08]">
            <div>
              <b className="block text-4xl font-medium tracking-tight">2006</b>
              <span className="text-sm text-[#565656]">Import division established</span>
            </div>
            <div>
              <b className="block text-4xl font-medium tracking-tight">2022</b>
              <span className="text-sm text-[#565656]">Entry into agricultural exports</span>
            </div>
            <div>
              <b className="block text-4xl font-medium tracking-tight">03</b>
              <span className="text-sm text-[#565656]">Ethiopian sourcing regions</span>
            </div>
            <div>
              <b className="block text-4xl font-medium tracking-tight">
                45,000 <small className="text-base font-normal text-[#5e5e5e] ml-1">kg</small>
              </b>
              <span className="text-sm text-[#565656]">Minimum agricultural export order</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== PRODUCTS (tinted) ===== */}
      <section className="bg-[#eae5dd] rounded-t-[48px] py-24 mt-5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div>
              <Eyebrow>02 / WHAT WE TRADE</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Good by nature.
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">
                  Selected with purpose.
                </em>
              </h2>
            </div>
            <TextLink to="/products">View the full collection</TextLink>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} className={`delay-${i * 100}`}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 mt-14 px-9 py-7 bg-white/70 backdrop-blur-sm rounded-full border border-white/80">
            <p className="font-medium text-[#2a2a2a]">
              For your next shipment{" "}
              <span className="font-normal text-[#6d6d6d] ml-3">
                Minimum order: 2 containers / 45,000 kg
              </span>
            </p>
            <Link
              to="/contact?type=RFQ"
              className="inline-flex items-center gap-2 font-semibold text-[#1e1e1e] border-b border-transparent transition-all duration-300 hover:gap-3.5 hover:border-[#1e1e1e]"
            >
              Contact for quotation <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ORIGINS ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24">
        <Reveal>
          <Origins />
        </Reveal>
      </section>

      {/* ===== QUALITY ===== */}
      <section className="bg-[#1e1e1e] text-white rounded-[48px] my-10 py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <Reveal className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow className="text-white/70">03 / OUR STANDARD</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-white">
                Quality, from source
                <br />
                to <em className="font-serif italic font-normal text-[#d9b8a4]">shipment.</em>
              </h2>
              <p className="text-[#c6c6c6] text-lg leading-relaxed my-7">
                Every batch undergoes inspection before it is approved for
                export. From moisture content to sorting accuracy, attention to
                detail is built into the journey.
              </p>
              <Button
                asChild
                variant="light"
                className="rounded-full px-7 py-5 bg-white text-[#1e1e1e] hover:bg-[#f2f2f2] gap-3 transition-all duration-300 hover:gap-4"
              >
                <Link to="/services">
                  See how we work <ArrowRight size={17} />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {qualityChecks.map(([title], i) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-4 px-6 py-5 bg-white/[0.06] border border-white/[0.06] rounded-2xl transition-all duration-300 hover:bg-white/[0.12] hover:translate-x-1"
                >
                  <span className="text-xs font-semibold text-[#aaa] tracking-wider">
                    0{i + 1}
                  </span>
                  <b className="flex-1 font-medium text-white">{title}</b>
                  <Check size={15} className="text-[#9bb87c]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY ZADS ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24">
        <Reveal>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div>
              <Eyebrow>04 / WHY ZADS</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Strong relationships.
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">
                  Better trade.
                </em>
              </h2>
            </div>
            <p className="max-w-xs text-[#4f4f4f] text-lg leading-relaxed">
              A considered approach, from your first conversation to the final
              delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
            {reasons.map(([title, text, Icon], i) => (
              <article
                key={title}
                className={`bg-white rounded-3xl p-8 lg:p-9 border border-black/[0.02] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] hover:bg-[#fffdf9] delay-${i * 80}`}
              >
                <Icon size={23} strokeWidth={1.4} className="text-[#b45f3b] mb-5" />
                <h3 className="text-xl lg:text-2xl font-medium mb-3">{title}</h3>
                <p className="text-[#5a5a5a] leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== MARKETS BAND ===== */}
      <section className="bg-[#eae5dd] rounded-[48px] py-24 my-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>CONNECTED BEYOND BORDERS</Eyebrow>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight my-4">
              Rooted here.
              <br />
              <em className="font-serif italic font-normal text-[#b45f3b]">
                Reaching further.
              </em>
            </h2>
            <TextLink to="/export-history">Explore our markets</TextLink>
          </div>

          <div className="flex flex-col gap-3">
            {[
              ["Middle Asia", "Export markets"],
              ["Southern Europe", "Export markets"],
              ["Eastern Asia", "Import sourcing"],
            ].map(([name, desc], i) => (
              <Link
                key={name}
                to="/export-history"
                className="flex items-center justify-between gap-6 px-5 py-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/80 transition-all duration-300 hover:bg-white hover:translate-x-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <span className="text-xs font-semibold text-[#7a7a7a] tracking-[0.1em]">
                  0{i + 1}
                </span>
                <div className="flex-1 ml-2">
                  <h3 className="text-lg lg:text-xl font-medium mb-1">{name}</h3>
                  <p className="text-xs text-[#666] uppercase tracking-wider">{desc}</p>
                </div>
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <ContactCTA />
    </div>
  );
}