import React, { ReactNode } from 'react';
import Header from './../components/Header';

interface HomepageLayoutProps {
    currentUser: null | string;
    isMobile: undefined | Boolean;
    children: ReactNode;
}
const HomepageLayout = (props: HomepageLayoutProps) => {
    const shopLink = true;
    return (
        <div className="fullHeight">
            <Header {...props} shopLink={shopLink} isMobile={props.isMobile} />
            {props.children}
            {/* <Footer /> */}
        </div >
    );
}

export default HomepageLayout; 