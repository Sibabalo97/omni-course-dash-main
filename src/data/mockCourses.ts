
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

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "UI Styleguide With Figma",
    instructor: "Jonathan Due",
    category: "UI/UX Design",
    difficulty: "Intermediate",
    description: "Learn how to create comprehensive UI styleguides using Figma for consistent design systems.",
    fullDescription: "In this comprehensive UI design course, you'll learn how to create professional styleguides using Figma. Master the art of creating consistent design systems that scale across products and teams. You'll work on real-world projects and build a portfolio that showcases your UI design skills.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    studentsEnrolled: 2847,
    duration: "12 weeks",
    lessons: 24,
    points: 150,
    skills: ["Figma", "UI Design", "Design Systems", "Typography"],
    whatYouWillLearn: [
      "Create comprehensive UI styleguides",
      "Build scalable design systems",
      "Master Figma advanced features",
      "Design consistent user interfaces"
    ],
    requirements: ["Basic design knowledge", "Figma account", "Computer with internet"],
    isBestseller: true
  },
  {
    id: 2,
    title: "Interaction Design With Figma",
    instructor: "Kilian James",
    category: "UI/UX Design",
    difficulty: "Beginner",
    description: "Master interactive prototyping and animation techniques in Figma for engaging user experiences.",
    fullDescription: "Dive deep into interaction design with this hands-on Figma course. Learn to create engaging prototypes, micro-interactions, and animations that bring your designs to life. Perfect for beginners looking to enhance their UX skills.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    price: 79.99,
    rating: 4.6,
    studentsEnrolled: 1923,
    duration: "8 weeks",
    lessons: 18,
    points: 120,
    skills: ["Figma", "Prototyping", "Animation", "UX Design"],
    whatYouWillLearn: [
      "Create interactive prototypes",
      "Design micro-interactions",
      "Master Figma's animation tools",
      "Build engaging user experiences"
    ],
    requirements: ["No prior experience needed", "Figma account"],
    isNew: true
  },
  {
    id: 3,
    title: "3D Illustration Design",
    instructor: "Sarah Martinez",
    category: "Art & Design",
    difficulty: "Advanced",
    description: "Create stunning 3D illustrations and graphics for modern web and mobile applications.",
    fullDescription: "Push the boundaries of visual design with this advanced 3D illustration course. Learn industry-standard techniques for creating eye-catching 3D graphics that enhance user interfaces and marketing materials.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    studentsEnrolled: 1456,
    duration: "16 weeks",
    lessons: 32,
    points: 200,
    skills: ["Blender", "Cinema 4D", "3D Modeling", "Visual Design"],
    whatYouWillLearn: [
      "Master 3D modeling techniques",
      "Create photorealistic renders",
      "Design for web and mobile",
      "Build a professional portfolio"
    ],
    requirements: ["Basic design knowledge", "Powerful computer", "3D software"]
  },
  {
    id: 4,
    title: "Web App Design With Figma",
    instructor: "Michael Chen",
    category: "Web Development",
    difficulty: "Intermediate",
    description: "Design modern web applications with professional layouts, components, and user flows.",
    fullDescription: "Learn to design complete web applications from concept to high-fidelity mockups. This course covers responsive design principles, component libraries, and modern web design trends.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    price: 99.99,
    rating: 4.7,
    studentsEnrolled: 3201,
    duration: "10 weeks",
    lessons: 20,
    points: 160,
    skills: ["Figma", "Web Design", "Responsive Design", "UX/UI"],
    whatYouWillLearn: [
      "Design responsive web layouts",
      "Create component libraries",
      "Master modern design trends",
      "Build complete user flows"
    ],
    requirements: ["Basic Figma knowledge", "Understanding of web basics"],
    isBestseller: true
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Emily Watson",
    category: "Data Science",
    difficulty: "Intermediate",
    description: "Comprehensive introduction to machine learning concepts, algorithms, and practical applications.",
    fullDescription: "Discover the fascinating world of machine learning in this comprehensive course. From basic concepts to advanced algorithms, you'll learn to build and deploy ML models for real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.8,
    studentsEnrolled: 2156,
    duration: "14 weeks",
    lessons: 28,
    points: 180,
    skills: ["Python", "Machine Learning", "Data Analysis", "AI"],
    whatYouWillLearn: [
      "Understand ML algorithms",
      "Build predictive models",
      "Work with real datasets",
      "Deploy ML applications"
    ],
    requirements: ["Basic Python knowledge", "Mathematics background"]
  },
  {
    id: 6,
    title: "Advanced React Development",
    instructor: "Alex Rodriguez",
    category: "Web Development",
    difficulty: "Advanced",
    description: "Master advanced React patterns, state management, and performance optimization techniques.",
    fullDescription: "Take your React skills to the next level with advanced patterns, hooks, and performance optimization. Build scalable applications with modern React ecosystem tools and best practices.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    price: 139.99,
    rating: 4.9,
    studentsEnrolled: 1876,
    duration: "12 weeks",
    lessons: 24,
    points: 190,
    skills: ["React", "TypeScript", "State Management", "Performance"],
    whatYouWillLearn: [
      "Master advanced React patterns",
      "Optimize application performance",
      "Implement complex state management",
      "Build production-ready apps"
    ],
    requirements: ["Solid React foundation", "JavaScript ES6+", "Basic TypeScript"]
  }
];

export const categories = [
  "All",
  "UI/UX Design",
  "Web Development",
  "Data Science",
  "Art & Design"
];

export const difficulties = [
  "All",
  "Beginner",
  "Intermediate", 
  "Advanced"
];
