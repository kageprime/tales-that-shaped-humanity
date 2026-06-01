import { createContext, useContext, type ReactNode } from "react";
import { useAudioPlayer, type AudioTrack } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";
import { Play, Pause, SkipForward, X, Volume2 } from "lucide-react";

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null;
  queue: AudioTrack[];
  status: "idle" | "playing" | "paused";
  currentParagraphIndex: number;
  progress: number;
  playTrack: (track: AudioTrack) => void;
  enqueue: (track: AudioTrack) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skipNext: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const player = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={player}>
      {children}
      <AudioPlayerBar />
    </AudioPlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within AudioPlayerProvider");
  return ctx;
}

function AudioPlayerBar() {
  const { currentTrack, status, progress, pause, resume, stop, skipNext } = usePlayer();

  if (!currentTrack) return null;

  const isActive = status === "playing" || status === "paused";

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[150] transition-transform duration-400",
        isActive ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-charcoal/[0.97] backdrop-blur-xl border-t border-amber/20">
        {/* Progress bar */}
        <div className="h-[2px] bg-parchment/10">
          <div
            className="h-full bg-amber transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="content-max flex items-center gap-4 h-16">
          {/* Chapter info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
              <Volume2 size={14} className="text-amber" />
            </div>
            <div className="min-w-0">
              <span className="block font-mono text-[0.65rem] tracking-[0.08em] text-amber/60">
                Chapter {currentTrack.chapterNumber}
              </span>
              <span className="block font-ui text-[0.85rem] text-parchment truncate">
                {currentTrack.title}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={status === "playing" ? pause : resume}
              className="w-9 h-9 rounded-full bg-amber flex items-center justify-center hover:bg-[#E5BE6A] transition-colors cursor-pointer border-none"
              aria-label={status === "playing" ? "Pause" : "Resume"}
            >
              {status === "playing" ? (
                <Pause size={15} className="text-charcoal" fill="currentColor" />
              ) : (
                <Play size={15} className="text-charcoal ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={skipNext}
              className="w-9 h-9 rounded-full flex items-center justify-center text-parchment/60 hover:text-parchment hover:bg-parchment/10 transition-colors cursor-pointer border-none"
              aria-label="Next"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>
            <button
              onClick={stop}
              className="w-9 h-9 rounded-full flex items-center justify-center text-parchment/40 hover:text-parchment hover:bg-parchment/10 transition-colors cursor-pointer border-none"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
