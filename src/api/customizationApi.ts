import { apiClient } from '../lib/apiClient';

export interface CustomizationOption {
  id: string;
  name: string;
  priceDelta: number;
  isAvailable: boolean;
}

export interface CustomizationCategory {
  id: string;
  name: string;
  options: CustomizationOption[];
}

export interface VehicleCustomizations {
  vehicleId: string;
  basePrice: number;
  categories: CustomizationCategory[];
}

export async function getVehicleCustomizations(
  vehicleId: string
): Promise<VehicleCustomizations> {
  const response = await apiClient.get(
    `/vehicles/${vehicleId}/customizations`
  );

  return response.data.data;
}
