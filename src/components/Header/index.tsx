import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';

interface HeaderProps {
    isMobile?: undefined | Boolean;
    shopLink?: Boolean;
    children: ReactNode;
}

const selectCurrentUser = (state: RootState) => state.user

const Header = (props: HeaderProps) => {
    const currentUser = useSelector(selectCurrentUser).id;

    const { shopLink } = props || { shopLink: false };
    const { isMobile } = props;

    let logoWidth = (isMobile) ? '100px' : '130px';
    let logoLeft = (isMobile) ? '-23px' : '5px';
    let logoTop = (isMobile) ? '80%' : '80%';

    return (
        <div className="headerPlaceholder">
            <header className="header">
                <div className="wrap">
                    <div className="logo" style={{ width: logoWidth, left: logoLeft, top: logoTop }}>
                        <Link to="/">
                            <img src={Logo} alt="Oberhof Logo" />
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
                                                    Bestellen
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
                                                    Bestellen
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
        </div>
    )
}

export default Header;