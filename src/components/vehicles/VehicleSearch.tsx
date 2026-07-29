import type { FormEvent } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

interface VehicleSearchProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    onClear?: () => void;
    isLoading?: boolean;
}

export default function VehicleSearch({
    value,
    onChange,
    onSearch,
    onClear,
    isLoading = false,
}: VehicleSearchProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch();
    };

    const handleClear = () => {
        onChange('');
        onClear?.();
    };

    return (
        <form
            role="search"
            aria-label="Search electric vehicles"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200"
        >
            <Input
                label="Search vehicles"
                name="vehicle-search"
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search by brand, model, name, or description"
            />

            <div className="flex items-center gap-3 mt-2">
                <Button
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Searching..."
                    fullWidth
                >
                    Search
                </Button>

                {value.length > 0 && (
                    <Button type="button" onClick={handleClear} variant="outline" fullWidth>
                        Clear
                    </Button>
                )}
            </div>
        </form>
    );
}