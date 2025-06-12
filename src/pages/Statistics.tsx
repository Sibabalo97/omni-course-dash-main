import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  const courseStats = [
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

  const learningData = [
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

  const barChartData = [
    { label: 'June 10', value: 2000, color: 'bg-orange-500' },
    { label: 'Aug 10', value: 3000, color: 'bg-blue-500' },
    { label: 'Sep 10', value: 3500, color: 'bg-purple-500' },
    { label: 'Oct 10', value: 2500, color: 'bg-pink-500' },
    { label: 'Nov 10', value: 4000, color: 'bg-blue-400' }
  ];

  const CircularProgress = ({ progress, gradientId, startColor, endColor }: { 
    progress: number; 
    gradientId: string;
    startColor: string;
    endColor: string;
  }) => {
    const radius = 45;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${progress / 100 * circumference} ${circumference}`;

    return (
      <div className="relative w-24 h-24">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
          <circle
            stroke="#374151"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={`url(#${gradientId})`}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset: 0 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-semibold">{progress}%</span>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Statistics</h1>

        {/* Course Activity Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Course Activity</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Sort by</span>
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <option>All</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {courseStats.map((course, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {course.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{course.title}</h3>
                    <p className="text-gray-400 text-sm">{course.category}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Week</span>
                    </div>
                    <CircularProgress 
                      progress={course.weekProgress} 
                      gradientId={course.gradientId}
                      startColor={course.startColor}
                      endColor={course.endColor}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Month</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Total</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Points Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Learning Points</h3>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                {[50, 100, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#374151" strokeWidth="1" />
                ))}
                
                {/* Chart lines */}
                <polyline
                  points={learningData.map((point, index) => `${index * 33 + 20},${200 - (point.total * 2)}`).join(' ')}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <polyline
                  points={learningData.map((point, index) => `${index * 33 + 20},${200 - (point.complete * 2)}`).join(' ')}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {learningData.map((point, index) => (
                  <g key={index}>
                    <circle cx={index * 33 + 20} cy={200 - (point.total * 2)} r="3" fill="#3B82F6" />
                    <circle cx={index * 33 + 20} cy={200 - (point.complete * 2)} r="3" fill="#10B981" />
                  </g>
                ))}
              </svg>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs">
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>10</span>
              </div>
              
              {/* X-axis labels */}
              <div className="flex justify-between text-gray-400 text-xs mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-20 left-60 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
              <div>Total Point: 125</div>
              <div>Complete: 25</div>
              <div>Progress: 05</div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Learning Points</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>4k</span>
                <span>3k</span>
                <span>2k</span>
                <span>1k</span>
                <span>0</span>
              </div>
              
              <div className="flex items-end space-x-4 h-48">
                {barChartData.map((bar, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-12 ${bar.color} rounded-t`}
                      style={{ height: `${(bar.value / 4000) * 100}%` }}
                    ></div>
                    <span className="text-gray-400 text-xs">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
