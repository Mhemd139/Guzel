'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/commerce/utils';

interface PromoCodeInputProps {
  subtotal: number;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
  appliedCode?: string;
  appliedDiscount?: number;
}

export function PromoCodeInput({
  subtotal,
  onApply,
  onRemove,
  appliedCode,
  appliedDiscount,
}: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations('commerce');

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        onApply(code.trim().toUpperCase(), data.discount);
        setCode('');
      } else {
        setError(data.message);
      }
    } catch {
      setError(t('connection_error'));
    } finally {
      setLoading(false);
    }
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            {appliedCode} (-{formatPrice(appliedDiscount || 0)})
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          {t('promo_remove')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={t('promo_placeholder')}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={handleApply}
          disabled={loading || !code.trim()}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('promo_apply')}
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
