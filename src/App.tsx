import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import StoriesPage from "@/pages/StoriesPage";
import StoryPage from "@/pages/StoryPage";
import EpisodePage from "@/pages/EpisodePage";
import EpisodeListPage from "@/pages/EpisodeListPage";
import { AuthModalProvider } from "@/components/AuthModal";
import { ContactModalProvider } from "@/components/ContactModal";
import { AudioPlayerProvider } from "@/components/AudioPlayerBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthModalProvider>
        <ContactModalProvider>
          <AudioPlayerProvider>
            <div className="min-h-[100dvh] bg-parchment font-body antialiased">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/stories" element={<StoriesPage />} />
                  <Route path="/stories/:slug" element={<StoryPage />} />
                  <Route path="/episodes" element={<EpisodeListPage />} />
                  <Route path="/episodes/:slug" element={<EpisodePage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#1A1714",
                    color: "#FAF6EE",
                    border: "none",
                  },
                }}
              />
            </div>
          </AudioPlayerProvider>
        </ContactModalProvider>
      </AuthModalProvider>
    </QueryClientProvider>
  );
}

export default App;
