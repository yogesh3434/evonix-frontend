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
        <article className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden hover:-translate-y-1">
            <div className="p-5 flex-grow flex flex-col gap-4">
                <header className="flex justify-between items-start gap-4">
                    <h2 className="text-lg font-bold text-slate-900 line-clamp-1">{vehicle.name}</h2>

                    {vehicle.isHotDeal && <HotDealBadge />}
                </header>

                <p className="text-sm text-slate-500 -mt-2 mb-4">
                    {vehicle.brand} {vehicle.model} · {vehicle.modelYear}
                </p>
                
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm border-t border-slate-100 pt-4">
                    <div className="flex flex-col">
                        <dt className="text-slate-500 text-xs uppercase tracking-wider">Condition</dt>
                        <dd className="font-medium text-slate-900">{vehicle.condition}</dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-slate-500 text-xs uppercase tracking-wider">Body style</dt>
                        <dd className="font-medium text-slate-900">{vehicle.bodyStyle ?? 'Not specified'}</dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-slate-500 text-xs uppercase tracking-wider">Range</dt>
                        <dd className="font-medium text-slate-900">
                            {vehicle.rangeKm !== null
                                ? `${vehicle.rangeKm} km`
                                : 'Not specified'}
                        </dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-slate-500 text-xs uppercase tracking-wider">Mileage</dt>
                        <dd className="font-medium text-slate-900">{vehicle.mileageKm.toLocaleString()} km</dd>
                    </div>
                </dl>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    {vehicle.isHotDeal && vehicle.hotDealPrice !== null ? (
                        <div className="flex items-center gap-2">
                            <p className="sr-only">
                                <span>Regular price: </span>
                                <s>{formatCurrency(vehicle.price)}</s>
                            </p>
                            <p className="flex flex-col">
                                <span className="text-xs text-slate-500 line-through">{formatCurrency(vehicle.price)}</span>
                                <strong className="text-lg font-bold text-red-600">
                                    {formatCurrency(displayPrice)}
                                </strong>
                            </p>
                        </div>
                    ) : (
                        <p>
                            <strong className="text-lg font-bold text-slate-900">{formatCurrency(displayPrice)}</strong>
                        </p>
                    )}
                </div>
            </div>

            <div className="p-5 pt-0 flex flex-col gap-2">
                <Link 
                    to={`/vehicles/${vehicle.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    View details
                </Link>

                {onCompareToggle && (
                    <button
                        type="button"
                        onClick={() => onCompareToggle(vehicle.id)}
                        aria-pressed={isSelectedForComparison}
                        className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 ${
                            isSelectedForComparison 
                            ? 'border-blue-600 text-blue-700 bg-blue-50 hover:bg-blue-100 focus:ring-blue-600' 
                            : 'border-slate-200 text-slate-700 bg-transparent hover:bg-slate-50 focus:ring-slate-300'
                        }`}
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