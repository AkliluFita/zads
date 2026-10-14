import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake,
  Sprout,
  Clock,
  FileCheck2,
} from "lucide-react";
import {
  PageHero,
  Reveal,
  Eyebrow,
  ContactCTA,
  TextLink,
} from "../components/common";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { milestones, exportSteps, qualityChecks } from "../data";

/* ============================================================
   ABOUT PAGE
   ============================================================ */
export function About() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="OUR STORY / SINCE 2003"
        title={
          <>
            It started with a shop.
            <br />
            It grew into <em className="font-serif italic font-normal text-[#b45f3b]">connection.</em>
          </>
        }
      >
        <p>
          A family-owned Ethiopian business, built on a simple idea: quality
          products should reach the people who need them.
        </p>
      </PageHero>

      {/* ===== STORY ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative rounded-[36px] overflow-hidden aspect-square shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] group">
          <img
            src="/images/zads-processing-facility.jpg"
            alt="ZADS agricultural processing machinery inside its facility"
            width="800"
            height="800"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-5 left-6 right-6 text-[0.65rem] tracking-[0.14em] uppercase text-white/90 font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
            AGRICULTURAL PROCESSING FACILITY
          </span>
        </Reveal>

        <Reveal className="space-y-6">
          <Eyebrow>FROM MERCATO TO THE WORLD</Eyebrow>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            A local beginning.
            <br />
            <em className="font-serif italic font-normal text-[#b45f3b]">A wider horizon.</em>
          </h2>
          <p className="text-xl lg:text-2xl leading-snug font-medium text-[#2a2a2a]">
            ZADS PLC began as a small shop in Merkato and grew its business over time.
          </p>
          <p className="text-[#4d4d4d] text-lg leading-relaxed">
            What began as a small retail operation expanded into a growing
            business, supported by a supplier network across Ethiopia.
            Since 2006, our import division has sourced textiles and
            construction materials through overseas partners.
          </p>
          <p className="text-[#4d4d4d] text-lg leading-relaxed">
            In 2022, we opened a new chapter in agricultural exports. Our first
            export shipment followed in 2023. Today, sesame, beans, Niger seed,
            soybeans and chickpeas
            connect our Ethiopian sourcing regions with international buyers.
          </p>
        </Reveal>
      </section>

      {/* ===== MISSION / VISION (tinted) ===== */}
      <section className="bg-[#eae5dd] rounded-t-[48px] py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <Eyebrow>THE PRINCIPLES THAT GUIDE US</Eyebrow>

          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            <article className="bg-white rounded-[32px] p-10 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-black/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)]">
              <span className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-[#8a8a8a]">
                01 / MISSION
              </span>
              <h2 className="text-3xl lg:text-4xl font-medium leading-tight mt-5 mb-6">
                Excellence in
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">every exchange.</em>
              </h2>
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                To be a global leader in the trade of premium Ethiopian
                agricultural products through excellence, reliability and
                innovation. We are dedicated to ethical sourcing, high quality
                standards and transparent service for our international
                partners.
              </p>
            </article>

            <article className="bg-white rounded-[32px] p-10 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-black/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)]">
              <span className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-[#8a8a8a]">
                02 / VISION
              </span>
              <h2 className="text-3xl lg:text-4xl font-medium leading-tight mt-5 mb-6">
                A trusted bridge
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">to global markets.</em>
              </h2>
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                To become one of Africa's most trusted import-export companies,
                with an integrated supply chain connecting Ethiopian agriculture
                to international markets through innovation, sustainability and
                community development.
              </p>
            </article>
          </div>

          {/* value cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              [HeartHandshake, "Integrity", "Honest, transparent relationships."],
              [ShieldCheck, "Quality", "Careful inspection and grading."],
              [Clock, "Reliability", "Consistent, dependable service."],
              [Sprout, "Sustainability", "Ethical sourcing and community support."],
            ].map(([Icon, title, text], i) => (
              <article
                key={title}
                className={`bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] delay-${i * 80}`}
              >
                <Icon size={26} strokeWidth={1.5} className="text-[#b45f3b] mb-5" />
                <h3 className="text-xl font-medium mb-2.5">{title}</h3>
                <p className="text-[#5a5a5a] leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORY ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-24">
        <Eyebrow>BUILT OVER TIME</Eyebrow>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-14">
          Every chapter
          <br />
          <em className="font-serif italic font-normal text-[#b45f3b]">moves us forward.</em>
        </h2>

        <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {milestones.map((m, i) => (
            <Reveal
              key={m.year}
              className={`group grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-9 items-start transition-all duration-300 hover:bg-white/60 hover:px-4 hover:rounded-2xl delay-${i * 80}`}
            >
              <b className="text-3xl lg:text-4xl font-medium tracking-tight text-[#b45f3b]">
                {m.year}
              </b>
              <div>
                <h3 className="text-xl lg:text-2xl font-medium mb-2.5">{m.title}</h3>
                <p className="text-[#4d4d4d] text-lg leading-relaxed max-w-3xl">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}

/* ============================================================
   SERVICES PAGE
   ============================================================ */
export function Services() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="OUR SERVICES"
        title={
          <>
            From sourcing
            <br />
            to <em className="font-serif italic font-normal text-[#b45f3b]">safe arrival.</em>
          </>
        }
      >
        <p>
          Quality checks, practical coordination and clear communication connect
          every stage of the trade journey.
        </p>
      </PageHero>

      {/* ===== TABS ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16">
        <Tabs defaultValue="exports">
          <TabsList aria-label="Trade service" className="mb-12">
            <TabsTrigger value="exports">Export services</TabsTrigger>
            <TabsTrigger value="imports">Import services</TabsTrigger>
          </TabsList>

          {/* ----- EXPORTS ----- */}
          <TabsContent value="exports">
            <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Seven steps.
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">
                  One considered process.
                </em>
              </h2>
              <p className="text-[#4d4d4d] text-lg leading-relaxed max-w-lg">
                Our export workflow follows each order from Ethiopian sourcing
                and procurement through to delivery and follow-up.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportSteps.map(([title, text], i) => (
                <Reveal
                  key={title}
                  className={`bg-white rounded-3xl p-8 border border-black/[0.02] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] delay-${i * 60}`}
                >
                  <span className="block text-xs font-semibold tracking-[0.1em] text-[#b45f3b] mb-5">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-medium mb-2.5">{title}</h3>
                  <p className="text-[#5a5a5a] leading-relaxed">{text}</p>
                </Reveal>
              ))}
            </div>
          </TabsContent>

          {/* ----- IMPORTS ----- */}
          <TabsContent value="imports">
            <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Source for your
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">next project.</em>
              </h2>
              <p className="text-[#4d4d4d] text-lg leading-relaxed max-w-lg">
                Client-specific sourcing for men's and women's fabrics and
                construction materials, plus client-specific sourcing for
                other requested imports such as machinery and equipment, with
                door-to-door coordination for the Ethiopian market.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-14 items-center bg-[#eae5dd] rounded-[40px] p-8 lg:p-12">
              <div className="relative rounded-[28px] overflow-hidden aspect-square shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] group">
                <img
                  src="/images/zads-processing-facility.jpg"
                  width="800"
                  height="800"
                  loading="lazy"
                  alt="Agricultural processing machinery at a ZADS facility"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-5">
                <Eyebrow>IMPORT DIVISION / ACTIVE SINCE 2006</Eyebrow>
                <h3 className="text-3xl lg:text-4xl font-medium leading-tight">
                  Start with your requirements.
                </h3>
                <p className="text-[#4d4d4d] text-lg leading-relaxed">
                  We source textiles and fabrics, construction materials, and
                  other requested imports such as machinery and equipment.
                  Tell us your material or product specification, quantity and
                  destination so we can discuss suitable suppliers and delivery.
                </p>
                <p className="text-[#4d4d4d] text-lg leading-relaxed">
                  Pricing, order confirmation, shipping and delivery
                  arrangements are agreed for each sourcing request.
                </p>
                <div className="pt-3">
                  <Button
                    asChild
                    className="rounded-full px-7 py-5 gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Link to="/contact?type=RFQ&product=textiles">
                      Discuss your sourcing needs <ArrowUpRight size={17} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* ===== QUALITY (tinted) ===== */}
      <section className="bg-[#eae5dd] rounded-[48px] py-24 my-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div>
              <Eyebrow>QUALITY, IN PRACTICE</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Every batch.
                <br />
                <em className="font-serif italic font-normal text-[#b45f3b]">Every detail.</em>
              </h2>
            </div>
            <p className="max-w-xs text-[#4f4f4f] text-lg leading-relaxed">
              Eight quality checks support consistency before approval for
              export.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {qualityChecks.map(([title, text], i) => (
              <article
                key={title}
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-7 border border-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)] delay-${i * 60}`}
              >
                <span className="block text-xs font-semibold tracking-[0.1em] text-[#b45f3b] mb-4">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-[#5a5a5a] leading-relaxed text-[0.95rem]">{text}</p>
              </article>
            ))}
          </div>

          {/* documentation panel */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 bg-[#1e1e1e] text-white rounded-[32px] p-9 lg:p-11 mt-14">
            <FileCheck2 size={32} className="text-[#d9b8a4] shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-medium mb-3">
                Documentation to support your shipment.
              </h3>
              <p className="text-[#c6c6c6] leading-relaxed text-lg max-w-3xl">
                Certificates of Analysis, phytosanitary certificates, packing
                lists, invoices and contracts are prepared as part of the export
                workflow. Ask our team about documentation for your selected
                product and destination.
              </p>
            </div>
            <TextLink
              to="/contact"
              className="text-white border-b border-white/40 hover:border-white shrink-0"
            >
              Discuss requirements
            </TextLink>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
