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
        <div>
            <label htmlFor="vehicle-sort">
                Sort vehicles
            </label>

            <select
                id="vehicle-sort"
                name="vehicle-sort"
                value={selectedValue}
                onChange={handleChange}
                disabled={disabled}
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