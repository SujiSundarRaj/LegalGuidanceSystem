import { Topic } from './search.model';

export interface QnaModel {
  question: string;
  explanation: string;
  date: string;
  location: string;
  answers: Answer[];
  showAnswers?: boolean;
  category: Topic;
  subCategory: Topic;
  id: number;
}

export interface Answer {
  answer_text: string;
  author: string;
  date_posted: string;
  private_message: string;
}
