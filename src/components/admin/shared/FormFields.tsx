'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  description?: string;
}

interface TextFieldProps extends FieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel';
  disabled?: boolean;
}

interface TextAreaFieldProps extends FieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

interface SelectFieldProps extends FieldProps {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

interface SwitchFieldProps extends FieldProps {
  name: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

function FieldWrapper({
  label,
  required,
  error,
  className,
  description,
  children,
}: FieldProps & { children: React.ReactNode }) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function TextField({
  label,
  required,
  error,
  className,
  description,
  ...inputProps
}: TextFieldProps) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      className={className}
      description={description}
    >
      <Input
        {...inputProps}
        className={cn(error && 'border-red-500 focus-visible:ring-red-500')}
      />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  required,
  error,
  className,
  description,
  rows = 3,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      className={className}
      description={description}
    >
      <Textarea
        {...textareaProps}
        rows={rows}
        className={cn(error && 'border-red-500 focus-visible:ring-red-500')}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  required,
  error,
  className,
  description,
  placeholder = 'Select an option',
  options,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      className={className}
      description={description}
    >
      <Select {...selectProps}>
        <SelectTrigger
          className={cn(error && 'border-red-500 focus:ring-red-500')}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options
            .filter((option) => option.value !== '')
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </FieldWrapper>
  );
}

export function SwitchField({
  label,
  required,
  error,
  className,
  description,
  ...switchProps
}: SwitchFieldProps) {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      className={className}
      description={description}
    >
      <div className="flex items-center space-x-2">
        <Switch {...switchProps} />
        {label && (
          <Label htmlFor={switchProps.name} className="text-sm font-normal">
            {switchProps.checked ? 'Enabled' : 'Disabled'}
          </Label>
        )}
      </div>
    </FieldWrapper>
  );
}
