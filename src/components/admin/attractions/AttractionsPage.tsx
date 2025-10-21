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
import { useAttractionColumns } from './AttractionColumns';
import { AttractionForm } from './AttractionForm';
import { ViewAttractionDialog } from './ViewAttractionDialog';

import { useAttractions } from '@/hooks/admin/useEntities';
import {
  Attraction,
  AttractionFormData,
  ATTRACTION_CATEGORIES,
} from '@/types/admin/entities';
import { FilterOption } from '@/types/admin';

export default function AttractionsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(
    null
  );
  const [viewingAttraction, setViewingAttraction] = useState<Attraction | null>(
    null
  );

  const searchParams: Record<string, string> = {};
  if (search) searchParams.search = search;
  if (categoryFilter) searchParams.category = categoryFilter;

  const {
    data: attractions,
    isLoading,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAttractions(searchParams);

  const categoryFilters: FilterOption[] = ATTRACTION_CATEGORIES.map(
    (category) => ({
      label: category
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      value: category,
    })
  );

  const columns = useAttractionColumns({
    onEdit: (attraction) => {
      setEditingAttraction(attraction);
      setShowForm(true);
    },
    onDelete: (attraction) => {
      if (confirm(`Are you sure you want to delete "${attraction.title}"?`)) {
        remove(attraction.id);
      }
    },
    onView: (attraction) => {
      setViewingAttraction(attraction);
      setShowViewDialog(true);
    },
  });

  const handleAddNew = () => {
    setEditingAttraction(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data: AttractionFormData) => {
    if (editingAttraction) {
      update(editingAttraction.id, data, {
        onSuccess: () => {
          setShowForm(false);
          setEditingAttraction(null);
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
    setEditingAttraction(null);
  };

  const handleViewClose = () => {
    setShowViewDialog(false);
    setViewingAttraction(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Attractions Management"
          description="Manage tourist attractions, destinations, and activities"
          onAdd={handleAddNew}
          addButtonText="Add Attraction"
        />

        <Card>
          <CardHeader>
            <CardTitle>Attractions List</CardTitle>
            <CardDescription>
              View and manage all tourist attractions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchFilter
                search={search}
                onSearchChange={setSearch}
                placeholder="Search attractions..."
                filters={categoryFilters}
                selectedFilter={categoryFilter}
                onFilterChange={setCategoryFilter}
              />

              <DataTable<Attraction>
                data={attractions}
                columns={columns}
                isLoading={isLoading}
                emptyMessage="No attractions found"
                config={{
                  searchKey: 'title',
                  defaultSort: { field: 'title', direction: 'asc' },
                  pageSize: 10,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <AttractionForm
          isOpen={showForm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={
            editingAttraction
              ? {
                  title: editingAttraction.title || '',
                  slug: editingAttraction.slug || '',
                  description: editingAttraction.description || '',
                  fullDescription: editingAttraction.fullDescription || '',
                  category: editingAttraction.category || '',
                  difficulty: editingAttraction.difficulty || 'MUDAH',
                  duration: editingAttraction.duration || '',
                  ticketPrice: editingAttraction.ticketPrice || 0,
                  ticketPriceChild: editingAttraction.ticketPriceChild || 0,
                  location: editingAttraction.location || '',
                  coordinates: editingAttraction.coordinates || '',
                  bestTime: editingAttraction.bestTime || '',
                  facilities: editingAttraction.facilities || '',
                  tips: editingAttraction.tips || '',
                  featured: editingAttraction.featured || false,
                  isActive:
                    editingAttraction.isActive !== undefined
                      ? editingAttraction.isActive
                      : true,
                  images: editingAttraction.images || [],
                  features: editingAttraction.features || [],
                }
              : undefined
          }
          isLoading={isCreating || isUpdating}
        />

        <ViewAttractionDialog
          isOpen={showViewDialog}
          onClose={handleViewClose}
          attraction={viewingAttraction}
        />
      </div>
    </AdminLayout>
  );
}
