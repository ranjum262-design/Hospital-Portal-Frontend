export interface Topic {
  _id: string;
  title: string;
  description: string;
  category: string; // Yahan se 'Exercise' | 'Nutrition' hata kar sirf string likh dein
  videoUrl?: string;
  notes?: string[];
  isCompleted: boolean;
}