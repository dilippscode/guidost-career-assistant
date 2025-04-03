
import React from "react";
import { useCareerBot } from "@/hooks/useCareerBot";
import ChatMessage from "./career-bot/ChatMessage";
import ChatTypingIndicator from "./career-bot/ChatTypingIndicator";
import ChatInput from "./career-bot/ChatInput";
import ApiKeyDialog from "./career-bot/ApiKeyDialog";
import ChatHeader from "./career-bot/ChatHeader";
import ContactInfo from "./career-bot/ContactInfo";

const CareerBot: React.FC = () => {
  const {
    input,
    setInput,
    messages,
    isTyping,
    apiKeyDialogOpen,
    setApiKeyDialogOpen,
    apiKey,
    setApiKey,
    messagesEndRef,
    handleSaveApiKey,
    handleChangeApiKey,
    handleSendMessage,
    handleKeyPress,
  } = useCareerBot();

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <ChatHeader handleChangeApiKey={handleChangeApiKey} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && <ChatTypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ContactInfo />
      
      <ChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        isTyping={isTyping}
      />

      <ApiKeyDialog
        open={apiKeyDialogOpen}
        onOpenChange={setApiKeyDialogOpen}
        apiKey={apiKey}
        setApiKey={setApiKey}
        handleSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
};

export default CareerBot;
