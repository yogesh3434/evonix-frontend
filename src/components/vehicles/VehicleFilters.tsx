import type { ChangeEvent, FormEvent } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import type {
    VehicleCondition,
    VehicleFilters as VehicleFilterValues,
    VehicleHistoryFilter,
} from '../../types/vehicle';

interface VehicleFiltersProps {
    filters: VehicleFilterValues;
    onChange: (filters: VehicleFilterValues) => void;
    onApply: () => void;
    onReset: () => void;
    disabled?: boolean;
}

export default function VehicleFilters({
    filters,
    onChange,
    onApply,
    onReset,
    disabled = false,
}: VehicleFiltersProps) {
    const updateFilter = <Key extends keyof VehicleFilterValues>(
        key: Key,
        value: VehicleFilterValues[Key]
    ) => {
        onChange({
            ...filters,
            [key]: value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onApply();
    };

    const handleTextChange =
        (key: 'brand' | 'bodyStyle') =>
            (event: ChangeEvent<HTMLInputElement>) => {
                updateFilter(key, event.target.value);
            };

    const handleNumberChange =
        (key: 'modelYear' | 'minPrice' | 'maxPrice') =>
            (event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;

                updateFilter(
                    key,
                    value === '' ? undefined : Number(value)
                );
            };

    const handleConditionChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        updateFilter(
            'condition',
            value === '' ? undefined : (value as VehicleCondition)
        );
    };

    const handleHistoryChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;

        updateFilter(
            'history',
            value === ''
                ? undefined
                : (value as VehicleHistoryFilter)
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={disabled}>
                <legend>Filter vehicles</legend>

                <Input
                    label="Brand"
                    name="brand"
                    value={filters.brand ?? ''}
                    onChange={handleTextChange('brand')}
                    placeholder="For example, Tesla"
                />

                <Input
                    label="Body style"
                    name="bodyStyle"
                    value={filters.bodyStyle ?? ''}
                    onChange={handleTextChange('bodyStyle')}
                    placeholder="For example, SUV"
                />

                <Input
                    label="Model year"
                    name="modelYear"
                    type="number"
                    min={1990}
                    max={new Date().getFullYear() + 1}
                    value={filters.modelYear ?? ''}
                    onChange={handleNumberChange('modelYear')}
                />

                <div>
                    <label htmlFor="vehicle-condition">
                        Condition
                    </label>

                    <select
                        id="vehicle-condition"
                        name="condition"
                        value={filters.condition ?? ''}
                        onChange={handleConditionChange}
                    >
                        <option value="">All conditions</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="vehicle-history">
                        Vehicle history
                    </label>

                    <select
                        id="vehicle-history"
                        name="history"
                        value={filters.history ?? ''}
                        onChange={handleHistoryChange}
                    >
                        <option value="">All history statuses</option>

                        <option value="accident">
                            Reported accidents or damage
                        </option>

                        <option value="no-accident">
                            History report with no accidents
                        </option>

                        <option value="available">
                            Any history report available
                        </option>

                        <option value="none">
                            No history report available
                        </option>
                    </select>
                </div>

                <Input
                    label="Minimum price"
                    name="minPrice"
                    type="number"
                    min={0}
                    step="0.01"
                    value={filters.minPrice ?? ''}
                    onChange={handleNumberChange('minPrice')}
                    placeholder="Minimum price"
                />

                <Input
                    label="Maximum price"
                    name="maxPrice"
                    type="number"
                    min={0}
                    step="0.01"
                    value={filters.maxPrice ?? ''}
                    onChange={handleNumberChange('maxPrice')}
                    placeholder="Maximum price"
                />

                <div>
                    <Button type="submit">
                        Apply filters
                    </Button>

                    <Button type="button" onClick={onReset}>
                        Reset filters
                    </Button>
                </div>
            </fieldset>
        </form>
    );
}