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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_first_name')} *
          </label>
          <Input 
            {...register('firstName')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.firstName ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_last_name')} *
          </label>
          <Input 
            {...register('lastName')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.lastName ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_email')} *
          </label>
          <Input 
            type="email" 
            {...register('email')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_phone')} *
          </label>
          <Input 
            type="tel" 
            {...register('phone')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.phone ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground ml-1">
          {t('shipping_address1')} *
        </label>
        <Input 
          {...register('address1')} 
          className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.address1 ? 'border-red-500 focus:ring-red-200' : ''}`}
        />
        {errors.address1 && (
          <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.address1.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground ml-1">
          {t('shipping_address2')}
        </label>
        <Input 
          {...register('address2')} 
          className="rounded-full shadow-soft focus:ring-primary/20"
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_city')} *
          </label>
          <Input 
            {...register('city')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.city ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.city && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_state')} *
          </label>
          <Input 
            {...register('state')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.state ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.state && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.state.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground ml-1">
            {t('shipping_zip')} *
          </label>
          <Input 
            {...register('zipCode')} 
            className={`rounded-full shadow-soft focus:ring-primary/20 ${errors.zipCode ? 'border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.zipCode && (
            <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground ml-1">
          {t('shipping_country')} *
        </label>
        <div className="relative">
          <select
            {...register('country')}
            className={`w-full rounded-full border border-input bg-background px-4 py-2 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none ${errors.country ? 'border-red-500 focus:ring-red-200' : ''}`}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {errors.country && (
          <p className="text-sm text-red-500 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{errors.country.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02]" size="lg">
        {t('continue_to_delivery')}
      </Button>
    </form>
  );
}
