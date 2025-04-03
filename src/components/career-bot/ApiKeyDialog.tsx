
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

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  handleSaveApiKey: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  apiKey,
  setApiKey,
  handleSaveApiKey
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
