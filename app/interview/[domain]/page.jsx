"use client";

import { useState, useEffect } from "react";
import questionsData from "../questions.json";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DomainPage() {
  const { domain } = useParams();
  const decodedDomain = decodeURIComponent(domain);

  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (!domain) return;
    const decodedDomain = decodeURIComponent(domain);
    const domainData = questionsData.find(
      (item) => item.domain.toLowerCase() === decodedDomain.toLowerCase()
    );

    if (domainData) {
      setQuestions(domainData.questions);
    } else {
      setQuestions([]);
    }
    setCurrent(0);
    setShowAnswer(false);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [domain]);

  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg">No questions found for "{domain}"</p>
        <Button className="mt-4" onClick={() => router.push("/interview")}>
          Go Back
        </Button>
      </div>
    );
  }

  const question = questions[current];

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    setIsCorrect(opt === question.answer);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4">
      {/* Heading below fixed header */}
      <h1 className="text-4xl font-extrabold mt-28 mb-8 capitalize bg-gradient-to-r from-gray-400 via-gray-400 to-pink-400 bg-clip-text text-transparent tracking-wide">
        {decodedDomain} Interview Questions
      </h1>

      {/* MCQ Card - No internal scroll, centered */}
      <Card className="bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-3xl mx-auto min-h-[50vh] flex flex-col justify-between border border-gray-700">
        <div>
          <CardHeader>
            <CardTitle>
              Question {current + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{question.question}</p>
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let borderColor = "border-transparent";
                if (selectedOption === opt) {
                  borderColor = isCorrect ? "border-green-500" : "border-red-500";
                }
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className={`px-4 py-2 bg-gray-700 rounded cursor-pointer border-2 ${borderColor} hover:bg-gray-600`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>

            {showAnswer && (
              <div className="mt-4">
                <p className="text-green-400">
                  <strong>Answer:</strong> {question.answer}
                </p>
                {question.explanation && (
                  <p className="mt-2 text-gray-300">{question.explanation}</p>
                )}
              </div>
            )}

          </CardContent>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              setCurrent((prev) => Math.max(prev - 1, 0));
              setShowAnswer(false);
              setSelectedOption(null);
              setIsCorrect(null);
            }}
            disabled={current === 0}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowAnswer((prev) => !prev)}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              if (current < questions.length - 1) {
                setCurrent((prev) => prev + 1);
                setShowAnswer(false);
                setSelectedOption(null);
                setIsCorrect(null);
              }
            }}
            disabled={current === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </Card>

      {/* Always visible Back button */}
      <div className="mt-6">
        <Button
          variant="secondary"
          onClick={() => router.push("/interview")}
          className="mx-auto block"
        >
          Back to Interview
        </Button>
        <br></br>
      </div>
    </div>
  );
}
