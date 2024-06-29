import { CSSProperties, ReactNode } from 'react';
import Ripple from 'material-ripple-effects';

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
    const ripple = new Ripple();

    return (
        <>
            <button
                onMouseUp={(e) => ripple.create(e, 'light')}
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
