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
            <div>
                {label && inputId && (
                    <label htmlFor={inputId}>
                        {label}
                        {required ? ' *' : ''}
                    </label>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy || undefined}
                    {...inputProps}
                />

                {helperText && !error && (
                    <p id={helperId}>{helperText}</p>
                )}

                {error && (
                    <p id={errorId} role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;