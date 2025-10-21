'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, TextAreaField } from '../shared/FormFields';
import { useFormState } from '@/hooks/admin/useFormState';
import { Plus, Edit, Trash2, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface AttractionFeature {
  id?: string;
  name: string;
  icon?: string;
  description?: string;
}

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
      if (editingFeature?.id) {
        const updatedFeatures = features.map((feature) =>
          feature.id === editingFeature.id
            ? { ...editingFeature, ...data }
            : feature
        );
        onChange(updatedFeatures);
      } else {
        const newFeature: AttractionFeature = {
          ...data,
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

      if (!data.name?.trim()) {
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
              No features added yet. Click "Add Feature" to highlight what makes
              this attraction special.
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

      {/* Feature Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingFeature ? 'Edit Feature' : 'Add New Feature'}
            </DialogTitle>
            <DialogDescription>
              {editingFeature
                ? 'Update feature information'
                : 'Add a new feature to highlight what makes this attraction special'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit} className="space-y-4">
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
                value={form.data.icon || ''}
              />
            </div>

            <TextAreaField
              {...form.getFieldProps('description')}
              label="Description (Optional)"
              placeholder="Describe this feature in more detail"
              rows={3}
            />

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
                  : editingFeature
                  ? 'Update Feature'
                  : 'Add Feature'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
