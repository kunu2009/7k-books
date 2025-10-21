
export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  progress?: number;
  timeLeft?: string;
  rating: number;
  pages: number;
  language: string;
  tags: string[];
  description: string;
}
