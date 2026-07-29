import { useEffect, useState } from 'react';
import { getHotDeals } from '../api/vehicleApi';
import VehicleList from '../components/vehicles/VehicleList';
import type { Vehicle } from '../types/vehicle';

export default function HotDealsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHotDeals = async () => {
      try {
        const data = await getHotDeals();
        setVehicles(data);
      } catch {
        setError('Unable to load hot deals.');
      } finally {
        setIsLoading(false);
      }
    };

    loadHotDeals();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6 flex-grow">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 tracking-tight border-b border-slate-200 pb-6">
        Hot Deals
      </h1>

      {isLoading && <p>Loading hot deals...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <VehicleList
          vehicles={vehicles}
          emptyMessage="No hot deals available."
        />
      )}
    </main>
  );
}