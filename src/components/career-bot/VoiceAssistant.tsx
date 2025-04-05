
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import { toast } from "sonner";

interface VoiceAssistantProps {
  onSpeechInput: (text: string) => void;
  lastBotMessage: string | null;
  isTyping: boolean;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  onSpeechInput, 
  lastBotMessage, 
  isTyping 
}) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [autoListen, setAutoListen] = useState(false);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported: isSpeechRecognitionSupported 
  } = useSpeechRecognition({
    onResult: (text) => {
      if (text.trim()) {
        stopListening();
        onSpeechInput(text);
      }
    },
    onError: (error) => {
      toast.error(`Speech recognition error: ${error}`);
    }
  });

  const { 
    speak, 
    cancel, 
    isSpeaking, 
    isSupported: isSpeechSynthesisSupported 
  } = useSpeechSynthesis({
    onEnd: () => {
      if (autoListen) {
        setTimeout(() => startListening(), 500);
      }
    },
    onError: (error) => {
      toast.error(`Speech synthesis error: ${error}`);
    }
  });

  useEffect(() => {
    if (!voiceEnabled) return;
    
    // Speak out the last bot message once it's complete
    if (lastBotMessage && !isTyping && !isSpeaking) {
      speak(lastBotMessage);
    }
  }, [lastBotMessage, isTyping, voiceEnabled, isSpeaking, speak]);

  // Check if both speech recognition and synthesis are supported
  const isVoiceSupported = isSpeechRecognitionSupported && isSpeechSynthesisSupported;

  const toggleVoiceEnabled = () => {
    if (!isVoiceSupported) {
      toast.error("Voice features are not supported in your browser");
      return;
    }
    
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    
    if (!newState) {
      // Disable voice
      if (isListening) stopListening();
      if (isSpeaking) cancel();
      setAutoListen(false);
    } else {
      toast.info("Voice assistance enabled. Click the microphone to start speaking.");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleAutoListen = () => {
    setAutoListen(!autoListen);
    toast.info(!autoListen 
      ? "Auto-listen mode enabled. The bot will listen after speaking." 
      : "Auto-listen mode disabled.");
  };

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleVoiceEnabled}
              className={`text-gray-500 hover:text-gray-700 ${voiceEnabled ? 'bg-gray-100' : ''}`}
            >
              {voiceEnabled ? (
                <Volume2 className="h-5 w-5 text-guidost-600" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {voiceEnabled ? "Disable voice" : "Enable voice"}
          </TooltipContent>
        </Tooltip>

        {voiceEnabled && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleListening}
                  className={`text-gray-500 hover:text-gray-700 ${isListening ? 'bg-red-100' : ''}`}
                  disabled={isSpeaking}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5 text-red-500" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {isListening ? "Stop listening" : "Start listening"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAutoListen}
                  className={`text-gray-500 hover:text-gray-700 ${autoListen ? 'bg-green-100' : ''}`}
                >
                  <Mic className={`h-5 w-5 ${autoListen ? 'text-green-500' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {autoListen ? "Disable auto-listen" : "Enable auto-listen"}
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </TooltipProvider>
      
      {isListening && (
        <div className="text-sm text-gray-500 italic">
          Listening... {transcript ? `"${transcript}"` : ''}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
