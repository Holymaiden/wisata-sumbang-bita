'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TextField, TextAreaField } from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { Plus, Edit, Trash2, Zap, X } from 'lucide-react';
import type { AttractionFeature } from '@/types/admin/entities';

interface AttractionFeatureManagerProps {
  features: AttractionFeature[];
  onChange: (features: AttractionFeature[]) => void;
  disabled?: boolean;
}

const defaultFeatureData: AttractionFeature = {
  name: '',
  icon: '',
  description: '',
};

const featureIcons = [
  { label: 'Swimming Pool', value: '🏊', icon: '🏊' },
  { label: 'Waterfall', value: '💧', icon: '💧' },
  { label: 'Cave', value: '🕳️', icon: '🕳️' },
  { label: 'Mountain', value: '⛰️', icon: '⛰️' },
  { label: 'Forest', value: '🌲', icon: '🌲' },
  { label: 'Beach', value: '🏖️', icon: '🏖️' },
  { label: 'Restaurant', value: '🍽️', icon: '🍽️' },
  { label: 'Parking', value: '🅿️', icon: '🅿️' },
  { label: 'Toilet', value: '🚻', icon: '🚻' },
  { label: 'WiFi', value: '📶', icon: '📶' },
  { label: 'Camera', value: '📸', icon: '📸' },
  { label: 'Guide', value: '🧭', icon: '🧭' },
];

export function AttractionFeatureManager({
  features,
  onChange,
  disabled = false,
}: AttractionFeatureManagerProps) {
  const [editingFeature, setEditingFeature] =
    useState<AttractionFeature | null>(null);
  const [showForm, setShowForm] = useState(false);

  const form = useFormState(defaultFeatureData, {
    initialData: editingFeature || undefined,
    onSubmit: (data) => {
      const featureData = data as AttractionFeature;
      if (editingFeature?.id) {
        const updatedFeatures = features.map((feature) =>
          feature.id === editingFeature.id
            ? { ...editingFeature, ...featureData }
            : feature
        );
        onChange(updatedFeatures);
      } else {
        const newFeature: AttractionFeature = {
          ...featureData,
          id: Date.now().toString(),
        };
        onChange([...features, newFeature]);
      }
      setShowForm(false);
      setEditingFeature(null);
      form.reset();
    },
    validate: (data) => {
      const errors: Record<string, string> = {};
      const name = data.name as string | undefined;

      if (!name?.trim()) {
        errors.name = 'Feature name is required';
      }

      return Object.keys(errors).length > 0 ? errors : null;
    },
  });

  const handleAdd = () => {
    setEditingFeature(null);
    form.reset();
    setShowForm(true);
  };

  const handleEdit = (feature: AttractionFeature) => {
    setEditingFeature(feature);
    setShowForm(true);
  };

  const handleDelete = (featureId: string) => {
    const updatedFeatures = features.filter(
      (feature) => feature.id !== featureId
    );
    onChange(updatedFeatures);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Attraction Features</h3>
        <Button type="button" onClick={handleAdd} disabled={disabled} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Zap className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              No features added yet. Click &quot;Add Feature&quot; to highlight
              what makes this attraction special.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card key={feature.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {feature.icon && (
                      <span className="text-2xl">{feature.icon}</span>
                    )}
                    <h4 className="font-medium">{feature.name}</h4>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(feature)}
                      disabled={disabled}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(feature.id!)}
                      disabled={disabled}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {feature.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {feature.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Feature Form Modal */}
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
              className="gap-4 border bg-background rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 left-0 right-0 h-fit w-full bg-background z-50 border-b">
                <div className="flex items-start justify-between py-4 px-6">
                  <div className="flex flex-col gap-y-2 flex-1 pr-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                      {editingFeature ? 'Edit Feature' : 'Add New Feature'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
                      {editingFeature
                        ? 'Update feature information'
                        : 'Add a new feature to highlight what makes this attraction special'}
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
                <TextField
                  {...form.getFieldProps('name')}
                  label="Feature Name"
                  required
                  placeholder="e.g., Natural Swimming Pool, Cave Exploration"
                />

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Icon (Optional)
                  </label>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {featureIcons.map((iconOption) => (
                      <Button
                        key={iconOption.value}
                        type="button"
                        variant={
                          form.data.icon === iconOption.value
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        className="h-10"
                        onClick={() => form.setValue('icon', iconOption.value)}
                      >
                        {iconOption.icon}
                      </Button>
                    ))}
                  </div>
                  <TextField
                    {...form.getFieldProps('icon')}
                    placeholder="Or enter custom emoji/icon"
                    value={(form.data.icon as string) || ''}
                  />
                </div>

                <TextAreaField
                  {...form.getFieldProps('description')}
                  label="Description (Optional)"
                  placeholder="Describe this feature in more detail"
                  rows={3}
                />

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
                      : editingFeature
                      ? 'Update Feature'
                      : 'Add Feature'}
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
