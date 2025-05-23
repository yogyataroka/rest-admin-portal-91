
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead
} from '@/components/ui/table';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NepaliCalendar from '@/components/NepaliCalendar';
import { useAuth } from '@/context/AuthContext';
import { CalendarDays, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { notifications } = useAuth();
  const [currentMonth] = useState('May/Jun 2025');
  const [totalRetired] = useState(145);
  const [newMembers] = useState(21);
  const [upcomingEvents] = useState(3);
  const [completedEvents] = useState(36);

  // Sample upcoming events data
  const upcomingEventsData = [
    {
      id: 1,
      date: '15',
      month: 'May',
      title: 'Community Meeting',
      location: 'Ntc Hall, Chaunni',
      time: '10:00 AM'
    },
    {
      id: 2,
      date: '22',
      month: 'May',
      title: 'Trip To Swoyambhu',
      location: 'Swoyambhu',
      time: '8:00 AM'
    },
    {
      id: 3,
      date: '28',
      month: 'May',
      title: 'Workshop',
      location: 'Ntc Hall, Chaunni',
      time: '2:00 PM'
    }
  ];

  // Simulate adding a notification when the dashboard loads
  const { addNotification } = useAuth();
  useEffect(() => {
    // Only add this notification once when the component mounts
    addNotification({
      title: "Welcome Back",
      message: "Welcome to your REST admin dashboard"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-[#1E4E9D] mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Welcome to REST admin dashboard</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-700">Total Retired Employee</h2>
              <p className="text-3xl font-bold mt-2">{totalRetired}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-700">New Member</h2>
              <p className="text-3xl font-bold mt-2">{newMembers}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-700">Upcoming Events</h2>
              <p className="text-3xl font-bold mt-2">{upcomingEvents}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-700">Events Already Completed</h2>
              <p className="text-3xl font-bold mt-2">{completedEvents}</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-[#1E4E9D] mb-4">Upcoming Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEventsData.map((event) => (
                <Card key={event.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col items-center bg-[#1E4E9D] text-white rounded-lg p-3 min-w-[60px]">
                        <span className="text-lg font-bold">{event.date}</span>
                        <span className="text-xs uppercase">{event.month}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-[#1E4E9D] mb-4">Recent Notifications</h2>
            
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-[#1E4E9D]'}`}
                  >
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      {notification.timestamp.toLocaleTimeString()} - {notification.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent notifications
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Nepali Calendar Section */}
        <div className="mt-6">
          <NepaliCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
