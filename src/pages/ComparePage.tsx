import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVehicleById } from '../api/vehicleApi';
import type { VehicleDetails } from '../types/vehicle';
import { formatCurrency } from '../utils/currency';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<VehicleDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const vehicleIds = (searchParams.get('ids') ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  useEffect(() => {
    const loadVehicles = async () => {
      if (vehicleIds.length < 2) {
        setError('Select at least two vehicles to compare.');
        setIsLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          vehicleIds.map((id) => getVehicleById(id))
        );

        setVehicles(results);
      } catch {
        setError('Unable to load the selected vehicles.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [searchParams]);

  if (isLoading) {
    return (
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
        <p>Loading comparison...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Vehicle Comparison
        </h1>

        <p className="mt-4 text-slate-600">{error}</p>

        <Link
          to="/vehicles"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to vehicles
        </Link>
      </main>
    );
  }

  const rows = [
    {
      label: 'Price',
      value: (vehicle: VehicleDetails) =>
        formatCurrency(
          vehicle.isHotDeal && vehicle.hotDealPrice !== null
            ? vehicle.hotDealPrice
            : vehicle.price
        ),
    },
    {
      label: 'Brand',
      value: (vehicle: VehicleDetails) => vehicle.brand,
    },
    {
      label: 'Model',
      value: (vehicle: VehicleDetails) => vehicle.model,
    },
    {
      label: 'Model year',
      value: (vehicle: VehicleDetails) =>
        String(vehicle.modelYear),
    },
    {
      label: 'Condition',
      value: (vehicle: VehicleDetails) => vehicle.condition,
    },
    {
      label: 'Status',
      value: (vehicle: VehicleDetails) => vehicle.status,
    },
    {
      label: 'Body style',
      value: (vehicle: VehicleDetails) =>
        vehicle.bodyStyle ?? 'Not specified',
    },
    {
      label: 'Range',
      value: (vehicle: VehicleDetails) =>
        vehicle.rangeKm !== null
          ? `${vehicle.rangeKm} km`
          : 'Not specified',
    },
    {
      label: 'Battery',
      value: (vehicle: VehicleDetails) =>
        vehicle.batteryKwh !== null
          ? `${vehicle.batteryKwh} kWh`
          : 'Not specified',
    },
    {
      label: 'Charge time',
      value: (vehicle: VehicleDetails) =>
        vehicle.chargeTimeHrs !== null
          ? `${vehicle.chargeTimeHrs} hours`
          : 'Not specified',
    },
    {
      label: 'Horsepower',
      value: (vehicle: VehicleDetails) =>
        vehicle.horsepower !== null
          ? String(vehicle.horsepower)
          : 'Not specified',
    },
    {
      label: 'Seating capacity',
      value: (vehicle: VehicleDetails) =>
        vehicle.seatingCapacity !== null
          ? String(vehicle.seatingCapacity)
          : 'Not specified',
    },
    {
      label: 'Mileage',
      value: (vehicle: VehicleDetails) =>
        `${vehicle.mileageKm.toLocaleString()} km`,
    },
    {
      label: 'Exterior colour',
      value: (vehicle: VehicleDetails) =>
        vehicle.colourExterior ?? 'Not specified',
    },
    {
      label: 'Interior colour',
      value: (vehicle: VehicleDetails) =>
        vehicle.colourInterior ?? 'Not specified',
    },
    {
      label: 'Interior fabric',
      value: (vehicle: VehicleDetails) =>
        vehicle.interiorFabric ?? 'Not specified',
    },
  ];

  return (
    <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Vehicle Comparison
          </h1>

          <p className="mt-2 text-slate-500">
            Comparing {vehicles.length} selected vehicles
          </p>
        </div>

        <Link
          to="/vehicles"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to vehicles
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="min-w-44 border-b border-r border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Feature
              </th>

              {vehicles.map((vehicle) => (
                <th
                  key={vehicle.id}
                  className="min-w-64 border-b border-r border-slate-200 px-5 py-4 text-left last:border-r-0"
                >
                  <p className="text-lg font-bold text-slate-900">
                    {vehicle.name}
                  </p>

                  <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View details
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="even:bg-slate-50"
              >
                <th className="border-b border-r border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700">
                  {row.label}
                </th>

                {vehicles.map((vehicle) => (
                  <td
                    key={`${row.label}-${vehicle.id}`}
                    className="border-b border-r border-slate-200 px-5 py-4 text-sm text-slate-700 last:border-r-0"
                  >
                    {row.value(vehicle)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}