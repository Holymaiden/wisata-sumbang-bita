'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Trash2, Eye, MapPin, Star } from 'lucide-react';
import { Attraction } from '@/types/admin/entities';
import { StatusBadge } from '../shared/StatusBadge';
import { ActionButtons } from '../shared/ActionButtons';
import { TableAction } from '@/types/admin';

interface UseAttractionColumnsProps {
  onEdit: (attraction: Attraction) => void;
  onDelete: (attraction: Attraction) => void;
  onView: (attraction: Attraction) => void;
}

export function useAttractionColumns({
  onEdit,
  onDelete,
  onView,
}: UseAttractionColumnsProps): ColumnDef<Attraction>[] {
  const actions: TableAction<Attraction>[] = [
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
        </div>
      ),
    },
    {
      accessorKey: 'difficulty',
      header: 'Difficulty',
      cell: ({ row }) => <StatusBadge status={row.original.difficulty} />,
    },
    {
      accessorKey: 'ticketPrice',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          <div className="font-medium">
            Rp {row.original.ticketPrice.toLocaleString('id-ID')}
          </div>
          {row.original.ticketPriceChild && (
            <div className="text-sm text-muted-foreground">
              Child: Rp {row.original.ticketPriceChild.toLocaleString('id-ID')}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => row.original.duration,
    },
    {
      id: 'media',
      header: 'Media',
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          <div>{row.original.images?.length || 0} images</div>
          <div>{row.original.features?.length || 0} features</div>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3" />
          {row.original.location || 'Not specified'}
        </div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{row.original.rating.toFixed(1)}</span>
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
