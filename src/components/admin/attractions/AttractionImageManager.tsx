'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TextField, TextAreaField, SwitchField } from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { Plus, Edit, Trash2, Image, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface AttractionImage {
  id?: string;
  url: string;
  alt?: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

interface AttractionImageManagerProps {
  images: AttractionImage[];
  onChange: (images: AttractionImage[]) => void;
  disabled?: boolean;
}

const defaultImageData: AttractionImage = {
  url: '',
  alt: '',
  caption: '',
  isPrimary: false,
  order: 0,
};

export function AttractionImageManager({
  images,
  onChange,
  disabled = false,
}: AttractionImageManagerProps) {
  const [editingImage, setEditingImage] = useState<AttractionImage | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const form = useFormState(defaultImageData, {
    initialData: editingImage || undefined,
    onSubmit: (data) => {
      if (editingImage?.id) {
        const updatedImages = images.map((img) =>
          img.id === editingImage.id ? { ...editingImage, ...data } : img
        );
        onChange(updatedImages);
      } else {
        const newImage: AttractionImage = {
          ...data,
          id: Date.now().toString(),
        };
        onChange([...images, newImage]);
      }
      setShowForm(false);
      setEditingImage(null);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.url?.trim()) {
        errors.url = 'Image URL is required';
      } else if (!isValidUrl(data.url)) {
        errors.url = 'Please enter a valid URL';
      }

      if (data.order < 0) {
        errors.order = 'Order cannot be negative';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleAdd = () => {
    setEditingImage(null);
    form.reset();
    setShowForm(true);
  };

  const handleEdit = (image: AttractionImage) => {
    setEditingImage(image);
    setShowForm(true);
  };

  const handleDelete = (imageId: string) => {
    const updatedImages = images.filter((img) => img.id !== imageId);
    onChange(updatedImages);
  };

  const handleSetPrimary = (imageId: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === imageId,
    }));
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Attraction Images</h3>
        <Button type="button" onClick={handleAdd} disabled={disabled} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {images.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Image className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              No images added yet. Click "Add Image" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images
            .sort((a, b) => a.order - b.order)
            .map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.alt || 'Attraction image'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  {image.isPrimary && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Primary
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1">
                    <span className="text-white text-xs">#{image.order}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {image.caption && (
                      <p className="text-sm font-medium truncate">
                        {image.caption}
                      </p>
                    )}
                    {image.alt && (
                      <p className="text-xs text-gray-500 truncate">
                        Alt: {image.alt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(image)}
                          disabled={disabled}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        {!image.isPrimary && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetPrimary(image.id!)}
                            disabled={disabled}
                            title="Set as primary image"
                          >
                            <Star className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(image.id!)}
                          disabled={disabled}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* Image Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </DialogTitle>
            <DialogDescription>
              {editingImage
                ? 'Update image information'
                : 'Add a new image to the attraction'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <TextField
                  {...form.getFieldProps('url')}
                  label="Image URL"
                  required
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />

                <TextField
                  {...form.getFieldProps('alt')}
                  label="Alt Text"
                  placeholder="Descriptive text for accessibility"
                />

                <TextField
                  {...form.getFieldProps('order')}
                  type="number"
                  label="Display Order"
                  placeholder="0"
                  onChange={(e) =>
                    form.setValue('order', Number(e.target.value) || 0)
                  }
                  value={String(form.data.order)}
                />
              </div>

              <div className="space-y-4">
                <TextAreaField
                  {...form.getFieldProps('caption')}
                  label="Caption"
                  placeholder="Optional image caption"
                  rows={3}
                />

                <SwitchField
                  {...form.getSwitchProps('isPrimary')}
                  label="Primary Image"
                  description="Use as main attraction image"
                />
              </div>
            </div>

            {/* Image Preview */}
            {form.data.url &&
              typeof form.data.url === 'string' &&
              isValidUrl(form.data.url) && (
                <div>
                  <label className="text-sm font-medium">Preview</label>
                  <div className="mt-2 border rounded-lg p-4 bg-muted/30">
                    <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-white">
                      <img
                        src={form.data.url}
                        alt={form.data.alt || 'Image preview'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.isSubmitting}>
                {form.isSubmitting
                  ? 'Saving...'
                  : editingImage
                  ? 'Update Image'
                  : 'Add Image'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
