import { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
    action: () => void;
    children?: ReactNode;
    className?: string;
    variant?: 'text' | 'contained' | 'outlined';
    disabled?: true | false;
}
const ButtonMaterial = ({
    action,
    variant = 'contained',
    children,
    className,
    disabled = false,
}: ButtonProps) => {
    return (
        <>
            <Button
                disabled={disabled}
                variant={variant}
                className={`${className}`}
                onClick={action}
            >
                {children}
            </Button>
        </>
    );
};

export default ButtonMaterial;
