
import { useState } from "react";
import { toast } from "sonner";
import { aiService } from "@/services/aiService";
import { saveOfflineFeedback, removeOfflineFeedback } from "@/utils/offlineStorage";
import { VoiceFeedbackState, VoiceFeedbackActions, OfflineData } from "./types";

export const useFeedbackGenerator = (
  state: Pick<VoiceFeedbackState, "text" | "voice" | "networkStatus" | "audioElement">,
  actions: Pick<VoiceFeedbackActions, "setIsGenerating" | "setIsPlaying" | "setAudioElement" | "setFeedbackGenerated" | "setOfflineFeedback" | "setIsSyncing">
) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const generateFeedback = async () => {
    if (!state.text.trim()) {
      toast.error("Please enter some text for voice feedback");
      return;
    }

    // Check if the API key is set
    if (!aiService.getApiKey()) {
      toast.error("AI API key is not set. Please set your API key first.");
      return;
    }

    actions.setIsGenerating(true);
    setIsGenerating(true);

    // If already playing, stop the current audio
    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.currentTime = 0;
    }

    // If offline, save for later sync
    if (!state.networkStatus) {
      saveOfflineFeedback({
        text: state.text,
        voice: state.voice,
        timestamp: Date.now()
      });
      actions.setIsGenerating(false);
      setIsGenerating(false);
      actions.setFeedbackGenerated(true);
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
        body: JSON.stringify({ text: state.text, voice: state.voice }),
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
      actions.setAudioElement(audio);
      
      audio.onended = () => {
        actions.setIsPlaying(false);
      };
      
      audio.play();
      actions.setIsPlaying(true);
      actions.setFeedbackGenerated(true);
      setFeedbackGenerated(true);
      toast.success("Voice feedback generated successfully");
    } catch (error) {
      console.error("Error generating voice feedback:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate voice feedback");
    } finally {
      actions.setIsGenerating(false);
      setIsGenerating(false);
    }
  };

  const syncOfflineFeedback = async () => {
    if (!state.networkStatus) {
      toast.error("You are offline. Cannot sync feedback.");
      return;
    }

    if (state.offlineFeedback?.length === 0) {
      toast.info("No offline feedback to sync");
      return;
    }

    actions.setIsSyncing(true);
    setIsSyncing(true);
    let successCount = 0;
    let failureCount = 0;

    // Process each offline feedback entry
    for (const feedback of state.offlineFeedback || []) {
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
    actions.setOfflineFeedback(state.offlineFeedback || []);
    actions.setIsSyncing(false);
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
    isGenerating,
    setIsGenerating,
    feedbackGenerated,
    setFeedbackGenerated,
    isSyncing,
    setIsSyncing,
    generateFeedback,
    syncOfflineFeedback
  };
};
