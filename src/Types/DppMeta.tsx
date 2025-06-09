export interface DppMeta {
  _id: string;
  createdAt: string;
  class: string;
  subject: string;
  topic: string;
  chapter: string;
  questions?: [];
}

export interface DppQuestions {
  questionId: string;
  questionType: string;
  subject: string;
}

export interface DppStatus {
  description: string;
  status: string;
}

export interface Homework {
  _id: string;
  createdAt: string;
  class: string;
  subject: string;
  target: string;
  link: string;
}
