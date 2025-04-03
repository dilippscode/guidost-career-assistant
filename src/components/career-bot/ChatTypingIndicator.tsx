
import React from "react";

const ChatTypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatTypingIndicator;
