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

export interface Mentor {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export interface MentorReport {
  mentor: Mentor;
  count: string;
}

export interface Report {
  _id: string;
  createdAt: string;
  updatedAt: string;
  report: string;
  message: string;
}
