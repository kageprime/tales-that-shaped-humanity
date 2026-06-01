import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { X, Bot, Shield } from "lucide-react";
import { useAuthModal } from "./AuthModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Stories", href: "/stories" },
  { label: "Episodes", href: "/episodes" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openAuth } = useAuthModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/episodes") return location.pathname.startsWith("/episodes");
    if (href === "/stories") return location.pathname.startsWith("/stories");
    return location.pathname === href;
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-400",
          scrolled
            ? "bg-charcoal/[0.97] backdrop-blur-xl shadow-[0_1px_0_rgba(212,168,83,0.15)]"
            : "bg-charcoal"
        )}
      >
        {/* Top editorial accent line */}
        <div className="h-[2px] bg-amber/60" />

        <div className="content-max">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Brand — large editorial serif */}
            <Link
              to="/"
              className="flex items-center gap-1 no-underline group"
            >
              <span className="font-display text-[1.3rem] md:text-[1.75rem] font-semibold tracking-tight text-parchment leading-none">
                Tales That Shaped
              </span>
              <span className="hidden sm:inline font-display text-[1.3rem] md:text-[1.75rem] font-light text-amber leading-none">
                Humanity
              </span>
            </Link>

            {/* Desktop Nav — uppercase, tightly tracked */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "font-ui text-[0.75rem] tracking-[0.15em] uppercase no-underline transition-colors duration-300",
                    isActive(link.href) ? "text-amber" : "text-parchment/80 hover:text-amber"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/chat"
                className={cn(
                  "font-ui text-[0.75rem] tracking-[0.15em] uppercase no-underline transition-colors duration-300 flex items-center gap-1.5",
                  isActive("/chat") ? "text-amber" : "text-parchment/80 hover:text-amber"
                )}
              >
                <Bot size={13} />
                Narrator
              </Link>
              <Link
                to="/admin"
                className={cn(
                  "font-ui text-[0.75rem] tracking-[0.15em] uppercase no-underline transition-colors duration-300 flex items-center gap-1.5",
                  isActive("/admin") ? "text-amber" : "text-parchment/50 hover:text-amber"
                )}
              >
                <Shield size={13} />
                Admin
              </Link>

              <div className="w-px h-5 bg-parchment/15 mx-1" />

              <button
                onClick={() => openAuth("register")}
                className="font-ui font-semibold text-[0.75rem] tracking-[0.12em] uppercase text-charcoal bg-amber px-5 py-2.5 hover:bg-[#E5BE6A] hover:shadow-[0_4px_20px_rgba(212,168,83,0.25)] transition-all duration-300 cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label="Open menu"
            >
              <span className="block w-5 h-[1.5px] bg-parchment" />
              <span className="block w-5 h-[1.5px] bg-parchment" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[200] transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[300px] bg-charcoal/95 backdrop-blur-[20px] p-10 transition-transform duration-400",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 text-parchment hover:text-amber transition-colors bg-transparent border-none cursor-pointer"
          >
            <X size={22} />
          </button>

          <div className="flex flex-col gap-1 mt-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-ui text-[1.4rem] tracking-[0.08em] uppercase py-3 no-underline transition-colors",
                  isActive(link.href) ? "text-amber" : "text-parchment hover:text-amber"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-ui text-[1.4rem] tracking-[0.08em] uppercase py-3 no-underline transition-colors flex items-center gap-3",
                isActive("/chat") ? "text-amber" : "text-parchment hover:text-amber"
              )}
            >
              <Bot size={18} />
              Narrator
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-ui text-[1.4rem] tracking-[0.08em] uppercase py-3 no-underline transition-colors flex items-center gap-3",
                isActive("/admin") ? "text-amber" : "text-parchment/60 hover:text-amber"
              )}
            >
              <Shield size={18} />
              Admin
            </Link>
            <div className="w-full h-px bg-parchment/15 my-6" />
            <button
              onClick={() => { setMobileOpen(false); openAuth("signin"); }}
              className="font-ui text-[1rem] text-parchment/60 py-3 text-left bg-transparent border-none cursor-pointer hover:text-parchment transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => { setMobileOpen(false); openAuth("register"); }}
              className="font-ui font-semibold text-[1rem] text-amber py-3 text-left bg-transparent border-none cursor-pointer tracking-[0.05em]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
