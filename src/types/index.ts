export interface Lesson {
  tag: string;
  title: string;
  description: string;
  duration: string;
  detailedExplanation: string;
}

export interface Admission {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
  details: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low' | 'Өндөр' | 'Дунд' | 'Бага';
  content: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

// Define the form state types
export type NewAdmission = {
  title: string;
  date: string;
  description: string;
  icon: string;
  details: string;
};

export type NewAnnouncement = {
  title: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low' | 'Өндөр' | 'Дунд' | 'Бага';
  content: string;
};

export type NewNewsArticle = {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
};
