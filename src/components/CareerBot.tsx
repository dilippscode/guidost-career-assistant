
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CareerBot: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your Career Compass assistant. I can help you explore career paths, provide guidance on skills to develop, or answer questions about different professions. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on your interests in technology and problem-solving, you might want to explore careers in software development, data science, or UX design.",
        "For someone with your academic background, I'd recommend looking into fields like business analytics, marketing technology, or product management.",
        "To develop skills in this area, consider taking online courses in programming, data analysis, or design thinking. Platforms like Coursera and Udemy offer excellent resources.",
        "The job outlook for this field is very positive, with an expected growth rate of 22% over the next decade according to recent industry reports.",
        "Have you considered internships or project-based learning? These can be great ways to gain practical experience while exploring if this career path is right for you.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const newBotMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-guidost-600 to-mentor-600 p-4 text-white">
        <h2 className="text-xl font-semibold">Career Compass Bot</h2>
        <p className="text-white/80 text-sm">
          Your AI-powered guide to career exploration and planning
        </p>
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
            disabled={input.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerBot;
