
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { mockCourses } from '../data/mockCourses';
import { BookOpen, Users, Clock, Star, Heart, Share2, Play, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  const course = mockCourses.find(c => c.id === parseInt(id || '0'));

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

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${course.title} has been removed from your favorites`
        : `${course.title} has been added to your favorites`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-orange-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
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
                        {course.skills.map((skill, index) => (
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
                      ({course.studentsEnrolled.toLocaleString()} students)
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
                    <span>{course.studentsEnrolled.toLocaleString()}</span>
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
            <div className="bg-gray-800 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Students Also Bought</h3>
              <div className="space-y-4">
                {mockCourses
                  .filter(c => c.id !== course.id && c.category === course.category)
                  .slice(0, 2)
                  .map((relatedCourse) => (
                    <div 
                      key={relatedCourse.id}
                      className="flex space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
                      onClick={() => navigate(`/course/${relatedCourse.id}`)}
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;
