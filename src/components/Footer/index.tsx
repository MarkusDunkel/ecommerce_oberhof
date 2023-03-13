import React from 'react';
import './styles.scss';

interface FooterProps {
}

const Footer = (props: FooterProps) => {
    return (
        <footer className="footer">
            <div className="wrap">
                @ my brand
            </div>
        </footer>
    );
}

export default Footer;