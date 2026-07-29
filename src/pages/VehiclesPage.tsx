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
    <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Vehicles
        </h1>

        <p className="mt-2 text-slate-500">
          Selected for comparison: {selectedIds.length}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <VehicleFilters
            filters={filters}
            onChange={setFilters}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </aside>

        <section className="min-w-0">
          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <VehicleSort
              sortBy={filters.sortBy ?? 'modelYear'}
              sortOrder={filters.sortOrder ?? 'desc'}
              onChange={changeSort}
            />
          </div>

          <VehicleList
            vehicles={vehicles}
            selectedComparisonIds={selectedIds}
            onCompareToggle={toggleComparison}
          />
        </section>
      </div>
    </main>
  );
}