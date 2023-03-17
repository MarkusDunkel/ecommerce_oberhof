import React, { ReactNode } from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';

interface HeaderProps {
    currentUser: null | string;
    isMobile?: undefined | Boolean;
    shopLink?: Boolean;
    children: ReactNode;
}

const Header = (props: HeaderProps) => {
    const { currentUser } = props;
    const { shopLink } = props || { shopLink: false };
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="SimpleTut Logo" />
                    </Link>
                </div>

                <div className="callToActions">

                    {currentUser && (
                        <ul>
                            {shopLink && (
                                <li>
                                    <div className='positionButton'>
                                        <Link to="/shop/">
                                            <div className='fancyButton'>
                                                Bestellung aufgeben
                                            </div>
                                        </Link>
                                    </div>
                                </li>

                            )}
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            {shopLink && (
                                <li>
                                    <div className='positionButton'>
                                        <Link to="/shop/">
                                            <div className='fancyButton'>
                                                Bestellung aufgeben
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            )}
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )
                    }
                </div>
            </div>
        </header >
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header;