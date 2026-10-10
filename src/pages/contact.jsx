import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Download,
  Check,
  Copy,
} from "lucide-react";
import { PageHero, Eyebrow } from "../components/common";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { company, products } from "../data";

const labels = {
  EN: {
    type: "Enquiry type",
    company: "Company name",
    name: "Full name",
    email: "Email address",
    phone: "Phone (optional)",
    country: "Country",
    product: "Product of interest",
    quantity: "Quantity",
    packaging: "Packaging preference",
    incoterm: "Incoterm",
    date: "Preferred shipment date",
    method: "Preferred contact method",
    message: "Tell us about your requirements",
    consent:
      "I agree to share these details with ZADS PLC to discuss my enquiry.",
    submit: "Prepare my enquiry",
  },
  AM: {
    type: "የጥያቄ አይነት",
    company: "የድርጅት ስም",
    name: "ሙሉ ስም",
    email: "የኢሜይል አድራሻ",
    phone: "ስልክ (አማራጭ)",
    country: "አገር",
    product: "የሚፈለገው ምርት",
    quantity: "መጠን",
    packaging: "የማሸጊያ ምርጫ",
    incoterm: "የንግድ ውል መስፈርት",
    date: "የሚፈለገው የጭነት ቀን",
    method: "የመገናኛ ምርጫ",
    message: "የሚፈልጉትን ያብራሩ",
    consent: "ስለ ጥያቄዬ ለመወያየት መረጃዬን ለZADS PLC ለማጋራት እስማማለሁ።",
    submit: "ጥያቄዬን አዘጋጅ",
  },
};

const inputBase =
  "w-full px-5 py-3.5 bg-white border border-black/[0.08] rounded-2xl text-base text-[#1e1e1e] placeholder:text-[#9a9a9a] shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 focus:outline-none focus:border-[#b45f3b]/50 focus:shadow-[0_8px_24px_-6px_rgba(180,95,59,0.15)] focus:ring-4 focus:ring-[#b45f3b]/5";

const labelBase =
  "block text-sm font-medium text-[#3a3a3a] space-y-2.5 [&>span[aria-hidden]]:text-[#b45f3b]";

export default function Contact() {
  const [params] = useSearchParams();
  const selected = products.find((p) => p.slug === params.get("product"));
  const [lang, setLang] = useState("EN");
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);

  const t = labels[lang];
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function prepare(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const reference = `ZADS-INQ-${minDate.replaceAll("-", "")}-${Array.from(
      crypto.getRandomValues(new Uint8Array(2)),
    )
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;

    const fields = [
      ["Enquiry type", data.type],
      ["Company", data.company],
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Country", data.country],
      ["Product", data.product],
      ["Quantity", data.quantity],
      ["Packaging", data.packaging],
      ["Incoterm", data.incoterm],
      ["Shipment date", data.date],
      ["Preferred contact", data.method],
      ["Language", lang],
      ["Message", data.message],
    ];

    const body = `Enquiry reference: ${reference}\n\n${fields
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}\n\nConsent: I agree to be contacted about this enquiry.`;

    setDraft({
      reference,
      body,
      subject: `${reference} — ${data.product || "General enquiry"}`,
    });
    setCopied(false);
  }

  function download() {
    const blob = new Blob([draft.body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.reference}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased overflow-x-hidden">
      <PageHero
        eyebrow="CONTACT / REQUEST A QUOTATION"
        title={
          <>
            Good partnerships
            <br />
            start with{" "}
            <em className="font-serif italic font-normal text-[#b45f3b]">
              a conversation.
            </em>
          </>
        }
      >
        <p>
          Tell us about the products you need, where they're going and what
          matters to your business.
        </p>
      </PageHero>

      <section className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">
        {/* ===== ASIDE ===== */}
        <aside className="space-y-7 lg:sticky lg:top-24">
          <Eyebrow>DIRECT CONNECTION</Eyebrow>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
            Let's talk
            <br />
            <em className="font-serif italic font-normal text-[#b45f3b]">
              possibilities.
            </em>
          </h2>

          <a
            href={`mailto:${company.email}`}
            className="group flex items-center gap-5 bg-white rounded-[24px] p-6 border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.1)]"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#eae5dd] text-[#b45f3b] shrink-0 transition-colors duration-300 group-hover:bg-[#b45f3b] group-hover:text-white">
              <Mail size={21} />
            </span>
            <span className="flex-1 min-w-0">
              <small className="block text-[0.65rem] tracking-[0.14em] uppercase font-semibold text-[#8a8a8a] mb-1.5">
                EMAIL OUR TEAM
              </small>
              <span className="block text-base font-medium truncate">
                {company.email}
              </span>
            </span>
            <ArrowUpRight
              size={17}
              className="text-[#8a8a8a] shrink-0 transition-all duration-300 group-hover:text-[#b45f3b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex items-start gap-5 bg-white rounded-[24px] p-6 border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#eae5dd] text-[#b45f3b] shrink-0">
              <MapPin size={22} />
            </span>
            <span className="flex-1">
              <small className="block text-[0.65rem] tracking-[0.14em] uppercase font-semibold text-[#8a8a8a] mb-1.5">
                FIND US IN ETHIOPIA
              </small>
              <span className="block text-base font-medium leading-relaxed">
                Labu Haile Garment
                <br />
                Addis Ababa, Ethiopia
              </span>
            </span>
          </div>

          <div className="bg-[#1e1e1e] text-white rounded-[24px] p-7">
            <h3 className="text-xl font-medium mb-3">
              Planning an agricultural export?
            </h3>
            <p className="text-[#c6c6c6] leading-relaxed">
              Our minimum order is 2 containers / 45,000 kg. Pricing, grades and
              availability are confirmed individually.
            </p>
          </div>

          <p className="text-sm text-[#8a8a8a] leading-relaxed italic">
            This form prepares an email draft. Review it, then open your email
            app to send it to our team. No enquiry is submitted automatically.
          </p>
        </aside>

        {/* ===== FORM PANEL ===== */}
        <div className="bg-white rounded-[36px] p-8 sm:p-10 lg:p-12 border border-black/[0.04] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-9">
            <h2 className="text-3xl lg:text-4xl font-medium leading-tight">
              Your enquiry
            </h2>
            <div
              className="inline-flex items-center bg-[#eae5dd] rounded-full p-1"
              aria-label="Form language"
            >
              <button
                type="button"
                aria-pressed={lang === "EN"}
                onClick={() => setLang("EN")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  lang === "EN"
                    ? "bg-[#1e1e1e] text-white shadow-sm"
                    : "text-[#5a5a5a] hover:text-[#1e1e1e]"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={lang === "AM"}
                onClick={() => setLang("AM")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  lang === "AM"
                    ? "bg-[#1e1e1e] text-white shadow-sm"
                    : "text-[#5a5a5a] hover:text-[#1e1e1e]"
                }`}
              >
                አማ
              </button>
            </div>
          </div>

          <form onSubmit={prepare} lang={lang === "AM" ? "am" : "en"}>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
              <label className={labelBase}>
                {t.type}
                <select
                  name="type"
                  defaultValue={params.get("type") === "RFQ" ? "RFQ" : "General"}
                  className={inputBase}
                >
                  <option value="General">General enquiry</option>
                  <option value="RFQ">Request for quotation</option>
                  <option value="Import sourcing">Import sourcing</option>
                </select>
              </label>

              <label className={labelBase}>
                {t.product}
                <select
                  name="product"
                  defaultValue={selected?.name || ""}
                  className={inputBase}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.slug}>{p.name}</option>
                  ))}
                  <option>Other / not sure yet</option>
                </select>
              </label>

              <label className={labelBase}>
                {t.company}
                <input
                  name="company"
                  autoComplete="organization"
                  maxLength={120}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.name} <span aria-hidden="true">*</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.email} <span aria-hidden="true">*</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={180}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.phone}
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.country} <span aria-hidden="true">*</span>
                <input
                  name="country"
                  autoComplete="country-name"
                  required
                  maxLength={80}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.quantity}
                <input
                  name="quantity"
                  placeholder="e.g. 2 containers / 45,000 kg"
                  maxLength={80}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.packaging}
                <input
                  name="packaging"
                  placeholder="Tell us your preferred format"
                  maxLength={120}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.incoterm}
                <select name="incoterm" className={inputBase}>
                  <option value="">Discuss with our team</option>
                  <option>FOB</option>
                  <option>CIF</option>
                  <option>CFR</option>
                  <option>EXW</option>
                  <option>FCA</option>
                  <option>Other</option>
                </select>
              </label>

              <label className={labelBase}>
                {t.date}
                <input
                  name="date"
                  type="date"
                  min={minDate}
                  className={inputBase}
                />
              </label>

              <label className={labelBase}>
                {t.method}
                <select name="method" className={inputBase}>
                  <option>Email</option>
                  <option>Phone</option>
                </select>
              </label>
            </div>

            <label className={`${labelBase} mt-5`}>
              {t.message}
              <textarea
                name="message"
                rows={5}
                maxLength={1500}
                placeholder="Product specifications, destination, timing, or anything else we should know…"
                className={`${inputBase} resize-y min-h-[140px] leading-relaxed`}
              />
            </label>

            <label className="flex items-start gap-3.5 mt-7 cursor-pointer">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 w-5 h-5 rounded-md border-black/20 text-[#b45f3b] accent-[#b45f3b] shrink-0 cursor-pointer"
              />
              <span className="text-sm leading-relaxed text-[#4d4d4d]">
                {t.consent}{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#b45f3b] border-b border-[#b45f3b]/40 transition-colors hover:border-[#b45f3b]"
                >
                  Privacy information
                </a>
              </span>
            </label>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-base gap-3 transition-all duration-300 hover:gap-4 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t.submit}
                <ArrowUpRight size={17} />
              </Button>
            </div>

            <p className="text-xs text-[#8a8a8a] mt-5 leading-relaxed">
              * Required fields. Your draft stays in this page until you choose
              to email or download it.
            </p>
          </form>
        </div>
      </section>

      {/* ===== SUCCESS DIALOG ===== */}
      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-w-lg">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#e7f0e0] text-[#5f8b4b] mb-6">
            <Check size={26} />
          </span>
          <DialogTitle className="font-display text-3xl font-semibold tracking-tight">
            Your enquiry is ready.
          </DialogTitle>
          <DialogDescription className="my-4 text-sm leading-7 text-stone-600">
            Your draft has not been sent. Open your email application to review
            and send it, or download a copy to attach to an email.
          </DialogDescription>

          {draft && (
            <>
              <div className="bg-[#faf8f5] rounded-2xl p-5 border border-black/[0.06] my-4">
                <span className="block text-[0.65rem] tracking-[0.14em] uppercase font-semibold text-[#8a8a8a] mb-2">
                  DRAFT REFERENCE
                </span>
                <b className="block text-base font-mono text-[#1e1e1e] break-all">
                  {draft.reference}
                </b>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  asChild
                  className="rounded-full flex-1 gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <a
                    href={`mailto:${company.email}?cc=surafel5711%40gmail.com&subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}
                  >
                    Open email app <Mail size={17} />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={download}
                  className="rounded-full flex-1 gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Download draft <Download size={17} />
                </Button>
              </div>

              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draft.body);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-[#5a5a5a] transition-colors duration-300 hover:text-[#b45f3b]"
              >
                <Copy size={15} />
                {copied ? "Copied to clipboard" : "Copy enquiry text"}
              </button>

              <p className="text-xs leading-6 text-stone-500 mt-5">
                If no email app opens, download the draft and email it to{" "}
                <span className="font-medium text-[#1e1e1e]">
                  {company.email}
                </span>
                .
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}