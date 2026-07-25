import type {
    ButtonHTMLAttributes,
    ReactNode,
} from 'react';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
    loadingText?: string;
}

export default function Button({
    children,
    isLoading = false,
    loadingText = 'Loading...',
    disabled,
    type = 'button',
    ...buttonProps
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...buttonProps}
        >
            {isLoading ? loadingText : children}
        </button>
    );
}