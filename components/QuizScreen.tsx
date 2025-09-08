import React from 'react';
import type { Question, Answers } from '../types';

interface QuizScreenProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    selectedAnswer?: string;
    onAnswerSelect: (questionId: number, answer: string) => void;
    onNext: () => void;
    onPrev: () => void;
    onSubmit: () => void;
    onSave: () => void;
    timeRemaining: number;
    answers: Answers;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const QuizScreen: React.FC<QuizScreenProps> = ({
    question,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    onAnswerSelect,
    onNext,
    onPrev,
    onSubmit,
    onSave,
    timeRemaining,
    answers
}) => {
    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / totalQuestions) * 100;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-slate-600">
                    <p className="font-semibold">Progress</p>
                    <p className="font-bold text-lg text-indigo-600">{formatTime(timeRemaining)}</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                        className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="text-right text-sm text-slate-500 mt-1">{answeredCount} of {totalQuestions} answered</p>
            </div>

            {/* Question Body */}
            <div className="mb-8">
                <p className="text-sm font-medium text-indigo-500 mb-2">{question.subject}</p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
                    <span className="text-slate-400 mr-2">Q{currentQuestionIndex + 1}.</span>
                    {question.question}
                </h2>
                <div className="space-y-4">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        return (
                            <button
                                key={index}
                                onClick={() => onAnswerSelect(question.id, option)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center
                                    ${isSelected
                                        ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300'
                                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                            >
                                <span className={`mr-4 font-bold text-lg ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className={`text-sm sm:text-base ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>
                                    {option}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-slate-200">
                <button
                    onClick={onSave}
                    className="mt-4 sm:mt-0 text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    Save Progress
                </button>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={onPrev}
                        disabled={currentQuestionIndex === 0}
                        className="w-full sm:w-auto flex-1 bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < totalQuestions - 1 ? (
                        <button
                            onClick={onNext}
                            className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={onSubmit}
                            className="w-full sm:w-auto flex-1 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;