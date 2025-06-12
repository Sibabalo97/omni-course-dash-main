
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import DashboardOverview from '../components/DashboardOverview';
import CourseFilters from '../components/CourseFilters';
import CourseComparison from '../components/CourseComparison';
import { mockCourses, Course } from '../data/mockCourses';
import { 
  BookOpen, 
  Users,
  Star,
  Heart,
  GitCompare,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // View state
  const [currentView, setCurrentView] = useState<'dashboard' | 'courses'>('dashboard');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Favorites and comparison states
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Course[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(course.id);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showFavoritesOnly, favorites]);

  const handleToggleFavorite = (courseId: number) => {
    const course = mockCourses.find(c => c.id === courseId);
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

  const handleToggleCompare = (course: Course) => {
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

  const handleRemoveFromCompare = (courseId: number) => {
    setCompareList(prev => prev.filter(c => c.id !== courseId));
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
                Showing {filteredCourses.length} of {mockCourses.length} courses
                {showFavoritesOnly && ` (${favorites.length} favorites)`}
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/course/${course.id}`)}
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
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <span className="text-gray-400 text-sm">{course.category}</span>
                    </div>

                    <h3 
                      className="font-semibold text-lg mb-2 text-white cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-3">{course.instructor}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
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

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {course.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">${course.originalPrice}</span>
                        )}
                        <span className="text-white font-bold text-lg">${course.price}</span>
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
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setShowFavoritesOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
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
