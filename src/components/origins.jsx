import { useState } from "react";
import { MapPin } from "lucide-react";

const regions = [
  { name: "Humera", text: "Premium sesame sourcing region.", x: 131, y: 65 },
  {
    name: "Metema",
    text: "Sesame sourcing and a cross-border trade route.",
    x: 115,
    y: 127,
  },
  {
    name: "Wollega",
    text: "Beans and mixed agricultural commodities.",
    x: 166,
    y: 202,
  },
];

export default function Origins() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      {/* ===== LEFT: COPY & OPTIONS ===== */}
      <div>
        <p className="inline-flex items-center gap-2.5 text-[0.72rem] tracking-[0.16em] uppercase font-semibold text-[#6e6e6e] mb-5">
          ROOTED IN ETHIOPIA
        </p>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
          Good things
          <br />
          grow{" "}
          <em className="font-serif italic font-normal text-[#b45f3b]">
            here.
          </em>
        </h2>

        <p className="text-[#4d4d4d] text-lg leading-relaxed mt-7 max-w-lg">
          Our supplier relationships in Humera, Wollega and Metema have been in
          place since 2022 G.C. (2015 E.C.).
        </p>

        {/* region options */}
        <div className="flex flex-col gap-3.5 mt-10">
          {regions.map((r, i) => {
            const isActive = active === i;

            return (
              <button
                key={r.name}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group relative w-full flex items-center gap-4 text-left px-5 py-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-white border-[#b45f3b]/30 shadow-[0_12px_28px_-10px_rgba(180,95,59,0.25)] translate-x-1"
                    : "bg-white/50 border-black/[0.06] hover:bg-white hover:border-black/[0.1] hover:translate-x-0.5"
                }`}
              >
                {/* map pin icon */}
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "bg-[#b45f3b] text-white"
                      : "bg-[#eae5dd] text-[#8a7e6e] group-hover:bg-[#b45f3b]/10"
                  }`}
                >
                  <MapPin size={17} />
                </span>

                {/* text */}
                <span className="flex-1 min-w-0">
                  <strong
                    className={`block text-base font-semibold mb-1 transition-colors duration-300 ${
                      isActive ? "text-[#b45f3b]" : "text-[#1e1e1e]"
                    }`}
                  >
                    {r.name}
                  </strong>
                  <small className="block text-sm text-[#6e6e6e] leading-snug">
                    {r.text}
                  </small>
                </span>

                {/* number */}
                <span
                  className={`text-[0.7rem] font-semibold tracking-[0.12em] shrink-0 transition-colors duration-300 ${
                    isActive ? "text-[#b45f3b]" : "text-[#b0b0b0]"
                  }`}
                >
                  0{i + 1}
                </span>

                {/* active left bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[#b45f3b] transition-all duration-300 ${
                    isActive ? "h-8 opacity-100" : "h-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== RIGHT: MAP ===== */}
      <div className="relative bg-white rounded-[36px] p-6 lg:p-8 border border-black/[0.04] shadow-[0_20px_35px_-8px_rgba(0,0,0,0.08)]">
        <div className="relative w-full aspect-[470/360] rounded-2xl overflow-hidden bg-[#faf8f5]">
          <svg
            viewBox="0 0 470 360"
            aria-label="Schematic map of Ethiopian sourcing regions"
            role="img"
            className="w-full h-full text-[#1e1e1e]"
          >
            <defs>
              <pattern
                id="mapgrid"
                width="26"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M26 0H0V26"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity=".05"
                />
              </pattern>
            </defs>

            <rect width="470" height="360" fill="url(#mapgrid)" />

            {/* Ethiopia silhouette */}
            <path
              d="M137 35 176 43 213 29 242 62 271 63 296 98 333 109 350 149 414 181 387 228 342 263 318 296 274 314 228 294 188 299 159 270 124 254 105 219 79 189 98 146 92 120 118 91Z"
              fill="#e5dfcf"
              stroke="#b9af99"
              strokeWidth="1.5"
            />

            {/* region pins */}
            {regions.map((r, i) => {
              const isActive = active === i;

              return (
                <g
                  key={r.name}
                  className="cursor-pointer transition-opacity duration-300"
                  onClick={() => setActive(i)}
                  style={{ opacity: isActive ? 1 : 0.85 }}
                >
                  {/* halo */}
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r={isActive ? 14 : 9}
                    fill={isActive ? "#b45f3b" : "#ba702b"}
                    opacity=".15"
                    className="transition-all duration-300"
                  />

                  {/* dot */}
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r="4"
                    fill={isActive ? "#b45f3b" : "#ba702b"}
                    className="transition-colors duration-300"
                  />

                  {/* label */}
                  <text
                    x={r.x + 19}
                    y={r.y + 4}
                    fontSize="12"
                    fill={isActive ? "#b45f3b" : "#343b32"}
                    fontWeight={isActive ? 600 : 400}
                    className="transition-colors duration-300"
                  >
                    {r.name}
                  </text>
                </g>
              );
            })}

            {/* country label */}
            <text
              x="267"
              y="200"
              textAnchor="middle"
              fontSize="12"
              letterSpacing="4"
              fill="#8d887a"
            >
              ETHIOPIA
            </text>

            {/* Addis Ababa marker */}
            <circle cx="229" cy="230" r="3" fill="#777568" />
            <text x="239" y="234" fontSize="9" fill="#777568">
              Addis Ababa
            </text>
          </svg>
        </div>

        {/* map footer */}
        <div className="flex items-center justify-between mt-6 px-1 text-[0.7rem] tracking-[0.14em] uppercase font-semibold text-[#8a8a8a]">
          <span>03 SOURCING REGIONS</span>
          <span className="text-[#b0b0b0]">Schematic · not to scale</span>
        </div>
      </div>
    </div>
  );
}