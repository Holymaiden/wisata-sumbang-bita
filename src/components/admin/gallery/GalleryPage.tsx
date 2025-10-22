'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { PageHeader } from '../shared/PageHeader';
import { SearchFilter } from '../shared/SearchFilter';
import { DataTable } from '../shared/DataTable';
import { useGalleryColumns } from './GalleryColumns';
import { GalleryForm } from './GalleryForm';
import { ViewGalleryDialog } from './ViewGalleryDialog';

import { useGallery } from '@/hooks/admin/useEntities';
import {
  GalleryImage,
  GalleryFormData,
  GALLERY_CATEGORIES,
} from '@/types/admin/entities';
import { FilterOption } from '@/types/admin';

export default function GalleryPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [viewingImage, setViewingImage] = useState<GalleryImage | null>(null);

  const searchParams: Record<string, string> = {};
  if (search) searchParams.search = search;
  if (categoryFilter) searchParams.category = categoryFilter;

  const {
    data: images,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
  } = useGallery(searchParams);

  const categoryFilters: FilterOption[] = GALLERY_CATEGORIES.map(
    (category) => ({
      label: category
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      value: category,
    })
  );

  const columns = useGalleryColumns({
    onEdit: (image) => {
      setEditingImage(image);
      setShowForm(true);
    },
    onDelete: (image) => {
      if (confirm(`Are you sure you want to delete "${image.title}"?`)) {
        remove(image.id);
      }
    },
    onView: (image) => {
      setViewingImage(image);
      setShowViewDialog(true);
    },
  });

  const handleAddNew = () => {
    setEditingImage(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data: GalleryFormData) => {
    if (editingImage) {
      update(editingImage.id, data, {
        onSuccess: () => {
          setShowForm(false);
          setEditingImage(null);
        },
      });
    } else {
      create(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingImage(null);
  };

  const handleViewClose = () => {
    setShowViewDialog(false);
    setViewingImage(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Gallery Management"
          description="Manage gallery images, photos, and visual content"
          onAdd={handleAddNew}
          addButtonText="Add Image"
        />

        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>
              View and manage all gallery images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchFilter
                search={search}
                onSearchChange={setSearch}
                placeholder="Search images..."
                filters={categoryFilters}
                selectedFilter={categoryFilter}
                onFilterChange={setCategoryFilter}
              />

              <DataTable<GalleryImage>
                data={images}
                columns={columns}
                isLoading={isLoading}
                emptyMessage="No images found"
                config={{
                  searchKey: 'title',
                  defaultSort: { field: 'order', direction: 'asc' },
                  pageSize: 10,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <GalleryForm
          isOpen={showForm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={
            editingImage
              ? {
                  title: editingImage.title,
                  description: editingImage.description,
                  url: editingImage.url,
                  alt: editingImage.alt,
                  category: editingImage.category,
                  tags: editingImage.tags,
                  isActive: editingImage.isActive,
                  featured: editingImage.featured,
                  order: editingImage.order,
                }
              : undefined
          }
          isLoading={isCreating || isUpdating}
        />

        <ViewGalleryDialog
          isOpen={showViewDialog}
          onClose={handleViewClose}
          image={viewingImage}
        />
      </div>
    </AdminLayout>
  );
}
