import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import {
  Send,
  Bot,
  User,
  Trash2,
  Plus,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const SYSTEM_RESPONSES: Record<string, string> = {
  default:
    "That's a wonderful question about these timeless stories! The biblical narratives have layers of meaning that unfold differently for each reader. Would you like to explore a specific story in more detail, or discuss the broader themes that connect them all?",
  creation:
    "The Creation story speaks to the fundamental human question of origins. In the Classic telling, we see the majesty of divine order — light from darkness, sky from water, life from dust. The Modern lens invites us to see the Creator as the original artist, crafting with joy and precision. And for children, it becomes a celebration of wonder — the world as God's magnificent gift.",
  noah:
    "Noah's Ark is one of humanity's most beloved narratives. At its heart, it's a story about faith in the face of ridicule — building something meaningful even when no one else understands. The flood represents both destruction and renewal, teaching us that endings often precede new beginnings. The rainbow remains one of the most powerful symbols of hope in all of literature.",
  jonah:
    "Jonah's story resonates with anyone who has ever tried to run from their calling. Three days in the belly of the fish becomes a metaphor for those dark periods in life when we're forced to confront what we've been avoiding. The Modern retelling captures this beautifully — sometimes life puts us in timeout so we can finally hear what matters. And the twist — that God shows mercy to Nineveh — challenges our assumptions about who deserves compassion.",
  david:
    "David and Goliath is the ultimate underdog story that transcends its origins. The young shepherd boy with a sling against a seasoned warrior with armor and sword — it shouldn't work, but it does. The key insight is that David refused to fight on Goliath's terms. He used his own strengths rather than trying to match his opponent's. That's a lesson for every challenge we face.",
  nativity:
    "The Nativity story carries profound simplicity. The Creator of the universe entering human history not in a palace but in a stable — there's something deeply moving about that humility. Shepherds (the working class) and Magi (the educated elite) as the first visitors shows that this event was for everyone, across every social boundary.",
  resurrection:
    "The Resurrection is the cornerstone of hope in the biblical narrative. After the darkest day — the crucifixion and burial — comes the dawn that changes everything. The empty tomb isn't just a miracle; it's an invitation to believe in transformation. Mary Magdalene's journey from grief to joy mirrors the experience of anyone who has found hope after loss.",
  hello:
    "Hello! I'm your AI Narrator, here to help you explore the timeless stories of the Bible. Whether you're curious about a specific character, want to understand the historical context, or are looking for how these ancient tales connect to modern life — I'm here to guide you. What would you like to discover?",
  help:
    "I can help you in many ways! Ask me about any of the six stories — The Creation, Noah's Ark, Jonah and the Whale, David and Goliath, The Nativity, or The Resurrection. I can discuss themes, characters, historical context, or the differences between the Classic, Modern, and Kids perspectives. What sparks your curiosity?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("creation") || lower.includes("beginning"))
    return SYSTEM_RESPONSES.creation;
  if (lower.includes("noah") || lower.includes("ark") || lower.includes("flood"))
    return SYSTEM_RESPONSES.noah;
  if (lower.includes("jonah") || lower.includes("whale") || lower.includes("fish"))
    return SYSTEM_RESPONSES.jonah;
  if (lower.includes("david") || lower.includes("goliath") || lower.includes("sling"))
    return SYSTEM_RESPONSES.david;
  if (lower.includes("nativity") || lower.includes("christmas") || lower.includes("jesus"))
    return SYSTEM_RESPONSES.nativity;
  if (lower.includes("resurrection") || lower.includes("easter") || lower.includes("tomb"))
    return SYSTEM_RESPONSES.resurrection;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return SYSTEM_RESPONSES.hello;
  if (lower.includes("help"))
    return SYSTEM_RESPONSES.help;
  return SYSTEM_RESPONSES.default;
}

export default function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: "default",
      title: "Bible Stories Guide",
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Welcome! I'm your AI Narrator — here to help you explore the Bible's most powerful stories. Ask me about any story, theme, or character, and I'll share insights from our three perspectives: Classic, Modern, and For Kids. What would you like to explore?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const [activeThreadId, setActiveThreadId] = useState("default");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeThread.messages, isTyping, scrollToBottom]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, userMsg] }
          : t
      )
    );
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(userMsg.content);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, assistantMsg] }
            : t
        )
      );
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleNewThread = () => {
    const newThread: ChatThread = {
      id: Date.now().toString(),
      title: `Chat ${threads.length + 1}`,
      messages: [
        {
          id: "init",
          role: "assistant",
          content:
            "Hello! I'm your AI Narrator. Ask me anything about the Bible stories — characters, themes, historical context, or how the different perspectives illuminate each tale.",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    setSidebarOpen(false);
  };

  const handleDeleteThread = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    if (activeThreadId === id) {
      setActiveThreadId(threads.find((t) => t.id !== id)?.id || "");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [input]);

  return (
    <div className="h-[100dvh] flex bg-charcoal pt-16">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #D4A853 0%, transparent 60%)",
        }}
      />
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 md:z-auto w-[280px] h-full bg-dusk border-r border-mist/10 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-mist/10">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Sparkles size={18} className="text-amber" />
            <span className="font-ui font-semibold text-sm text-parchment">
              AI Narrator
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-parchment/60 hover:text-parchment bg-transparent border-none cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <button
          onClick={handleNewThread}
          className="mx-4 mt-4 mb-2 flex items-center justify-center gap-2 bg-amber/10 hover:bg-amber/20 text-amber border border-amber/30 rounded-lg py-2.5 px-4 font-ui text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus size={16} />
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-colors mb-1 ${
                thread.id === activeThreadId
                  ? "bg-amber/10"
                  : "hover:bg-parchment/5"
              }`}
              onClick={() => {
                setActiveThreadId(thread.id);
                setSidebarOpen(false);
              }}
            >
              <Bot
                size={16}
                className={
                  thread.id === activeThreadId
                    ? "text-amber"
                    : "text-parchment/40"
                }
              />
              <span
                className={`flex-1 font-ui text-sm truncate ${
                  thread.id === activeThreadId
                    ? "text-amber"
                    : "text-parchment/70"
                }`}
              >
                {thread.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteThread(thread.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-parchment/30 hover:text-red-400 transition-all bg-transparent border-none cursor-pointer p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-mist/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-parchment/60 hover:text-parchment bg-transparent border-none cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <Bot size={18} className="text-amber hidden md:block" />
          <span className="font-ui font-medium text-sm text-parchment truncate">
            {activeThread.title}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
          {activeThread.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-amber/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={15} className="text-amber" />
                </div>
              )}
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 ${
                  msg.role === "user"
                    ? "bg-amber text-charcoal"
                    : "bg-parchment/8 text-parchment/90"
                }`}
              >
                <p className="font-body font-light text-[1rem] leading-[1.7] whitespace-pre-wrap">
                  {msg.content}
                </p>
                <span
                  className={`block mt-1.5 text-[0.7rem] font-ui ${
                    msg.role === "user"
                      ? "text-charcoal/50"
                      : "text-parchment/30"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-warm-cream/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={15} className="text-parchment/60" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber/15 flex items-center justify-center flex-shrink-0">
                <Sparkles size={15} className="text-amber" />
              </div>
              <div className="bg-parchment/8 rounded-2xl px-5 py-3.5">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-parchment/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-parchment/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-parchment/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 md:px-8 py-4 border-t border-mist/10">
          <div className="flex items-end gap-3 bg-parchment/5 rounded-2xl border border-mist/10 px-4 py-3 focus-within:border-amber/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about any Bible story..."
              rows={1}
              className="flex-1 bg-transparent text-parchment font-body font-light text-[1rem] placeholder:text-parchment/30 resize-none outline-none max-h-[120px] py-1"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-amber text-charcoal flex items-center justify-center hover:bg-[#E5BE6A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-center font-ui text-[0.7rem] text-parchment/25 mt-2">
            AI Narrator provides story insights for exploration and education.
          </p>
        </div>
      </div>
    </div>
  );
}
