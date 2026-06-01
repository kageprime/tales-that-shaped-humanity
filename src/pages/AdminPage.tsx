import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Shield,
  Users,
  MessageSquare,
  Mail,
  TrendingUp,
  Trash2,
  ChevronLeft,
  BarChart3,
  Inbox,
  UserCheck,
} from "lucide-react";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
  authType: string;
  createdAt: string;
}

// Mock data
const mockContacts: ContactSubmission[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah.m@example.com",
    subject: "Share a Story Idea",
    message: "I would love to see a retelling of the story of Ruth. Her loyalty and devotion to Naomi is such a powerful narrative about friendship and faithfulness.",
    createdAt: "2025-05-28T14:32:00Z",
  },
  {
    id: 2,
    name: "David Chen",
    email: "david.chen@example.com",
    subject: "General Inquiry",
    message: "Thank you for creating this beautiful website. The illustrations are stunning and the three-perspective approach is brilliant. Will you be adding more stories?",
    createdAt: "2025-05-27T09:15:00Z",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    subject: "Technical Support",
    message: "The perspective toggle on the story pages works great on desktop, but I noticed it's a bit hard to tap on mobile. Could the touch targets be made larger?",
    createdAt: "2025-05-26T18:45:00Z",
  },
  {
    id: 4,
    name: "James Thompson",
    email: "james.t@example.com",
    subject: "Partnership",
    message: "I'm a children's book illustrator and I love your Kids perspective stories. I'd be interested in discussing potential collaboration opportunities.",
    createdAt: "2025-05-25T11:20:00Z",
  },
  {
    id: 5,
    name: "Maria Garcia",
    email: "maria.g@example.com",
    subject: "Share a Story Idea",
    message: "The story of Esther would be wonderful to include! Her courage in saving her people is such an inspiring narrative, especially for young girls.",
    createdAt: "2025-05-24T16:00:00Z",
  },
];

const mockUsers: AppUser[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@tales-shaped.org",
    role: "admin",
    authType: "oauth",
    createdAt: "2025-04-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "sarah.m@example.com",
    role: "user",
    authType: "local",
    createdAt: "2025-05-15T14:20:00Z",
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@example.com",
    role: "user",
    authType: "oauth",
    createdAt: "2025-05-20T09:30:00Z",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    role: "user",
    authType: "local",
    createdAt: "2025-05-22T11:45:00Z",
  },
  {
    id: 5,
    name: "James Thompson",
    email: "james.t@example.com",
    role: "user",
    authType: "oauth",
    createdAt: "2025-05-25T08:00:00Z",
  },
];

type AdminTab = "overview" | "contacts" | "users";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [contacts, setContacts] = useState(mockContacts);
  const [users, setUsers] = useState(mockUsers);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = el.querySelectorAll("[data-animate]");
            els.forEach((c, i) => {
              setTimeout(() => {
                (c as HTMLElement).style.opacity = "1";
                (c as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab]);

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "#D4A853" },
    { label: "Contact Messages", value: contacts.length, icon: Mail, color: "#3A5A6E" },
    { label: "Active Threads", value: 12, icon: MessageSquare, color: "#2E5EAA" },
    { label: "Chat Messages", value: 156, icon: TrendingUp, color: "#8B6914" },
  ];

  const handleDeleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleRole = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
      )
    );
  };

  const tabs: { key: AdminTab; label: string; icon: typeof BarChart3 }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "contacts", label: "Contacts", icon: Inbox },
    { key: "users", label: "Users", icon: UserCheck },
  ];

  return (
    <div className="min-h-[100dvh] bg-dusk pt-16">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #D4A853 0%, transparent 60%)",
        }}
      />
      <div className="content-max py-8 md:py-12 relative z-[1]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-parchment/50 hover:text-amber transition-colors no-underline"
            >
              <ChevronLeft size={20} />
            </Link>
            <div className="w-10 h-10 rounded-lg bg-amber/15 flex items-center justify-center">
              <Shield size={20} className="text-amber" />
            </div>
            <div>
              <h1 className="font-display text-[1.5rem] md:text-[1.8rem] text-parchment">
                Admin Dashboard
              </h1>
              <p className="font-ui font-light text-[0.8rem] text-parchment/40">
                Manage your application data
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-parchment/5 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-ui text-[0.85rem] transition-all whitespace-nowrap border-none cursor-pointer"
              style={{
                backgroundColor:
                  activeTab === tab.key ? "rgba(212, 168, 83, 0.15)" : "transparent",
                color: activeTab === tab.key ? "#D4A853" : "rgba(250, 246, 238, 0.5)",
              }}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        <div ref={ref}>
          {activeTab === "overview" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    data-animate
                    className="bg-parchment/5 rounded-xl p-5 border border-mist/10 hover:border-mist/20 transition-colors"
                    style={{
                      opacity: 0,
                      transform: "translateY(20px)",
                      transitionDelay: `${i * 80}ms`,
                      transitionDuration: "600ms",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon size={18} style={{ color: stat.color }} />
                      <span
                        className="font-ui text-[0.75rem] px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                      >
                        +{Math.floor(Math.random() * 20 + 5)}%
                      </span>
                    </div>
                    <p className="font-display text-[2rem] text-parchment leading-none">
                      {stat.value}
                    </p>
                    <p className="font-ui font-light text-[0.8rem] text-parchment/40 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div
                data-animate
                className="bg-parchment/5 rounded-xl border border-mist/10 p-6"
                style={{ opacity: 0, transform: "translateY(20px)", transitionDuration: "600ms" }}
              >
                <h3 className="font-ui font-semibold text-[1rem] text-parchment mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {contacts.slice(0, 3).map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 py-3 border-b border-mist/5 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-amber" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-ui text-[0.85rem] text-parchment truncate">
                          {contact.name}
                        </p>
                        <p className="font-ui font-light text-[0.75rem] text-parchment/40 truncate">
                          {contact.subject}
                        </p>
                      </div>
                      <span className="font-ui text-[0.7rem] text-parchment/30 flex-shrink-0">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div
              data-animate
              className="bg-parchment/5 rounded-xl border border-mist/10 overflow-hidden"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDuration: "600ms" }}
            >
              <div className="p-5 border-b border-mist/10 flex items-center justify-between">
                <h3 className="font-ui font-semibold text-[1rem] text-parchment">
                  Contact Submissions ({contacts.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mist/10">
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Name
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Email
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Subject
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Message
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Date
                      </th>
                      <th className="text-right font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b border-mist/5 hover:bg-parchment/[0.02] transition-colors"
                      >
                        <td className="px-5 py-3.5 font-ui text-[0.85rem] text-parchment">
                          {contact.name}
                        </td>
                        <td className="px-5 py-3.5 font-ui text-[0.85rem] text-parchment/70">
                          {contact.email}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-ui text-[0.75rem] px-2.5 py-1 rounded-full bg-amber/10 text-amber">
                            {contact.subject}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-body font-light text-[0.85rem] text-parchment/60 max-w-[300px] truncate">
                          {contact.message}
                        </td>
                        <td className="px-5 py-3.5 font-ui text-[0.8rem] text-parchment/40 whitespace-nowrap">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-parchment/30 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-1"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div
              data-animate
              className="bg-parchment/5 rounded-xl border border-mist/10 overflow-hidden"
              style={{ opacity: 0, transform: "translateY(20px)", transitionDuration: "600ms" }}
            >
              <div className="p-5 border-b border-mist/10">
                <h3 className="font-ui font-semibold text-[1rem] text-parchment">
                  All Users ({users.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mist/10">
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Name
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Email
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Auth Type
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Role
                      </th>
                      <th className="text-left font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Joined
                      </th>
                      <th className="text-right font-ui font-medium text-[0.75rem] text-parchment/40 uppercase tracking-wider px-5 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-mist/5 hover:bg-parchment/[0.02] transition-colors"
                      >
                        <td className="px-5 py-3.5 font-ui text-[0.85rem] text-parchment">
                          {user.name}
                        </td>
                        <td className="px-5 py-3.5 font-ui text-[0.85rem] text-parchment/70">
                          {user.email}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-ui text-[0.75rem] px-2.5 py-1 rounded-full bg-parchment/10 text-parchment/60 capitalize">
                            {user.authType}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="font-ui text-[0.75rem] px-2.5 py-1 rounded-full capitalize"
                            style={{
                              backgroundColor:
                                user.role === "admin"
                                  ? "rgba(212, 168, 83, 0.15)"
                                  : "rgba(107, 101, 96, 0.15)",
                              color:
                                user.role === "admin" ? "#D4A853" : "#6B6560",
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-ui text-[0.8rem] text-parchment/40 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleToggleRole(user.id)}
                            className="font-ui text-[0.75rem] text-amber hover:underline bg-transparent border-none cursor-pointer"
                          >
                            {user.role === "admin" ? "Demote" : "Promote"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
