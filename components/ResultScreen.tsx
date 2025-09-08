import React from 'react';

interface ResultScreenProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    const getRemark = () => {
        if (percentage >= 90) return { text: "Excellent!", color: "text-green-500" };
        if (percentage >= 75) return { text: "Great Job!", color: "text-blue-500" };
        if (percentage >= 50) return { text: "Good Effort!", color: "text-yellow-500" };
        return { text: "Keep Practicing!", color: "text-red-500" };
    };

    const remark = getRemark();

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Quiz Completed!</h1>
            
            <div className="my-8">
                <p className="text-lg text-slate-600">Your Score:</p>
                <p className="text-6xl sm:text-7xl font-bold text-indigo-600 my-2">{score} <span className="text-2xl sm:text-3xl text-slate-400">/ {totalQuestions}</span></p>
                <p className="text-xl sm:text-2xl font-semibold text-slate-700">{percentage}%</p>
            </div>

            <div className={`text-2xl sm:text-3xl font-bold mb-8 ${remark.color}`}>
                {remark.text}
            </div>

            <button
                onClick={onRestart}
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform hover:-translate-y-1"
            >
                Try Again
            </button>
        </div>
    );
};

export default ResultScreen;