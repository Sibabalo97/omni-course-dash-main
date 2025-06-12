import React from 'react';
import { X, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
 * @property {number} price - Course price
 * @property {number|null} originalPrice - Original price before discount
 * @property {number} rating - Course rating
 * @property {number} studentsEnrolled - Number of enrolled students
 * @property {number} lessons - Number of lessons
 * @property {string} duration - Course duration
 * @property {string} imageUrl - Course thumbnail image URL
 * @property {string} skills - Required skills (comma-separated string from API)
 * @property {string} requirements - Course requirements
 * @property {string} whatYouWillLearn - Learning outcomes
 * @property {string} points - Course points
 * @property {boolean} isNew - Flag indicating if course is new
 * @property {boolean} isBestseller - Flag indicating if course is bestseller
 */

/**
 * Props interface for CourseComparison component
 * @typedef {Object} CourseComparisonProps
 * @property {Course[]} courses - Array of courses to compare
 * @property {Function} onRemoveCourse - Callback function to remove a course from comparison
 * @property {Function} onClose - Callback function to close the comparison modal
 */

/**
 * CourseComparison component for displaying side-by-side course comparisons
 * Renders a modal with detailed comparison of selected courses
 * 
 * @component
 * @param {CourseComparisonProps} props - Component props
 * @returns {JSX.Element|null} The rendered CourseComparison component or null if no courses
 * 
 * @example
 * <CourseComparison
 *   courses={[course1, course2, course3]}
 *   onRemoveCourse={(id) => handleRemove(id)}
 *   onClose={() => setShowComparison(false)}
 * />
 */
const CourseComparison = ({
  courses,
  onRemoveCourse,
  onClose
}) => {
  // Early return if no courses to compare
  if (!courses || courses.length === 0) return null;

  /**
   * Returns appropriate CSS class for difficulty badge color
   * @function getDifficultyColor
   * @param {string} difficulty - The difficulty level
   * @returns {string} CSS class for difficulty color
   */
  const getDifficultyColor = (difficulty) => {
    const safeDifficulty = difficulty || 'Beginner';
    switch(safeDifficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-orange-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  /**
   * Parses skills string from API into array and handles display logic
   * @function parseSkills
   * @param {string} skillsString - Comma-separated skills string from API
   * @returns {string[]} Array of individual skills
   */
  const parseSkills = (skillsString) => {
    if (!skillsString || typeof skillsString !== 'string') return [];
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  };

  /**
   * Formats number with proper fallbacks for display
   * @function formatNumber
   * @param {number|string} value - Number to format
   * @param {number} fallback - Fallback value if input is invalid
   * @returns {number} Formatted number
   */
  const formatNumber = (value, fallback = 0) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? fallback : num;
  };

  /**
   * Handles image loading errors by setting fallback image
   * @function handleImageError
   * @param {Event} event - Image error event
   */
  const handleImageError = (event) => {
    event.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Course Comparison</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              // Parse skills for this course
              const skillsArray = parseSkills(course.skills);
              const displaySkills = skillsArray.slice(0, 3);
              const remainingSkillsCount = Math.max(0, skillsArray.length - 3);

              return (
                <div key={course.id} className="bg-gray-700 rounded-lg p-4 relative">
                  {/* Remove Course Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => onRemoveCourse(course.id)}
                    aria-label={`Remove ${course.title || 'course'} from comparison`}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  {/* Course Image */}
                  <img
                    src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'}
                    alt={course.title || 'Course thumbnail'}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    onError={handleImageError}
                  />

                  {/* Course Title and Instructor */}
                  <h3 className="font-semibold text-lg mb-2 pr-8">
                    {course.title || 'Untitled Course'}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {course.instructor || 'Unknown Instructor'}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-3">
                    {/* Price Comparison */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Price</span>
                      <div className="flex items-center space-x-2">
                        {course.originalPrice && course.originalPrice > 0 && (
                          <span className="text-gray-500 line-through text-sm">
                            ${formatNumber(course.originalPrice)}
                          </span>
                        )}
                        <span className="font-bold">
                          ${formatNumber(course.price)}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{formatNumber(course.rating, 0)}</span>
                      </div>
                    </div>

                    {/* Student Enrollment */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Students</span>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{formatNumber(course.studentsEnrolled, 0).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || 'Not specified'}</span>
                      </div>
                    </div>

                    {/* Lessons Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Lessons</span>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{formatNumber(course.lessons, 0)}</span>
                      </div>
                    </div>

                    {/* Difficulty Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Level</span>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty || 'Beginner'}
                      </Badge>
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Category</span>
                      <span className="text-sm">{course.category || 'Uncategorized'}</span>
                    </div>

                    {/* Points */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Points</span>
                      <span className="text-sm font-medium">
                        {course.points || '0'} pts
                      </span>
                    </div>

                    {/* Skills Section */}
                    <div>
                      <span className="text-gray-400 text-sm">Skills</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {displaySkills.length > 0 ? (
                          <>
                            {displaySkills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {remainingSkillsCount > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                +{remainingSkillsCount}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Not specified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Course Badges */}
                    <div className="flex flex-wrap gap-2">
                      {course.isNew && (
                        <Badge className="bg-green-500 text-xs">New</Badge>
                      )}
                      {course.isBestseller && (
                        <Badge className="bg-orange-500 text-xs">Bestseller</Badge>
                      )}
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <Button 
                    className="w-full mt-4"
                    onClick={() => {
                      // You can add navigation or enrollment logic here
                      console.log(`Enrolling in course: ${course.title}`);
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 pt-4 border-t border-gray-600">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Comparing {courses.length} course{courses.length > 1 ? 's' : ''}
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Close Comparison
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComparison;