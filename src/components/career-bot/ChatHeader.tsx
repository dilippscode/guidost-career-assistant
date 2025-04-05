
import React from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { AIProvider } from "@/services/aiService";

interface ChatHeaderProps {
  handleChangeApiKey: () => void;
  provider: AIProvider;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ handleChangeApiKey, provider }) => {
  return (
    <div className="bg-gradient-to-r from-guidost-600 to-mentor-600 p-4 text-white flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Career Compass Bot</h2>
        <p className="text-white/80 text-sm">
          Your AI-powered guide using {provider === "openai" ? "OpenAI" : "Google Gemini"}
        </p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white hover:bg-white/20"
        onClick={handleChangeApiKey}
        title="Change API Key"
      >
        <Key className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatHeader;
