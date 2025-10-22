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
import { Eye, Hash, Image as ImageIcon } from 'lucide-react';
import { GalleryImage } from '@/types/admin/entities';
import Image from 'next/image';

interface ViewGalleryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryImage | null;
}

export function ViewGalleryDialog({
  isOpen,
  onClose,
  image,
}: ViewGalleryDialogProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {image.title}
            <div className="flex gap-2">
              {image.featured && <Badge variant="default">Featured</Badge>}
              <Badge variant={image.isActive ? 'default' : 'secondary'}>
                {image.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Gallery image details and preview
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <Image
                src={image.url}
                alt={image.alt || image.title}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                CATEGORY
              </h4>
              <p className="font-medium">{image.category}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                ORDER
              </h4>
              <p className="font-medium">{image.order}</p>
            </div>
          </div>

          {image.description && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  DESCRIPTION
                </h4>
                <p className="text-sm leading-relaxed">{image.description}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Alt Text</p>
                  <p className="text-sm text-muted-foreground">
                    {image.alt || 'No alt text provided'}
                  </p>
                </div>
              </div>

              {image.tags && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Tags</p>
                    <p className="text-sm text-muted-foreground">
                      {image.tags}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">View Count</p>
                  <p className="text-sm text-muted-foreground">
                    {image.viewCount.toLocaleString('id-ID')} views
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              IMAGE URL
            </h4>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-mono break-all">{image.url}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p>
                <strong>ID:</strong> {image.id}
              </p>
            </div>
            <div>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(image.createdAt).toLocaleString('id-ID')}
              </p>
              <p>
                <strong>Updated:</strong>{' '}
                {new Date(image.updatedAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
