'use client';

import { FormDialog } from '../shared/FormDialog';
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
} from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { ReviewFormData } from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';
import { Star } from 'lucide-react';

interface ReviewFormProps
  extends Omit<BaseFormProps<ReviewFormData>, 'onSubmit'> {
  onSubmit: (data: ReviewFormData) => void;
  attractions?: Array<{ id: string; title: string }>;
}

const defaultFormData: ReviewFormData = {
  name: '',
  email: '',
  rating: 5,
  comment: '',
  attractionId: undefined,
  isApproved: false,
  isVisible: true,
};

const ratingOptions = [
  { label: '5 Stars - Excellent', value: '5' },
  { label: '4 Stars - Very Good', value: '4' },
  { label: '3 Stars - Good', value: '3' },
  { label: '2 Stars - Fair', value: '2' },
  { label: '1 Star - Poor', value: '1' },
];

export function ReviewForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  attractions = [],
}: ReviewFormProps) {
  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      const cleanedData = {
        ...data,
        attractionId: data.attractionId || undefined,
      };
      onSubmit(cleanedData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.name?.trim()) {
        errors.name = 'Name is required';
      }

      if (!data.email?.trim()) {
        errors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          errors.email = 'Please enter a valid email address';
        }
      }

      if (!data.comment?.trim()) {
        errors.comment = 'Review comment is required';
      } else if (data.comment.trim().length < 10) {
        errors.comment = 'Review must be at least 10 characters long';
      }

      if (data.rating < 1 || data.rating > 5) {
        errors.rating = 'Rating must be between 1 and 5';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const attractionOptions = attractions.map((attraction) => ({
    label: attraction.title,
    value: attraction.id,
  }));

  const renderStarRating = () => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating *</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => form.setValue('rating', star)}
              className={`p-1 rounded transition-colors ${
                star <= form.data.rating
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <Star
                className="w-6 h-6"
                fill={star <= form.data.rating ? 'currentColor' : 'none'}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({form.data.rating} out of 5 stars)
          </span>
        </div>
        {form.errors?.rating && (
          <p className="text-sm text-red-600">{form.errors.rating}</p>
        )}
      </div>
    );
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit}
      isLoading={isLoading || form.isSubmitting}
      title={initialData ? 'Edit Review' : 'Add New Review'}
      description={
        initialData
          ? 'Update review information and moderation status'
          : 'Create a new customer review'
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            {...form.getFieldProps('name')}
            label="Reviewer Name"
            required
            placeholder="Enter reviewer's full name"
          />

          <TextField
            {...form.getFieldProps('email')}
            type="email"
            label="Email Address"
            required
            placeholder="reviewer@example.com"
          />
        </div>

        <SelectField
          {...form.getSelectProps('attractionId')}
          label="Attraction"
          placeholder="Select attraction (optional)"
          options={attractionOptions}
          description="Leave empty for general reviews"
        />

        {renderStarRating()}

        <TextAreaField
          {...form.getFieldProps('comment')}
          label="Review Comment"
          required
          placeholder="Write the review comment here..."
          rows={6}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SwitchField
            {...form.getSwitchProps('isApproved')}
            label="Approved"
            description="Review is approved by admin"
          />

          <SwitchField
            {...form.getSwitchProps('isVisible')}
            label="Visible"
            description="Review is visible to public"
          />
        </div>

        {!form.data.isApproved && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            <strong>Note:</strong> This review is not yet approved and will not
            be visible to the public until approved.
          </div>
        )}

        {form.data.isApproved && !form.data.isVisible && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <strong>Note:</strong> This review is approved but hidden from
            public view.
          </div>
        )}
      </div>
    </FormDialog>
  );
}
