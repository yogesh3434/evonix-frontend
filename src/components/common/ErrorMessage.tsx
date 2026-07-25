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
        <div role="alert" aria-live="assertive">
            <strong>{title}</strong>
            <p>{message}</p>

            {onRetry && (
                <button type="button" onClick={onRetry}>
                    {retryLabel}
                </button>
            )}
        </div>
    );
}