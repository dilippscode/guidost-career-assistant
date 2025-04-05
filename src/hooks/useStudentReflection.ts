
import { useState } from "react";
import { toast } from "sonner";

export interface ReflectionQuestion {
  id: number;
  text: string;
}

export interface ReflectionAnswer {
  questionId: number;
  answer: string;
}

const DEFAULT_QUESTIONS: ReflectionQuestion[] = [
  { id: 1, text: "What are the main points from this feedback that you found helpful?" },
  { id: 2, text: "What specific areas will you focus on improving based on this feedback?" },
  { id: 3, text: "What will you do differently next time?" },
  { id: 4, text: "What resources might you need to implement these changes?" },
  { id: 5, text: "How will you measure your progress on these improvements?" }
];

interface UseStudentReflectionProps {
  feedbackText: string;
}

export const useStudentReflection = ({ feedbackText }: UseStudentReflectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState<ReflectionAnswer[]>([]);
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

  return {
    currentQuestion: DEFAULT_QUESTIONS[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: DEFAULT_QUESTIONS.length,
    reflectionText,
    reflections,
    isComplete,
    questions: DEFAULT_QUESTIONS,
    handleTextChange,
    handleSubmitReflection,
    handleSkipQuestion,
    handleRestart
  };
};
