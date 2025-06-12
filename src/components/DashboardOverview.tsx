
import React from 'react';
import { Calendar, Users, TrendingUp, PlayCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {activityData,planningItems, statisticsData, courseProgressData, completedCourses, topTutors} from '../constants/constants'

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Activities</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Theory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Practice</span>
                </div>
                <select className="bg-muted border border-border rounded px-2 py-1 text-sm text-foreground">
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <Bar dataKey="theory" fill="#f97316" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="practice" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-foreground">21 Hours</span>
            </div>
          </Card>
        </div>

        {/* My Planning */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">My Planning</h3>
            <select className="bg-muted border border-border rounded px-2 py-1 text-sm text-foreground">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div className="space-y-3">
            {planningItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics */}
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Statistics</h3>
            <select className="bg-muted border border-border rounded px-2 py-1 text-sm text-foreground">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statisticsData}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} className="text-muted-foreground" />
                <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Course Activities */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Course Activities</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {courseProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">75%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              <span className="text-sm text-muted-foreground">In Process</span>
            </div>
          </div>
        </Card>

        {/* Completed Courses */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Completed Course</h3>
          <div className="space-y-4">
            {completedCourses.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground text-sm">{course.name}</span>
                  <span className="text-muted-foreground text-sm">{course.progress}/{course.total}</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Tutors */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Top Tutors</h3>
          <span className="text-muted-foreground text-sm">Add they to list</span>
        </div>
        <div className="flex space-x-6">
          {topTutors.map((tutor) => (
            <div key={tutor.name} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                {tutor.avatar}
              </div>
              <div>
                <p className="text-foreground font-medium">{tutor.name}</p>
                <p className="text-muted-foreground text-sm">{tutor.subject}</p>
              </div>
              <Button size="icon" variant="outline" className="ml-4">
                <Users className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
