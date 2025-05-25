import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Search, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  eventName?: string;
  uploadDate: string;
}

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

const Gallery = () => {
  // Sample gallery images with uploaded images
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: '/lovable-uploads/82683fa9-92cf-4586-aae9-a5ab37a2ca74.png',
      title: 'Board Meeting 2082',
      eventName: 'Board Meeting',
      uploadDate: '2082-01-15',
    },
    {
      id: 2,
      url: '/lovable-uploads/d561e07c-ba55-4192-bf03-09bcd7bdb416.png',
      title: 'Community Festival',
      eventName: 'Festival',
      uploadDate: '2082-02-10',
    },
    {
      id: 3,
      url: '/lovable-uploads/b94ba50d-dda9-4457-a30f-a5d35c765135.png',
      title: 'Training Session',
      eventName: 'Training',
      uploadDate: '2082-02-18',
    },
    {
      id: 4,
      url: '/lovable-uploads/be180318-6752-42f3-bbb1-a4b672bdfba2.png',
      title: 'New Year Celebration',
      eventName: 'Celebration',
      uploadDate: '2082-01-01',
    },
    {
      id: 5,
      url: '/lovable-uploads/7ba96550-d834-4b32-bafc-7337d6aeb7e4.png',
      title: 'Workshop Session',
      eventName: 'Workshop',
      uploadDate: '2082-02-25',
    },
    {
      id: 6,
      url: '/lovable-uploads/c63a614e-2bff-44a2-a5e7-c7b763531049.png',
      title: 'Annual Picnic',
      eventName: 'Picnic',
      uploadDate: '2082-03-05',
    },
    {
      id: 7,
      url: 'https://source.unsplash.com/random/800x600/?event',
      title: 'Annual Gathering 2082',
      eventName: 'Annual Gathering',
      uploadDate: '2082-01-20',
    },
    {
      id: 8,
      url: 'https://source.unsplash.com/random/800x600/?conference',
      title: 'Digital Skills Conference',
      eventName: 'Conference',
      uploadDate: '2082-03-10',
    },
  ]);

  const [filter, setFilter] = useState('');
  const { toast } = useToast();

  // Online search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UnsplashImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

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

  const searchOnlineImages = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // Using Unsplash Source API for demo (no API key required)
      // In production, you would use the official Unsplash API
      const mockResults: UnsplashImage[] = Array.from({ length: 12 }, (_, index) => ({
        id: `unsplash-${Date.now()}-${index}`,
        urls: {
          small: `https://source.unsplash.com/400x300/?${encodeURIComponent(searchQuery)}&${index}`,
          regular: `https://source.unsplash.com/800x600/?${encodeURIComponent(searchQuery)}&${index}`,
        },
        alt_description: `${searchQuery} image ${index + 1}`,
        user: {
          name: 'Unsplash Photographer',
        },
      }));

      setSearchResults(mockResults);
      setShowSearchResults(true);
      
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} images for "${searchQuery}"`,
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const addImageFromSearch = (unsplashImage: UnsplashImage) => {
    const newGalleryImage: GalleryImage = {
      id: images.length + 1,
      url: unsplashImage.urls.regular,
      title: unsplashImage.alt_description || `Image from ${unsplashImage.user.name}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setImages([newGalleryImage, ...images]);
    
    toast({
      title: "Success",
      description: "Image added to gallery successfully",
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
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Upload Form */}
          <Card className="p-6 lg:w-1/3 space-y-4">
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

            {/* Online Search Section */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Search Online Images</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search Unsplash images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchOnlineImages()}
                  />
                  <Button 
                    onClick={searchOnlineImages}
                    disabled={isSearching}
                    size="icon"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                {showSearchResults && (
                  <Button
                    variant="outline"
                    onClick={() => setShowSearchResults(false)}
                    className="w-full"
                  >
                    Hide Search Results
                  </Button>
                )}
              </div>
            </div>
          </Card>
          
          {/* Gallery and Search Results */}
          <div className="lg:w-2/3 space-y-6">
            {/* Search Results Section */}
            {showSearchResults && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Search Results for "{searchQuery}"
                  </h2>
                  <span className="text-sm text-gray-500">
                    {searchResults.length} results
                  </span>
                </div>
                
                {isSearching ? (
                  <div className="text-center py-8">
                    <p>Searching for images...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {searchResults.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <img
                          src={image.urls.small}
                          alt={image.alt_description}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <p className="text-sm font-medium truncate">
                            {image.alt_description}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            by {image.user.name}
                          </p>
                          <Button
                            size="sm"
                            onClick={() => addImageFromSearch(image)}
                            className="w-full"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Add to Gallery
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gallery Images</h2>
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
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
