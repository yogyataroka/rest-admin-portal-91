
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  eventName?: string;
  uploadDate: string;
}

const Gallery = () => {
  // Sample gallery images
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: 'https://source.unsplash.com/random/800x600/?event',
      title: 'Annual Gathering 2082',
      eventName: 'Annual Gathering',
      uploadDate: '2082-01-15',
    },
    {
      id: 2,
      url: 'https://source.unsplash.com/random/800x600/?meeting',
      title: 'Board Meeting',
      eventName: 'Meeting',
      uploadDate: '2082-02-10',
    },
    {
      id: 3,
      url: 'https://source.unsplash.com/random/800x600/?workshop',
      title: 'Workshop on Digital Skills',
      eventName: 'Workshop',
      uploadDate: '2082-02-18',
    },
    {
      id: 4,
      url: 'https://source.unsplash.com/random/800x600/?celebration',
      title: 'New Year Celebration',
      eventName: 'Celebration',
      uploadDate: '2082-01-01',
    },
    {
      id: 5,
      url: 'https://source.unsplash.com/random/800x600/?training',
      title: 'Leadership Training',
      eventName: 'Training',
      uploadDate: '2082-02-25',
    },
    {
      id: 6,
      url: 'https://source.unsplash.com/random/800x600/?picnic',
      title: 'Department Picnic',
      eventName: 'Picnic',
      uploadDate: '2082-03-05',
    },
  ]);

  const [filter, setFilter] = useState('');
  const { toast } = useToast();

  const [newImage, setNewImage] = useState<{
    title: string;
    eventName: string;
    file: File | null;
    previewUrl: string | null;
  }>({
    title: '',
    eventName: '',
    file: null,
    previewUrl: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      setNewImage({
        ...newImage,
        file,
        previewUrl,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImage({
      ...newImage,
      [name]: value,
    });
  };

  const handleUploadImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newImage.file || !newImage.title) {
      toast({
        title: "Validation Error",
        description: "Please provide an image and title",
        variant: "destructive",
      });
      return;
    }
    
    const uploadedImage: GalleryImage = {
      id: images.length + 1,
      url: newImage.previewUrl as string,
      title: newImage.title,
      eventName: newImage.eventName || undefined,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    
    setImages([uploadedImage, ...images]);
    
    // Reset form
    setNewImage({
      title: '',
      eventName: '',
      file: null,
      previewUrl: null,
    });
    
    toast({
      title: "Success",
      description: "Image uploaded successfully",
    });
  };

  const filteredImages = filter
    ? images.filter(
        img =>
          img.title.toLowerCase().includes(filter.toLowerCase()) ||
          (img.eventName &&
            img.eventName.toLowerCase().includes(filter.toLowerCase()))
      )
    : images;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Gallery</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Upload Form */}
          <Card className="p-6 md:w-1/3 space-y-4">
            <h2 className="text-xl font-semibold">Upload New Image</h2>
            
            <form onSubmit={handleUploadImage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageTitle">Image Title</Label>
                <Input
                  id="imageTitle"
                  name="title"
                  value={newImage.title}
                  onChange={handleInputChange}
                  placeholder="Enter image title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name (Optional)</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={newImage.eventName}
                  onChange={handleInputChange}
                  placeholder="Related event name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageFile">Image File</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  required
                />
              </div>
              
              {newImage.previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <img
                    src={newImage.previewUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Upload Image
              </Button>
            </form>
          </Card>
          
          {/* Gallery */}
          <div className="md:w-2/3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Images</h2>
              <Input
                type="search"
                placeholder="Filter images..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            {filteredImages.length === 0 ? (
              <div className="text-center py-12 border rounded-md bg-gray-50">
                <p>No images match your filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map(image => (
                  <Card key={image.id} className="overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium">{image.title}</h3>
                      {image.eventName && (
                        <p className="text-sm text-gray-600">
                          Event: {image.eventName}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Uploaded on: {image.uploadDate}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
