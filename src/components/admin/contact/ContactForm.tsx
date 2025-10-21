'use client';

import { FormDialog } from '../shared/FormDialog';
import {
  TextField,
  TextAreaField,
  SelectField,
  SwitchField,
} from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { ContactFormData, CONTACT_TYPES } from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';

interface ContactFormProps
  extends Omit<BaseFormProps<ContactFormData>, 'onSubmit'> {
  onSubmit: (data: ContactFormData) => void;
}

const defaultFormData: ContactFormData = {
  type: 'PHONE',
  label: '',
  value: '',
  description: undefined,
  isPublic: true,
  order: 0,
};

const contactTypeOptions = CONTACT_TYPES.map((type) => ({
  label: type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  value: type,
}));

const getPlaceholderByType = (type: string) => {
  switch (type) {
    case 'PHONE':
      return '+62 812-3456-7890';
    case 'EMAIL':
      return 'contact@example.com';
    case 'ADDRESS':
      return 'Jl. Example No. 123, City';
    case 'SOCIAL_MEDIA':
      return '@username or https://social.com/username';
    default:
      return 'Enter contact value';
  }
};

const getLabelPlaceholderByType = (type: string) => {
  switch (type) {
    case 'PHONE':
      return 'e.g., Main Phone, WhatsApp, Emergency';
    case 'EMAIL':
      return 'e.g., General Inquiry, Booking, Support';
    case 'ADDRESS':
      return 'e.g., Main Office, Branch Location';
    case 'SOCIAL_MEDIA':
      return 'e.g., Facebook, Instagram, YouTube';
    default:
      return 'Contact label';
  }
};

export function ContactForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: ContactFormProps) {
  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      const cleanedData = {
        ...data,
        description: data.description?.trim() || undefined,
      };
      onSubmit(cleanedData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.type) {
        errors.type = 'Contact type is required';
      }

      if (!data.label?.trim()) {
        errors.label = 'Label is required';
      }

      if (!data.value?.trim()) {
        errors.value = 'Contact value is required';
      }

      if (data.type === 'EMAIL' && data.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.value)) {
          errors.value = 'Please enter a valid email address';
        }
      }

      if (data.type === 'PHONE' && data.value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.value)) {
          errors.value = 'Please enter a valid phone number';
        }
      }

      if (data.order < 0) {
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
      title={initialData ? 'Edit Contact Information' : 'Add New Contact'}
      description={
        initialData
          ? 'Update contact information'
          : 'Add new contact information for visitors'
      }
    >
      <div className="space-y-4">
        <SelectField
          {...form.getSelectProps('type')}
          label="Contact Type"
          required
          placeholder="Select contact type"
          options={contactTypeOptions}
        />

        <TextField
          {...form.getFieldProps('label')}
          label="Label"
          required
          placeholder={getLabelPlaceholderByType(form.data.type)}
        />

        <TextField
          {...form.getFieldProps('value')}
          label="Contact Value"
          required
          placeholder={getPlaceholderByType(form.data.type)}
        />

        <TextAreaField
          {...form.getFieldProps('description')}
          label="Description (Optional)"
          placeholder="Additional information about this contact"
          rows={2}
        />

        <div className="grid grid-cols-2 gap-4">
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

          <SwitchField
            {...form.getSwitchProps('isPublic')}
            label="Public Contact"
            description="Visible to website visitors"
          />
        </div>
      </div>
    </FormDialog>
  );
}
