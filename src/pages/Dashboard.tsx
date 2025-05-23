
import React, { useState } from 'react';
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

const Dashboard = () => {
  const [currentMonth] = useState('May/Jun 2025');
  const [totalRetired] = useState(145);
  const [newMembers] = useState(21);
  const [upcomingEvents] = useState(3);
  const [completedEvents] = useState(36);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">Welcome to dashboard</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
          
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-gray-700">Upcoming Events</h2>
              
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-2 px-0">Event</TableHead>
                    <TableHead className="py-2 px-0">Date</TableHead>
                    <TableHead className="py-2 px-0"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="py-2 px-0">Social Gathering</TableCell>
                    <TableCell className="py-2 px-0">Jestha 20, 2082</TableCell>
                    <TableCell className="py-2 px-0">
                      <button className="text-blue-600 hover:underline">View</button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2 px-0">Yoga Workshop</TableCell>
                    <TableCell className="py-2 px-0">Jestha 20, 2082</TableCell>
                    <TableCell className="py-2 px-0">
                      <button className="text-blue-600 hover:underline">View</button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2 px-0">Health Awareness Program</TableCell>
                    <TableCell className="py-2 px-0">Jestha 20, 2082</TableCell>
                    <TableCell className="py-2 px-0">
                      <button className="text-blue-600 hover:underline">View</button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2 px-0">Yoga Workshop</TableCell>
                    <TableCell className="py-2 px-0">Jestha 20, 2082</TableCell>
                    <TableCell className="py-2 px-0">
                      <button className="text-blue-600 hover:underline">View</button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
        
        <div className="mt-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button className="rounded-md border px-3 py-1 bg-gray-100">आज</button>
                  <button className="rounded-md border px-3 py-1 bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 2h2v2H5V6zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm4-8h2v2H9V6zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="rounded-md border px-3 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-md border px-3 py-1 text-lg">«</button>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">२०८२</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">जेठ</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button className="rounded-md border px-3 py-1 text-lg">»</button>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-red-600">२०८२ जेठ | {currentMonth}</h2>
                </div>
              </div>
              
              {/* Calendar goes here - simplified for this example */}
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 text-center font-medium border-b bg-gray-100">
                  <div className="py-2">Sunday</div>
                  <div className="py-2">Monday</div>
                  <div className="py-2">Tuesday</div>
                  <div className="py-2">Wednesday</div>
                  <div className="py-2">Thursday</div>
                  <div className="py-2">Friday</div>
                  <div className="py-2">Saturday</div>
                </div>
                <div className="grid grid-cols-7 text-center">
                  {/* Calendar rows and cells would go here */}
                  {/* This is just a placeholder for the calendar */}
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className="border p-2 h-20">
                      {i + 1 <= 31 ? <span>{i + 1}</span> : ''}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
