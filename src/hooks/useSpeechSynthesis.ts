
import { useState, useEffect } from 'react';

interface UseSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
}

export const useSpeechSynthesis = ({
  onStart,
  onEnd,
  onError,
  voice,
  rate = 1,
  pitch = 1
}: UseSpeechSynthesisProps = {}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice if none specified
        if (!selectedVoice && voices.length > 0) {
          const englishVoice = voices.find(voice => voice.lang.includes('en-US')) || voices[0];
          setSelectedVoice(englishVoice);
        }
      };

      // Load voices initially and when they change
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setIsSupported(false);
      if (onError) onError('Speech synthesis is not supported in this browser');
    }
  }, [onError, selectedVoice]);

  // Update selected voice when voice prop changes
  useEffect(() => {
    if (voice) {
      setSelectedVoice(voice);
    }
  }, [voice]);

  const speak = (text: string) => {
    if (!isSupported) {
      if (onError) onError('Speech synthesis is not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      if (onError) onError(`Speech synthesis error: ${event.error}`);
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const pause = () => {
    window.speechSynthesis.pause();
  };

  const resume = () => {
    window.speechSynthesis.resume();
  };

  const setVoice = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  };

  return {
    speak,
    cancel,
    pause,
    resume,
    isSpeaking,
    isSupported,
    availableVoices,
    selectedVoice,
    setVoice
  };
};

export default useSpeechSynthesis;
