import React from 'react';

interface StartScreenProps {
    onStart: () => void;
    onResume: () => void;
    hasSavedProgress: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onResume, hasSavedProgress }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-all hover:scale-105 duration-300">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Art Student Comprehensive Quiz</h1>
            <p className="text-slate-600 mb-6">Test your knowledge across Government, CRS, and Literature.</p>
            <p className="text-slate-500 mb-8">You will have <span className="font-bold text-indigo-600">30 minutes</span> to answer <span className="font-bold text-indigo-600">30 questions</span>.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={onStart}
                    className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform hover:-translate-y-1"
                >
                    Start New Quiz
                </button>
                {hasSavedProgress && (
                    <button
                        onClick={onResume}
                        className="w-full sm:w-auto bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transform hover:-translate-y-1"
                    >
                        Resume Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default StartScreen;