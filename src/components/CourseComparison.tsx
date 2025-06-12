
import React from 'react';
import { Course } from '../data/mockCourses';
import { X, Star, Users, Clock, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CourseComparisonProps {
  courses: Course[];
  onRemoveCourse: (courseId: number) => void;
  onClose: () => void;
}

const CourseComparison: React.FC<CourseComparisonProps> = ({
  courses,
  onRemoveCourse,
  onClose
}) => {
  if (courses.length === 0) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-orange-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Course Comparison</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-gray-700 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => onRemoveCourse(course.id)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-lg mb-2 pr-8">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{course.instructor}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Price</span>
                    <div className="flex items-center space-x-2">
                      {course.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          ${course.originalPrice}
                        </span>
                      )}
                      <span className="font-bold">${course.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Students</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.studentsEnrolled.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Lessons</span>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Level</span>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="text-sm">{course.category}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm">Skills</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Enroll Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComparison;
