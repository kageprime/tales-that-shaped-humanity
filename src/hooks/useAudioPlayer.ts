import { useState, useRef, useCallback, useEffect } from "react";

export interface AudioTrack {
  id: string;
  title: string;
  chapterNumber: string;
  paragraphs: string[];
}

type PlayerStatus = "idle" | "playing" | "paused";

interface PlayerState {
  currentTrack: AudioTrack | null;
  queue: AudioTrack[];
  status: PlayerStatus;
  currentParagraphIndex: number;
  progress: number;
}

const SPEECH_RATE = 0.9;
const SPEECH_PITCH = 1;
const SPEECH_VOLUME = 1;

function getVoice(): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    voices[0]
  );
}

export function useAudioPlayer() {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    queue: [],
    status: "idle",
    currentParagraphIndex: 0,
    progress: 0,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const trackRef = useRef<AudioTrack | null>(null);
  const paraRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    voiceRef.current = getVoice();
    const handle = () => {
      voiceRef.current = getVoice();
    };
    speechSynthesis.addEventListener("voiceschanged", handle);
    return () => speechSynthesis.removeEventListener("voiceschanged", handle);
  }, []);

  const speakParagraph = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voiceRef.current ?? null;
      utterance.rate = SPEECH_RATE;
      utterance.pitch = SPEECH_PITCH;
      utterance.volume = SPEECH_VOLUME;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    });
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    speechSynthesis.cancel();
    cancelledRef.current = false;

    setState({
      currentTrack: track,
      queue: [],
      status: "playing",
      currentParagraphIndex: 0,
      progress: 0,
    });

    trackRef.current = track;
    paraRef.current = 0;

    (async () => {
      for (let i = 0; i < track.paragraphs.length; i++) {
        if (cancelledRef.current) break;
        paraRef.current = i;
        setState((prev) => ({
          ...prev,
          currentParagraphIndex: i,
          progress: Math.round((i / track.paragraphs.length) * 100),
        }));
        await speakParagraph(track.paragraphs[i]);
      }
      if (!cancelledRef.current) {
        setState({
          currentTrack: null,
          queue: [],
          status: "idle",
          currentParagraphIndex: 0,
          progress: 0,
        });
        trackRef.current = null;
      }
    })();
  }, [speakParagraph]);

  const enqueue = useCallback((track: AudioTrack) => {
    setState((prev) => ({ ...prev, queue: [...prev.queue, track] }));
  }, []);

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setState((prev) => (prev.status === "playing" ? { ...prev, status: "paused" } : prev));
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setState((prev) => (prev.status === "paused" ? { ...prev, status: "playing" } : prev));
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    speechSynthesis.cancel();
    setState({
      currentTrack: null,
      queue: [],
      status: "idle",
      currentParagraphIndex: 0,
      progress: 0,
    });
    trackRef.current = null;
  }, []);

  const skipNext = useCallback(() => {
    cancelledRef.current = true;
    speechSynthesis.cancel();

    setState((prev) => {
      const queue = prev.queue;
      if (queue.length === 0) {
        return {
          currentTrack: null,
          queue: [],
          status: "idle",
          currentParagraphIndex: 0,
          progress: 0,
        };
      }
      const next = queue[0];
      const remaining = queue.slice(1);
      const track = next;

      setTimeout(() => {
        cancelledRef.current = false;
        trackRef.current = track;
        paraRef.current = 0;
        setState({
          currentTrack: track,
          queue: remaining,
          status: "playing",
          currentParagraphIndex: 0,
          progress: 0,
        });

        (async () => {
          for (let i = 0; i < track.paragraphs.length; i++) {
            if (cancelledRef.current) break;
            paraRef.current = i;
            setState((prev) => ({
              ...prev,
              currentParagraphIndex: i,
              progress: Math.round((i / track.paragraphs.length) * 100),
            }));
            await speakParagraph(track.paragraphs[i]);
          }
          if (!cancelledRef.current) {
            setState({
              currentTrack: null,
              queue: [],
              status: "idle",
              currentParagraphIndex: 0,
              progress: 0,
            });
            trackRef.current = null;
          }
        })();
      }, 0);

      return {
        currentTrack: prev.currentTrack,
        queue: prev.queue,
        status: "idle" as PlayerStatus,
        currentParagraphIndex: 0,
        progress: 0,
      };
    });
  }, [speakParagraph]);

  return {
    ...state,
    playTrack,
    enqueue,
    pause,
    resume,
    stop,
    skipNext,
  };
}
