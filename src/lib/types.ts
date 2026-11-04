export type Metadata = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Paged<T> = {
  data: T[];
  metadata: Metadata;
};

export type Diploma = {
  id: string;
  title: string;
  description: string | null;
};

export type Exam = {
  id: string;
  title: string;
  duration: number;
  questionsCount: number;
};

export type Question = {
  id: string;
  text: string;
  answers: { id: string; text: string }[];
};

export type Submission = {
  id: string;
  score: number | null;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
};

export type Result = {
  payload: {
    submission: Submission;
    analytics: {
      questionId: string;
      questionText: string;
      isCorrect: boolean;
      correctAnswer?: { text?: string } | null;
    }[];
  };
};
