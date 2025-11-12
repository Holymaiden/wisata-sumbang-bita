'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Hash, Image as ImageIcon, X } from 'lucide-react';
import { GalleryImage } from '@/types/admin/entities';
import { CldImage } from 'next-cloudinary';

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
  if (!image || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="gap-4 border bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 left-0 right-0 h-fit w-full bg-background z-50 border-b">
              <div className="flex items-start justify-between py-4 px-6">
                <div className="flex flex-col gap-y-2 flex-1 pr-4">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                      {image.title}
                    </h1>
                    <div className="flex gap-2 shrink-0">
                      {image.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      <Badge variant={image.isActive ? 'default' : 'secondary'}>
                        {image.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
                    Gallery image details and preview
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-6 p-6">
              <div className="flex justify-center">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <CldImage
                    src={image.url}
                    alt={image.alt || image.title}
                    fill
                    className="object-cover"
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
                    <p className="text-sm leading-relaxed">
                      {image.description}
                    </p>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
