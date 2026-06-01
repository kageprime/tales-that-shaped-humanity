import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

interface AuthModalContextType {
  openAuth: (mode?: "signin" | "register") => void;
  closeAuth: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be inside AuthModalProvider");
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "register">("signin");

  const openAuth = useCallback((m: "signin" | "register" = "signin") => {
    setMode(m);
    setOpen(true);
  }, []);
  const closeAuth = useCallback(() => setOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      {open && <AuthModal mode={mode} onClose={closeAuth} onToggle={() => setMode(m => m === "signin" ? "register" : "signin")} />}
    </AuthModalContext.Provider>
  );
}

function AuthModal({
  mode,
  onClose,
  onToggle,
}: {
  mode: "signin" | "register";
  onClose: () => void;
  onToggle: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!name.trim()) { setError("Name is required"); return; }
      if (password !== confirmPassword) { setError("Passwords do not match"); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate success - in real app would call tRPC auth.register/auth.login
      onClose();
    }, 800);
  };

  const isSignIn = mode === "signin";

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-lg" />
      <div
        className="relative w-full max-w-[420px] mx-6 bg-parchment rounded-2xl p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-5 duration-400"
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-cream flex items-center justify-center text-slate hover:bg-mist transition-colors bg-transparent border-none cursor-pointer"
        >
          <X size={16} />
        </button>

        <h2 className="font-display text-[2rem] text-charcoal">
          {isSignIn ? "Welcome Back" : "Begin Your Journey"}
        </h2>
        <p className="font-ui font-light text-[0.95rem] text-slate mt-1">
          {isSignIn ? "Sign in to continue reading" : "Create your account to get started"}
        </p>

        {/* Google OAuth */}
        <button className="w-full mt-6 flex items-center justify-center gap-3 bg-ivory border-[1.5px] border-mist rounded-lg py-3 px-4 font-ui font-medium text-[0.95rem] text-charcoal hover:border-slate transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* GitHub OAuth */}
        <button className="w-full mt-3 flex items-center justify-center gap-3 bg-ivory border-[1.5px] border-mist rounded-lg py-3 px-4 font-ui font-medium text-[0.95rem] text-charcoal hover:border-slate transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-mist" />
          <span className="font-ui text-[0.8rem] text-slate">or</span>
          <div className="flex-1 h-[1px] bg-mist" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isSignIn && (
            <div>
              <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {!isSignIn && (
            <div>
              <label className="block font-ui font-medium text-[0.85rem] text-charcoal mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-warm-cream border-[1.5px] border-mist rounded-lg px-4 py-3 font-ui text-[1rem] text-charcoal focus:border-amber focus:shadow-[0_0_0_3px_rgba(212,168,83,0.15)] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <p className="font-ui text-[0.85rem] text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber text-charcoal font-ui font-semibold text-[0.95rem] py-3 rounded-[40px] hover:bg-[#E5BE6A] hover:shadow-[0_4px_20px_rgba(212,168,83,0.3)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Get Started"}
          </button>
        </form>

        <p className="text-center font-ui text-[0.9rem] text-slate mt-5">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={onToggle}
            className="text-amber font-medium bg-transparent border-none cursor-pointer hover:underline"
          >
            {isSignIn ? "Get Started" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
