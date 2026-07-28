import { apiClient } from '../lib/apiClient';
import type { Vehicle } from '../types/vehicle';

type VehicleResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Vehicle[];
};

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await apiClient.get<VehicleResponse>('/vehicles');

  return response.data.data;
}