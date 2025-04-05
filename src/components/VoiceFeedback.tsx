
import React from "react";
import FeedbackForm from "./voice-feedback/FeedbackForm";
import StudentReflection from "./StudentReflection";
import { useVoiceFeedback } from "@/hooks/useVoiceFeedback";

interface VoiceFeedbackProps {
  initialText?: string;
}

const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({ initialText = "" }) => {
  const {
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
  } = useVoiceFeedback({ initialText });

  return (
    <>
      <FeedbackForm
        text={text}
        voice={voice}
        isGenerating={isGenerating}
        isPlaying={isPlaying}
        audioElement={audioElement}
        feedbackGenerated={feedbackGenerated}
        showReflection={showReflection}
        networkStatus={networkStatus}
        offlineFeedback={offlineFeedback}
        isSyncing={isSyncing}
        onTextChange={handleTextChange}
        onVoiceChange={handleVoiceChange}
        onGenerate={generateFeedback}
        onTogglePlayPause={togglePlayPause}
        onReflect={handleReflect}
        onSync={syncOfflineFeedback}
      />
      
      {showReflection && (
        <StudentReflection feedbackText={text} />
      )}
    </>
  );
};

export default VoiceFeedback;
