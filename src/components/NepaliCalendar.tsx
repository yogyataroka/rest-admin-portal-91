
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  nepaliMonths, 
  englishEquivalents,
  getDaysInNepaliMonth,
  generateNepaliCalendarGrid,
  getCurrentNepaliDate
} from '@/utils/nepaliCalendar';

interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD format
}

const NepaliCalendar: React.FC = () => {
  const { toast } = useToast();
  const currentNepaliDate = getCurrentNepaliDate();
  const [currentYear, setCurrentYear] = useState(currentNepaliDate.year);
  const [currentMonth, setCurrentMonth] = useState(currentNepaliDate.month);
  
  // Pre-populate with upcoming events from dashboard
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Community Meeting',
      description: 'NTC Hall, Chaunni - 10:00 AM',
      date: '2082-02-15'
    },
    {
      id: 2,
      title: 'Trip To Swoyambhu',
      description: 'Swoyambhu - 8:00 AM',
      date: '2082-02-22'
    },
    {
      id: 3,
      title: 'Workshop',
      description: 'NTC Hall, Chaunni - 2:00 PM',
      date: '2082-02-28'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [activeDate, setActiveDate] = useState<string | null>(null);

  // Generate calendar dates using proper Nepali calendar system
  const calendarDates = useMemo(() => {
    return generateNepaliCalendarGrid(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Get events for the selected day
  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    
    const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  // Get upcoming events for current month
  const getUpcomingEventsForMonth = () => {
    return events.filter(event => {
      const [year, month] = event.date.split('-');
      return parseInt(year) === currentYear && parseInt(month) === currentMonth;
    }).sort((a, b) => {
      const dayA = parseInt(a.date.split('-')[2]);
      const dayB = parseInt(b.date.split('-')[2]);
      return dayA - dayB;
    });
  };

  const previousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddEvent = () => {
    if (!activeDate || !newEvent.title) {
      toast({
        title: "Validation Error",
        description: "Please select a date and provide an event title",
        variant: "destructive"
      });
      return;
    }

    const newEventObj: CalendarEvent = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      date: activeDate
    };

    setEvents([...events, newEventObj]);
    setNewEvent({ title: '', description: '', date: '' });
    
    toast({
      title: "Event Added",
      description: `${newEvent.title} has been added to the calendar`
    });
  };

  const handleDateClick = (day: number) => {
    const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setActiveDate(dateString);
    
    setNewEvent({
      ...newEvent,
      date: dateString
    });
  };

  const upcomingEventsThisMonth = getUpcomingEventsForMonth();
  const currentMonthData = nepaliMonths[currentMonth - 1];
  const daysInCurrentMonth = getDaysInNepaliMonth(currentYear, currentMonth);

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-10 px-4">
              Today
            </Button>
            <Button variant="outline" size="sm" className="h-10 w-10 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0 2h2v2H5V6zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm4-8h2v2H9V6zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-10 px-3" onClick={previousMonth}>
              «
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentYear}</span>
              <span className="text-lg">{currentMonthData.englishName}</span>
            </div>
            <Button variant="outline" size="sm" className="h-10 px-3" onClick={nextMonth}>
              »
            </Button>
          </div>
          <div>
            <h2 className="text-xl font-medium text-red-600">
              {currentYear} {currentMonthData.englishName} | {englishEquivalents[currentMonth - 1]} {currentYear - 57}
            </h2>
            <p className="text-sm text-gray-600">
              {daysInCurrentMonth} days in this month
            </p>
          </div>
        </div>

        {/* Upcoming Events for This Month */}
        {upcomingEventsThisMonth.length > 0 && (
          <div className="mb-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#1E4E9D] mb-3">
              Events in {currentMonthData.englishName} {currentYear}
            </h3>
            <div className="space-y-2">
              {upcomingEventsThisMonth.map(event => {
                const day = parseInt(event.date.split('-')[2]);
                return (
                  <div key={event.id} className="flex items-center space-x-3 p-2 bg-white rounded-md">
                    <div className="bg-[#1E4E9D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {day}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      {event.description && <div className="text-sm text-gray-600">{event.description}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 text-center font-medium border-b bg-gray-100">
            <div className="py-2">आइत</div>
            <div className="py-2">सोम</div>
            <div className="py-2">मंगल</div>
            <div className="py-2">बुध</div>
            <div className="py-2">बिहि</div>
            <div className="py-2">शुक्र</div>
            <div className="py-2">शनि</div>
          </div>
          
          <div className="grid grid-cols-7 text-center">
            {calendarDates.map((day, index) => {
              const dateEvents = day ? getEventsForDate(day) : [];
              const dateString = day ? 
                `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : 
                null;
              
              const isActive = dateString === activeDate;
              const isToday = day === currentNepaliDate.day && 
                             currentMonth === currentNepaliDate.month && 
                             currentYear === currentNepaliDate.year;
              
              return (
                <div 
                  key={index} 
                  className={`border p-1 h-20 relative cursor-pointer hover:bg-gray-50 ${
                    isActive ? 'bg-blue-50' : ''
                  } ${isToday ? 'bg-green-50 border-green-300' : ''}`}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className={`text-right ${isToday ? 'font-bold text-green-700' : ''}`}>
                        {day}
                        {isToday && <div className="text-xs text-green-600">आज</div>}
                      </div>
                      
                      {dateEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1 right-1">
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className={`text-xs px-1 py-0.5 rounded-sm ${dateEvents.length > 1 ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700'} cursor-pointer`}>
                                {dateEvents.length} event{dateEvents.length !== 1 ? 's' : ''}
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-2">
                              <h4 className="font-medium mb-2">Events on {day} {currentMonthData.englishName}</h4>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {dateEvents.map(event => (
                                  <div key={event.id} className="p-2 bg-gray-50 rounded">
                                    <div className="font-medium">{event.title}</div>
                                    {event.description && <div className="text-sm">{event.description}</div>}
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Add Event Form */}
        {activeDate && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              Add Event for {new Date(activeDate).getDate()} {currentMonthData.englishName}
            </h3>
            <div className="space-y-3">
              <div>
                <Input
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div>
                <Input
                  placeholder="Event Description (optional)"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddEvent}>
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NepaliCalendar;
