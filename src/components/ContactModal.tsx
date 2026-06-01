import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X, Check, MessageSquare } from "lucide-react";

interface ContactModalContextType {
  openContact: () => void;
  closeContact: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be inside ContactModalProvider");
  return ctx;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openContact, closeContact }}>
      {children}
      {open && <ContactModal onClose={closeContact} />}
    </ContactModalContext.Provider>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!subject.trim()) e.subject = "Subject is required";
    if (!message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-lg" />
      <div
        className="relative w-full max-w-[520px] mx-6 bg-parchment rounded-2xl p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-5 duration-400"
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-cream flex items-center justify-center text-slate hover:bg-mist transition-colors bg-transparent border-none cursor-pointer"
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center">
                <MessageSquare size={20} className="text-amber" />
              </div>
              <h2 className="font-display text-[2rem] text-charcoal">Get in Touch</h2>
            </div>
            <p className="font-ui font-light text-[0.95rem] text-slate">
              We'd love to hear from you
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
              <div>
                <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                  Name <span className="text-amber">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => { if (!name.trim()) setErrors(p => ({ ...p, name: "Name is required" })); else setErrors(p => { const n = { ...p }; delete n.name; return n; }); }}
                  className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
                  placeholder="Your name"
                />
                {errors.name && <p className="font-ui text-[0.8rem] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                  Email <span className="text-amber">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="font-ui text-[0.8rem] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                  Subject <span className="text-amber">*</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Share a Story Idea</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                  Message <span className="text-amber">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all resize-y"
                  placeholder="Your message..."
                />
                {errors.message && <p className="font-ui text-[0.8rem] text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-amber text-charcoal font-ui font-semibold text-[0.95rem] py-3 rounded-[40px] hover:bg-[#E5BE6A] hover:shadow-[0_4px_20px_rgba(212,168,83,0.3)] transition-all duration-300 mt-2 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check size={24} className="text-green-600" />
            </div>
            <h3 className="font-display text-[1.4rem] text-charcoal">
              Thank you!
            </h3>
            <p className="font-ui font-light text-[0.95rem] text-slate mt-2">
              Your message has been sent.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-amber text-charcoal font-ui font-semibold text-[0.95rem] py-2 px-6 rounded-[40px] hover:bg-[#E5BE6A] transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
