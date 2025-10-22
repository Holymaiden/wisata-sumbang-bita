'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Share2,
  Settings,
  ArrowUpDown,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ContactInfo {
  id: string;
  type: 'PHONE' | 'EMAIL' | 'ADDRESS' | 'SOCIAL_MEDIA' | 'OTHER';
  title: string;
  value: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ContactFormData {
  type: 'PHONE' | 'EMAIL' | 'ADDRESS' | 'SOCIAL_MEDIA' | 'OTHER';
  title: string;
  value: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
}

const columnHelper = createColumnHelper<ContactInfo>();

const contactTypes = [
  { value: 'PHONE', label: 'Phone', icon: Phone },
  { value: 'EMAIL', label: 'Email', icon: Mail },
  { value: 'ADDRESS', label: 'Address', icon: MapPin },
  { value: 'SOCIAL_MEDIA', label: 'Social Media', icon: Share2 },
  { value: 'OTHER', label: 'Other', icon: Settings },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    type: 'PHONE',
    title: '',
    value: '',
    description: '',
    icon: '',
    isActive: true,
    order: 0,
  });

  const queryClient = useQueryClient();

  const { data: contactsData, isLoading } = useQuery({
    queryKey: ['admin-contacts', search, typeFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (typeFilter) params.append('type', typeFilter);

      const response = await fetch(`/api/admin/contacts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      setShowDialog(false);
      resetForm();
      toast.success('Contact created successfully');
    },
    onError: () => {
      toast.error('Failed to create contact');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ContactFormData }) => {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      setShowDialog(false);
      setEditingId(null);
      resetForm();
      toast.success('Contact updated successfully');
    },
    onError: () => {
      toast.error('Failed to update contact');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast.success('Contact deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete contact');
    },
  });

  const resetForm = () => {
    setFormData({
      type: 'PHONE',
      title: '',
      value: '',
      description: '',
      icon: '',
      isActive: true,
      order: 0,
    });
  };

  const handleEdit = (contact: ContactInfo) => {
    setEditingId(contact.id);
    setFormData({
      type: contact.type,
      title: contact.title,
      value: contact.value,
      description: contact.description || '',
      icon: contact.icon || '',
      isActive: contact.isActive,
      order: contact.order,
    });
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getTypeIcon = (type: string) => {
    const contactType = contactTypes.find((t) => t.value === type);
    return contactType?.icon || Settings;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      PHONE: 'bg-blue-100 text-blue-800',
      EMAIL: 'bg-green-100 text-green-800',
      ADDRESS: 'bg-purple-100 text-purple-800',
      SOCIAL_MEDIA: 'bg-pink-100 text-pink-800',
      OTHER: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.OTHER;
  };

  const columns = [
    columnHelper.display({
      id: 'icon',
      header: '',
      cell: ({ row }) => {
        const IconComponent = getTypeIcon(row.original.type);
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <IconComponent className="h-4 w-4 text-gray-600" />
          </div>
        );
      },
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          {row.original.description && (
            <div className="text-sm text-gray-500">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: ({ row }) => {
        const contactType = contactTypes.find(
          (t) => t.value === row.original.type
        );
        return (
          <Badge className={getTypeColor(row.original.type)}>
            {contactType?.label || row.original.type}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: ({ row }) => (
        <div className="font-mono text-sm max-w-xs truncate">
          {row.original.value}
        </div>
      ),
    }),
    columnHelper.accessor('order', {
      header: 'Order',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
          <span>{row.original.order}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'destructive'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: contactsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Information
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your contact details and communication channels
            </p>
          </div>
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={typeFilter || 'all'}
                onValueChange={(value) =>
                  setTypeFilter(value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {contactTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {contactTypes.map((type) => {
            const count =
              contactsData?.data?.filter(
                (c: ContactInfo) => c.type === type.value
              ).length || 0;
            const IconComponent = type.icon;
            return (
              <Card key={type.value}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{type.label}</p>
                      <p className="text-2xl font-bold">{count}</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      Loading contacts...
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Contact' : 'Add New Contact'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the contact information below.'
                : 'Fill in the details to add new contact information.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: value as ContactFormData['type'],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contactTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: Number(e.target.value),
                    }))
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Main Office Phone, Customer Service Email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                placeholder="Phone number, email address, physical address, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                placeholder="Brief description or usage notes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Optional)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, icon: e.target.value }))
                }
                placeholder="Icon class or emoji"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowDialog(false);
                  setEditingId(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : editingId
                  ? 'Update'
                  : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
