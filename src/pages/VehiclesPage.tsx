import { useEffect, useState } from 'react';
import { getVehicles } from '../api/vehicleApi';
import VehicleFilters from '../components/vehicles/VehicleFilters';
import VehicleList from '../components/vehicles/VehicleList';
import VehicleSort from '../components/vehicles/VehicleSort';
import type {
  SortOrder,
  Vehicle,
  VehicleFilters as VehicleFilterValues,
  VehicleSortField,
} from '../types/vehicle';

const defaultFilters: VehicleFilterValues = {
  sortBy: 'modelYear',
  sortOrder: 'desc',
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] =
    useState<VehicleFilterValues>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<VehicleFilterValues>(defaultFilters);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await getVehicles(appliedFilters);
        setVehicles(response.data);
      } catch (error) {
        console.error('Failed to load vehicles:', error);
      }
    };

    loadVehicles();
  }, [appliedFilters]);

  const toggleComparison = (vehicleId: string) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(vehicleId)
        ? currentIds.filter((id) => id !== vehicleId)
        : [...currentIds, vehicleId]
    );
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const changeSort = (
    sortBy: VehicleSortField,
    sortOrder: SortOrder
  ) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      sortBy,
      sortOrder,
    }));

    setAppliedFilters((currentFilters) => ({
      ...currentFilters,
      sortBy,
      sortOrder,
    }));
  };

  return (
    <main>
      <h1>Vehicle List Test</h1>

      <p className="text-slate-500 font-medium pb-6 border-b border-slate-200">
        Selected for comparison: {selectedIds.length}
      </p>

      <VehicleFilters
        filters={filters}
        onChange={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <VehicleSort
        sortBy={filters.sortBy ?? 'modelYear'}
        sortOrder={filters.sortOrder ?? 'desc'}
        onChange={changeSort}
      />

      <VehicleList
        vehicles={vehicles}
        selectedComparisonIds={selectedIds}
        onCompareToggle={toggleComparison}
      />
    </main>
  );
}