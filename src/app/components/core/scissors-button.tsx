import React from 'react';
import {cn} from '@/lib/utils';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'standard' | 'important' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    text: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
    standard: 'bg-slate-200 hover:bg-slate-300 text-slate-800',
    important: 'bg-emerald-300 hover:bg-emerald-400 text-emerald-900',
    disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
};

export default function ScissorsButton({
                                           icon,
                                           text,
                                           size = 'medium',
                                           variant = 'standard',
                                           disabled = false,
                                           className,
                                           ...props
                                       }: ButtonProps) {
    const finalVariant = disabled ? 'disabled' : variant;

    return (
        <button
            className={cn(
                'flex items-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none',
                sizeClasses[size],
                variantClasses[finalVariant],
                className
            )}
            disabled={disabled}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{text}</span>
        </button>
    );
}
