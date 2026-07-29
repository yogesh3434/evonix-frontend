import type {
    SortOrder,
    VehicleSortField,
} from '../../types/vehicle';

interface VehicleSortProps {
    sortBy: VehicleSortField;
    sortOrder: SortOrder;
    onChange: (
        sortBy: VehicleSortField,
        sortOrder: SortOrder
    ) => void;
    disabled?: boolean;
}

type SortValue =
    | 'price-asc'
    | 'price-desc'
    | 'mileage-asc'
    | 'mileage-desc'
    | 'modelYear-desc'
    | 'modelYear-asc';

const buildSortValue = (
    sortBy: VehicleSortField,
    sortOrder: SortOrder
): SortValue => {
    return `${sortBy}-${sortOrder}` as SortValue;
};

export default function VehicleSort({
    sortBy,
    sortOrder,
    onChange,
    disabled = false,
}: VehicleSortProps) {
    const selectedValue = buildSortValue(
        sortBy,
        sortOrder
    );

    const handleChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const [nextSortBy, nextSortOrder] =
            event.target.value.split('-') as [
                VehicleSortField,
                SortOrder,
            ];

        onChange(nextSortBy, nextSortOrder);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full">
            <label htmlFor="vehicle-sort" className="text-sm font-medium text-slate-700 whitespace-nowrap">
                Sort vehicles
            </label>

            <select
                id="vehicle-sort"
                name="vehicle-sort"
                value={selectedValue}
                onChange={handleChange}
                disabled={disabled}
                className="block w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-500 transition-colors"
            >
                <option value="modelYear-desc">
                    Model year: newest first
                </option>

                <option value="modelYear-asc">
                    Model year: oldest first
                </option>

                <option value="price-asc">
                    Price: low to high
                </option>

                <option value="price-desc">
                    Price: high to low
                </option>

                <option value="mileage-asc">
                    Mileage: low to high
                </option>

                <option value="mileage-desc">
                    Mileage: high to low
                </option>
            </select>
        </div>
    );
}