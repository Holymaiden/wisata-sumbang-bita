'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart3,
  Users,
  MapPin,
  Image,
  MessageSquare,
  Star,
  Calendar,
  TrendingUp,
  Eye,
} from 'lucide-react';

interface DashboardStats {
  totalAttractions: number;
  activeAttractions: number;
  featuredAttractions: number;
  totalGallery: number;
  activeGallery: number;
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  thisMonthBookings: number;
  lastMonthBookings: number;
  bookingGrowth: number;
  averageRating: number;
  totalViews: number;
  recentReviews: any[];
  recentBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Attractions',
      value: stats?.totalAttractions || 0,
      icon: MapPin,
      description: `${stats?.featuredAttractions || 0} featured`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Gallery Images',
      value: stats?.totalGallery || 0,
      icon: Image,
      description: 'Images in gallery',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Reviews',
      value: stats?.totalReviews || 0,
      icon: Star,
      description: `${stats?.pendingReviews || 0} pending approval`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Bookings',
      value: stats?.totalBookings || 0,
      icon: Calendar,
      description: `${stats?.pendingBookings || 0} pending`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      description: 'Site visits',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Growth',
      value: `${(stats?.bookingGrowth || 0) > 0 ? '+' : ''}${
        stats?.bookingGrowth || 0
      }%`,
      icon: TrendingUp,
      description: 'This month',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-attraction':
        router.push('/admin/attractions');
        break;
      case 'upload-images':
        router.push('/admin/gallery');
        break;
      case 'review-management':
        router.push('/admin/reviews');
        break;
      case 'bookings':
        router.push('/admin/bookings');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your tourism site management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {typeof stat.value === 'number'
                    ? stat.value.toLocaleString()
                    : stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates across your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentReviews?.slice(0, 2).map((review, index) => (
                  <div
                    key={review.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Star className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Review from {review.name} - {review.rating}★
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.attraction} •{' '}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {stats?.recentBookings?.slice(0, 2).map((booking, index) => (
                  <div
                    key={booking.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-1 bg-green-100 rounded-full">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Booking from {booking.name} - {booking.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.email} •{' '}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {!stats?.recentReviews?.length &&
                  !stats?.recentBookings?.length && (
                    <div className="text-center text-gray-500 py-8">
                      <p className="text-sm">No recent activity</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickAction('add-attraction')}
                  className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="font-medium text-sm">Add Attraction</p>
                  <p className="text-xs text-gray-500">
                    Create new destination
                  </p>
                </button>
                <button
                  onClick={() => handleQuickAction('upload-images')}
                  className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Image className="h-8 w-8 text-green-600 mb-2" />
                  <p className="font-medium text-sm">Upload Images</p>
                  <p className="text-xs text-gray-500">Add to gallery</p>
                </button>
                <button
                  onClick={() => handleQuickAction('review-management')}
                  className="p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                >
                  <Star className="h-8 w-8 text-yellow-600 mb-2" />
                  <p className="font-medium text-sm">Review Management</p>
                  <p className="text-xs text-gray-500">Approve reviews</p>
                </button>
                <button
                  onClick={() => handleQuickAction('bookings')}
                  className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Calendar className="h-8 w-8 text-purple-600 mb-2" />
                  <p className="font-medium text-sm">Bookings</p>
                  <p className="text-xs text-gray-500">Manage inquiries</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
