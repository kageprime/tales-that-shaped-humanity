import { useRef, useEffect } from "react";
import { Link } from "react-router";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const updateHeight = () => {
      document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(footer);
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-dusk py-6" style={{ marginTop: "auto" }}>
      <div className="content-max flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-ui text-[0.85rem] text-parchment/50 no-underline hover:text-parchment/80 transition-colors">
          Tales That Shaped Humanity
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/about" className="font-ui text-[0.8rem] text-parchment/40 no-underline hover:text-parchment/70 transition-colors">
            About
          </Link>
          <Link to="/stories" className="font-ui text-[0.8rem] text-parchment/40 no-underline hover:text-parchment/70 transition-colors">
            Stories
          </Link>
          <Link to="/episodes" className="font-ui text-[0.8rem] text-parchment/40 no-underline hover:text-parchment/70 transition-colors">
            Episodes
          </Link>
        </nav>
        <span className="font-ui text-[0.75rem] text-parchment/30">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
