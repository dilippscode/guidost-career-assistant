
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Pause, Loader2, Wifi, WifiOff } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import OfflineFeedbackNotification from "./OfflineFeedbackNotification";

interface FeedbackFormProps {
  text: string;
  voice: string;
  isGenerating: boolean;
  isPlaying: boolean;
  audioElement: HTMLAudioElement | null;
  feedbackGenerated: boolean;
  showReflection: boolean;
  networkStatus: boolean;
  offlineFeedback: any[];
  isSyncing: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onVoiceChange: (value: string) => void;
  onGenerate: () => void;
  onTogglePlayPause: () => void;
  onReflect: () => void;
  onSync: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  text,
  voice,
  isGenerating,
  isPlaying,
  audioElement,
  feedbackGenerated,
  showReflection,
  networkStatus,
  offlineFeedback,
  isSyncing,
  onTextChange,
  onVoiceChange,
  onGenerate,
  onTogglePlayPause,
  onReflect,
  onSync
}) => {
  return (
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
            onChange={onTextChange}
          />
        </div>
        
        <VoiceSelector value={voice} onChange={onVoiceChange} />
        
        {!networkStatus && offlineFeedback.length > 0 && (
          <OfflineFeedbackNotification 
            offlineFeedbackCount={offlineFeedback.length}
            networkStatus={networkStatus}
            isSyncing={isSyncing}
            onSync={onSync}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="default"
            className="gradient-button"
            disabled={isGenerating || !text.trim()}
            onClick={onGenerate}
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
              onClick={onTogglePlayPause}
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
            onClick={onReflect}
            className="bg-mentor-50 text-mentor-700 hover:bg-mentor-100 border-mentor-200"
          >
            Reflect on Feedback
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeedbackForm;
