
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProvider } from "@/services/aiService";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  provider: AIProvider;
  setProvider: (provider: AIProvider) => void;
  handleSaveApiKey: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  apiKey,
  setApiKey,
  provider,
  setProvider,
  handleSaveApiKey
}) => {
  const getApiKeyPlaceholder = () => {
    switch (provider) {
      case "openai": return "sk-...";
      case "gemini": return "AI...";
      case "google": return "AIza...";
      default: return "Enter API key";
    }
  };

  const getApiKeyLink = () => {
    switch (provider) {
      case "openai": return "https://platform.openai.com/api-keys";
      case "gemini": return "https://aistudio.google.com/app/apikey";
      case "google": return "https://console.cloud.google.com/apis/credentials";
      default: return "#";
    }
  };

  const getProviderDisplayName = () => {
    switch (provider) {
      case "openai": return "OpenAI";
      case "gemini": return "Google Gemini";
      case "google": return "Google AI";
      default: return provider;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI API Key</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="provider" className="mb-2 block">
              Select AI Provider
            </Label>
            <Select value={provider} onValueChange={(value) => setProvider(value as AIProvider)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select AI Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
                <SelectItem value="google">Google AI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="apiKey" className="mb-2 block">
              Enter your {getProviderDisplayName()} API key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={getApiKeyPlaceholder()}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
            <p className="text-xs text-guidost-600 mt-1">
              <a 
                href={getApiKeyLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-guidost-700"
              >
                Get an API key from {getProviderDisplayName()}
              </a>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
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
  );
};

export default ApiKeyDialog;
