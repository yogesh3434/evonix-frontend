import { apiClient } from '../lib/apiClient';

export type PropertyType = 'house' | 'condo';
export type ChargerLevel = 'level1' | 'level2';

export interface ChargerEstimate {
  baseCost: number;
  wiringCost: number;
  propertyAdjustment: number;
  estimatedTotal: number;
  breakdown: string[];
}

export async function getChargerEstimate(
  propertyType: PropertyType,
  chargerLevel: ChargerLevel,
  distanceToPanel: number
): Promise<ChargerEstimate> {
  const response = await apiClient.get('/charger/estimate', {
    params: {
      propertyType,
      chargerLevel,
      distanceToPanel,
    },
  });

  return response.data.data;
}