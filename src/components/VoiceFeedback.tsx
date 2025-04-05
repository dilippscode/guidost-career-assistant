
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Volume2, Pause, Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { aiService } from "@/services/aiService";
import StudentReflection from "./StudentReflection";
import { isOnline, saveOfflineFeedback, getOfflineFeedback, removeOfflineFeedback } from "@/utils/offlineStorage";
import { Badge } from "@/components/ui/badge";

interface VoiceFeedbackProps {
  initialText?: string;
}

const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({ initialText = "" }) => {
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

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Voice Feedback Generator</CardTitle>
            <div className="flex items-center">
              <Badge variant={networkStatus ? "outline" : "destructive"} className="flex items-center gap-1">
                {networkStatus ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {networkStatus ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="Enter the feedback text you want to convert to speech..."
              className="min-h-[150px]"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Select Voice</label>
            <Select value={voice} onValueChange={handleVoiceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                <SelectItem value="echo">Echo (Male)</SelectItem>
                <SelectItem value="fable">Fable (Male)</SelectItem>
                <SelectItem value="onyx">Onyx (Male)</SelectItem>
                <SelectItem value="nova">Nova (Female)</SelectItem>
                <SelectItem value="shimmer">Shimmer (Female)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {!networkStatus && offlineFeedback.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
              <h3 className="text-sm font-medium text-yellow-800 mb-1">Offline Feedback</h3>
              <p className="text-xs text-yellow-700 mb-2">You have {offlineFeedback.length} feedback item(s) saved offline.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={syncOfflineFeedback} 
                disabled={!networkStatus || isSyncing}
                className="text-xs"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Sync when online
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="default"
              className="gradient-button"
              disabled={isGenerating || !text.trim()}
              onClick={generateFeedback}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  {networkStatus ? "Generate Voice" : "Save Offline"}
                </>
              )}
            </Button>
            
            {audioElement && (
              <Button
                variant="outline"
                onClick={togglePlayPause}
                disabled={isGenerating}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Play
                  </>
                )}
              </Button>
            )}
          </div>
          
          {feedbackGenerated && !showReflection && (
            <Button 
              variant="outline" 
              onClick={handleReflect}
              className="bg-mentor-50 text-mentor-700 hover:bg-mentor-100 border-mentor-200"
            >
              Reflect on Feedback
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {showReflection && (
        <StudentReflection feedbackText={text} />
      )}
    </>
  );
};

export default VoiceFeedback;
