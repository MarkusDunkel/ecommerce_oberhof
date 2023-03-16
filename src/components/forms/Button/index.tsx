import React, { ReactNode } from 'react';
import './styles.scss';

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    children: ReactNode;
};

const Button = ({ children, ...otherProps }: ButtonProps) => {
    return (
        <button className="btn" {...otherProps}>
            {children}
        </button>
    );
}

export default Button;