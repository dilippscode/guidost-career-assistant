
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  handleKeyPress,
  isTyping 
}) => {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about career paths, skills, or job prospects..."
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          className="gradient-button"
          disabled={input.trim() === "" || isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
