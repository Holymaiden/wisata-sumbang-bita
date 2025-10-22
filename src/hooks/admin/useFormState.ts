'use client';

import { useState, useCallback, useEffect } from 'react';

export interface UseFormStateOptions<T> {
  initialData?: T;
  onSubmit?: (data: T) => void;
  onReset?: () => void;
  validate?: (data: T) => Record<string, string> | null;
}

export function useFormState<T extends Record<string, unknown>>(
  defaultValues: T,
  options: UseFormStateOptions<T> = {}
) {
  const [data, setData] = useState<T>(options.initialData || defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (options.initialData) {
      const mergedData = { ...defaultValues, ...options.initialData };
      setData(mergedData);
      setErrors({});
      setTouched({});
    }
  }, [options.initialData, defaultValues]);

  const setValue = useCallback(
    (field: keyof T, value: unknown) => {
      setData((prev) => ({ ...prev, [field]: value }));

      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback(
    (field: keyof T, isTouched: boolean = true) => {
      setTouched((prev) => ({ ...prev, [field]: isTouched }));
    },
    []
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const reset = useCallback(
    (newData?: T) => {
      const resetData = newData || options.initialData || defaultValues;
      setData(resetData);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
      options.onReset?.();
    },
    [defaultValues, options]
  );

  const validate = useCallback(() => {
    if (!options.validate) return true;

    const validationErrors = options.validate(data);
    if (validationErrors) {
      setErrors(validationErrors);
      return false;
    }

    clearErrors();
    return true;
  }, [data, options, clearErrors]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);
      try {
        await options.onSubmit?.(data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [data, validate, options]
  );

  const getFieldProps = useCallback(
    (field: keyof T) => ({
      name: field as string,
      value: data[field] == null ? '' : String(data[field]),
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const value = e.target.value;

        setValue(field, value === '' ? undefined : value);
      },
      onBlur: () => setFieldTouched(field),
      error: touched[field as string] ? errors[field as string] : undefined,
    }),
    [data, errors, touched, setValue, setFieldTouched]
  );

  const getSelectProps = useCallback(
    (field: keyof T) => ({
      name: field as string,
      value: data[field] == null ? '' : String(data[field]),
      onValueChange: (value: string) =>
        setValue(field, value === '' ? undefined : value),
      error: touched[field as string] ? errors[field as string] : undefined,
    }),
    [data, errors, touched, setValue]
  );

  const getSwitchProps = useCallback(
    (field: keyof T) => ({
      name: field as string,
      checked: Boolean(data[field]),
      onCheckedChange: (checked: boolean) => setValue(field, checked),
    }),
    [data, setValue]
  );

  const hasErrors = Object.keys(errors).length > 0;
  const isValid = !hasErrors && Object.keys(touched).length > 0;

  return {
    data,
    errors,
    touched,
    isSubmitting,
    hasErrors,
    isValid,
    setValue,
    setFieldTouched,
    setFieldError,
    clearErrors,
    reset,
    validate,
    handleSubmit,
    getFieldProps,
    getSelectProps,
    getSwitchProps,
  };
}
