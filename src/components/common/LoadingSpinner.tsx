interface LoadingSpinnerProps {
    label?: string;
    size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
    label = 'Loading...',
    size = 'medium',
}: LoadingSpinnerProps) {
    const sizeMap = {
        small: "h-4 w-4 border-2",
        medium: "h-6 w-6 border-2",
        large: "h-9 w-9 border-3",
    };

    const spinnerSizeClasses = sizeMap[size];

    return (
        <div
            role="status"
            aria-live="polite"
            className="inline-flex items-center gap-2"
        >
            <span
                aria-hidden="true"
                className={`animate-spin rounded-full border-slate-200 border-t-blue-600 ${spinnerSizeClasses}`}
            />

            {label && <span className="text-sm font-medium text-slate-600">{label}</span>}
        </div>
    );
}