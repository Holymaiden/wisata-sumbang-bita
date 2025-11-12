'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
} from 'lucide-react';
import { GalleryImage } from '@/types/admin/entities';
import { StatusBadge } from '../shared/StatusBadge';
import { ActionButtons } from '../shared/ActionButtons';
import { TableAction } from '@/types/admin';
import { CldImage } from 'next-cloudinary';

interface UseGalleryColumnsProps {
  onEdit: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
  onView: (image: GalleryImage) => void;
}

export function useGalleryColumns({
  onEdit,
  onDelete,
  onView,
}: UseGalleryColumnsProps): ColumnDef<GalleryImage>[] {
  const actions: TableAction<GalleryImage>[] = [
    {
      label: 'View',
      icon: Eye,
      onClick: onView,
      variant: 'ghost',
    },
    {
      label: 'Edit',
      icon: Edit,
      onClick: onEdit,
      variant: 'ghost',
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: onDelete,
      variant: 'ghost',
    },
  ];

  return [
    {
      accessorKey: 'url',
      header: 'Image',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted">
            {row.original.url ? (
              <CldImage
                src={row.original.url}
                alt={row.original.alt || row.original.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="min-w-[200px]">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.category}
          </div>
          {row.original.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.category.toLowerCase().replace(/_/g, ' ')}
        </div>
      ),
    },
    {
      accessorKey: 'order',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold"
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.order}</div>
      ),
    },
    {
      accessorKey: 'viewCount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold"
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.viewCount.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <div className="space-y-1">
          <div>
            <StatusBadge
              status={row.original.isActive ? 'active' : 'inactive'}
            />
          </div>
          {row.original.featured && (
            <div>
              <StatusBadge status="Featured" variant="default" />
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionButtons item={row.original} actions={actions} />
      ),
    },
  ];
}
