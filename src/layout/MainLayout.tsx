import React, { ReactNode } from 'react';
import Header from './../components/Header';

interface MainLayoutProps {
    isMobile: undefined | Boolean;
    children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <div>
            <Header {...props} isMobile={props.isMobile} />
            <div className="main" >
                {props.children}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default MainLayout;