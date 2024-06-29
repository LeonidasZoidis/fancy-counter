import { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
    action: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: true | false;
    style?: CSSProperties;
}
const ButtonMaterial = ({
    action,
    children,
    className,
    disabled = false,
    style,
}: ButtonProps) => {
    return (
        <>
            <button
                style={style}
                disabled={disabled}
                className={`${className}`}
                onClick={action}
            >
                {children}
            </button>
        </>
    );
};

export default ButtonMaterial;
