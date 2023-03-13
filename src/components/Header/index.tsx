import React, { ReactNode } from 'react';
import './styles.scss';
// import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
// import { auth } from './../../firebase/utils'

interface HeaderProps {
    currentUser: null | string;
    children: ReactNode;
}

const Header = (props: HeaderProps) => {
    const { currentUser } = props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    {/* <Link to="/">
                        <img src={Logo} alt="SimpleTut Logo" />
                    </Link> */}
                </div>

                <div className="callToActions">
                    Call to Actions

                    {/* {currentUser && (
                        <ul>
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (


                        <ul>
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
                    } */}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header;