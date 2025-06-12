import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "../data/mockCourses";

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  const getLevelColor = (level: string) => {
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

  const getRandomPoints = () => {
    return Math.floor(Math.random() * 50) + 100; // Random points between 100-150
  };

  const getRandomTool = () => {
    const tools = ["Cinema 4D", "Adobe XD", "VS Code", "Figma", "Blender"];
    return tools[Math.floor(Math.random() * tools.length)];
  };

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
                <span className="text-muted-foreground">{getRandomTool()}</span>
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