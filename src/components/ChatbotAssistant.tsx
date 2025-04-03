import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, MessageSquare, Bot } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hi there! I'm GuiDost Assistant. How can I help you today? (This is a simulated chat - for AI-powered responses, try the Career Compass page)",
  sender: "bot",
  timestamp: new Date(),
};

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(input.trim());
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
      return "Hello! How can I help you with your career guidance today?";
    } else if (lowercaseInput.includes("mentor") || lowercaseInput.includes("mentorship")) {
      return "Our mentorship program connects you with industry professionals who can guide your career journey. You can check out available mentors in the Mentorship section!";
    } else if (lowercaseInput.includes("roadmap") || lowercaseInput.includes("career path")) {
      return "We offer detailed roadmaps for various career paths in tech, design, and more. Visit the Roadmaps section to explore!";
    } else if (lowercaseInput.includes("career compass") || lowercaseInput.includes("assessment")) {
      return "Our Career Compass tool helps analyze your skills and interests to suggest suitable career paths. Try it out in the Career Compass section!";
    } else if (lowercaseInput.includes("login") || lowercaseInput.includes("sign up") || lowercaseInput.includes("account")) {
      return "You can create an account or login by clicking the profile icon in the top-right corner of the site.";
    } else if (lowercaseInput.includes("thank")) {
      return "You're welcome! Feel free to ask if you need anything else.";
    } else if (lowercaseInput.includes("help") || lowercaseInput.includes("assistance")) {
      return "I can help with information about career guidance, mentorship, roadmaps, and navigating our platform. What specifically would you like to know?";
    } else {
      return "I'm still learning! For more specific guidance, try visiting our Career Compass section for personalized career advice or check out our Mentorship section to connect with industry professionals.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-guidost-600 hover:bg-guidost-700 shadow-lg z-50"
        title="Chat with GuiDost Assistant"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-guidost-600 to-guidost-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-semibold">GuiDost Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-guidost-700/50 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-guidost-600 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 text-gray-800 rounded-lg p-3">
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
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-guidost-600 hover:bg-guidost-700 text-white"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotAssistant;
