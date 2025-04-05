
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useStudentReflection } from "@/hooks/useStudentReflection";
import ReflectionQuestion from "@/components/student-reflection/ReflectionQuestion";
import ReflectionSummary from "@/components/student-reflection/ReflectionSummary";

interface StudentReflectionProps {
  feedbackText: string;
}

const StudentReflection: React.FC<StudentReflectionProps> = ({ feedbackText }) => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    reflectionText,
    reflections,
    isComplete,
    questions,
    handleTextChange,
    handleSubmitReflection,
    handleSkipQuestion,
    handleRestart
  } = useStudentReflection({ feedbackText });

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {isComplete ? "Reflection Complete" : "Reflect on Your Feedback"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isComplete ? (
          <ReflectionQuestion
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            reflectionText={reflectionText}
            onTextChange={handleTextChange}
          />
        ) : (
          <ReflectionSummary 
            reflections={reflections} 
            questions={questions} 
          />
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
