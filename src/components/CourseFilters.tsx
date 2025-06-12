import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';

/**
 * Interface representing a course object from the API
 * @interface Course
 * @property {number} id - The unique identifier for the course
 * @property {string} title - The title of the course
 * @property {string} price - The price of the course
 * @property {string} points - The points awarded for completing the course
 * @property {string} rating - The rating of the course
 * @property {string} skills - The skills covered in the course
 * @property {string} lessons - The number of lessons in the course
 * @property {string} category - The category of the course
 * @property {string} duration - The duration of the course
 * @property {string} imageUrl - The URL of the course image
 * @property {string} difficulty - The difficulty level of the course
 * @property {string} instructor - The instructor of the course
 * @property {string} description - A brief description of the course
 * @property {string} isBestseller - Indicates if the course is a bestseller
 * @property {string} requirements - The requirements for the course
 * @property {string} originalPrice - The original price before discount
 * @property {string} fullDescription - The full description of the course
 * @property {string} studentsEnrolled - The number of students enrolled
 * @property {string} whatYouWillLearn - What students will learn in the course
 */
interface Course {
  id: number;
  isNew: string;
  price: string;
  title: string;
  points: string;
  rating: string;
  skills: string;
  lessons: string;
  category: string;
  duration: string;
  imageUrl: string;
  difficulty: string;
  instructor: string;
  description: string;
  isBestseller: string;
  requirements: string;
  originalPrice: string;
  fullDescription: string;
  studentsEnrolled: string;
  whatYouWillLearn: string;
}

/**
 * Interface for the props of CourseFilters component
 * @interface CourseFiltersProps
 * @property {string} searchQuery - The current search query
 * @property {function} setSearchQuery - Function to update the search query
 * @property {string} selectedCategory - The currently selected category
 * @property {function} setSelectedCategory - Function to update the selected category
 * @property {string} selectedDifficulty - The currently selected difficulty level
 * @property {function} setSelectedDifficulty - Function to update the selected difficulty
 * @property {boolean} showFavoritesOnly - Flag to show only favorites
 * @property {function} setShowFavoritesOnly - Function to toggle favorites filter
 */
interface CourseFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
}

/**
 * Component for filtering courses with various criteria
 * @param {CourseFiltersProps} props - The props for the component
 * @returns {JSX.Element} The rendered component
 */
const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  showFavoritesOnly,
  setShowFavoritesOnly
}) => {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [difficulties, setDifficulties] = useState<string[]>(['All']);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches course data from the API and extracts unique categories and difficulties
   * @async
   * @function fetchCourseData
   * @returns {Promise<void>}
   */
  const fetchCourseData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Course[]>('https://api-generator.retool.com/JUg8eh/data');
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(response.data.map(course => course.category))] as string[];
      
      // Extract unique difficulties
      const uniqueDifficulties = ['All', ...new Set(response.data.map(course => course.difficulty))] as string[];
      
      setCategories(uniqueCategories);
      setDifficulties(uniqueDifficulties);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch course data');
      setLoading(false);
      console.error('Error fetching course data:', err);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (loading) {
    return <div className="bg-gray-800 rounded-xl p-6 mb-8 text-white">Loading filters...</div>;
  }

  if (error) {
    return <div className="bg-gray-800 rounded-xl p-6 mb-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category} {category !== 'All' ? 'Courses' : 'Categories'}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        >
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty} {difficulty !== 'All' ? 'Level' : 'Levels'}
            </option>
          ))}
        </select>

        {/* Favorites Toggle */}
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="whitespace-nowrap"
        >
          {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
        </Button>
      </div>
    </div>
  );
};

export default CourseFilters;