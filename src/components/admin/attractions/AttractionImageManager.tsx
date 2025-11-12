'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TextField, TextAreaField, SwitchField } from '../shared/FormFields';
import { CloudinaryUploadWidget } from '@/components/ui/cloudinary-upload-widget';
import { useFormState } from '@/hooks/admin/useFormState';
import { Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import type { AttractionImage } from '@/types/admin/entities';

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
        } as AttractionImage;
        onChange([...images, newImage]);
      }
      setShowForm(false);
      setEditingImage(null);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const url = data.url as string | undefined;
      const order = data.order as number;

      if (!url?.trim()) {
        errors.url = 'Image is required';
      }

      if (order < 0) {
        errors.order = 'Order cannot be negative';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

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
            <div className="w-12 h-12 text-gray-400 mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              No images added yet. Click &quot;Add Image&quot; to get started.
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
                  <CldImage
                    src={image.url}
                    alt={image.alt || 'Attraction image'}
                    fill
                    className="object-cover"
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

      {/* Image Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="gap-4 border bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 left-0 right-0 h-fit w-full bg-background z-50 border-b">
                <div className="flex items-start justify-between py-4 px-6">
                  <div className="flex flex-col gap-y-2 flex-1 pr-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                      {editingImage ? 'Edit Image' : 'Add New Image'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
                      {editingImage
                        ? 'Update image information'
                        : 'Add a new image to the attraction'}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    className="p-2 shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <form
                onSubmit={form.handleSubmit}
                className="flex flex-col space-y-4 p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <CloudinaryUploadWidget
                      value={form.data.url as string}
                      onChange={(url, publicId) => {
                        form.setValue('url', url);
                        console.log('Uploaded image:', { url, publicId });
                      }}
                      onRemove={() => form.setValue('url', '')}
                      label="Image"
                      error={form.errors.url}
                      disabled={form.isSubmitting}
                      description="Upload an image (max 5MB)"
                      folder="attractions"
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

                <div className="sticky bottom-0 left-0 right-0 bg-background border-t -mx-6 -mb-6 p-6 flex justify-end gap-3">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
