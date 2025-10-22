'use client';

import { FormDialog } from '../shared/FormDialog';
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
} from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import {
  AttractionFormData,
  AttractionImage,
  AttractionFeature,
  ATTRACTION_CATEGORIES,
} from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';
import { AttractionImageManager } from './AttractionImageManager';
import { AttractionFeatureManager } from './AttractionFeatureManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AttractionFormProps
  extends Omit<BaseFormProps<AttractionFormData>, 'onSubmit'> {
  onSubmit: (data: AttractionFormData) => void;
}

const defaultFormData: AttractionFormData = {
  title: '',
  slug: '',
  description: '',
  fullDescription: '',
  category: '',
  difficulty: 'MUDAH',
  duration: '',
  ticketPrice: 0,
  ticketPriceChild: 0,
  location: '',
  coordinates: '',
  bestTime: '',
  facilities: '',
  tips: '',
  featured: false,
  isActive: true,
  images: [],
  features: [],
};

const difficultyOptions = [
  { label: 'Easy (Mudah)', value: 'MUDAH' },
  { label: 'Medium (Sedang)', value: 'SEDANG' },
  { label: 'Challenging (Menantang)', value: 'MENANTANG' },
];

const categoryOptions = ATTRACTION_CATEGORIES.map((category) => ({
  label: category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  value: category,
}));

export function AttractionForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: AttractionFormProps) {
  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      onSubmit(data as AttractionFormData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const title = data.title as string | undefined;
      const slug = data.slug as string | undefined;
      const description = data.description as string | undefined;
      const duration = data.duration as string | undefined;
      const ticketPrice = data.ticketPrice as number;
      const ticketPriceChild = data.ticketPriceChild as number | undefined;

      if (!title?.trim()) {
        errors.title = 'Title is required';
      }

      if (!slug?.trim()) {
        errors.slug = 'Slug is required';
      }

      if (!description?.trim()) {
        errors.description = 'Description is required';
      }

      if (!data.category) {
        errors.category = 'Category is required';
      }

      if (!duration?.trim()) {
        errors.duration = 'Duration is required';
      }

      if (ticketPrice < 0) {
        errors.ticketPrice = 'Ticket price cannot be negative';
      }

      if (ticketPriceChild && ticketPriceChild < 0) {
        errors.ticketPriceChild = 'Child ticket price cannot be negative';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);

    if (!initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setValue('slug', slug);
    }
  };

  const handleImagesChange = (images: AttractionImage[]) => {
    form.setValue('images', images);
  };

  const handleFeaturesChange = (features: AttractionFeature[]) => {
    form.setValue('features', features);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit}
      isLoading={isLoading || form.isSubmitting}
      title={initialData ? 'Edit Attraction' : 'Add New Attraction'}
      description={
        initialData
          ? 'Update attraction information'
          : 'Create a new tourist attraction'
      }
      size="2xl"
    >
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <TextField
                {...form.getFieldProps('title')}
                label="Title"
                required
                placeholder="Enter attraction title"
                onChange={handleTitleChange}
                value={form.data.title as string}
              />

              <TextField
                {...form.getFieldProps('slug')}
                label="Slug"
                required
                placeholder="url-friendly-name"
                description="URL-friendly version of the title"
              />

              <SelectField
                {...form.getSelectProps('category')}
                label="Category"
                required
                placeholder="Select category"
                options={categoryOptions}
              />

              <SelectField
                {...form.getSelectProps('difficulty')}
                label="Difficulty Level"
                required
                options={difficultyOptions}
              />

              <TextField
                {...form.getFieldProps('duration')}
                label="Duration"
                required
                placeholder="e.g., 2-3 hours, Half day"
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <TextField
                  {...form.getFieldProps('ticketPrice')}
                  type="number"
                  label="Adult Ticket Price"
                  required
                  placeholder="0"
                  onChange={(e) =>
                    form.setValue('ticketPrice', Number(e.target.value) || 0)
                  }
                  value={String(form.data.ticketPrice)}
                />

                <TextField
                  {...form.getFieldProps('ticketPriceChild')}
                  type="number"
                  label="Child Ticket Price"
                  placeholder="0 (optional)"
                  onChange={(e) =>
                    form.setValue(
                      'ticketPriceChild',
                      Number(e.target.value) || 0
                    )
                  }
                  value={String(form.data.ticketPriceChild || '')}
                />
              </div>

              <TextField
                {...form.getFieldProps('location')}
                label="Location"
                placeholder="Enter location"
              />

              <TextField
                {...form.getFieldProps('coordinates')}
                label="Coordinates"
                placeholder="e.g., -7.123456, 110.123456"
                description="Latitude, Longitude format"
              />

              <div className="grid grid-cols-2 gap-4">
                <SwitchField
                  {...form.getSwitchProps('featured')}
                  label="Featured Attraction"
                  description="Show on homepage"
                />

                <SwitchField
                  {...form.getSwitchProps('isActive')}
                  label="Active Status"
                  description="Publicly visible"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <TextAreaField
              {...form.getFieldProps('description')}
              label="Short Description"
              required
              placeholder="Brief description for listings"
              rows={2}
            />

            <TextAreaField
              {...form.getFieldProps('fullDescription')}
              label="Full Description"
              placeholder="Detailed description with all information"
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="space-y-4">
            <TextField
              {...form.getFieldProps('bestTime')}
              label="Best Time to Visit"
              placeholder="e.g., Morning, Dry season"
            />

            <TextAreaField
              {...form.getFieldProps('facilities')}
              label="Facilities"
              placeholder="List available facilities"
              rows={3}
            />

            <TextAreaField
              {...form.getFieldProps('tips')}
              label="Tips for Visitors"
              placeholder="Helpful tips and recommendations"
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <AttractionImageManager
            images={form.data.images || []}
            onChange={handleImagesChange}
            disabled={form.isSubmitting}
          />
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <AttractionFeatureManager
            features={form.data.features || []}
            onChange={handleFeaturesChange}
            disabled={form.isSubmitting}
          />
        </TabsContent>
      </Tabs>
    </FormDialog>
  );
}
