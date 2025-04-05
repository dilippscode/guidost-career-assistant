
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Volume2, Pause, Loader2 } from "lucide-react";
import { aiService } from "@/services/aiService";

interface VoiceFeedbackProps {
  initialText?: string;
}

const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({ initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const [voice, setVoice] = useState<string>("nova");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

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

    try {
      // If already playing, stop the current audio
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      const response = await fetch("https://your-project-id.supabase.co/functions/v1/text-to-speech", {
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">Voice Feedback Generator</CardTitle>
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
                Generate Voice
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
      </CardFooter>
    </Card>
  );
};

export default VoiceFeedback;
