
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Award, ChevronRight, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CourseQuizProps {
  courseId: string;
  onComplete: (score: number, level: string) => void;
  onSkip?: () => void;
}

const CourseQuiz: React.FC<CourseQuizProps> = ({ courseId, onComplete, onSkip }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  // Quiz data for different courses
  useEffect(() => {
    const quizData: Record<string, QuizQuestion[]> = {
      "web-development": [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Multi Language",
            "Hyper Transfer Markup Language",
            "Hyperlink Text Management Language"
          ],
          correctAnswer: 0,
          explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages."
        },
        {
          id: 2,
          question: "Which of the following is NOT a CSS box model property?",
          options: ["Margin", "Border", "Padding", "Alignment"],
          correctAnswer: 3,
          explanation: "The CSS box model consists of: margins, borders, padding, and the actual content. Alignment is not part of the box model."
        },
        {
          id: 3,
          question: "What is the correct way to declare a JavaScript variable?",
          options: ["variable name = value;", "var name = value;", "v name = value;", "variable: value;"],
          correctAnswer: 1,
          explanation: "In JavaScript, you declare variables using 'var', 'let', or 'const'. 'var name = value;' is correct."
        },
        {
          id: 4,
          question: "Which symbol is used for single-line comments in JavaScript?",
          options: ["//", "/* */", "#", "<!---->"],
          correctAnswer: 0,
          explanation: "In JavaScript, // is used for single-line comments, while /* */ is used for multi-line comments."
        },
        {
          id: 5,
          question: "What does DOM stand for in web development?",
          options: [
            "Document Object Model",
            "Data Object Model",
            "Digital Ordinance Model",
            "Document Orientation Module"
          ],
          correctAnswer: 0,
          explanation: "The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so programs can change the document structure, style, and content."
        }
      ],
      "data-science": [
        {
          id: 1,
          question: "Which of the following is NOT a common Python library used in data science?",
          options: ["Pandas", "NumPy", "Apache", "Matplotlib"],
          correctAnswer: 2,
          explanation: "Apache is not a Python library but a software foundation. Pandas, NumPy, and Matplotlib are all popular Python libraries used in data science."
        },
        {
          id: 2,
          question: "What does the term 'overfitting' refer to in machine learning?",
          options: [
            "When a model performs well on training data but poorly on new data",
            "When a model is too simple to capture the underlying pattern",
            "When a model takes too long to train",
            "When a model uses too much computational resources"
          ],
          correctAnswer: 0,
          explanation: "Overfitting occurs when a model learns the training data too well, including its noise and outliers, resulting in poor performance on new, unseen data."
        },
        {
          id: 3,
          question: "Which measure is used to evaluate the spread of a dataset?",
          options: ["Mean", "Median", "Mode", "Standard Deviation"],
          correctAnswer: 3,
          explanation: "Standard deviation is a measure of the amount of variation or dispersion of a set of values, indicating how spread out the values are."
        },
        {
          id: 4,
          question: "Which algorithm is NOT a supervised learning algorithm?",
          options: ["Linear Regression", "K-Means Clustering", "Random Forest", "Support Vector Machine"],
          correctAnswer: 1,
          explanation: "K-Means Clustering is an unsupervised learning algorithm, while Linear Regression, Random Forest, and Support Vector Machine are all supervised learning algorithms."
        },
        {
          id: 5,
          question: "What does 'p-value' indicate in statistical hypothesis testing?",
          options: [
            "The probability of getting results as extreme as the observed results",
            "The percentage of variance explained by the model",
            "The predictive power of the model",
            "The population variance"
          ],
          correctAnswer: 0,
          explanation: "The p-value indicates the probability of obtaining results at least as extreme as the observed results, assuming that the null hypothesis is true."
        }
      ]
    };

    // Default to web-development if the courseId doesn't exist
    setQuestions(quizData[courseId] || quizData["web-development"]);
  }, [courseId]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === questions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Let's learn from this and move on.",
        variant: "destructive",
      });
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Determine skill level based on score
      const percentage = (score / questions.length) * 100;
      let level = "Beginner";
      
      if (percentage >= 80) {
        level = "Advanced";
      } else if (percentage >= 50) {
        level = "Intermediate";
      }
      
      onComplete(score, level);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center p-8">
            <p>Loading quiz questions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    let message = "";
    let icon = null;
    
    if (percentage >= 80) {
      message = "Excellent! You have advanced knowledge in this area.";
      icon = <Award className="h-12 w-12 text-yellow-500 mb-4" />;
    } else if (percentage >= 50) {
      message = "Good job! You have intermediate knowledge in this area.";
      icon = <Award className="h-12 w-12 text-blue-500 mb-4" />;
    } else {
      message = "You're at the beginning of your journey! Let's start learning.";
      icon = <Award className="h-12 w-12 text-green-500 mb-4" />;
    }
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            {icon}
            <h3 className="text-2xl font-bold mb-2">
              Your Score: {score}/{questions.length}
            </h3>
            <Progress value={percentage} className="h-2 mb-6" />
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-center gap-4">
              <Button onClick={restartQuiz} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Knowledge Check</span>
          <span className="text-sm font-normal text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </CardTitle>
        <Progress 
          value={((currentQuestionIndex) / questions.length) * 100} 
          className="h-2" 
        />
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left p-4 h-auto ${
                    selectedOption === index 
                      ? index === currentQuestion.correctAnswer 
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50"
                      : isAnswered && index === currentQuestion.correctAnswer 
                        ? "border-green-500 bg-green-50" 
                        : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center w-full">
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span className="flex-grow">{option}</span>
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    )}
                    {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500 ml-2" />
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-md mb-4"
          >
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p>{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {onSkip && !isAnswered && (
          <Button variant="ghost" onClick={onSkip}>
            Skip Quiz
          </Button>
        )}
        {!isAnswered && !onSkip && <div></div>}
        {isAnswered && (
          <Button onClick={handleNextQuestion} className="ml-auto flex items-center gap-2">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseQuiz;
