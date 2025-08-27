import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Test } from "@shared/schema";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function TestPage() {
  const [, params] = useRoute("/test/:id");
  const testId = params?.id;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const { data: test, isLoading } = useQuery<Test>({
    queryKey: ["/api/tests", testId],
    enabled: !!testId,
  });

  const submitAnswersMutation = useMutation({
    mutationFn: async (testAnswers: Record<string, number>) => {
      return apiRequest("POST", `/api/tests/${testId}/submit`, { answers: testAnswers });
    },
    onSuccess: () => {
      toast({
        title: "Test Completed",
        description: "Your test has been submitted successfully. We'll be in touch soon!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/tests"] });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your test...</p>
        </div>
      </div>
    );
  }

  if (!test || test.completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {test?.completed ? "Test Already Completed" : "Test Not Found"}
            </h1>
            <p className="text-muted-foreground">
              {test?.completed 
                ? "You have already completed this test. We'll be in touch soon!"
                : "The test you're looking for doesn't exist or has been removed."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const questions: Question[] = test.questions || [];
  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Submit test
      submitAnswersMutation.mutate(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">No Questions Available</h1>
            <p className="text-muted-foreground">This test doesn't have any questions configured.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Healthcare Skills Assessment</h1>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" data-testid="progress-bar" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl" data-testid="question-title">
                {currentQuestionData.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestionData.id]?.toString()}
                onValueChange={handleAnswerSelect}
                className="space-y-4"
                data-testid="answer-options"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  data-testid="button-previous"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestionData.id] && answers[currentQuestionData.id] !== 0}
                  data-testid="button-next"
                >
                  {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
