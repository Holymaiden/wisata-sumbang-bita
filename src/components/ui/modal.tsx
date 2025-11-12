'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  maxHeight?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'xl',
  maxHeight = '450px',
}: ModalProps) {
  if (!isOpen) return null;

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
            className={`gap-4 border bg-background rounded-lg shadow-lg ${maxWidthClasses[maxWidth]} max-h-[${maxHeight}] mx-8 md:mx-0 overflow-auto w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 left-0 right-0 h-fit w-full bg-background z-50 border-b">
              <div className="flex items-start justify-between py-4 px-6">
                <div className="flex flex-col gap-y-2 flex-1 pr-4">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
                      {description}
                    </p>
                  )}
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

            <div className="flex flex-col space-y-6 p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
