interface ErrorMessageProps {
    message: string;
    title?: string;
    onRetry?: () => void;
    retryLabel?: string;
}

export default function ErrorMessage({
    message,
    title = 'Something went wrong',
    onRetry,
    retryLabel = 'Try again',
}: ErrorMessageProps) {
    return (
        <div role="alert" aria-live="assertive" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex flex-col gap-1">
                <strong className="text-sm font-semibold text-red-800">{title}</strong>
                <p className="text-sm text-red-700">{message}</p>
            </div>

            {onRetry && (
                <button 
                    type="button" 
                    onClick={onRetry}
                    className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 whitespace-nowrap"
                >
                    {retryLabel}
                </button>
            )}
        </div>
    );
}