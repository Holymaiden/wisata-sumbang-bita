'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Star, Users } from 'lucide-react';
import { Attraction } from '@/types/admin/entities';

interface ViewAttractionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attraction: Attraction | null;
}

export function ViewAttractionDialog({
  isOpen,
  onClose,
  attraction,
}: ViewAttractionDialogProps) {
  if (!attraction) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'MUDAH':
        return 'bg-green-100 text-green-800';
      case 'SEDANG':
        return 'bg-yellow-100 text-yellow-800';
      case 'MENANTANG':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {attraction.title}
            <div className="flex gap-2">
              {attraction.featured && <Badge variant="default">Featured</Badge>}
              <Badge variant={attraction.isActive ? 'default' : 'secondary'}>
                {attraction.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Attraction details and information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                CATEGORY
              </h4>
              <p className="font-medium">{attraction.category}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                DIFFICULTY
              </h4>
              <Badge className={getDifficultyColor(attraction.difficulty)}>
                {attraction.difficulty}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              DESCRIPTION
            </h4>
            <p className="text-sm leading-relaxed">{attraction.description}</p>
          </div>

          {attraction.fullDescription && (
            <>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  FULL DESCRIPTION
                </h4>
                <p className="text-sm leading-relaxed">
                  {attraction.fullDescription}
                </p>
              </div>
            </>
          )}

          {attraction.images && attraction.images.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  IMAGES ({attraction.images.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {attraction.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${attraction.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {image.isPrimary && (
                        <Badge className="absolute top-1 left-1 text-xs">
                          Primary
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {attraction.features && attraction.features.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  FEATURES ({attraction.features.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {attraction.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature.icon && (
                        <span className="mr-1">{feature.icon}</span>
                      )}
                      {feature.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {attraction.duration}
                  </p>
                </div>
              </div>

              {attraction.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {attraction.location}
                    </p>
                    {attraction.coordinates && (
                      <p className="text-xs text-muted-foreground">
                        {attraction.coordinates}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {attraction.bestTime && (
                <div>
                  <p className="font-medium text-sm">Best Time to Visit</p>
                  <p className="text-sm text-muted-foreground">
                    {attraction.bestTime}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Pricing</p>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Adult: Rp {attraction.ticketPrice.toLocaleString('id-ID')}
                    </p>
                    {attraction.ticketPriceChild && (
                      <p>
                        Child: Rp{' '}
                        {attraction.ticketPriceChild.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Rating</p>
                  <p className="text-sm text-muted-foreground">
                    {attraction.rating.toFixed(1)} / 5.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {(attraction.facilities || attraction.tips) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attraction.facilities && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      FACILITIES
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {attraction.facilities}
                    </p>
                  </div>
                )}
                {attraction.tips && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      TIPS
                    </h4>
                    <p className="text-sm leading-relaxed">{attraction.tips}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p>
                <strong>Slug:</strong> {attraction.slug}
              </p>
              <p>
                <strong>ID:</strong> {attraction.id}
              </p>
            </div>
            <div>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(attraction.createdAt).toLocaleString('id-ID')}
              </p>
              <p>
                <strong>Updated:</strong>{' '}
                {new Date(attraction.updatedAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
