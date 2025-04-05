
import React from "react";
import type { ReflectionAnswer, ReflectionQuestion } from "@/hooks/useStudentReflection";

interface ReflectionSummaryProps {
  reflections: ReflectionAnswer[];
  questions: ReflectionQuestion[];
}

const ReflectionSummary: React.FC<ReflectionSummaryProps> = ({ reflections, questions }) => {
  return (
    <div className="space-y-4">
      <p className="text-center text-gray-700">
        You've completed all reflection questions. Your responses have been saved.
      </p>
      <div className="bg-guidost-50 p-4 rounded-md border border-guidost-200">
        <p className="font-medium text-guidost-700">Your Reflections:</p>
        {reflections.map((reflection, index) => (
          <div key={index} className="mt-3 pb-3 border-b border-gray-200 last:border-0">
            <p className="font-medium text-gray-700">{questions.find(q => q.id === reflection.questionId)?.text}</p>
            <p className="mt-1 text-gray-600">{reflection.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReflectionSummary;
