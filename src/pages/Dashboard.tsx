
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

const Dashboard = () => {
  const { notifications } = useAuth();
  const [currentMonth] = useState('May/Jun 2025');
  const [totalRetired] = useState(145);
  const [newMembers] = useState(21);
  const [upcomingEvents] = useState(3);
  const [completedEvents] = useState(36);

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
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
        
        {/* Notifications Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Recent Notifications</h2>
            
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-blue-400'}`}
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
