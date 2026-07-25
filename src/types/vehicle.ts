export type VehicleCondition = 'new' | 'used';

export type VehicleStatus =
    | 'available'
    | 'reserved'
    | 'sold'
    | 'inactive';

export type VehicleHistoryFilter =
    | 'accident'
    | 'no-accident'
    | 'available'
    | 'none';

export type VehicleSortField =
    | 'price'
    | 'mileage'
    | 'modelYear';

export type SortOrder = 'asc' | 'desc';

export interface Vehicle {
    id: string;
    vin: string | null;
    name: string;
    description: string | null;
    brand: string;
    model: string;
    modelYear: number;
    condition: VehicleCondition;
    status: VehicleStatus;
    bodyStyle: string | null;
    colourExterior: string | null;
    colourInterior: string | null;
    interiorFabric: string | null;
    rangeKm: number | null;
    batteryKwh: number | null;
    chargeTimeHrs: number | null;
    horsepower: number | null;
    seatingCapacity: number | null;
    price: number;
    mileageKm: number;
    quantity: number;
    isHotDeal: boolean;
    hotDealPrice: number | null;
    isActive: boolean;
}

export interface VehicleHistoryReport {
    hasAccidents: boolean;
    accidentCount: number;
    accidentDetails: string | null;
    previousOwners: number;
    serviceRecords: string | null;
    lastInspectionDate: string | null;
    reportUrl: string | null;
}

export interface CustomizationCategory {
    id: string;
    name: string;
}

export interface CustomizationOption {
    id: string;
    name: string;
    category: CustomizationCategory;
    priceDelta: number;
    isAvailable: boolean;
}

export interface VehicleDetails extends Vehicle {
    historyReport: VehicleHistoryReport | null;
    customizationOptions: CustomizationOption[];
}

export interface VehicleFilters {
    search?: string;
    brand?: string;
    bodyStyle?: string;
    modelYear?: number;
    condition?: VehicleCondition;
    history?: VehicleHistoryFilter;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: VehicleSortField;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

export interface VehicleComparisonSelection {
    vehicleId: string;
    selectedAt: string;
}