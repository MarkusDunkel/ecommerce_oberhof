import React, { ReactNode } from 'react';
import Header from './../components/Header';
import Footer from '../components/Footer';

interface HomepageLayoutProps {
    currentUser: null | string;
    children: ReactNode;
}
const HomepageLayout = (props: HomepageLayoutProps) => {
    return (
        <div className="fullHeight" >
            <Header {...props} />
            {props.children}
            <Footer />
        </div >
    );
}

export default HomepageLayout; 