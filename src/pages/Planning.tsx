import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Plus, Filter } from 'lucide-react';

const Planning = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const planningItems = [
    {
      id: 1,
      title: "3D Animation Conference",
      description: "Join industry leaders for cutting-edge animation techniques",
      date: "December 14, 2024",
      time: "05:30 PM",
      type: "conference",
      status: "upcoming",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      id: 2,
      title: "Handle UX Research",
      description: "Complete user research analysis for mobile app project",
      date: "December 18, 2024",
      time: "10:30 AM",
      type: "task",
      status: "upcoming",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 3,
      title: "Machine Learning Lesson",
      description: "Advanced neural networks and deep learning fundamentals",
      date: "December 18, 2024",
      time: "02:30 PM",
      type: "lesson",
      status: "upcoming",
      gradient: "from-red-500 to-orange-600"
    },
    {
      id: 4,
      title: "3D Animation Workshop",
      description: "Hands-on workshop for character animation techniques",
      date: "December 22, 2024",
      time: "10:30 AM",
      type: "workshop",
      status: "scheduled",
      gradient: "from-blue-400 to-green-500"
    },
    {
      id: 5,
      title: "Team Building Session",
      description: "Collaborative project planning and team coordination",
      date: "December 15, 2024",
      time: "03:00 PM",
      type: "meeting",
      status: "completed",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'conference', label: 'Conferences' },
    { value: 'lesson', label: 'Lessons' },
    { value: 'task', label: 'Tasks' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'meeting', label: 'Meetings' }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? planningItems 
    : planningItems.filter(item => item.type === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'scheduled': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planning</h1>
            <p className="text-muted-foreground mt-2">Manage your schedule and upcoming events</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter by:</span>
              <div className="flex space-x-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredItems.length} events
            </div>
          </div>
        </Card>

        {/* Planning Items */}
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">No events match your current filter criteria.</p>
            <Button onClick={() => setSelectedFilter('all')}>
              Show All Events
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Planning;