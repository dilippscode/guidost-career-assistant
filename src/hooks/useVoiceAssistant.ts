
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  text: string;
  sender: "user" | "assistant";
}

interface UseVoiceAssistantProps {
  speak?: (text: string) => void;
}

export const useVoiceAssistant = ({ speak }: UseVoiceAssistantProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm GuiDost Voice Assistant. How can I help you today?",
      sender: "assistant"
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  const navigate = useNavigate();

  const addMessage = (text: string, sender: "user" | "assistant") => {
    setMessages(prev => [...prev, { text, sender }]);
    
    if (sender === "user") {
      // Add to command history for user messages
      setCommandHistory(prev => [text, ...prev]);
    } else if (voiceEnabled && speak && sender === "assistant") {
      // Speak assistant messages if voice is enabled
      speak(text);
    }
  };

  const processCommand = async (command: string) => {
    addMessage(command, "user");
    setIsProcessing(true);
    
    // A small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Process navigation commands
      if (/go to|navigate to|open|show|take me to/i.test(command)) {
        if (/home|landing|main/i.test(command)) {
          addMessage("Navigating to the home page...", "assistant");
          navigate("/");
        } else if (/mentor|mentorship/i.test(command)) {
          addMessage("Navigating to the mentorship page...", "assistant");
          navigate("/mentorship");
        } else if (/career|compass/i.test(command)) {
          addMessage("Navigating to the Career Compass page...", "assistant");
          navigate("/career-compass");
        } else if (/roadmap|roadmaps/i.test(command)) {
          addMessage("Navigating to the roadmaps page...", "assistant");
          navigate("/roadmaps");
        } else if (/voice feedback|feedback/i.test(command)) {
          addMessage("Navigating to the Voice Feedback page...", "assistant");
          navigate("/voice-feedback");
        } else if (/study|notes|resources/i.test(command)) {
          addMessage("Navigating to the Study Resources page...", "assistant");
          navigate("/study-resources");
        } else if (/login|sign in/i.test(command)) {
          addMessage("Navigating to the login page...", "assistant");
          navigate("/login");
        } else if (/signup|register|sign up/i.test(command)) {
          addMessage("Navigating to the signup page...", "assistant");
          navigate("/signup");
        } else {
          addMessage("I'm not sure where you want to go. Could you be more specific?", "assistant");
        }
      }
      // Handle search commands
      else if (/search for|find|look for|research/i.test(command)) {
        const searchTerm = command.replace(/search for|find|look for|research/i, "").trim();
        if (searchTerm) {
          if (/notes|study|resources/i.test(command)) {
            addMessage(`Taking you to Study Resources to search for "${searchTerm}"...`, "assistant");
            navigate("/study-resources", { state: { searchQuery: searchTerm } });
          } else {
            addMessage(`Searching for "${searchTerm}"...`, "assistant");
            // Here you would integrate with your search functionality
            toast.info(`Search functionality for "${searchTerm}" would be triggered here`);
          }
        } else {
          addMessage("What would you like to search for?", "assistant");
        }
      }
      // Handle information requests
      else if (/what is|tell me about|explain|how does/i.test(command)) {
        if (/guidost/i.test(command)) {
          addMessage("GuiDost is an educational platform that offers career guidance, mentorship, and learning roadmaps to help you navigate your educational and professional journey.", "assistant");
        } else if (/career compass/i.test(command)) {
          addMessage("Career Compass is an AI-powered tool that helps you explore career options based on your interests, skills, and goals. It provides personalized guidance and recommendations.", "assistant");
        } else if (/mentorship/i.test(command)) {
          addMessage("The mentorship program connects you with industry professionals who can provide guidance, feedback, and support as you navigate your educational and career path.", "assistant");
        } else if (/roadmaps/i.test(command)) {
          addMessage("Roadmaps are structured learning paths that guide you through the skills and knowledge you need to achieve specific career goals. They provide step-by-step guidance for your learning journey.", "assistant");
        } else if (/voice feedback/i.test(command)) {
          addMessage("Voice Feedback is a tool that converts text feedback into natural-sounding voice, making it more engaging and accessible for students, especially those with reading difficulties.", "assistant");
        } else if (/study resources|study notes/i.test(command)) {
          addMessage("Study Resources is a feature that allows you to search for and create notes on various subjects. You can save important information from web searches for easy reference during your studies.", "assistant");
        } else {
          addMessage("I don't have specific information about that topic. Could you ask about GuiDost, Career Compass, Mentorship, Roadmaps, or Study Resources?", "assistant");
        }
      }
      // Handle clear history command
      else if (/clear history/i.test(command)) {
        clearHistory();
        addMessage("Command history cleared.", "assistant");
      }
      // Handle note creation commands
      else if (/create note|add note|save note|new note/i.test(command)) {
        addMessage("I'll help you create a new note. Navigating to the Study Resources page...", "assistant");
        navigate("/study-resources", { state: { activeTab: "create" } });
      }
      // Default response for unrecognized commands
      else {
        addMessage("I'm not sure how to help with that. Try asking about GuiDost features or use navigation commands like 'Go to mentorship' or 'Search for study notes'.", "assistant");
      }
    } catch (error) {
      console.error("Error processing command:", error);
      addMessage("Sorry, I encountered an error. Please try again.", "assistant");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearHistory = () => {
    setCommandHistory([]);
    toast.success("Command history cleared");
  };

  return {
    messages,
    isProcessing,
    voiceEnabled,
    setVoiceEnabled,
    processCommand,
    commandHistory,
    clearHistory
  };
};
