import { useState } from 'react';
import VehicleList from '../components/vehicles/VehicleList';
import type { Vehicle } from '../types/vehicle';

const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    vin: null,
    name: 'Tesla Model X',
    description: 'Luxury electric SUV.',
    brand: 'Tesla',
    model: 'Model X',
    modelYear: 2024,
    condition: 'new',
    status: 'available',
    bodyStyle: 'SUV',
    colourExterior: 'Pearl White',
    colourInterior: 'Black',
    interiorFabric: 'Leather',
    rangeKm: 560,
    batteryKwh: 100,
    chargeTimeHrs: null,
    horsepower: 670,
    seatingCapacity: 7,
    price: 87000,
    mileageKm: 0,
    quantity: 5,
    isHotDeal: false,
    hotDealPrice: null,
    isActive: true,
  },
  {
    id: '2',
    vin: null,
    name: 'Chevrolet Bolt EUV',
    description: 'Affordable everyday electric vehicle.',
    brand: 'Chevrolet',
    model: 'Bolt EUV',
    modelYear: 2022,
    condition: 'used',
    status: 'available',
    bodyStyle: 'Hatchback',
    colourExterior: 'Bright Blue',
    colourInterior: 'Grey',
    interiorFabric: 'Cloth',
    rangeKm: 397,
    batteryKwh: 65,
    chargeTimeHrs: null,
    horsepower: 200,
    seatingCapacity: 5,
    price: 28500,
    mileageKm: 24000,
    quantity: 2,
    isHotDeal: true,
    hotDealPrice: 26500,
    isActive: true,
  },
];

export default function VehiclesPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleComparison = (vehicleId: string) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(vehicleId)
        ? currentIds.filter((id) => id !== vehicleId)
        : [...currentIds, vehicleId]
    );
  };

  return (
    <main>
      <h1>Vehicle List Test</h1>

      <p>Selected for comparison: {selectedIds.length}</p>

      <VehicleList
        vehicles={sampleVehicles}
        selectedComparisonIds={selectedIds}
        onCompareToggle={toggleComparison}
      />
    </main>
  );
}