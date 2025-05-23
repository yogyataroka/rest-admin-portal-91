
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Download } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  file?: {
    name: string;
    url: string;
  };
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: 'Community Meeting',
    date: '2082-02-25',
    location: 'Ntc Hall, Chaunni',
    description: 'qwertyuiolaksgags xbukshdajadsjdksjdks',
    file: {
      name: 'meetingAgenda.pdf',
      url: '#',
    },
  },
  {
    id: 2,
    title: 'Trip To',
    date: '2082-02-25',
    location: 'Swoyambhu',
    description: 'qwertyuiolaksgags xbukshdajadsjdksjdks',
  },
  {
    id: 3,
    title: 'Workshop',
    date: '2082-02-25',
    location: 'Ntc Hall, Chaunni',
    description: 'qwertyuiolaksgags xbukshdajadsjdksjdks',
  },
  {
    id: 4,
    title: 'Picnic',
    date: '2082-02-25',
    location: 'Tribhuvan Park',
    description: 'qwertyuiolaksgags xbukshdajadsjdksjdks',
  },
  {
    id: 5,
    title: 'Social Gathering',
    date: '2082-02-25',
    location: 'Ntc Hall, Chaunni',
    description: 'qwertyuiolaksgags xbukshdajadsjdksjdks',
  },
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    file: null as File | null,
  });
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && currentEvent) {
      // Update existing event
      const updatedEvents = events.map(event => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            title: formData.title,
            date: formData.date,
            location: formData.location,
            description: formData.description,
            file: formData.file
              ? {
                  name: formData.file.name,
                  url: URL.createObjectURL(formData.file),
                }
              : event.file,
          };
        }
        return event;
      });
      
      setEvents(updatedEvents);
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
    } else {
      // Add new event
      const newEvent: Event = {
        id: events.length + 1,
        title: formData.title,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        file: formData.file
          ? {
              name: formData.file.name,
              url: URL.createObjectURL(formData.file),
            }
          : undefined,
      };
      
      setEvents([...events, newEvent]);
      toast({
        title: "Event Added",
        description: `${newEvent.title} has been added to the events list.`,
      });
    }
    
    // Reset form and close modal
    resetFormAndCloseModal();
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      file: null,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
      variant: "destructive",
    });
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      file: null,
    });
    setCurrentEvent(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleFileView = (file: { name: string; url: string }) => {
    if (file.url !== '#') {
      window.open(file.url, '_blank');
    } else {
      toast({
        title: "File Preview",
        description: `Viewing ${file.name}`,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <Button 
          onClick={() => {
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
          className="bg-gray-800 hover:bg-gray-700"
        >
          + Add Events
        </Button>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                  <TableCell>
                    {event.file ? (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileView(event.file!)}
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                        >
                          {event.file.name}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileView(event.file!)}
                          className="p-1 h-auto"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleEdit(event)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Add/Edit Event Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isEditMode ? 'Edit Event' : 'Add Events'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Title:</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">Date:</label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location:</label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description:</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="file" className="text-sm font-medium">File Upload (PDF/DOC):</label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="h-auto p-2 flex-1"
                  />
                  {currentEvent?.file && !formData.file && (
                    <span className="text-sm text-gray-500">
                      Current: {currentEvent.file.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetFormAndCloseModal}
              >
                Cancel
              </Button>
              
              <div className="flex gap-2">
                {isEditMode && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      if (currentEvent) {
                        handleDelete(currentEvent.id);
                        resetFormAndCloseModal();
                      }
                    }}
                  >
                    Delete
                  </Button>
                )}
                
                <Button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700"
                >
                  {isEditMode ? 'Update' : 'Upload File'}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Events;
