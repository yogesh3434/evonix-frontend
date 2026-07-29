import { apiClient } from '../lib/apiClient';
import type {
  Vehicle,
  VehicleDetails,
  VehicleFilters,
} from '../types/vehicle';

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

export async function getVehicles(
  filters: VehicleFilters = {}
): Promise<VehicleResponse> {
  const response = await apiClient.get<VehicleResponse>('/vehicles', {
    params: filters,
  });

  return response.data;
}

export async function getVehicleById(
  vehicleId: string
): Promise<VehicleDetails> {
  const response = await apiClient.get<VehicleDetailsResponse>(
    `/vehicles/${vehicleId}`
  );

  return response.data.data;
}

export async function getHotDeals(): Promise<Vehicle[]> {
  const response = await apiClient.get<VehicleResponse>(
    '/vehicles/hot-deals'
  );

  return response.data.data;
}