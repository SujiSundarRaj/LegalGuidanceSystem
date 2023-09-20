export interface QnaModel {
  question: string;
  explanation: string;
  date: string;
  location: string;
  answers: Answer[];
  showAnswers?: boolean;
  id: number;
}

export interface Answer {
  answer_text: string;
  author: string;
  date_posted: string;
  private_message: string;
}
