import React, { ReactNode } from 'react';
import './styles.scss';

interface AuthWrapperProps {
    headline: string;
    children: ReactNode;
}

const AuthWrapper = ({ headline, children }: AuthWrapperProps) => {
    return (
        <div className="authWrapper">
            <div className="wrap">
                {headline && <h2>{headline}</h2>}

                <div className="children">
                    {children && children}
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;