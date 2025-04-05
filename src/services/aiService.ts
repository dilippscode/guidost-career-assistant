
import { toast } from "sonner";

// Define the interfaces for our API requests and responses
export interface ChatMessage {
  id?: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export type AIProvider = "openai" | "gemini";

class AIService {
  private apiKey: string | null = null;
  private provider: AIProvider = "openai";

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem("ai_api_key", key);
    return key;
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("ai_api_key");
    }
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem("ai_api_key");
  }

  setProvider(provider: AIProvider) {
    this.provider = provider;
    localStorage.setItem("ai_provider", provider);
    return provider;
  }

  getProvider(): AIProvider {
    const savedProvider = localStorage.getItem("ai_provider");
    if (savedProvider && (savedProvider === "openai" || savedProvider === "gemini")) {
      this.provider = savedProvider;
    }
    return this.provider;
  }

  async generateResponse(conversationHistory: ChatMessage[]): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error("API key not set. Please enter your API key.");
    }

    const provider = this.getProvider();
    
    try {
      if (provider === "openai") {
        return await this.generateOpenAIResponse(conversationHistory, apiKey);
      } else if (provider === "gemini") {
        return await this.generateGeminiResponse(conversationHistory, apiKey);
      } else {
        throw new Error("Invalid AI provider selected.");
      }
    } catch (error) {
      console.error(`Error generating ${provider} response:`, error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }

  private async generateOpenAIResponse(conversationHistory: ChatMessage[], apiKey: string): Promise<string> {
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
      const errorMessage = errorData.error?.message || "Failed to generate response";
      
      // If the error is related to the API key, clear it
      if (errorMessage.includes("API key") || errorMessage.includes("authentication")) {
        this.clearApiKey();
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async generateGeminiResponse(conversationHistory: ChatMessage[], apiKey: string): Promise<string> {
    const messages = conversationHistory.map(msg => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Add system prompt for Gemini
    const systemPrompt = {
      role: "user" as const,
      parts: [{ 
        text: "You are CareerCompass, an AI career guidance assistant. You help students and professionals with career advice, skill development suggestions, and education pathways. Provide concise, personalized advice based on the user's interests and questions. Your responses should be helpful, encouraging, and practical. From now on, I will be the user asking career questions, and you should respond as CareerCompass."
      }]
    };
    
    // Only add the system prompt if this is the first message
    const formattedMessages = messages.length <= 1 
      ? [systemPrompt, ...messages]
      : messages;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || "Failed to generate response";
      
      // If the error is related to the API key, clear it
      if (errorMessage.includes("API key") || errorMessage.includes("authentication")) {
        this.clearApiKey();
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      throw new Error("No response generated");
    }
    
    return data.candidates[0].content.parts[0].text;
  }
}

export const aiService = new AIService();
