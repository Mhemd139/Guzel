import { Order } from '@/lib/types/commerce';

const orders = new Map<string, Order>();

export function createOrder(order: Order): void {
  orders.set(order.id, order);
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function updateOrderStatus(id: string, status: Order['status']): void {
  const order = orders.get(id);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    orders.set(id, order);
  }
}

export function getOrdersByEmail(email: string): Order[] {
  return Array.from(orders.values())
    .filter((o) => o.shipping.email === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
