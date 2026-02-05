'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ShippingAddress } from '@/lib/types/commerce';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'IL', name: 'Israel' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];

interface CheckoutFormProps {
  defaultValues?: Partial<ShippingAddress>;
  onSubmit: (data: ShippingAddress) => void;
}

export function CheckoutForm({ defaultValues, onSubmit }: CheckoutFormProps) {
  const t = useTranslations('commerce');

  const schema = z.object({
    firstName: z.string().min(1, t('required_field')),
    lastName: z.string().min(1, t('required_field')),
    email: z.string().min(1, t('required_field')).email(t('invalid_email')),
    phone: z.string().min(1, t('required_field')),
    address1: z.string().min(1, t('required_field')),
    address2: z.string().optional(),
    city: z.string().min(1, t('required_field')),
    state: z.string().min(1, t('required_field')),
    zipCode: z.string().min(1, t('required_field')),
    country: z.string().min(1, t('required_field')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: 'US',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_first_name')} *
          </label>
          <Input {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_last_name')} *
          </label>
          <Input {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_email')} *
          </label>
          <Input type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_phone')} *
          </label>
          <Input type="tel" {...register('phone')} />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          {t('shipping_address1')} *
        </label>
        <Input {...register('address1')} />
        {errors.address1 && (
          <p className="text-sm text-red-600 mt-1">{errors.address1.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          {t('shipping_address2')}
        </label>
        <Input {...register('address2')} />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_city')} *
          </label>
          <Input {...register('city')} />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_state')} *
          </label>
          <Input {...register('state')} />
          {errors.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {t('shipping_zip')} *
          </label>
          <Input {...register('zipCode')} />
          {errors.zipCode && (
            <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          {t('shipping_country')} *
        </label>
        <select
          {...register('country')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-6" size="lg">
        {t('continue_to_delivery')}
      </Button>
    </form>
  );
}
