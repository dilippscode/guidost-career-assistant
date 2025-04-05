
import { useState, useEffect, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

export const useSpeechRecognition = ({
  onResult,
  onError,
  language = 'en-US'
}: UseSpeechRecognitionProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      setIsSupported(true);
    } else {
      setIsSupported(false);
      if (onError) onError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onError]);

  useEffect(() => {
    if (!recognitionRef.current) return;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscript(currentTranscript);
      
      if (event.results[0].isFinal && onResult) {
        onResult(currentTranscript);
      }
    };

    const handleError = (event: SpeechRecognitionErrorEvent) => {
      if (onError) onError(event.error);
      setIsListening(false);
    };

    const handleEnd = () => {
      if (isListening) {
        try {
          recognitionRef.current?.start();
        } catch (err) {
          console.error('Error restarting speech recognition:', err);
        }
      }
    };

    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.onerror = handleError;
    recognitionRef.current.onend = handleEnd;

  }, [isListening, onResult, onError]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    
    setTranscript('');
    setIsListening(true);
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    
    setIsListening(false);
    recognitionRef.current.stop();
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported
  };
};

export default useSpeechRecognition;
