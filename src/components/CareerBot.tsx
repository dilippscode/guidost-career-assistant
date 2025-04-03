
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Key, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { aiService, ChatMessage } from "@/services/aiService";
import { toast } from "sonner";

const CareerBot: React.FC = () => {
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
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || "sk-ijklmnopqrstuvwxijklmnopqrstuvwxijklmnop");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If API key isn't set in the service, set it with the default one
    if (!aiService.getApiKey()) {
      aiService.setApiKey("sk-ijklmnopqrstuvwxijklmnopqrstuvwxijklmnop");
      setApiKey("sk-ijklmnopqrstuvwxijklmnopqrstuvwxijklmnop");
    } else {
      setApiKey(aiService.getApiKey() || "");
    }
    // We no longer need to show the API key dialog by default
    setApiKeyDialogOpen(false);
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
    setApiKeyDialogOpen(false);
    toast.success("API key saved successfully");
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

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-guidost-600 to-mentor-600 p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Career Compass Bot</h2>
          <p className="text-white/80 text-sm">
            Your AI-powered guide to career exploration and planning
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
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
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-white p-3 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600">
          <div className="flex items-center mb-2 sm:mb-0">
            <Mail className="h-4 w-4 mr-2 text-guidost-500" />
            <a href="mailto:dilippsdilip@gmail.com" className="hover:text-guidost-600">
              dilippsdilip@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-guidost-500" />
            <a href="tel:+919035014571" className="hover:text-guidost-600">
              +91 9035014571
            </a>
          </div>
        </div>
      </div>

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

      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>OpenAI API Key</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="apiKey" className="mb-2 block">
              Enter your OpenAI API key to enable the AI-powered career bot
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
            <p className="text-xs text-guidost-600 mt-1">
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-guidost-700"
              >
                Get an API key from OpenAI
              </a>
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setApiKeyDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey} className="gradient-button">
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerBot;
