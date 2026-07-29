import {
    forwardRef,
    type InputHTMLAttributes,
} from 'react';

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            id,
            name,
            required,
            ...inputProps
        },
        ref
    ) => {
        const inputId = id ?? name;
        const errorId = error && inputId ? `${inputId}-error` : undefined;
        const helperId =
            helperText && inputId ? `${inputId}-helper` : undefined;

        const describedBy = [errorId, helperId]
            .filter(Boolean)
            .join(' ');

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && inputId && (
                    <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
                        {label}
                        {required ? <span className="text-red-500 ml-1">*</span> : ''}
                    </label>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy || undefined}
                    className={`block w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-colors
                        focus:outline-none focus:ring-2 focus:ring-offset-0
                        disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
                        ${error 
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-400'
                        }
                    `}
                    {...inputProps}
                />

                {helperText && !error && (
                    <p id={helperId} className="text-xs text-slate-500 mt-1">{helperText}</p>
                )}

                {error && (
                    <p id={errorId} role="alert" className="text-xs font-medium text-red-600 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;