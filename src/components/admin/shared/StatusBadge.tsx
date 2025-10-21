'use client';

import { Badge } from '@/components/ui/badge';
import { StatusBadgeProps } from '@/types/admin';

const statusVariants = {
  active: 'default',
  inactive: 'secondary',
  pending: 'outline',
  approved: 'default',
  rejected: 'destructive',

  PENDING: 'outline',
  CONTACTED: 'secondary',
  CONFIRMED: 'default',
  CANCELLED: 'destructive',
  COMPLETED: 'default',

  MUDAH: 'default',
  SEDANG: 'secondary',
  MENANTANG: 'destructive',

  true: 'default',
  false: 'secondary',

  PHONE: 'default',
  EMAIL: 'secondary',
  ADDRESS: 'outline',
  SOCIAL_MEDIA: 'default',
  OTHER: 'secondary',
} as const;

const statusLabels = {
  true: 'Active',
  false: 'Inactive',

  MUDAH: 'Easy',
  SEDANG: 'Medium',
  MENANTANG: 'Challenging',

  PENDING: 'Pending',
  CONTACTED: 'Contacted',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
} as const;

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const normalizedStatus = String(status).toLowerCase();
  const upperStatus = String(status).toUpperCase();

  const badgeVariant =
    variant ||
    statusVariants[upperStatus as keyof typeof statusVariants] ||
    statusVariants[normalizedStatus as keyof typeof statusVariants] ||
    'outline';

  const label =
    statusLabels[upperStatus as keyof typeof statusLabels] ||
    statusLabels[status as keyof typeof statusLabels] ||
    String(status);

  return <Badge variant={badgeVariant}>{label}</Badge>;
}
