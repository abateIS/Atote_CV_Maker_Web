import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    icon,
    fullWidth = false,
    type = 'button',
    style: extraStyle = {},
}) {
    const base = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        outline: 'none',
        transition: 'all var(--transition-fast)',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        textDecoration: 'none',
    };

    const sizes = {
        sm: { padding: '6px 14px', fontSize: 13, borderRadius: 'var(--radius-sm)' },
        md: { padding: '10px 22px', fontSize: 14, borderRadius: 'var(--radius-md)' },
        lg: { padding: '14px 32px', fontSize: 16, borderRadius: 'var(--radius-md)' },
        xl: { padding: '18px 40px', fontSize: 18, borderRadius: 'var(--radius-lg)' },
    };

    const variants = {
        primary: {
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
        },
        secondary: {
            background: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-secondary)',
        },
        danger: {
            background: 'rgba(239,68,68,0.15)',
            color: 'var(--color-danger)',
            border: '1px solid rgba(239,68,68,0.3)',
        },
        success: {
            background: 'linear-gradient(135deg, var(--color-success), #059669)',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
        },
    };

    const [hovered, setHovered] = React.useState(false);
    const hoverStyles = hovered && !disabled ? {
        transform: 'translateY(-1px)',
        boxShadow: variant === 'primary' ? '0 6px 20px rgba(99,102,241,0.5)' : undefined,
    } : {};

    return (
        <button
            type={type}
            onClick={!disabled ? onClick : undefined}
            style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyles, ...extraStyle }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            disabled={disabled}
        >
            {icon && <span style={{ display: 'flex' }}>{icon}</span>}
            {children}
        </button>
    );
}
