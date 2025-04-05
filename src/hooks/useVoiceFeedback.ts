
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { aiService } from "@/services/aiService";
import { isOnline, saveOfflineFeedback, getOfflineFeedback, removeOfflineFeedback } from "@/utils/offlineStorage";

interface UseVoiceFeedbackProps {
  initialText: string;
}

export const useVoiceFeedback = ({ initialText }: UseVoiceFeedbackProps) => {
  const [text, setText] = useState(initialText);
  const [voice, setVoice] = useState<string>("nova");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<boolean>(isOnline());
  const [offlineFeedback, setOfflineFeedback] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(true);
      toast.success("You're back online!");
    };

    const handleOffline = () => {
      setNetworkStatus(false);
      toast.warning("You're offline. Feedback will be saved for later.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load any saved offline feedback
    setOfflineFeedback(getOfflineFeedback());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (value: string) => {
    setVoice(value);
  };

  const generateFeedback = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text for voice feedback");
      return;
    }

    // Check if the API key is set
    if (!aiService.getApiKey()) {
      toast.error("AI API key is not set. Please set your API key first.");
      return;
    }

    setIsGenerating(true);

    // If already playing, stop the current audio
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    // If offline, save for later sync
    if (!networkStatus) {
      saveOfflineFeedback({
        text,
        voice,
        timestamp: Date.now()
      });
      setIsGenerating(false);
      setFeedbackGenerated(true);
      return;
    }

    try {
      const response = await fetch("https://hyumytbxmbgveowhzhec.supabase.co/functions/v1/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${aiService.getApiKey()}`,
        },
        body: JSON.stringify({ text, voice }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate voice feedback");
      }

      // Create blob from response and create audio URL
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create and play audio element
      const audio = new Audio(audioUrl);
      setAudioElement(audio);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.play();
      setIsPlaying(true);
      setFeedbackGenerated(true);
      toast.success("Voice feedback generated successfully");
    } catch (error) {
      console.error("Error generating voice feedback:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate voice feedback");
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleReflect = () => {
    setShowReflection(true);
  };

  const syncOfflineFeedback = async () => {
    if (!networkStatus) {
      toast.error("You are offline. Cannot sync feedback.");
      return;
    }

    if (offlineFeedback.length === 0) {
      toast.info("No offline feedback to sync");
      return;
    }

    setIsSyncing(true);
    let successCount = 0;
    let failureCount = 0;

    // Process each offline feedback entry
    for (const feedback of offlineFeedback) {
      try {
        const response = await fetch("https://hyumytbxmbgveowhzhec.supabase.co/functions/v1/text-to-speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${aiService.getApiKey()}`,
          },
          body: JSON.stringify({ text: feedback.text, voice: feedback.voice }),
        });

        if (response.ok) {
          // Remove this entry from offline storage
          removeOfflineFeedback(feedback.timestamp);
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        console.error("Error syncing feedback:", error);
        failureCount++;
      }
    }

    // Refresh the list
    setOfflineFeedback(getOfflineFeedback());
    setIsSyncing(false);

    // Show results
    if (successCount > 0) {
      toast.success(`Successfully synced ${successCount} feedback item(s)`);
    }
    if (failureCount > 0) {
      toast.error(`Failed to sync ${failureCount} feedback item(s)`);
    }
  };

  return {
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
    handleTextChange,
    handleVoiceChange,
    generateFeedback,
    togglePlayPause,
    handleReflect,
    syncOfflineFeedback
  };
};
