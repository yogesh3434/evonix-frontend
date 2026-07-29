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
      <h1>Vehicle List Test</h1>

      <p className="text-slate-500 font-medium pb-6 border-b border-slate-200">Selected for comparison: {selectedIds.length}</p>

      <VehicleList
        vehicles={vehicles}
        selectedComparisonIds={selectedIds}
        onCompareToggle={toggleComparison}
      />
    </main>
  );
}