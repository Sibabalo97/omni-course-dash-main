import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import DashboardOverview from '../components/DashboardOverview';
import CourseFilters from '../components/CourseFilters';
import CourseComparison from '../components/CourseComparison';
import { CourseTable } from "@/components/CourseTable";
import {
  BookOpen,
  Users,
  Star,
  Heart,
  GitCompare,
  Clock,
  LayoutDashboard,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';




/**
 * Course interface definition based on API response structure
 * @typedef {Object} Course
 * @property {number} id - Unique course identifier
 * @property {string} title - Course title
 * @property {string} instructor - Course instructor name
 * @property {string} description - Short course description
 * @property {string} fullDescription - Detailed course description
 * @property {string} category - Course category
 * @property {string} difficulty - Course difficulty level (Beginner, Intermediate, Advanced)
 * @property {string} price - Course price
 * @property {string} originalPrice - Original price before discount
 * @property {string} rating - Course rating
 * @property {string} studentsEnrolled - Number of enrolled students
 * @property {string} lessons - Number of lessons
 * @property {string} duration - Course duration
 * @property {string} imageUrl - Course thumbnail image URL
 * @property {string} skills - Required skills
 * @property {string} requirements - Course requirements
 * @property {string} whatYouWillLearn - Learning outcomes
 * @property {string} points - Course points
 * @property {string} isNew - Flag indicating if course is new
 * @property {string} isBestseller - Flag indicating if course is bestseller
 */

/**
 * API configuration constants
 */
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 10000,
};


/**
 * Main Index component for the course dashboard
 * Handles course data fetching, filtering, favorites, and comparison functionality
 * @component
 * @returns {JSX.Element} The rendered Index component
 */
const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // View state
  const [currentView, setCurrentView] = useState('dashboard');

  // Data state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites and comparison states
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  /**
   * Fetches course data from the API
   * @async
   * @function fetchCourses
   * @returns {Promise<void>}
   */
  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_CONFIG.BASE_URL, {
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Transform API data to ensure consistent structure
      const transformedCourses = response.data.map(course => ({
        ...course,
        // Convert string numbers to numbers for certain fields with null checks
        id: parseInt(course.id) || 0,
        price: parseFloat(course.price) || 0,
        originalPrice: course.originalPrice ? parseFloat(course.originalPrice) : null,
        rating: parseFloat(course.rating) || 0,
        studentsEnrolled: parseInt(course.studentsEnrolled) || 0,
        lessons: parseInt(course.lessons) || 0,
        // Convert string flags to boolean with null checks
        isNew: course.isNew === 'true' || course.isNew === '1' || course.isNew === true,
        isBestseller: course.isBestseller === 'true' || course.isBestseller === '1' || course.isBestseller === true,
        // Ensure string fields are never null
        title: course.title || 'Untitled Course',
        instructor: course.instructor || 'Unknown Instructor',
        description: course.description || 'No description available',
        fullDescription: course.fullDescription || 'No detailed description available',
        category: course.category || 'Uncategorized',
        difficulty: course.difficulty || 'Beginner',
        duration: course.duration || 'Not specified',
        imageUrl: course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
        skills: course.skills || 'Not specified',
        requirements: course.requirements || 'No specific requirements',
        whatYouWillLearn: course.whatYouWillLearn || 'Learning outcomes not specified',
        points: course.points || '0',
      }));

      setCourses(transformedCourses);

      toast({
        title: "Courses loaded successfully",
        description: `Loaded ${transformedCourses.length} courses`,
      });

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch courses';
      setError(errorMessage);

      toast({
        title: "Error loading courses",
        description: errorMessage,
        variant: "destructive"
      });

      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Effect hook to fetch courses on component mount
   */
  useEffect(() => {
    fetchCourses();
  }, []);

  /**
   * Filter courses based on search query and filter criteria
   * @useMemo
   * @returns {Array<Course>} Filtered courses array
   */
  const filteredCourses = useMemo(() => {
    if (!courses.length) return [];

    return courses.filter(course => {
      // Safe string operations with null checks
      const safeTitle = course.title || '';
      const safeInstructor = course.instructor || '';
      const safeDescription = course.description || '';
      const safeCategory = course.category || '';
      const safeDifficulty = course.difficulty || '';

      const matchesSearch = safeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        safeInstructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        safeDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || safeCategory === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || safeDifficulty === selectedDifficulty;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(course.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, showFavoritesOnly, favorites]);

  /**
   * Toggles a course in the favorites list
   * @function handleToggleFavorite
   * @param {number} courseId - The ID of the course to toggle
   */
  const handleToggleFavorite = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setFavorites(prev => {
      const newFavorites = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];

      toast({
        title: prev.includes(courseId) ? "Removed from favorites" : "Added to favorites",
        description: prev.includes(courseId)
          ? `${course.title} has been removed from your favorites`
          : `${course.title} has been added to your favorites`,
      });

      return newFavorites;
    });
  };

  /**
   * Toggles a course in the comparison list
   * @function handleToggleCompare
   * @param {Course} course - The course object to toggle
   */
  const handleToggleCompare = (course) => {
    setCompareList(prev => {
      const exists = prev.find(c => c.id === course.id);
      if (exists) {
        return prev.filter(c => c.id !== course.id);
      } else if (prev.length < 3) {
        return [...prev, course];
      } else {
        toast({
          title: "Maximum comparison limit",
          description: "You can only compare up to 3 courses at a time",
          variant: "destructive"
        });
        return prev;
      }
    });
  };

  /**
   * Removes a course from the comparison list
   * @function handleRemoveFromCompare
   * @param {number} courseId - The ID of the course to remove
   */
  const handleRemoveFromCompare = (courseId) => {
    setCompareList(prev => prev.filter(c => c.id !== courseId));
  };

  /**
   * Returns appropriate CSS class for difficulty badge color
   * @function getDifficultyColor
   * @param {string} difficulty - The difficulty level
   * @returns {string} CSS class for difficulty color
   */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-orange-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  /**
   * Clears all active filters
   * @function clearFilters
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setShowFavoritesOnly(false);
  };

  /**
   * Handles retry functionality when data loading fails
   * @function handleRetry
   */
  const handleRetry = () => {
    fetchCourses();
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-lg">Loading courses...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error && !courses.length) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-red-500 mb-2">Error Loading Courses</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={handleRetry} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">
              {currentView === 'dashboard' ? 'Dashboard Overview' : 'Course Catalog'}
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={currentView === 'courses' ? 'default' : 'outline'}
                onClick={() => setCurrentView('courses')}
                className="flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Courses</span>
              </Button>
            </div>
          </div>
          {currentView === 'courses' && compareList.length > 0 && (
            <Button
              onClick={() => setShowComparison(true)}
              className="flex items-center space-x-2"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare ({compareList.length})</span>
            </Button>
          )}
        </div>

        {currentView === 'dashboard' ? (
          <DashboardOverview />
        ) : (
          <>
            <CourseFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
            />

            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredCourses.length} of {courses.length} courses
                {showFavoritesOnly && ` (${favorites.length} favorites)`}
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'}
                      alt={course.title || 'Course thumbnail'}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/course/${course.id}`)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {course.isBestseller && (
                        <Badge className="bg-orange-500">Bestseller</Badge>
                      )}
                      {course.isNew && (
                        <Badge className="bg-green-500">New</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleToggleFavorite(course.id)}
                        className="h-8 w-8"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(course.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleToggleCompare(course)}
                        className={`h-8 w-8 ${compareList.find(c => c.id === course.id) ? 'bg-blue-500' : ''}`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getDifficultyColor(course.difficulty || 'Beginner')}>
                        {course.difficulty || 'Beginner'}
                      </Badge>
                      <span className="text-gray-400 text-sm">{course.category || 'Uncategorized'}</span>
                    </div>

                    <h3
                      className="font-semibold text-lg mb-2 text-white cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      {course.title || 'Untitled Course'}
                    </h3>

                    <p className="text-gray-400 text-sm mb-3">{course.instructor || 'Unknown Instructor'}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description || 'No description available'}</p>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{(course.studentsEnrolled || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons || 0} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {course.originalPrice && course.originalPrice > 0 && (
                          <span className="text-gray-500 line-through text-sm">${course.originalPrice}</span>
                        )}
                        <span className="text-white font-bold text-lg">${course.price || 0}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        View Course
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredCourses.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Course Listing Table */}
            {filteredCourses.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Course Listing</h2>
                  <div className="text-gray-400">
                    Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                  </div>
                </div>
                <CourseTable courses={filteredCourses} />
              </div>
            )}

            {/* Course Comparison Modal */}
            {showComparison && (
              <CourseComparison
                courses={compareList}
                onRemoveCourse={handleRemoveFromCompare}
                onClose={() => setShowComparison(false)}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;