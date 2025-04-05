
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lightbulb, Send } from "lucide-react";

interface ReflectionQuestion {
  id: number;
  text: string;
}

interface StudentReflectionProps {
  feedbackText: string;
}

const DEFAULT_QUESTIONS: ReflectionQuestion[] = [
  { id: 1, text: "What are the main points from this feedback that you found helpful?" },
  { id: 2, text: "What specific areas will you focus on improving based on this feedback?" },
  { id: 3, text: "What will you do differently next time?" },
  { id: 4, text: "What resources might you need to implement these changes?" },
  { id: 5, text: "How will you measure your progress on these improvements?" }
];

const StudentReflection: React.FC<StudentReflectionProps> = ({ feedbackText }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState<{questionId: number; answer: string}[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflectionText(e.target.value);
  };

  const handleSubmitReflection = () => {
    if (!reflectionText.trim()) {
      toast.error("Please enter your reflection before submitting");
      return;
    }

    const currentQuestion = DEFAULT_QUESTIONS[currentQuestionIndex];
    
    // Save the current reflection
    setReflections([...reflections, {
      questionId: currentQuestion.id,
      answer: reflectionText
    }]);
    
    // Clear the text area
    setReflectionText("");
    
    if (currentQuestionIndex < DEFAULT_QUESTIONS.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered
      setIsComplete(true);
      toast.success("Reflection complete! Thank you for your thoughtful responses.");
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < DEFAULT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setReflectionText("");
    setReflections([]);
    setIsComplete(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {isComplete ? "Reflection Complete" : "Reflect on Your Feedback"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isComplete ? (
          <>
            <div className="bg-mentor-50 p-4 rounded-md border border-mentor-200">
              <p className="font-medium text-mentor-700 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Question {currentQuestionIndex + 1} of {DEFAULT_QUESTIONS.length}
              </p>
              <p className="mt-2 text-gray-700">{DEFAULT_QUESTIONS[currentQuestionIndex].text}</p>
            </div>
            <Textarea
              placeholder="Type your reflection here..."
              className="min-h-[120px]"
              value={reflectionText}
              onChange={handleTextChange}
            />
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-700">
              You've completed all reflection questions. Your responses have been saved.
            </p>
            <div className="bg-guidost-50 p-4 rounded-md border border-guidost-200">
              <p className="font-medium text-guidost-700">Your Reflections:</p>
              {reflections.map((reflection, index) => (
                <div key={index} className="mt-3 pb-3 border-b border-gray-200 last:border-0">
                  <p className="font-medium text-gray-700">{DEFAULT_QUESTIONS.find(q => q.id === reflection.questionId)?.text}</p>
                  <p className="mt-1 text-gray-600">{reflection.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isComplete ? (
          <>
            <Button
              variant="outline"
              onClick={handleSkipQuestion}
            >
              Skip
            </Button>
            <Button
              variant="default"
              className="gradient-button"
              onClick={handleSubmitReflection}
              disabled={!reflectionText.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={handleRestart}
            className="mx-auto"
          >
            Start New Reflection
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StudentReflection;
