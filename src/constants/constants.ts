  import { Home, BookOpen, Calendar, BarChart3,MessageCircle,Settings,Search,Bell} from 'lucide-react'; 

  export const settingsSections = [
    { id: 'appearance', label: 'Appearance', color: 'bg-red-500' },
    { id: 'personal', label: 'Personal information', color: 'bg-blue-500' },
    { id: 'security', label: 'Security', color: 'bg-red-500' },
    { id: 'billing', label: 'Billing information', color: 'bg-cyan-500' },
    { id: 'messages', label: 'Messages', color: 'bg-blue-500' },
    { id: 'data', label: 'Data export', color: 'bg-blue-500' }
  ];

 export const courseStats = [
      {
        title: 'UX Research',
        category: 'UI/UX Design',
        color: 'from-yellow-400 to-orange-500',
        gradientId: 'gradient1',
        startColor: '#facc15',
        endColor: '#f97316',
        weekProgress: 75,
        monthProgress: 60,
        totalProgress: 85
      },
      {
        title: 'Machine Learning',
        category: 'Data Science',
        color: 'from-orange-400 to-red-500',
        gradientId: 'gradient2',
        startColor: '#fb923c',
        endColor: '#ef4444',
        weekProgress: 65,
        monthProgress: 70,
        totalProgress: 80
      },
      {
        title: 'Responsive Design',
        category: 'UI/UX Design',
        color: 'from-blue-400 to-purple-500',
        gradientId: 'gradient3',
        startColor: '#60a5fa',
        endColor: '#a855f7',
        weekProgress: 80,
        monthProgress: 75,
        totalProgress: 90
      },
      {
        title: '3D Modelling',
        category: 'Art & Design',
        color: 'from-purple-400 to-blue-500',
        gradientId: 'gradient4',
        startColor: '#c084fc',
        endColor: '#3b82f6',
        weekProgress: 55,
        monthProgress: 45,
        totalProgress: 65
      }
    ];
  
   export const learningData = [
      { month: 'Jan', complete: 15, progress: 25, total: 40 },
      { month: 'Feb', complete: 25, progress: 35, total: 60 },
      { month: 'Mar', complete: 45, progress: 25, total: 70 },
      { month: 'Apr', complete: 35, progress: 40, total: 75 },
      { month: 'May', complete: 50, progress: 30, total: 80 },
      { month: 'Jun', complete: 40, progress: 35, total: 75 },
      { month: 'Jul', complete: 55, progress: 25, total: 80 },
      { month: 'Aug', complete: 45, progress: 30, total: 75 },
      { month: 'Sep', complete: 35, progress: 40, total: 75 },
      { month: 'Oct', complete: 50, progress: 25, total: 75 },
      { month: 'Nov', complete: 40, progress: 30, total: 70 },
      { month: 'Dec', complete: 60, progress: 20, total: 80 }
    ];
  
    export const barChartData = [
      { label: 'June 10', value: 2000, color: 'bg-orange-500' },
      { label: 'Aug 10', value: 3000, color: 'bg-blue-500' },
      { label: 'Sep 10', value: 3500, color: 'bg-purple-500' },
      { label: 'Oct 10', value: 2500, color: 'bg-pink-500' },
      { label: 'Nov 10', value: 4000, color: 'bg-blue-400' }
    ];

     export const sidebarItems = [
    { icon: Home, label: 'Overview', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/' },
    { icon: Calendar, label: 'Planning', path: '/' },
    { icon: BarChart3, label: 'Statistics', path: '/statistics' }
  ];

 export const activityData = [
  { month: '10 Oct', theory: 20, practice: 15 },
  { month: '12 Oct', theory: 18, practice: 22 },
  { month: '14 Oct', theory: 25, practice: 18 },
  { month: '16 Oct', theory: 22, practice: 28 },
  { month: '18 Oct', theory: 30, practice: 25 },
  { month: '20 Oct', theory: 28, practice: 32 },
  { month: '22 Oct', theory: 35, practice: 30 },
  { month: '24 Oct', theory: 32, practice: 35 }
];

export const statisticsData = [
  { year: '2017', value: 300 },
  { year: '2018', value: 450 },
  { year: '2019', value: 380 },
  { year: '2020', value: 520 },
  { year: '2021', value: 420 },
  { year: '2022', value: 480 }
];

export const courseProgressData = [
  { name: 'Progress', value: 75, color: 'hsl(var(--primary))' },
  { name: 'Remaining', value: 25, color: 'hsl(var(--muted))' }
];

export const planningItems = [
  {
    id: 1,
    title: "3D Animation Conference",
    date: "December 14, 05:30 PM",
    gradient: "from-pink-500 to-purple-600"
  },
  {
    id: 2,
    title: "Handle UX Research",
    date: "December 18, 10:30 PM",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: 3,
    title: "Machine Learning Lesson",
    date: "December 18, 10:30 PM",
    gradient: "from-red-500 to-orange-600"
  },
  {
    id: 4,
    title: "3D Animation Conference",
    date: "December 22, 10:30 PM",
    gradient: "from-blue-400 to-green-500"
  }
];

export const completedCourses = [
  { name: "Java Code", progress: 75, total: 100, color: "orange" },
  { name: "Design Basic", progress: 65, total: 100, color: "blue" },
  { name: "Team Building", progress: 30, total: 100, color: "purple" },
  { name: "Business Marketing", progress: 20, total: 100, color: "gray" }
];

export const topTutors = [
  { name: "Anna Karlos", subject: "Programming", avatar: "🧑‍💻" },
  { name: "Karla May", subject: "Maths", avatar: "👩‍🏫" }
];