import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { company } from "../data";

const nav = [
  ["About", "/about"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Markets", "/export-history"],
  ["Insights", "/news"],
];

/* ============================================================
   BRAND
   ============================================================ */
export function Brand({ footer = false }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3 shrink-0"
      aria-label="ZADS PLC home"
    >
      <img
        src="/zads-logo.png"
        alt=""
        width="64"
        height="64"
        className={`rounded-xl transition-transform duration-300 group-hover:scale-105 ${
          footer ? "w-12 h-12" : "w-11 h-11"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-semibold tracking-tight ${
            footer ? "text-xl text-white" : "text-xl text-[#1e1e1e]"
          }`}
        >
          ZADS <b className="font-bold">PLC</b>
        </span>
        <small
          className={`text-[0.58rem] tracking-[0.14em] uppercase font-medium mt-1 ${
            footer ? "text-white/50" : "text-[#8a8a8a]"
          }`}
        >
          IMPORT · EXPORT · TRADE
        </small>
      </span>
    </Link>
  );
}

/* ============================================================
   LAYOUT
   ============================================================ */
export function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="bg-[#faf8f5] text-[#1e1e1e] antialiased min-h-screen flex flex-col">
      {/* skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[#1e1e1e] focus:text-white focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/85 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 h-[76px] flex items-center justify-between gap-6">
          <Brand />

          {/* desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {nav.map(([name, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[0.95rem] font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-[#b45f3b]"
                      : "text-[#3a3a3a] hover:text-[#1e1e1e] hover:bg-black/[0.04]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {name}
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1 h-1 rounded-full bg-[#b45f3b]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* header quote button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="rounded-full px-6 py-3 text-sm gap-2.5 transition-all duration-300 hover:gap-3.5 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link to="/contact">
                Request a quote <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>

          {/* mobile menu */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white border border-black/[0.08] text-[#1e1e1e] transition-all duration-300 hover:bg-[#1e1e1e] hover:text-white"
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogTitle className="font-display text-2xl font-bold">
                Explore ZADS
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-stone-500">
                Ethiopian origins. Global connections.
              </DialogDescription>

              <nav
                className="flex flex-col gap-1.5 mt-7"
                aria-label="Mobile navigation"
              >
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="px-5 py-4 rounded-2xl text-lg font-medium text-[#1e1e1e] transition-all duration-300 hover:bg-[#eae5dd] hover:translate-x-1"
                >
                  Home
                </Link>
                {nav.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className="px-5 py-4 rounded-2xl text-lg font-medium text-[#1e1e1e] transition-all duration-300 hover:bg-[#eae5dd] hover:translate-x-1"
                  >
                    {name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="px-5 py-4 mt-3 rounded-2xl text-lg font-semibold bg-[#1e1e1e] text-white text-center transition-all duration-300 hover:bg-[#b45f3b]"
                >
                  Contact / Request a quote
                </Link>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main id="main" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-[#1e1e1e] text-white mt-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-12 lg:gap-20 py-20">
        {/* brand column */}
        <div>
          <Brand footer />
          <p className="mt-7 text-lg leading-relaxed text-[#c6c6c6]">
            Connecting Ethiopian agricultural
            <br />
            excellence to global markets.
          </p>
          <p className="mt-5 text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-[#d9b8a4]">
            Integrity. Quality. Reliability.
          </p>
        </div>

        {/* explore column */}
        <div>
          <h2 className="text-[0.72rem] tracking-[0.18em] uppercase font-semibold text-white/50 mb-6">
            Explore
          </h2>
          <div className="flex flex-col gap-3.5">
            {nav.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className="text-[#c6c6c6] transition-all duration-300 hover:text-white hover:translate-x-1 w-fit"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* contact column */}
        <div>
          <h2 className="text-[0.72rem] tracking-[0.18em] uppercase font-semibold text-white/50 mb-6">
            Let's talk
          </h2>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex items-center gap-2.5 text-[#c6c6c6] transition-all duration-300 hover:text-white hover:gap-3.5"
          >
            <Mail size={15} className="shrink-0" />
            <span className="break-all">{company.email}</span>
          </a>

          <p className="flex items-start gap-2.5 mt-5 text-[#c6c6c6] leading-relaxed">
            <MapPin size={17} className="shrink-0 mt-0.5" />
            <span>
              Labu Haile Garment
              <br />
              Addis Ababa, Ethiopia
            </span>
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-full bg-white/[0.08] border border-white/[0.1] text-sm font-medium text-white transition-all duration-300 hover:gap-3.5 hover:bg-white hover:text-[#1e1e1e]"
          >
            Make an enquiry <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-white/50">
          <span>© {new Date().getFullYear()} ZADS PLC</span>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
            <Link
              to="/shipping"
              className="transition-colors duration-300 hover:text-white"
            >
              Shipping information
            </Link>
          </div>

          <span className="text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-[#d9b8a4]">
            MADE FOR CONNECTION
          </span>
        </div>
      </div>
    </footer>
  );
}