
import { toast } from "sonner";

// Define the interfaces for our API requests and responses
export interface ChatMessage {
  id?: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatRequest {
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
}

class AIService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem("ai_api_key", key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("ai_api_key");
    }
    return this.apiKey;
  }

  async generateResponse(conversationHistory: ChatMessage[]): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error("API key not set. Please enter your OpenAI API key.");
    }

    try {
      // Prepare the messages in the format expected by OpenAI
      const messages = [
        {
          role: "system" as const,
          content: "You are CareerCompass, an AI career guidance assistant. You help students and professionals with career advice, skill development suggestions, and education pathways. Provide concise, personalized advice based on the user's interests and questions. Your responses should be helpful, encouraging, and practical."
        },
        ...conversationHistory.map(msg => ({
          role: msg.sender === "user" ? "user" as const : "assistant" as const,
          content: msg.text
        }))
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 500,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate response");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating AI response:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
}

export const aiService = new AIService();
