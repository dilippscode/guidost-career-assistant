
import { Dispatch, SetStateAction } from "react";

export interface OfflineData {
  text: string;
  voice: string;
  timestamp: number;
}

export interface UseVoiceFeedbackProps {
  initialText: string;
}

export interface VoiceFeedbackState {
  text: string;
  voice: string;
  isGenerating: boolean;
  isPlaying: boolean;
  audioElement: HTMLAudioElement | null;
  showReflection: boolean;
  feedbackGenerated: boolean;
  networkStatus: boolean;
  offlineFeedback: OfflineData[];
  isSyncing: boolean;
}

export interface VoiceFeedbackActions {
  setText: Dispatch<SetStateAction<string>>;
  setVoice: Dispatch<SetStateAction<string>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setAudioElement: Dispatch<SetStateAction<HTMLAudioElement | null>>;
  setShowReflection: Dispatch<SetStateAction<boolean>>;
  setFeedbackGenerated: Dispatch<SetStateAction<boolean>>;
  setNetworkStatus: Dispatch<SetStateAction<boolean>>;
  setOfflineFeedback: Dispatch<SetStateAction<OfflineData[]>>;
  setIsSyncing: Dispatch<SetStateAction<boolean>>;
}

export interface VoiceFeedbackHandlers {
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleVoiceChange: (value: string) => void;
  generateFeedback: () => Promise<void>;
  togglePlayPause: () => void;
  handleReflect: () => void;
  syncOfflineFeedback: () => Promise<void>;
}

export type VoiceFeedbackHook = VoiceFeedbackState & VoiceFeedbackHandlers;
