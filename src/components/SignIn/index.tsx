import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';
import Buttons from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';
import { useSelector } from 'react-redux';
import AuthWrapper from './../AuthWrapper/'
import FormInput from '../forms/FormInput';
import Button from './../forms/Button';
import { RootState } from '../../redux/store';

const initialState = {
    email: '',
    password: ''
};

interface Credentials {
    email: string;
    password: string;
};

interface SignInProps { };

const selectCurrentUser = (state: RootState) => state.user

const SignIn = (props: SignInProps) => {
    const currentUser = useSelector(selectCurrentUser).id;

    const [credentials, setCredentials] = useState<Credentials>(initialState);
    const history = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setCredentials({
                ...initialState
            });
            history("/");
        }

    }, [currentUser]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(
            {
                ...credentials,
                [name]: value
            }
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = credentials;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setCredentials({
                ...initialState
            });
            history("/");
        } catch (err) {
            // console.log(err)
        }
    }

    const { email, password } = credentials;
    const configAuthWrapper = {
        headline: 'LogIn'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        handleChange={handleChange} />

                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        handleChange={handleChange} />

                    <Buttons type='submit'>
                        LogIn
                    </Buttons>

                    <div className='socialSignin'>
                        <div className='row'>
                            <Buttons onClick={signInWithGoogle}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>

                    <div className='links'>
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div >
        </AuthWrapper >
    );
}

export default SignIn;