
export interface Question {
    id: number;
    subject: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export type QuizState = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface Answers {
    [questionId: number]: string;
}
