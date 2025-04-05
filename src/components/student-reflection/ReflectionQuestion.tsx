
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { ReflectionQuestion as QuestionType } from "@/hooks/useStudentReflection";

interface ReflectionQuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  reflectionText: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReflectionQuestion: React.FC<ReflectionQuestionProps> = ({
  question,
  currentIndex,
  totalQuestions,
  reflectionText,
  onTextChange
}) => {
  return (
    <>
      <div className="bg-mentor-50 p-4 rounded-md border border-mentor-200">
        <p className="font-medium text-mentor-700 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <p className="mt-2 text-gray-700">{question.text}</p>
      </div>
      <Textarea
        placeholder="Type your reflection here..."
        className="min-h-[120px]"
        value={reflectionText}
        onChange={onTextChange}
      />
    </>
  );
};

export default ReflectionQuestion;
