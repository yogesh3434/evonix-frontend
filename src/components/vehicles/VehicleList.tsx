import type { Vehicle } from '../../types/vehicle';
import VehicleCard from './VehicleCard';

interface VehicleListProps {
    vehicles: Vehicle[];
    onCompareToggle?: (vehicleId: string) => void;
    selectedComparisonIds?: string[];
    emptyMessage?: string;
}

export default function VehicleList({
    vehicles,
    onCompareToggle,
    selectedComparisonIds = [],
    emptyMessage = 'No vehicles found.',
}: VehicleListProps) {
    if (vehicles.length === 0) {
        return (
            <section aria-live="polite">
                <p>{emptyMessage}</p>
            </section>
        );
    }

    return (
        <section aria-label="Vehicle catalogue">
            <p>
                Showing {vehicles.length}{' '}
                {vehicles.length === 1 ? 'vehicle' : 'vehicles'}
            </p>

            <div>
                {vehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onCompareToggle={onCompareToggle}
                        isSelectedForComparison={selectedComparisonIds.includes(
                            vehicle.id
                        )}
                    />
                ))}
            </div>
        </section>
    );
}