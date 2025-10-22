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
  SettingFormData,
  SETTING_TYPES,
  SETTING_CATEGORIES,
} from '@/types/admin/entities';
import { BaseFormProps } from '@/types/admin';
import { useState, useEffect } from 'react';

interface SettingsFormProps
  extends Omit<BaseFormProps<SettingFormData>, 'onSubmit'> {
  onSubmit: (data: SettingFormData) => void;
}

const defaultFormData: SettingFormData = {
  key: '',
  value: '',
  type: 'TEXT',
  category: 'general',
  description: undefined,
  isPublic: false,
};

const settingTypeOptions = SETTING_TYPES.map((type) => ({
  label: type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  value: type,
}));

const settingCategoryOptions = SETTING_CATEGORIES.map((category) => {
  const labels: Record<string, string> = {
    general: 'General',
    hero: 'Hero Section',
    about: 'About Section',
    gallery: 'Gallery Section',
    footer: 'Footer',
    contact: 'Contact',
    social: 'Social Media',
    seo: 'SEO',
    appearance: 'Appearance',
    booking: 'Booking',
    notification: 'Notification',
    advanced: 'Advanced',
  };

  return {
    label:
      labels[category] ||
      category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value: category,
  };
});

const getCategoryHelpText = (category: string): string => {
  const helpTexts: Record<string, string> = {
    general: 'General website information like title, description, and logo.',
    hero: 'Hero section settings for the main banner area of the landing page.',
    about:
      'About section content including title, description, and paragraphs.',
    gallery: 'Gallery section configuration for photo display.',
    footer: 'Footer content and descriptions.',
    contact: 'Contact information like email, phone, and address.',
    social: 'Social media links and profiles.',
    seo: 'Search engine optimization settings.',
    appearance: 'Visual appearance and theme settings.',
    booking: 'Booking system configuration.',
    notification: 'Notification system settings.',
    advanced: 'Advanced technical settings.',
  };

  return helpTexts[category] || '';
};

const getSettingSuggestionsByCategory = (category: string): string[] => {
  const suggestions: Record<string, string[]> = {
    general: ['site_title', 'site_description', 'site_logo', 'site_favicon'],
    hero: [
      'hero_location',
      'hero_heading',
      'hero_subtitle',
      'stats_rating',
      'stats_opening',
      'stats_spots',
    ],
    about: [
      'about_title',
      'about_description',
      'about_content_title',
      'about_content_paragraph1',
      'about_content_paragraph2',
      'about_content_paragraph3',
    ],
    gallery: ['gallery_title', 'gallery_description'],
    footer: ['footer_description', 'footer_copyright'],
    contact: [
      'contact_email',
      'contact_phone',
      'contact_whatsapp',
      'contact_address',
    ],
    social: [
      'social_facebook',
      'social_instagram',
      'social_youtube',
      'social_twitter',
    ],
    seo: ['meta_keywords', 'meta_author', 'google_analytics_id'],
  };

  return suggestions[category] || [];
};

const getPlaceholderByType = (type: string) => {
  switch (type) {
    case 'TEXT':
      return 'Multi-line text content';
    case 'NUMBER':
      return '123';
    case 'BOOLEAN':
      return 'true or false';
    case 'JSON':
      return '{"key": "value"}';
    case 'IMAGE':
      return 'https://example.com/image.jpg';
    default:
      return 'Enter value';
  }
};

const validateValueByType = (value: string, type: string): string | null => {
  if (!value.trim()) return null;

  switch (type) {
    case 'NUMBER':
      if (isNaN(Number(value))) {
        return 'Must be a valid number';
      }
      break;
    case 'BOOLEAN':
      if (!['true', 'false', '1', '0'].includes(value.toLowerCase())) {
        return 'Must be true, false, 1, or 0';
      }
      break;
    case 'JSON':
      try {
        JSON.parse(value);
      } catch {
        return 'Must be valid JSON format';
      }
      break;
  }
  return null;
};

export function SettingsForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: SettingsFormProps) {
  const [isKeyEditable, setIsKeyEditable] = useState(!initialData);

  const form = useFormState(defaultFormData, {
    initialData,
    onSubmit: (data) => {
      const cleanedData = {
        ...data,
        key: (data.key as string).toLowerCase().replace(/[^a-z0-9_]/g, '_'),
        description:
          (data.description as string | undefined)?.trim() || undefined,
      };
      onSubmit(cleanedData as SettingFormData);
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const key = data.key as string | undefined;
      const value = data.value as string | undefined;
      const type = data.type as string;

      if (!key?.trim()) {
        errors.key = 'Setting key is required';
      } else if (!/^[a-z0-9_]+$/.test(key.toLowerCase())) {
        errors.key =
          'Key can only contain lowercase letters, numbers, and underscores';
      }

      if (!value?.trim()) {
        errors.value = 'Setting value is required';
      } else {
        const validationError = validateValueByType(value, type);
        if (validationError) {
          errors.value = validationError;
        }
      }

      if (!data.type) {
        errors.type = 'Setting type is required';
      }

      if (!data.category) {
        errors.category = 'Setting category is required';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = rawValue
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    form.setValue('key', formattedValue);
  };

  useEffect(() => {
    setIsKeyEditable(!initialData);
  }, [initialData]);

  const renderValueInput = () => {
    const commonProps = {
      ...form.getFieldProps('value'),
      label: 'Setting Value',
      required: true,
      placeholder: getPlaceholderByType(form.data.type as string),
    };

    switch (form.data.type) {
      case 'TEXT':
      case 'JSON':
        return (
          <TextAreaField
            {...commonProps}
            rows={form.data.type === 'JSON' ? 6 : 4}
          />
        );

      case 'NUMBER':
        return <TextField {...commonProps} type="number" />;

      case 'BOOLEAN':
        return (
          <SelectField
            {...form.getSelectProps('value')}
            label="Setting Value"
            required
            options={[
              { label: 'True', value: 'true' },
              { label: 'False', value: 'false' },
            ]}
          />
        );

      case 'IMAGE':
        return (
          <TextField
            {...commonProps}
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        );

      default:
        return <TextField {...commonProps} />;
    }
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit}
      isLoading={isLoading || form.isSubmitting}
      title={initialData ? 'Edit Setting' : 'Add New Setting'}
      description={
        initialData
          ? 'Update application setting'
          : 'Add a new configuration setting'
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            {...form.getSelectProps('category')}
            label="Category"
            required
            placeholder="Select category"
            options={settingCategoryOptions}
            description={getCategoryHelpText(form.data.category as string)}
          />

          <SelectField
            {...form.getSelectProps('type')}
            label="Value Type"
            required
            options={settingTypeOptions}
          />
        </div>

        <TextField
          {...form.getFieldProps('key')}
          label="Setting Key"
          required
          placeholder="setting_key_name"
          description="Unique identifier for this setting (lowercase, underscores only)"
          onChange={handleKeyChange}
          value={form.data.key as string}
          disabled={!isKeyEditable}
        />

        {isKeyEditable && form.data.category && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Common keys for{' '}
              {
                settingCategoryOptions.find(
                  (c) => c.value === form.data.category
                )?.label
              }
              :
            </p>
            <div className="flex flex-wrap gap-2">
              {getSettingSuggestionsByCategory(
                form.data.category as string
              ).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => form.setValue('key', suggestion)}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {renderValueInput()}

        <TextAreaField
          {...form.getFieldProps('description')}
          label="Description (Optional)"
          placeholder="Describe what this setting controls"
          rows={2}
        />

        <SwitchField
          {...form.getSwitchProps('isPublic')}
          label="Active Setting"
          description="Enable this setting to be used on the website"
        />

        {form.data.type === 'JSON' && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <strong>JSON Format Examples:</strong>
            <br />
            Simple object:{' '}
            <code>
              {'{'}&quot;key&quot;: &quot;value&quot;{'}'}
            </code>
            <br />
            Array:{' '}
            <code>
              [&quot;item1&quot;, &quot;item2&quot;, &quot;item3&quot;]
            </code>
            <br />
            Complex:{' '}
            <code>
              {'{'}&quot;colors&quot;: [&quot;red&quot;, &quot;blue&quot;],
              &quot;count&quot;: 5{'}'}
            </code>
          </div>
        )}
      </div>
    </FormDialog>
  );
}
