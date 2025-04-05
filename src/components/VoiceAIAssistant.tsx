
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Bot, 
  Settings, 
  MessageSquare,
  Info
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

const VoiceAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  
  const { 
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported
  } = useSpeechRecognition({
    onResult: (text) => {
      setText(text);
    }
  });

  const {
    isSpeaking,
    speak,
    cancel,
    isSupported: isSpeechSupported
  } = useSpeechSynthesis();

  const {
    messages,
    isProcessing,
    voiceEnabled,
    setVoiceEnabled,
    processCommand,
    commandHistory,
    clearHistory
  } = useVoiceAssistant({ speak });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      processCommand(text);
      setText("");
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      setText("");
      startListening();
    }
  };

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      cancel();
    }
    toast.info(voiceEnabled ? "Voice output disabled" : "Voice output enabled");
  };

  // Stop listening when the sheet is closed
  useEffect(() => {
    if (!isOpen && isListening) {
      stopListening();
    }
  }, [isOpen, isListening, stopListening]);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-guidost-600 hover:bg-guidost-700 shadow-lg z-50"
            onClick={() => setIsOpen(true)}
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md md:max-w-lg w-full flex flex-col overflow-hidden">
          <SheetHeader className="pb-2">
            <SheetTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-guidost-600" />
              GuiDost Voice Assistant
            </SheetTitle>
            <SheetDescription>
              Ask for information or use voice commands to navigate the site
            </SheetDescription>
          </SheetHeader>
          
          <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Assistant
              </TabsTrigger>
              <TabsTrigger value="info">
                <Info className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden mt-2">
              <ScrollArea className="flex-1">
                <div className="space-y-4 p-1">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-guidost-600 text-white"
                            : "bg-gray-100 border border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 border border-gray-200 text-gray-800 rounded-lg p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-guidost-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="pt-4">
                {isListening && (
                  <div className="mb-2 px-2">
                    <Badge variant="outline" className="bg-red-50 text-red-600 animate-pulse">
                      Listening... {transcript && `"${transcript}"`}
                    </Badge>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={toggleListening}
                          className={isListening ? "bg-red-50 text-red-500" : ""}
                        >
                          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {isListening ? "Stop listening" : "Start listening"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={toggleVoiceOutput}
                          className={voiceEnabled ? "bg-green-50 text-green-500" : ""}
                        >
                          {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {voiceEnabled ? "Disable voice output" : "Enable voice output"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or speak your command..."
                    className="flex-1"
                  />
                  
                  <Button type="submit" disabled={!text.trim() || isProcessing}>
                    Send
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="flex-1 overflow-hidden mt-2">
              <ScrollArea className="h-full overflow-auto">
                <div className="space-y-4 p-1">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Voice Commands</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You can use the following voice commands to navigate the site:
                    </p>
                    <div className="space-y-2">
                      <div className="p-2 border rounded-md">
                        <p className="font-medium">Navigation</p>
                        <ul className="text-sm text-muted-foreground pl-5 list-disc">
                          <li>"Go to home"</li>
                          <li>"Take me to mentorship"</li>
                          <li>"Open career compass"</li>
                          <li>"Show roadmaps"</li>
                          <li>"Navigate to voice feedback"</li>
                        </ul>
                      </div>
                      
                      <div className="p-2 border rounded-md">
                        <p className="font-medium">Information</p>
                        <ul className="text-sm text-muted-foreground pl-5 list-disc">
                          <li>"What is GuiDost?"</li>
                          <li>"Tell me about career compass"</li>
                          <li>"How does mentorship work?"</li>
                          <li>"Explain roadmaps"</li>
                        </ul>
                      </div>
                      
                      <div className="p-2 border rounded-md">
                        <p className="font-medium">Actions</p>
                        <ul className="text-sm text-muted-foreground pl-5 list-disc">
                          <li>"Search for [term]"</li>
                          <li>"Log me in" / "Sign me in"</li>
                          <li>"Create an account" / "Sign up"</li>
                          <li>"Clear history"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Command History</h3>
                    {commandHistory.length > 0 ? (
                      <>
                        <div className="space-y-2">
                          {commandHistory.slice(0, 10).map((cmd, i) => (
                            <div key={i} className="text-sm p-2 border rounded-md flex justify-between">
                              <span>{cmd}</span>
                              <span className="text-muted-foreground text-xs">
                                {new Date().toLocaleTimeString()}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-2 w-full text-xs"
                          onClick={clearHistory}
                        >
                          Clear History
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">No commands yet</p>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default VoiceAIAssistant;
