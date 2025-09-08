
import React, { useState, useEffect, useCallback } from 'react';
import { quizQuestions } from './constants/questions';
import type { QuizState, Answers } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds
const LOCAL_STORAGE_KEY = 'artStudentQuizProgress';

const App: React.FC = () => {
    const [quizState, setQuizState] = useState<QuizState>('NOT_STARTED');
    const [answers, setAnswers] = useState<Answers>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME);
    const [score, setScore] = useState<number>(0);
    const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);

    useEffect(() => {
        const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedProgress) {
            setHasSavedProgress(true);
        }
    }, []);

    useEffect(() => {
        if (quizState !== 'IN_PROGRESS') return;

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmitQuiz();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizState]);

    const calculateScore = useCallback(() => {
        let correctAnswers = 0;
        quizQuestions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    }, [answers]);

    const handleSubmitQuiz = useCallback(() => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setQuizState('COMPLETED');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setHasSavedProgress(false);
    }, [calculateScore]);

    const handleStartQuiz = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setTimeRemaining(TOTAL_TIME);
        setQuizState('IN_PROGRESS');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setHasSavedProgress(false);
    };
    
    const handleResumeQuiz = () => {
        const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedProgress) {
            const { savedAnswers, savedTime } = JSON.parse(savedProgress);
            setAnswers(savedAnswers);
            setTimeRemaining(savedTime);
            setCurrentQuestionIndex(Object.keys(savedAnswers).length || 0);
            setQuizState('IN_PROGRESS');
        }
    };

    const handleAnswerSelect = (questionId: number, answer: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleSaveProgress = () => {
        const progress = {
            savedAnswers: answers,
            savedTime: timeRemaining,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
        setHasSavedProgress(true);
        alert('Your progress has been saved!');
    };

    const handleRestartQuiz = () => {
        setQuizState('NOT_STARTED');
        setScore(0);
    };

    const renderContent = () => {
        switch (quizState) {
            case 'NOT_STARTED':
                return <StartScreen onStart={handleStartQuiz} onResume={handleResumeQuiz} hasSavedProgress={hasSavedProgress} />;
            case 'IN_PROGRESS':
                return (
                    <QuizScreen
                        question={quizQuestions[currentQuestionIndex]}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={quizQuestions.length}
                        selectedAnswer={answers[quizQuestions[currentQuestionIndex].id]}
                        onAnswerSelect={handleAnswerSelect}
                        onNext={handleNextQuestion}
                        onPrev={handlePrevQuestion}
                        onSubmit={handleSubmitQuiz}
                        onSave={handleSaveProgress}
                        timeRemaining={timeRemaining}
                        answers={answers}
                    />
                );
            case 'COMPLETED':
                return <ResultScreen score={score} totalQuestions={quizQuestions.length} onRestart={handleRestartQuiz} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
