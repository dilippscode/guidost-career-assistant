
import React from "react";
import { User, Bot } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/services/aiService";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] ${
          message.sender === "user"
            ? "bg-guidost-600 text-white rounded-2xl rounded-tr-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none"
        } p-3 shadow-sm`}
      >
        <div className="mr-2 mt-1">
          {message.sender === "user" ? (
            <User className="h-5 w-5 text-white/70" />
          ) : (
            <Bot className="h-5 w-5 text-guidost-500" />
          )}
        </div>
        <div>
          <p className="text-sm">{message.text}</p>
          <p className="text-xs mt-1 opacity-70">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
