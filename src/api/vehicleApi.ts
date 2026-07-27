import type { Vehicle } from '../types/vehicle';

const API_BASE_URL = 'http://localhost:3000/api';

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
  const response = await fetch(`${API_BASE_URL}/vehicles`);

  if (!response.ok) {
    throw new Error('Failed to load vehicles');
  }

  const result: VehicleResponse = await response.json();

  return result.data;
}