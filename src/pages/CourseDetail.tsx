import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, Users, Clock, Star, Heart, Share2, Play, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

/**
 * API Configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("data from api", API_BASE_URL);

/**
 * Course interface based on API response structure
 * @typedef {Object} Course
 * @property {number} id - Unique course identifier
 * @property {string} title - Course title
 * @property {string} price - Course price
 * @property {string} originalPrice - Original price before discount
 * @property {string} rating - Course rating
 * @property {string} studentsEnrolled - Number of enrolled students
 * @property {string} instructor - Instructor name
 * @property {string} duration - Course duration
 * @property {string} lessons - Number of lessons
 * @property {string} difficulty - Course difficulty level
 * @property {string} category - Course category
 * @property {string} imageUrl - Course thumbnail image URL
 * @property {string} description - Short course description
 * @property {string} fullDescription - Detailed course description
 * @property {string} skills - Comma-separated skills list
 * @property {string} requirements - Course requirements
 * @property {string} whatYouWillLearn - Learning outcomes
 * @property {string} points - Course points
 * @property {string} isNew - Flag indicating if course is new
 * @property {string} isBestseller - Flag indicating if course is bestseller
 */

/**
 * Fetches all courses from the API
 * @returns {Promise<Course[]>} Promise that resolves to array of courses
 */
const fetchCourses = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
};

/**
 * Fetches a specific course by ID from the API
 * @param {string|number} courseId - The course ID to fetch
 * @returns {Promise<Course>} Promise that resolves to course object
 */
const fetchCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    throw new Error(`Failed to fetch course with ID ${courseId}`);
  }
};

/**
 * Fetches related courses by category
 * @param {string} category - Course category to filter by
 * @param {number} excludeId - Course ID to exclude from results
 * @param {number} limit - Maximum number of courses to return
 * @returns {Promise<Course[]>} Promise that resolves to array of related courses
 */
const fetchRelatedCourses = async (category, excludeId, limit = 2) => {
  try {
    const response = await axios.get(API_BASE_URL);
    const courses = response.data;
    return courses
      .filter(course => course.category === category && course.id !== excludeId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related courses:', error);
    throw new Error('Failed to fetch related courses');
  }
};

/**
 * Utility function to parse comma-separated strings into arrays
 * @param {string} str - Comma-separated string
 * @returns {string[]} Array of trimmed strings
 */
const parseCommaSeparatedString = (str) => {
  if (!str || typeof str !== 'string') return [];
  return str.split(',').map(item => item.trim()).filter(item => item.length > 0);
};

/**
 * Utility function to get difficulty badge color
 * @param {string} difficulty - Course difficulty level
 * @returns {string} Tailwind CSS color class
 */
const getDifficultyColor = (difficulty) => {
  switch(difficulty?.toLowerCase()) {
    case 'beginner': return 'bg-green-500';
    case 'intermediate': return 'bg-orange-500';
    case 'advanced': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

/**
 * CourseDetail Component
 * Displays detailed information about a specific course
 * @returns {JSX.Element} CourseDetail component
 */
const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Component state
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * Load course data and related courses
   */
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch main course data
        const courseData = await fetchCourseById(id);
        setCourse(courseData);
        
        // Fetch related courses
        const related = await fetchRelatedCourses(courseData.category, parseInt(id));
        setRelatedCourses(related);
        
      } catch (err) {
        setError(err.message);
        console.error('Failed to load course data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, [id]);

  /**
   * Handle adding/removing course from favorites
   */
  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${course.title} has been removed from your favorites`
        : `${course.title} has been added to your favorites`,
    });
  };

  /**
   * Handle navigation to related course
   * @param {number} courseId - ID of the course to navigate to
   */
  const handleRelatedCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading course details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Course</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>Back to Courses</Button>
        </div>
      </DashboardLayout>
    );
  }

  // Course not found
  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-400 mb-4">Course not found</h1>
          <Button onClick={() => navigate('/')}>Back to Courses</Button>
        </div>
      </DashboardLayout>
    );
  }

  // Parse course data
  const skillsArray = parseCommaSeparatedString(course.skills);
  const requirementsArray = parseCommaSeparatedString(course.requirements);
  const learningOutcomes = parseCommaSeparatedString(course.whatYouWillLearn);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          ← Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl overflow-hidden mb-8">
              <div className="relative h-64 lg:h-80">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {course.isBestseller && (
                    <Badge className="bg-orange-500">Bestseller</Badge>
                  )}
                  {course.isNew && (
                    <Badge className="bg-green-500">New</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 mb-6 border-b border-gray-700">
              {['about', 'details', 'reviews', 'resources'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-800 rounded-xl p-6">
              {activeTab === 'about' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">About this course</h3>
                  <p className="text-gray-300 mb-6">{course.fullDescription}</p>
                  
                  <h4 className="text-lg font-semibold mb-3">What you'll learn</h4>
                  <ul className="space-y-2 mb-6">
                    {learningOutcomes.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {requirementsArray.map((req, index) => (
                      <li key={index} className="text-gray-300">• {req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'details' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Skills you'll gain</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Course Info</h4>
                      <div className="space-y-2 text-gray-300">
                        <p>Duration: {course.duration}</p>
                        <p>Lessons: {course.lessons}</p>
                        <p>Points: {course.points}</p>
                        <p>Level: {course.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <span className="text-2xl font-bold">{course.rating}</span>
                    </div>
                    <span className="text-gray-400">
                      ({parseInt(course.studentsEnrolled).toLocaleString()} students)
                    </span>
                  </div>
                  <p className="text-gray-400">Reviews feature coming soon...</p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Resources</h3>
                  <p className="text-gray-400">Resources and materials will be available after enrollment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  {course.originalPrice && (
                    <span className="text-gray-400 line-through">${course.originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold">${course.price}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{parseInt(course.studentsEnrolled).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleAddToFavorites}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Instructor</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lessons</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Level</span>
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Students Also Bought</h3>
                <div className="space-y-4">
                  {relatedCourses.map((relatedCourse) => (
                    <div 
                      key={relatedCourse.id}
                      className="flex space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
                      onClick={() => handleRelatedCourseClick(relatedCourse.id)}
                    >
                      <img 
                        src={relatedCourse.imageUrl}
                        alt={relatedCourse.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{relatedCourse.title}</h4>
                        <p className="text-xs text-gray-400">{relatedCourse.instructor}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold">${relatedCourse.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{relatedCourse.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;