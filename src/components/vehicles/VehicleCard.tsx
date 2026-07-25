import { Link } from 'react-router-dom';
import { type Vehicle } from '../../types/vehicle';
import { formatCurrency } from '../../utils/currency';
import HotDealBadge from './HotDealBadge';

interface VehicleCardProps {
    vehicle: Vehicle;
    onCompareToggle?: (vehicleId: string) => void;
    isSelectedForComparison?: boolean;
}

export default function VehicleCard({
    vehicle,
    onCompareToggle,
    isSelectedForComparison = false,
}: VehicleCardProps) {
    const displayPrice =
        vehicle.isHotDeal && vehicle.hotDealPrice !== null
            ? vehicle.hotDealPrice
            : vehicle.price;

    return (
        <article>
            <header>
                <h2>{vehicle.name}</h2>

                {vehicle.isHotDeal && <HotDealBadge />}
            </header>

            <p>
                {vehicle.brand} {vehicle.model} · {vehicle.modelYear}
            </p>

            <dl>
                <div>
                    <dt>Condition</dt>
                    <dd>{vehicle.condition}</dd>
                </div>

                <div>
                    <dt>Body style</dt>
                    <dd>{vehicle.bodyStyle ?? 'Not specified'}</dd>
                </div>

                <div>
                    <dt>Range</dt>
                    <dd>
                        {vehicle.rangeKm !== null
                            ? `${vehicle.rangeKm} km`
                            : 'Not specified'}
                    </dd>
                </div>

                <div>
                    <dt>Mileage</dt>
                    <dd>{vehicle.mileageKm.toLocaleString()} km</dd>
                </div>
            </dl>

            <div>
                {vehicle.isHotDeal && vehicle.hotDealPrice !== null ? (
                    <>
                        <p>
                            <span>Regular price: </span>
                            <s>{formatCurrency(vehicle.price)}</s>
                        </p>

                        <p>
                            <strong>
                                Deal price: {formatCurrency(displayPrice)}
                            </strong>
                        </p>
                    </>
                ) : (
                    <p>
                        <strong>{formatCurrency(displayPrice)}</strong>
                    </p>
                )}
            </div>

            <div>
                <Link to={`/vehicles/${vehicle.id}`}>
                    View details
                </Link>

                {onCompareToggle && (
                    <button
                        type="button"
                        onClick={() => onCompareToggle(vehicle.id)}
                        aria-pressed={isSelectedForComparison}
                    >
                        {isSelectedForComparison
                            ? 'Remove from comparison'
                            : 'Add to comparison'}
                    </button>
                )}
            </div>
        </article>
    );
}