import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { articles } from "../data";
import { PageHero, ContactCTA, Eyebrow } from "../components/common";
import { NotFound } from "./products";

/* ============================================================
   NEWS LIST PAGE
   ============================================================ */
export function News() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="INSIGHTS & COMPANY STORIES"
        title={
          <>
            A closer look
            <br />
            at{" "}
            <em className="font-serif italic font-normal text-[#b45f3b]">
              good trade.
            </em>
          </>
        }
      >
        <p>
          Explore our sourcing regions, quality practices and the journey from
          procurement to shipment.
        </p>
      </PageHero>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <article
              key={a.slug}
              className={`group bg-white rounded-[32px] overflow-hidden border border-black/[0.02] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_50px_-12px_rgba(0,0,0,0.12)] delay-${i * 80}`}
            >
              <Link to={`/news/${a.slug}`} className="block h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eae5dd]">
                  <img
                    src={a.image}
                    width="800"
                    height="800"
                    loading="lazy"
                    alt="Illustrative product still life"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[0.7rem] tracking-[0.12em] uppercase font-semibold text-[#b45f3b] shadow-sm">
                    {a.category}
                  </span>
                </div>

                <div className="p-7 lg:p-8">
                  <h2 className="text-2xl lg:text-[1.75rem] font-medium leading-tight mb-3.5 transition-colors duration-300 group-hover:text-[#b45f3b]">
                    {a.title}
                  </h2>
                  <p className="text-[#5a5a5a] leading-relaxed mb-6">
                    {a.intro}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e1e1e] transition-all duration-300 group-hover:gap-3.5 group-hover:text-[#b45f3b]">
                    Read the story <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm text-[#8a8a8a] italic text-center mt-14 max-w-2xl mx-auto">
          Company guides based on the ZADS profile. Product images are
          illustrative.
        </p>
      </section>

      <ContactCTA />
    </div>
  );
}

/* ============================================================
   ARTICLE DETAIL PAGE
   ============================================================ */
export function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      {/* ===== HEADING ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 pt-14 lg:pt-20 pb-12">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5a5a5a] mb-10 transition-all duration-300 hover:text-[#b45f3b] hover:gap-3"
        >
          <ArrowLeft size={16} />
          All insights
        </Link>

        <div className="max-w-3xl">
          <Eyebrow>{article.category}</Eyebrow>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight my-6">
            {article.title}
          </h1>
          <p className="text-xl lg:text-2xl leading-snug font-medium text-[#3a3a3a]">
            {article.intro}
          </p>
        </div>
      </section>

      {/* ===== BANNER ===== */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="relative rounded-[36px] overflow-hidden aspect-[16/9] lg:aspect-[21/9] bg-[#eae5dd] shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)]">
          <img
            src={article.image}
            width="1400"
            height="600"
            alt="Illustrative agricultural trade product photograph"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ===== BODY ===== */}
      <article className="max-w-[760px] mx-auto px-6 lg:px-8 py-20 lg:py-24">
        {article.paragraphs.map(({ title, text }, i) => (
          <section
            key={title}
            className={`${i !== 0 ? "mt-14 pt-14 border-t border-black/[0.08]" : ""}`}
          >
            <h2 className="text-2xl lg:text-3xl font-medium leading-tight mb-5 flex items-start gap-4">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b45f3b] mt-3 shrink-0" />
              {title}
            </h2>
            <p className="text-[#3a3a3a] text-lg leading-[1.75]">{text}</p>
          </section>
        ))}

        <p className="text-sm text-[#8a8a8a] italic mt-16 pt-8 border-t border-black/[0.08]">
          Source: ZADS PLC company profile and website content guide.
        </p>
      </article>

      <ContactCTA />
    </div>
  );
}