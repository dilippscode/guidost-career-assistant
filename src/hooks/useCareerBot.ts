
import { useState, useEffect, useRef } from "react";
import { aiService, ChatMessage, AIProvider } from "@/services/aiService";
import { toast } from "sonner";

export const useCareerBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi there! I'm your Career Compass assistant. I can help you explore career paths, provide guidance on skills to develop, or answer questions about different professions. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || "");
  const [provider, setProvider] = useState<AIProvider>(aiService.getProvider());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if API key exists
    const savedApiKey = aiService.getApiKey();
    if (!savedApiKey) {
      setApiKeyDialogOpen(true);
    } else {
      setApiKey(savedApiKey);
    }
    
    // Set the provider from localStorage
    setProvider(aiService.getProvider());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    aiService.setApiKey(apiKey.trim());
    aiService.setProvider(provider);
    setApiKeyDialogOpen(false);
    toast.success(`${provider === "openai" ? "OpenAI" : "Gemini"} API key saved successfully`);
  };

  const handleChangeApiKey = () => {
    setApiKeyDialogOpen(true);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await aiService.generateResponse([...messages, newUserMessage]);
      
      const newBotMessage: ChatMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      if (error instanceof Error && error.message.includes("API key")) {
        setApiKeyDialogOpen(true);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return {
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
  };
};
