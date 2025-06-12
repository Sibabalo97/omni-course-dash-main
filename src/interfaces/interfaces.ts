
export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  fullDescription: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsEnrolled: number;
  duration: string;
  lessons: number;
  points: number;
  skills: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

