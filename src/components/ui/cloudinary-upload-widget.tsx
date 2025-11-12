'use client';

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useEffect } from 'react';

interface CloudinaryUploadWidgetProps {
  value?: string;
  onChange: (url: string, publicId: string) => void;
  onRemove?: () => void;
  folder?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
}

export function CloudinaryUploadWidget({
  value,
  onChange,
  onRemove,
  folder = 'wisata-sumbang-bita',
  disabled = false,
  label,
  description,
  error,
}: CloudinaryUploadWidgetProps) {
  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === 'success' &&
      result.info &&
      typeof result.info !== 'string'
    ) {
      onChange(result.info.secure_url, result.info.public_id);
    }
  };

  // Pastikan Cloudinary widget overlay memiliki z-index tertinggi
  useEffect(() => {
    const fixCloudinaryZIndex = () => {
      // Target semua elemen Cloudinary yang mungkin dibuat
      const selectors = [
        '#cloudinary-overlay',
        '.cloudinary-overlay',
        'div[id^="cloudinary"]',
        'iframe[id^="cloudinary"]',
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el instanceof HTMLElement || el instanceof HTMLIFrameElement) {
            el.style.zIndex = '99999';
          }
        });
      });
    };

    // Jalankan saat mount dan dengan interval untuk catch widget yang baru dibuat
    fixCloudinaryZIndex();
    const interval = setInterval(fixCloudinaryZIndex, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}

      <div className="space-y-2">
        {value ? (
          <div className="relative">
            <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border bg-muted">
              <CldImage
                src={value}
                alt="Upload preview"
                fill
                className="object-cover"
              />
            </div>
            {onRemove && !disabled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={onRemove}
              >
                <X className="w-4 h-4 mr-2" />
                Hapus Gambar
              </Button>
            )}
          </div>
        ) : (
          <div className="relative" style={{ zIndex: 9999999999 }}>
            <CldUploadWidget
              uploadPreset="wisata"
              options={{
                folder,
                maxFiles: 1,
                sources: ['local', 'url', 'camera'],
                resourceType: 'image',
                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                maxFileSize: 5000000, // 5MB
                cropping: true,
                croppingAspectRatio: 16 / 9,
                croppingShowDimensions: true,
                multiple: false,
                showSkipCropButton: false,
                styles: {
                  palette: {
                    window: '#FFFFFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#0078FF',
                    menuIcons: '#5A616A',
                    textDark: '#000000',
                    textLight: '#FFFFFF',
                    link: '#0078FF',
                    action: '#FF620C',
                    inactiveTabIcon: '#0E2F5A',
                    error: '#F44235',
                    inProgress: '#0078FF',
                    complete: '#20B832',
                    sourceBg: '#E4EBF1',
                  },
                },
              }}
              onSuccess={handleUpload}
            >
              {({ open }) => (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => open()}
                  disabled={disabled}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Gambar
                </Button>
              )}
            </CldUploadWidget>
          </div>
        )}
      </div>

      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
