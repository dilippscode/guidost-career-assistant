
import { useState } from "react";

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  return {
    isPlaying,
    setIsPlaying,
    audioElement,
    setAudioElement,
    togglePlayPause
  };
};
