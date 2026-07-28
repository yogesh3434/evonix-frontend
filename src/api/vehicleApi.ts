import { apiClient } from '../lib/apiClient';
import type { Vehicle, VehicleDetails } from '../types/vehicle';

type VehicleResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Vehicle[];
};

type VehicleDetailsResponse = {
  success: boolean;
  data: VehicleDetails;
};

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await apiClient.get<VehicleResponse>('/vehicles');
  return response.data.data;
}

export async function getVehicleById(
  vehicleId: string
): Promise<VehicleDetails> {
  const response = await apiClient.get<VehicleDetailsResponse>(
    `/vehicles/${vehicleId}`
  );

  return response.data.data;
}