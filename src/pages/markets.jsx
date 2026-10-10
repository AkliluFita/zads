import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Eyebrow, ContactCTA } from "../components/common";
import { milestones } from "../data";

const events = milestones
  .filter((m) => typeof m.year === "number")
  .map((m) => ({ ...m, lane: 1 }));

export default function Markets() {
  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="MARKETS & EXPORT HISTORY"
        title={
          <>
            Rooted in Ethiopia.
            <br />
            Open to{" "}
            <em className="font-serif italic font-normal text-[#b45f3b]">
              the world.
            </em>
          </>
        }
      >
        <p>
          Our trade relationships connect Ethiopian agricultural products with
          buyers in Middle Asia and Southern Europe, and local businesses with
          suppliers in Eastern Asia.
        </p>
      </PageHero>

      {/* ===== REGION CARDS ===== */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[
            [
              "01",
              "Middle Asia",
              "Export markets",
              "Sesame, beans and oils for international buyers.",
            ],
            [
              "02",
              "Southern Europe",
              "Export markets",
              "A growing market for traceable Ethiopian commodities.",
            ],
            [
              "03",
              "Eastern Asia",
              "Import sourcing",
              "Supplier relationships for textiles and construction materials.",
            ],
          ].map(([n, title, type, text], i) => (
            <article
              key={n}
              className={`group bg-white rounded-[32px] p-9 lg:p-10 border border-black/[0.02] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_50px_-12px_rgba(0,0,0,0.12)] delay-${i * 100}`}
            >
              <span className="inline-block text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-[#b45f3b] mb-6">
                {n} / {type}
              </span>
              <h2 className="text-3xl lg:text-4xl font-medium leading-tight mb-4">
                {title}
              </h2>
              <p className="text-[#5a5a5a] text-lg leading-relaxed mb-8">
                {text}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-medium text-[#1e1e1e] border-b border-transparent pb-0.5 transition-all duration-300 group-hover:gap-3.5 group-hover:border-[#b45f3b] group-hover:text-[#b45f3b]"
              >
                Discuss a trade enquiry <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm text-[#8a8a8a] mt-8 italic text-center max-w-2xl mx-auto">
          Looking for delivery to a particular country? Contact our team to
          confirm destination-specific arrangements.
        </p>
      </section>

      {/* ===== TIMELINE / CHART (tinted) ===== */}
      <section className="bg-[#eae5dd] rounded-[48px] py-24 my-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <Eyebrow>A TIMELINE OF CONNECTION</Eyebrow>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            Milestones in
            <br />
            <em className="font-serif italic font-normal text-[#b45f3b]">
              our trade journey.
            </em>
          </h2>
          <p className="text-[#5a5a5a] text-lg leading-relaxed mt-6 max-w-2xl">
            Established dates from the ZADS company profile. This timeline shows
            milestones, not sales or shipment volumes.
          </p>

          {/* chart */}
          <div
            className="bg-white/70 backdrop-blur-sm rounded-[32px] p-6 lg:p-10 mt-12 border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
            aria-hidden="true"
          >
            <ResponsiveContainer width="100%" height={190}>
              <ScatterChart
                margin={{ top: 30, right: 35, bottom: 20, left: 35 }}
              >
                <CartesianGrid
                  vertical
                  horizontal={false}
                  stroke="#d9d4c7"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="year"
                  type="number"
                  domain={[2005, 2024]}
                  ticks={[2006, 2022, 2023]}
                  tick={{ fill: "#5c655a", fontSize: 12, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: "#bfc3b8" }}
                />
                <YAxis dataKey="lane" type="number" hide domain={[0, 2]} />
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-[#1e1e1e] text-white rounded-xl px-4 py-3 shadow-xl text-sm">
                        <b className="block text-[#d9b8a4] mb-1">
                          {payload[0].payload.year}
                        </b>
                        <p className="font-medium">
                          {payload[0].payload.title}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Scatter
                  data={events}
                  fill="#b45f3b"
                  shape="circle"
                  isAnimationActive={false}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* history list */}
          <div className="divide-y divide-black/[0.08] border-y border-black/[0.08] mt-14">
            {milestones.map((m, i) => (
              <article
                key={m.year}
                className={`group grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-9 items-start transition-all duration-300 hover:bg-white/60 hover:px-4 hover:rounded-2xl delay-${i * 60}`}
              >
                <b className="text-3xl lg:text-4xl font-medium tracking-tight text-[#b45f3b]">
                  {m.year}
                </b>
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium mb-2.5">
                    {m.title}
                  </h3>
                  <p className="text-[#4d4d4d] text-lg leading-relaxed max-w-3xl">
                    {m.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}