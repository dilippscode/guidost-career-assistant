
import React, { useState, useEffect } from "react";
import { useCareerBot } from "@/hooks/useCareerBot";
import ChatMessage from "./career-bot/ChatMessage";
import ChatTypingIndicator from "./career-bot/ChatTypingIndicator";
import ChatInput from "./career-bot/ChatInput";
import ApiKeyDialog from "./career-bot/ApiKeyDialog";
import ChatHeader from "./career-bot/ChatHeader";
import ContactInfo from "./career-bot/ContactInfo";
import VoiceAssistant from "./career-bot/VoiceAssistant";

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
    provider,
    setProvider,
    messagesEndRef,
    handleSaveApiKey,
    handleChangeApiKey,
    handleSendMessage,
    handleKeyPress,
  } = useCareerBot();

  const [lastBotMessage, setLastBotMessage] = useState<string | null>(null);

  // Update the last bot message whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const botMessages = messages.filter(m => m.sender === 'bot');
      if (botMessages.length > 0) {
        setLastBotMessage(botMessages[botMessages.length - 1].text);
      }
    }
  }, [messages]);

  const handleSpeechInput = (text: string) => {
    setInput(text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <ChatHeader 
        handleChangeApiKey={handleChangeApiKey} 
        provider={provider}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && <ChatTypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ContactInfo />
      
      <div className="border-t border-gray-200 bg-white">
        <div className="flex items-center px-4 py-2">
          <VoiceAssistant 
            onSpeechInput={handleSpeechInput}
            lastBotMessage={lastBotMessage}
            isTyping={isTyping}
          />
        </div>
        
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isTyping={isTyping}
        />
      </div>

      <ApiKeyDialog
        open={apiKeyDialogOpen}
        onOpenChange={setApiKeyDialogOpen}
        apiKey={apiKey}
        setApiKey={setApiKey}
        provider={provider}
        setProvider={setProvider}
        handleSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
};

export default CareerBot;
