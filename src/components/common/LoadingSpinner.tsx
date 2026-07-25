interface LoadingSpinnerProps {
    label?: string;
    size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
    label = 'Loading...',
    size = 'medium',
}: LoadingSpinnerProps) {
    const sizeMap = {
        small: 16,
        medium: 24,
        large: 36,
    };

    const spinnerSize = sizeMap[size];

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            <span
                aria-hidden="true"
                style={{
                    width: spinnerSize,
                    height: spinnerSize,
                    border: '3px solid #ccc',
                    borderTopColor: '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'evonix-spin 0.8s linear infinite',
                }}
            />

            {label && <span>{label}</span>}

            <style>
                {`
          @keyframes evonix-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
}