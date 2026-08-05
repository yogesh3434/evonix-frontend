import { apiClient } from '../lib/apiClient';

export type SalesGroupBy = 'month' | 'brand' | 'vehicle';

export interface SalesReportRow {
  label: string;
  orderCount: number;
  unitsSold: number;
  revenue: number;
}

export interface SalesReport {
  groupBy: SalesGroupBy;
  from: string | null;
  to: string | null;
  totals: {
    orderCount: number;
    unitsSold: number;
    grossRevenue: number;
    netRevenue: number;
    taxCollected: number;
    averageOrderValue: number;
  };
  rows: SalesReportRow[];
}

export interface UsageReport {
  from: string | null;
  to: string | null;
  totals: {
    totalEvents: number;
    uniqueVisitors: number;
  };
  eventsByType: { eventType: string; eventCount: number }[];
  mostViewedVehicles: {
    vehicleId: string;
    name: string;
    brand: string;
    viewCount: number;
  }[];
  topSearchTerms: { searchTerm: string; searchCount: number }[];
}

export interface ReportRange {
  from?: string;
  to?: string;
}

export async function getSalesReport(
  groupBy: SalesGroupBy,
  range: ReportRange
): Promise<SalesReport> {
  const response = await apiClient.get('/admin/reports/sales', {
    params: { groupBy, ...range },
  });

  return response.data.data;
}

export async function getUsageReport(
  range: ReportRange
): Promise<UsageReport> {
  const response = await apiClient.get('/admin/reports/usage', {
    params: range,
  });

  return response.data.data;
}
