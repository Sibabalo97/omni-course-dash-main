import { Badge } from "@/components/ui/badge";
import { Table, TableBody,TableCell,TableHead, TableHeader,TableRow} from "@/components/ui/table";
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Interface representing a course object from the API
 * @interface Course
 * @property {number} id - The unique identifier for the course
 * @property {string} title - The title of the course
 * @property {string} category - The category of the course
 * @property {string} difficulty - The difficulty level of the course
 * @property {string} lessons - The number of lessons in the course
 * @property {string} skills - The skills covered in the course
 */
interface Course {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  lessons: string;
  skills: string;
}

/**
 * Props for the CourseTable component
 * @interface CourseTableProps
 * @property {Course[]} [courses] - Optional array of courses (if not provided, will fetch from API)
 */
interface CourseTableProps {
  courses?: Course[];
}

/**
 * Component that displays courses in a table format, fetching data from API if not provided
 * @param {CourseTableProps} props - Component props
 * @returns {JSX.Element} The rendered table component
 */
export function CourseTable({ courses: initialCourses }: CourseTableProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses || []);
  const [loading, setLoading] = useState<boolean>(!initialCourses);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches course data from the API
   * @async
   * @function fetchCourses
   * @returns {Promise<void>}
   */
  const fetchCourses = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Course[]>('https://api-generator.retool.com/JUg8eh/data');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch course data');
      setLoading(false);
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    if (!initialCourses) {
      fetchCourses();
    }
  }, [initialCourses]);

  /**
   * Gets the appropriate color class for a difficulty level badge
   * @function getLevelColor
   * @param {string} level - The difficulty level
   * @returns {string} Tailwind CSS classes for the badge
   */
  const getLevelColor = (level: string): string => {
    switch (level) {
      case "Beginner":
        return "bg-green-500 text-white";
      case "Intermediate":
        return "bg-yellow-500 text-white";
      case "Advanced":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  /**
   * Generates random points between 100-150
   * @function getRandomPoints
   * @returns {number} Random points value
   */
  const getRandomPoints = (): number => {
    return Math.floor(Math.random() * 50) + 100;
  };

  /**
   * Selects a random tool from the course's skills
   * @function getRandomTool
   * @param {string} skills - Comma-separated list of skills
   * @returns {string} A random tool/skill
   */
  const getRandomTool = (skills: string): string => {
    const tools = skills.split(',').map(skill => skill.trim());
    return tools.length > 0 ? tools[Math.floor(Math.random() * tools.length)] : 'N/A';
  };

  if (loading) {
    return <div className="rounded-lg border bg-card p-4 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="rounded-lg border bg-card p-4 text-center text-red-500">{error}</div>;
  }

  if (courses.length === 0) {
    return <div className="rounded-lg border bg-card p-4 text-center">No courses found</div>;
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Tools</TableHead>
            <TableHead>Lessons</TableHead>
            <TableHead className="text-right">Points required</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>
                <span className="text-muted-foreground">{course.category}</span>
              </TableCell>
              <TableCell>
                <Badge className={`${getLevelColor(course.difficulty)} text-xs`}>
                  {course.difficulty}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">{getRandomTool(course.skills)}</span>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">{course.lessons} tutorials</span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-medium text-green-400">{getRandomPoints()} points</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}