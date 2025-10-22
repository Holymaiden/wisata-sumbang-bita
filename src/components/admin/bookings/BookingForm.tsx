'use client';

import { FormDialog } from '../shared/FormDialog';
import { TextField, TextAreaField, SelectField } from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { BookingFormData, BOOKING_STATUSES } from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';

interface BookingFormProps
  extends Omit<BaseFormProps<BookingFormData>, 'onSubmit'> {
  onSubmit: (data: BookingFormData) => void;
  attractions?: Array<{ id: string; title: string }>;
}

const defaultFormData: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  attractionId: undefined,
  visitDate: '',
  guestCount: 1,
  totalAmount: 0,
  status: 'PENDING',
  message: undefined,
  adminNotes: undefined,
};

const statusOptions = BOOKING_STATUSES.map((status) => ({
  label: status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  value: status,
}));

export function BookingForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  attractions = [],
}: BookingFormProps) {
  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      const cleanedData = {
        ...data,
        attractionId: data.attractionId || undefined,
        message: (data.message as string | undefined)?.trim() || undefined,
        adminNotes:
          (data.adminNotes as string | undefined)?.trim() || undefined,
      };
      onSubmit(cleanedData as BookingFormData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const name = data.name as string | undefined;
      const email = data.email as string | undefined;
      const phone = data.phone as string | undefined;
      const visitDate = data.visitDate as string | undefined;
      const guestCount = data.guestCount as number;
      const totalAmount = data.totalAmount as number;

      if (!name?.trim()) {
        errors.name = 'Name is required';
      }

      if (!email?.trim()) {
        errors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = 'Please enter a valid email address';
        }
      }

      if (!phone?.trim()) {
        errors.phone = 'Phone number is required';
      } else {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
          errors.phone = 'Please enter a valid phone number';
        }
      }

      if (!visitDate) {
        errors.visitDate = 'Visit date is required';
      } else {
        const visitDateObj = new Date(visitDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (visitDateObj < today) {
          errors.visitDate = 'Visit date cannot be in the past';
        }
      }

      if (guestCount < 1) {
        errors.guestCount = 'At least 1 guest is required';
      }

      if (guestCount > 50) {
        errors.guestCount = 'Maximum 50 guests allowed';
      }

      if (totalAmount < 0) {
        errors.totalAmount = 'Total amount cannot be negative';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const attractionOptions = attractions.map((attraction) => ({
    label: attraction.title,
    value: attraction.id,
  }));

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit}
      isLoading={isLoading || form.isSubmitting}
      title={initialData ? 'Edit Booking' : 'Add New Booking'}
      description={
        initialData
          ? 'Update booking information and status'
          : 'Create a new booking record'
      }
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <TextField
            {...form.getFieldProps('name')}
            label="Guest Name"
            required
            placeholder="Enter full name"
          />

          <TextField
            {...form.getFieldProps('email')}
            type="email"
            label="Email Address"
            required
            placeholder="guest@example.com"
          />

          <TextField
            {...form.getFieldProps('phone')}
            label="Phone Number"
            required
            placeholder="+62 812-3456-7890"
          />

          <SelectField
            {...form.getSelectProps('attractionId')}
            label="Attraction"
            placeholder="Select attraction (optional)"
            options={attractionOptions}
          />
        </div>

        <div className="space-y-4">
          <TextField
            {...form.getFieldProps('visitDate')}
            type="text"
            label="Visit Date"
            required
            placeholder="YYYY-MM-DD"
            value={formatDate(form.data.visitDate as string)}
            description="Enter date in YYYY-MM-DD format"
          />

          <TextField
            {...form.getFieldProps('guestCount')}
            type="number"
            label="Number of Guests"
            required
            placeholder="1-50 guests"
            onChange={(e) =>
              form.setValue('guestCount', Number(e.target.value) || 1)
            }
            value={String(form.data.guestCount)}
          />

          <TextField
            {...form.getFieldProps('totalAmount')}
            type="number"
            label="Total Amount (IDR)"
            required
            placeholder="0"
            onChange={(e) =>
              form.setValue('totalAmount', Number(e.target.value) || 0)
            }
            value={String(form.data.totalAmount)}
            description={
              (form.data.totalAmount as number) > 0
                ? `Amount: ${formatCurrency(form.data.totalAmount as number)}`
                : undefined
            }
          />

          <SelectField
            {...form.getSelectProps('status')}
            label="Booking Status"
            required
            options={statusOptions}
          />
        </div>
      </div>

      <div className="space-y-4">
        <TextAreaField
          {...form.getFieldProps('message')}
          label="Guest Message (Optional)"
          placeholder="Special requests or questions from guest"
          rows={3}
        />

        <TextAreaField
          {...form.getFieldProps('adminNotes')}
          label="Admin Notes (Optional)"
          placeholder="Internal notes for staff (not visible to guest)"
          rows={3}
        />
      </div>

      {form.data.status && (form.data.status as string) !== 'PENDING' && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <strong>Status Guidelines:</strong>
          <ul className="mt-1 space-y-1">
            <li>
              <strong>CONTACTED:</strong> Guest has been contacted for
              confirmation
            </li>
            <li>
              <strong>CONFIRMED:</strong> Booking is confirmed and payment
              received
            </li>
            <li>
              <strong>CANCELLED:</strong> Booking was cancelled by guest or
              admin
            </li>
            <li>
              <strong>COMPLETED:</strong> Guest has completed their visit
            </li>
          </ul>
        </div>
      )}
    </FormDialog>
  );
}
