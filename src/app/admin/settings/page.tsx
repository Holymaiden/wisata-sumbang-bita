'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/AdminLayout';
import { SettingsForm } from '@/components/admin/settings/SettingsForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Globe,
  Mail,
  Share2,
  Edit,
  Trash2,
  Database,
  Search,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SettingFormData } from '@/types/admin/entities';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'JSON' | 'IMAGE';
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SettingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const queryClient = useQueryClient();

  const { data: settingsData, isLoading } = useQuery({
    queryKey: [
      'admin-settings',
      { category: selectedCategory, search: searchTerm },
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all')
        params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);

      params.append('limit', '1000');

      const response = await fetch(`/api/admin/settings?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: SettingFormData) => {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create setting');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('Setting created successfully');
      setShowForm(false);
    },
    onError: () => {
      toast.error('Failed to create setting');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: SettingFormData }) => {
      const response = await fetch(`/api/admin/settings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update setting');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('Setting updated successfully');
      setShowForm(false);
      setEditingId(null);
    },
    onError: () => {
      toast.error('Failed to update setting');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/settings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete setting');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast.success('Setting deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete setting');
    },
  });

  const handleEdit = (setting: SiteSetting) => {
    setEditingId(setting.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this setting?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: SettingFormData) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getCurrentSetting = (): SettingFormData | undefined => {
    if (!editingId || !settingsData?.data) return undefined;
    const setting = settingsData.data.find(
      (s: SiteSetting) => s.id === editingId
    );
    if (!setting) return undefined;

    return {
      key: setting.key,
      value: setting.value,
      type: setting.type,
      category: setting.category,
      description: setting.description,
      isPublic: setting.isActive,
    };
  };

  const groupedSettings =
    settingsData?.data.reduce(
      (acc: Record<string, SiteSetting[]>, setting: SiteSetting) => {
        if (!acc[setting.category]) {
          acc[setting.category] = [];
        }
        acc[setting.category].push(setting);
        return acc;
      },
      {}
    ) || {};

  const categories = [
    'general',
    'hero',
    'about',
    'gallery',
    'footer',
    'contact',
    'social',
    'seo',
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your website configuration and content
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Setting
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Globe className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="content">
              <Database className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="h-4 w-4 mr-2" />
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic website information and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {['general', 'seo'].map(
                      (category) =>
                        groupedSettings[category] && (
                          <div key={category} className="space-y-3">
                            <h3 className="font-medium text-gray-900 capitalize flex items-center gap-2">
                              {category}
                              <Badge variant="outline">
                                {groupedSettings[category].length}
                              </Badge>
                            </h3>
                            <div className="grid gap-3">
                              {groupedSettings[category].map(
                                (setting: SiteSetting) => (
                                  <div
                                    key={setting.id}
                                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {setting.key}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {setting.type}
                                        </Badge>
                                        {setting.isActive ? (
                                          <Eye className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <EyeOff className="h-4 w-4 text-gray-400" />
                                        )}
                                      </div>
                                      {setting.description && (
                                        <p className="text-sm text-gray-500 mt-1">
                                          {setting.description}
                                        </p>
                                      )}
                                      <p className="text-sm font-mono mt-2 bg-white p-2 rounded border max-w-md truncate">
                                        {setting.value}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(setting)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleDelete(setting.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Hero, about, gallery and footer content configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {['hero', 'about', 'gallery', 'footer'].map(
                      (category) =>
                        groupedSettings[category] && (
                          <div key={category} className="space-y-3">
                            <h3 className="font-medium text-gray-900 capitalize flex items-center gap-2">
                              {category}
                              <Badge variant="outline">
                                {groupedSettings[category].length}
                              </Badge>
                            </h3>
                            <div className="grid gap-3">
                              {groupedSettings[category].map(
                                (setting: SiteSetting) => (
                                  <div
                                    key={setting.id}
                                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {setting.key}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {setting.type}
                                        </Badge>
                                        {setting.isActive ? (
                                          <Eye className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <EyeOff className="h-4 w-4 text-gray-400" />
                                        )}
                                      </div>
                                      {setting.description && (
                                        <p className="text-sm text-gray-500 mt-1">
                                          {setting.description}
                                        </p>
                                      )}
                                      <p className="text-sm font-mono mt-2 bg-white p-2 rounded border max-w-md truncate">
                                        {setting.value}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(setting)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleDelete(setting.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Settings</CardTitle>
                <CardDescription>
                  Contact information and communication channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {groupedSettings.contact && (
                      <div className="grid gap-3">
                        {groupedSettings.contact.map((setting: SiteSetting) => (
                          <div
                            key={setting.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {setting.key}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {setting.type}
                                </Badge>
                                {setting.isActive ? (
                                  <Eye className="h-4 w-4 text-green-600" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              {setting.description && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {setting.description}
                                </p>
                              )}
                              <p className="text-sm font-mono mt-2 bg-white p-2 rounded border max-w-md truncate">
                                {setting.value}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(setting)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(setting.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Settings</CardTitle>
                <CardDescription>
                  Social media links and profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {groupedSettings.social && (
                      <div className="grid gap-3">
                        {groupedSettings.social.map((setting: SiteSetting) => (
                          <div
                            key={setting.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {setting.key}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {setting.type}
                                </Badge>
                                {setting.isActive ? (
                                  <Eye className="h-4 w-4 text-green-600" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              {setting.description && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {setting.description}
                                </p>
                              )}
                              <p className="text-sm font-mono mt-2 bg-white p-2 rounded border max-w-md truncate">
                                {setting.value}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(setting)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(setting.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <SettingsForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingId(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={getCurrentSetting()}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </AdminLayout>
  );
}
