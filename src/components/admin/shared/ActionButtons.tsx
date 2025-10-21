'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableAction } from '@/types/admin';

interface ActionButtonsProps<T> {
  item: T;
  actions: TableAction<T>[];
  showDropdown?: boolean;
}

export function ActionButtons<T>({
  item,
  actions,
  showDropdown = true,
}: ActionButtonsProps<T>) {
  if (!showDropdown || actions.length <= 2) {
    return (
      <div className="flex items-center gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant || 'ghost'}
              size="sm"
              onClick={() => action.onClick(item)}
              disabled={action.disabled}
              className="h-8 w-8 p-0"
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span className="sr-only">{action.label}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick(item)}
              disabled={action.disabled}
              className="cursor-pointer"
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
