import { Link } from 'react-router-dom';
import { type Vehicle } from '../../types/vehicle';
import { formatCurrency } from '../../utils/currency';
import {defaultVehicleImage,vehicleImages,} from '../../data/vehicleImages';
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

    const imageUrl =
        vehicleImages[vehicle.name] ?? defaultVehicleImage;

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img
                src={imageUrl}
                alt={`${vehicle.name} electric vehicle`}
                loading="lazy"
                className="h-52 w-full object-cover"
                onError={(event) => {
                    event.currentTarget.src = defaultVehicleImage;
                }}
            />

            <div className="flex flex-grow flex-col gap-4 p-5">
                <header className="flex items-start justify-between gap-4">
                    <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
                        {vehicle.name}
                    </h2>

                    {vehicle.isHotDeal && <HotDealBadge />}
                </header>

                <p className="-mt-2 mb-4 text-sm text-slate-500">
                    {vehicle.brand} {vehicle.model} · {vehicle.modelYear}
                </p>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Condition
                        </dt>

                        <dd className="font-medium text-slate-900">
                            {vehicle.condition}
                        </dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Body style
                        </dt>

                        <dd className="font-medium text-slate-900">
                            {vehicle.bodyStyle ?? 'Not specified'}
                        </dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Range
                        </dt>

                        <dd className="font-medium text-slate-900">
                            {vehicle.rangeKm !== null
                                ? `${vehicle.rangeKm} km`
                                : 'Not specified'}
                        </dd>
                    </div>

                    <div className="flex flex-col">
                        <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Mileage
                        </dt>

                        <dd className="font-medium text-slate-900">
                            {vehicle.mileageKm.toLocaleString()} km
                        </dd>
                    </div>
                </dl>

                <div className="mt-auto border-t border-slate-100 pt-4">
                    {vehicle.isHotDeal &&
                    vehicle.hotDealPrice !== null ? (
                        <div className="flex items-center gap-2">
                            <p className="sr-only">
                                <span>Regular price: </span>
                                <s>{formatCurrency(vehicle.price)}</s>
                            </p>

                            <p className="flex flex-col">
                                <span className="text-xs text-slate-500 line-through">
                                    {formatCurrency(vehicle.price)}
                                </span>

                                <strong className="text-lg font-bold text-red-600">
                                    {formatCurrency(displayPrice)}
                                </strong>
                            </p>
                        </div>
                    ) : (
                        <p>
                            <strong className="text-lg font-bold text-slate-900">
                                {formatCurrency(displayPrice)}
                            </strong>
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 p-5 pt-0">
                <Link
                    to={`/vehicles/${vehicle.id}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    View details
                </Link>

                {onCompareToggle && (
                    <button
                        type="button"
                        onClick={() => onCompareToggle(vehicle.id)}
                        aria-pressed={isSelectedForComparison}
                        className={`inline-flex w-full items-center justify-center rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                            isSelectedForComparison
                                ? 'border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-600'
                                : 'border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-slate-300'
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