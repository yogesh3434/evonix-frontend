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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <fieldset disabled={disabled} className="flex flex-col gap-5">
                <legend className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 w-full">Filter vehicles</legend>

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

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="vehicle-condition" className="text-sm font-medium text-slate-700">
                        Condition
                    </label>

                    <select
                        id="vehicle-condition"
                        name="condition"
                        value={filters.condition ?? ''}
                        onChange={handleConditionChange}
                        className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400 disabled:bg-slate-100"
                    >
                        <option value="">All conditions</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="vehicle-history" className="text-sm font-medium text-slate-700">
                        Vehicle history
                    </label>

                    <select
                        id="vehicle-history"
                        name="history"
                        value={filters.history ?? ''}
                        onChange={handleHistoryChange}
                        className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400 disabled:bg-slate-100"
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

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Min price"
                        name="minPrice"
                        type="number"
                        min={0}
                        step="0.01"
                        value={filters.minPrice ?? ''}
                        onChange={handleNumberChange('minPrice')}
                        placeholder="Min"
                    />

                    <Input
                        label="Max price"
                        name="maxPrice"
                        type="number"
                        min={0}
                        step="0.01"
                        value={filters.maxPrice ?? ''}
                        onChange={handleNumberChange('maxPrice')}
                        placeholder="Max"
                    />
                </div>

                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                    <Button type="submit" fullWidth>
                        Apply filters
                    </Button>

                    <Button type="button" onClick={onReset} variant="outline" fullWidth>
                        Reset filters
                    </Button>
                </div>
            </fieldset>
        </form>
    );
}