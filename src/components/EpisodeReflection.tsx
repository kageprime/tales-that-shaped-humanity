import { useState, useRef, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface EpisodeReflectionProps {
  prompt: string;
  primaryColor: string;
}

export default function EpisodeReflection({ prompt, primaryColor }: EpisodeReflectionProps) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        ref={iconRef}
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-[40px] text-[0.85rem] font-ui transition-all duration-300 cursor-pointer border-none group"
        style={{
          backgroundColor: `${primaryColor}15`,
          color: primaryColor,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${primaryColor}25`; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${primaryColor}15`; }}
      >
        <Sparkles size={14} className="transition-transform duration-300 group-hover:scale-110" />
        Reflect
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[500px] p-0 bg-transparent border-none shadow-none"
          onInteractOutside={() => setOpen(false)}
        >
          <div
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}08 100%)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${primaryColor}30`,
            }}
          >
            <DialogClose
              className="absolute top-4 right-4 p-1.5 rounded-full bg-parchment/10 text-parchment/60 hover:text-parchment transition-colors cursor-pointer border-none"
            >
              <X size={16} />
            </DialogClose>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: `${primaryColor}25` }}
            >
              <Sparkles size={18} style={{ color: primaryColor }} />
            </div>

            <p
              className="font-display text-[1.3rem] md:text-[1.5rem] leading-[1.5] text-parchment/90"
            >
              &ldquo;{prompt}&rdquo;
            </p>

            <p className="font-body text-[0.9rem] text-parchment/40 mt-6 italic">
              Take a moment. Sit with the question.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
