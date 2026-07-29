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
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...buttonProps
}: ButtonProps & { 
    className?: string; 
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
        secondary: "bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-slate-700",
        outline: "border-2 border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300",
        danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const widthClass = fullWidth ? "w-full" : "";

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={combinedClasses}
            {...buttonProps}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isLoading ? loadingText : children}
        </button>
    );
}