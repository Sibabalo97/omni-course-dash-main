Course Catalog App


A modern and responsive course catalog web application built with React, TypeScript, and Tailwind CSS. It allows users to explore, filter, compare, and track online courses with features such as favorites, theme toggling, and learning statistics.

Features



Search: Search courses by title, instructor, or description

Course Comparison: Compare multiple courses side-by-side


Detailed Course Pages: View course curriculum, requirements, and reviews


Favorites System: Save and manage favorite courses


Responsive Design: Optimized for desktop, tablet, and mobile


Dark/Light Mode: Switch between dark and light themes


Statistics Dashboard: Visualize progress and performance

Technology Stack

Frontend: React 18 + TypeScript

Build Tool: Vite

Styling: Tailwind CSS

UI Components: 

State Management: React Query (@tanstack/react-query)

Routing: React Router DOM

Icons: Lucide React

Charts: Recharts

Prerequisites

Node.js (v18 or higher)

npm or yarn

Installation & Setup
Clone the repository


git clone https://github.com/Sibabalo97/omni-course-dash-main.git

cd omni-course-dash-main

Install dependencies


npm install

Start the development server

npm run dev
Visit the app
Open your browser and go to http://localhost:8080

Available Scripts
npm run dev - Start development server

npm run build - Build app for production

npm run lint - Run ESLint

Data Source
This app fetches data from a live API endpoint:


https://api-generator.retool.com/JUg8eh/data




Sample Course Data (JSON Format)


{
  "id": 4,
  "isNew": "",
  "price": "99.99",
  "title": "Web App Design With Figma",
  "points": "160",
  "rating": "4.7",
  "skills": "Figma, Web Design, Responsive Design, UX/UI",
  "lessons": "20",
  "category": "Web Development",
  "duration": "10 weeks",
  "imageUrl": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
  "difficulty": "Intermediate",
  "instructor": "Michael Chen",
  "description": "Design modern web applications with professional layouts, components, and user flows.",
  "isBestseller": "True",
  "requirements": "Basic Figma knowledge, Understanding of web basics",
  "originalPrice": "",
  "fullDescription": "Learn to design complete web applications from concept to high-fidelity mockups. This course covers responsive design principles, component libraries, and modern web design trends.",
  "studentsEnrolled": "3201",
  "whatYouWillLearn": "Design responsive web layouts, Create component libraries, Master modern design trends, Build complete user flows"
}


Project Structure

src/
├── components/           # Reusable UI components
│   ├── ui/              # ui components
│   ├── CourseFilters.tsx
│   ├── CourseComparison.tsx
│   └── ThemeToggle.tsx
├── contexts/            # React context for theming
│   └── ThemeContext.tsx
├── data/                # Mock data and types
│   └── mockCourses.ts
├── pages/               # Page components
│   ├── Index.tsx
│   ├── CourseDetail.tsx
│   ├── Statistics.tsx
│   └── Settings.tsx
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions


Pages Overview

Home Page (Course Catalog)
Course grid view

Search bar

Filters (category, difficulty)

Sort options

Add/remove favorites

Course Detail Page
Full description and curriculum

Tabs for Overview, Requirements, Reviews

Add to favorites

Related course suggestions

Statistics Page

Progress charts

Course completion stats

Visual performance metrics

Settings Page

Theme toggle

Account preferences

Notification settings