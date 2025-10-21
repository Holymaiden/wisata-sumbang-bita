'use client';

import { FormDialog } from '../shared/FormDialog';
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
} from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { GalleryFormData, GALLERY_CATEGORIES } from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';

interface GalleryFormProps
  extends Omit<BaseFormProps<GalleryFormData>, 'onSubmit'> {
  onSubmit: (data: GalleryFormData) => void;
}

const defaultFormData: GalleryFormData = {
  title: '',
  description: undefined,
  url: '',
  alt: undefined,
  category: '',
  tags: undefined,
  isActive: true,
  featured: false,
  order: 0,
};

const categoryOptions = GALLERY_CATEGORIES.map((category) => ({
  label: category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  value: category,
}));

export function GalleryForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: GalleryFormProps) {
  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      const cleanedData = {
        ...data,
        description: data.description?.trim() || undefined,
        alt: data.alt?.trim() || undefined,
        tags: data.tags?.trim() || undefined,
      };
      onSubmit(cleanedData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.title?.trim()) {
        errors.title = 'Title is required';
      }

      if (!data.url?.trim()) {
        errors.url = 'Image URL is required';
      } else if (!isValidUrl(data.url)) {
        errors.url = 'Please enter a valid URL';
      }

      if (!data.category) {
        errors.category = 'Category is required';
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

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit}
      isLoading={isLoading || form.isSubmitting}
      title={initialData ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      description={
        initialData
          ? 'Update gallery image information'
          : 'Add a new image to the gallery'
      }
      size="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <TextField
            {...form.getFieldProps('title')}
            label="Title"
            required
            placeholder="Enter image title"
          />

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
            description="Used for screen readers and when image fails to load"
          />

          <SelectField
            {...form.getSelectProps('category')}
            label="Category"
            required
            placeholder="Select category"
            options={categoryOptions}
          />
        </div>

        <div className="space-y-4">
          <TextField
            {...form.getFieldProps('tags')}
            label="Tags"
            placeholder="tag1, tag2, tag3"
            description="Comma-separated tags for better organization"
          />

          <TextField
            {...form.getFieldProps('order')}
            type="number"
            label="Display Order"
            placeholder="0"
            description="Lower numbers appear first"
            onChange={(e) =>
              form.setValue('order', Number(e.target.value) || 0)
            }
            value={String(form.data.order)}
          />

          <div className="grid grid-cols-1 gap-4">
            <SwitchField
              {...form.getSwitchProps('featured')}
              label="Featured Image"
              description="Show in featured galleries"
            />

            <SwitchField
              {...form.getSwitchProps('isActive')}
              label="Active Status"
              description="Publicly visible"
            />
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <TextAreaField
          {...form.getFieldProps('description')}
          label="Description"
          placeholder="Optional description or caption"
          rows={3}
        />
      </div>

      {form.data.url &&
        typeof form.data.url === 'string' &&
        isValidUrl(form.data.url) && (
          <div className="col-span-full">
            <label className="text-sm font-medium">Preview</label>
            <div className="mt-2 border rounded-lg p-4 bg-muted/30">
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-white">
                <img
                  src={form.data.url as string}
                  alt={
                    (form.data.alt as string) ||
                    (form.data.title as string) ||
                    'Preview'
                  }
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        )}
    </FormDialog>
  );
}
