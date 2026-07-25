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
        >
            <Input
                label="Search vehicles"
                name="vehicle-search"
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search by brand, model, name, or description"
            />

            <div>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Searching..."
                >
                    Search
                </Button>

                {value.length > 0 && (
                    <Button type="button" onClick={handleClear}>
                        Clear
                    </Button>
                )}
            </div>
        </form>
    );
}