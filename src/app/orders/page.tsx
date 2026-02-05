'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Search, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/lib/commerce/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Order } from '@/lib/types/commerce';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  processing: 'bg-orange-100 text-orange-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const t = useTranslations('commerce');
  const tShop = useTranslations('shop');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      // In demo mode, orders are in-memory on the server
      // A real app would have an authenticated API
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const statusKey = (status: string) =>
    `status_${status}` as `status_${string}`;

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {tShop('home')}
            </Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-foreground font-medium">{t('order_history')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-8">
          {t('order_history')}
        </h1>

        {/* Email lookup */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">{t('enter_email')}</p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={t('shipping_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="w-4 h-4 me-2" />
              {t('look_up')}
            </Button>
          </div>
        </div>

        {/* Results */}
        {searched && orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('no_orders_found')}</p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg overflow-hidden">
                {/* Order header */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === order.id ? null : order.id)
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors text-start"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnails */}
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {t('order_id')}: {order.id.slice(0, 8)}...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()} &middot;{' '}
                        {t('items_in_order', { count: order.items.length })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ''}`}
                    >
                      {t(statusKey(order.status))}
                    </span>
                    <span className="font-semibold text-sm">
                      {formatPrice(order.summary.total)}
                    </span>
                    {expandedId === order.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded details */}
                {expandedId === order.id && (
                  <div className="p-4 border-t border-border bg-secondary/10">
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.color.name} / {item.size} x{item.quantity}
                            </p>
                          </div>
                          <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('subtotal')}</span>
                        <span>{formatPrice(order.summary.subtotal)}</span>
                      </div>
                      {order.summary.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{t('discount')}</span>
                          <span>-{formatPrice(order.summary.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('shipping')}</span>
                        <span>
                          {order.summary.shipping === 0
                            ? t('free')
                            : formatPrice(order.summary.shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('tax')}</span>
                        <span>{formatPrice(order.summary.tax)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-border">
                        <span>{t('total')}</span>
                        <span>{formatPrice(order.summary.total)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
