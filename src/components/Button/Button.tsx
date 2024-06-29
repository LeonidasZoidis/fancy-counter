// src/components/Button/Button.tsx
import React, { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    action: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    style?: CSSProperties;
    showShadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    action,
    children,
    className = '',
    disabled = false,
    style,
    showShadow = true,
}) => {
    return (
        <button
            style={style}
            disabled={disabled}
            className={`${styles.pushable} ${className}`}
            onClick={action}
        >
            {showShadow && <span className={styles.shadow}></span>}
            <span className={styles.edge}></span>
            <span className={styles.front}>{children}</span>
        </button>
    );
};

export default Button;
