
import { useState } from "react";
import { useNetworkStatus } from "./voice-feedback/useNetworkStatus";
import { useAudioPlayer } from "./voice-feedback/useAudioPlayer";
import { useFeedbackGenerator } from "./voice-feedback/useFeedbackGenerator";
import { UseVoiceFeedbackProps, VoiceFeedbackHook } from "./voice-feedback/types";

export const useVoiceFeedback = ({ initialText }: UseVoiceFeedbackProps): VoiceFeedbackHook => {
  const [text, setText] = useState(initialText);
  const [voice, setVoice] = useState<string>("nova");
  const [showReflection, setShowReflection] = useState(false);

  // Networking
  const { 
    networkStatus, 
    setNetworkStatus, 
    offlineFeedback, 
    setOfflineFeedback 
  } = useNetworkStatus();

  // Audio playback
  const { 
    isPlaying, 
    setIsPlaying, 
    audioElement, 
    setAudioElement, 
    togglePlayPause 
  } = useAudioPlayer();

  // Feedback generation
  const { 
    isGenerating, 
    setIsGenerating, 
    feedbackGenerated, 
    setFeedbackGenerated, 
    isSyncing, 
    setIsSyncing, 
    generateFeedback, 
    syncOfflineFeedback 
  } = useFeedbackGenerator(
    { text, voice, networkStatus, audioElement, offlineFeedback },
    { 
      setIsGenerating, 
      setIsPlaying, 
      setAudioElement, 
      setFeedbackGenerated, 
      setOfflineFeedback,
      setIsSyncing
    }
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (value: string) => {
    setVoice(value);
  };

  const handleReflect = () => {
    setShowReflection(true);
  };

  return {
    // State
    text,
    voice,
    isGenerating,
    isPlaying,
    audioElement,
    showReflection,
    feedbackGenerated,
    networkStatus,
    offlineFeedback,
    isSyncing,
    
    // Handlers
    handleTextChange,
    handleVoiceChange,
    generateFeedback,
    togglePlayPause,
    handleReflect,
    syncOfflineFeedback
  };
};
