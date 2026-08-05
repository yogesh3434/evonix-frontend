import { apiClient } from '../lib/apiClient';

export interface SelectedCustomization {
  optionId: string;
  name: string;
  category: string;
  priceDelta: number;
}

export interface OrderItem {
  id: string;
  vehicleId: string;
  name: string;
  brand: string;
  model: string;
  quantity: number;
  unitPrice: number;
  customizationOptions: SelectedCustomization[];
  customizationTotal: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  userId: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  tax: number;
  total: number;
  cardLastFour: string | null;
  shipping: {
    fullName: string | null;
    street: string | null;
    city: string | null;
    province: string | null;
    country: string | null;
    postalCode: string | null;
    phone: string | null;
  };
  items: OrderItem[];
  createdAt: string;
}

export interface ShippingInput {
  fullName: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  phone?: string;
}

export interface PaymentInput {
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
}

export interface PaymentDeclinedError {
  declined: true;
  orderId: string;
  message: string;
}

export async function placeOrder(
  shipping: ShippingInput,
  payment: PaymentInput,
  notes?: string
): Promise<Order> {
  const response = await apiClient.post('/orders', {
    shipping,
    payment,
    notes,
  });

  return response.data.data;
}

export async function retryOrderPayment(
  orderId: string,
  cardNumber: string,
  cardHolderName: string
): Promise<Order> {
  const response = await apiClient.post(`/orders/${orderId}/payment`, {
    cardNumber,
    cardHolderName,
  });

  return response.data.data;
}

export async function getMyOrders(): Promise<Order[]> {
  const response = await apiClient.get('/orders');

  return response.data.data;
}
