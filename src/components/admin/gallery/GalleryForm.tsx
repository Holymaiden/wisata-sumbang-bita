'use client';

import { FormDialog } from '../shared/FormDialog';
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
} from '../shared/FormFields';
import { CloudinaryUploadWidget } from '@/components/ui/cloudinary-upload-widget';
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
        description:
          (data.description as string | undefined)?.trim() || undefined,
        alt: (data.alt as string | undefined)?.trim() || undefined,
        tags: (data.tags as string | undefined)?.trim() || undefined,
      };
      onSubmit(cleanedData as GalleryFormData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const title = data.title as string | undefined;
      const url = data.url as string | undefined;
      const order = data.order as number;

      if (!title?.trim()) {
        errors.title = 'Title is required';
      }

      if (!url?.trim()) {
        errors.url = 'Image is required';
      }

      if (!data.category) {
        errors.category = 'Category is required';
      }

      if (order < 0) {
        errors.order = 'Order cannot be negative';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

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

          <CloudinaryUploadWidget
            value={form.data.url as string}
            onChange={(url) => {
              form.setValue('url', url);
            }}
            onRemove={() => form.setValue('url', '')}
            label="Image"
            error={form.errors.url}
            disabled={isLoading || form.isSubmitting}
            description="Upload an image (max 5MB)"
            folder="gallery"
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
    </FormDialog>
  );
}
