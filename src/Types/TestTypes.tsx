export interface AttemdedTestQuestion {
  questionType: "integer" | "single_choice" | "multiple_choice" | "boolean";
  subject: string;
  questionId: string;
  _id: string;
}

export interface AttendedTests {
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  studentId: string;
  liveTestId: LiveTestAttempted;
  _id: string;
}

export interface LiveTestAttempted {
  _id: string;
  canAttempt: boolean;
  date: string; // ISO string, e.g., "2025-05-15T00:00:00.000Z"
  category: string;
  testName: string;
  time: string; // e.g., "15:53"
  timeDuration: number; // duration in seconds or ms depending on your usage
  timestamp: number; // e.g., 1747247400000 (UNIX timestamp in ms)
  Questions: AttemdedTestQuestion[];
  __v: number;
}
