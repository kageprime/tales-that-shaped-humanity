import { usePlayer } from "./AudioPlayerBar";
import type { AudioTrack } from "@/hooks/useAudioPlayer";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  track: AudioTrack;
  size?: "sm" | "md";
}

export default function PlayButton({ track, size = "sm" }: PlayButtonProps) {
  const { currentTrack, status, playTrack, pause, resume } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && status === "playing";
  const isPaused = isCurrentTrack && status === "paused";

  const handleClick = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      playTrack(track);
    }
  };

  const dimClass = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <button
      onClick={handleClick}
      className={cn(
        dimClass,
        "rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-none flex-shrink-0",
        isPlaying || isPaused
          ? "bg-amber text-charcoal shadow-[0_0_12px_rgba(212,168,83,0.3)]"
          : "bg-amber/20 text-amber hover:bg-amber/30"
      )}
      aria-label={isPlaying ? "Pause" : isPaused ? "Resume" : "Play"}
    >
      {isPlaying ? (
        <Pause size={iconSize} fill="currentColor" />
      ) : (
        <Play size={iconSize} fill="currentColor" className="ml-0.5" />
      )}
    </button>
  );
}
