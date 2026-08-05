import { apiClient } from '../lib/apiClient';

export async function getCart() {
  const response = await apiClient.get('/cart');
  return response.data.data;
}

export async function addToCart(
  vehicleId: string,
  quantity = 1,
  customizationOptionIds: string[] = []
) {
  const response = await apiClient.post('/cart/items', {
    vehicleId,
    quantity,
    customizationOptionIds,
  });

  return response.data.data;
}

export async function updateCartItem(
  vehicleId: string,
  quantity: number
) {
  const response = await apiClient.patch(
    `/cart/items/${vehicleId}`,
    {
      quantity,
    }
  );

  return response.data.data;
}

export async function removeFromCart(vehicleId: string) {
  const response = await apiClient.delete(
    `/cart/items/${vehicleId}`
  );

  return response.data.data;
}