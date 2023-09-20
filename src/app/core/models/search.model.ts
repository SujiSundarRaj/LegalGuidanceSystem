import { Area } from './solicitor.model';

export interface SearchResult {
  qn: string;
  an: string;
  index: number;
  area: Area;
  topic: Topic;
  isExpanded: boolean;
}

export interface Topic {
  id: number;
  name: string;
}
