import { useEffect, useState } from 'react';
import { getVehicles } from '../api/vehicleApi';
import VehicleList from '../components/vehicles/VehicleList';
import type { Vehicle } from '../types/vehicle';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to load vehicles:', error);
      }
    };

    loadVehicles();
  }, []);

  const toggleComparison = (vehicleId: string) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(vehicleId)
        ? currentIds.filter((id) => id !== vehicleId)
        : [...currentIds, vehicleId]
    );
  };

  return (
    <main>
      <h1>Electric Vehicles</h1>

      <p>Selected for comparison: {selectedIds.length}</p>

      <VehicleList
        vehicles={vehicles}
        selectedComparisonIds={selectedIds}
        onCompareToggle={toggleComparison}
      />
    </main>
  );
}