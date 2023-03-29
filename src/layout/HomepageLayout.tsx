import React, { ReactNode } from 'react';
import Header from './../components/Header';

interface HomepageLayoutProps {
    isMobile: undefined | Boolean;
    children: ReactNode;
}
const HomepageLayout = (props: HomepageLayoutProps) => {
    return (
        <div className="fullHeight">
            <Header {...props} isMobile={props.isMobile} />
            {props.children}
            {/* <Footer /> */}
        </div >
    );
}

export default HomepageLayout; 