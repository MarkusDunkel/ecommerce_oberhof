import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.tsx';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

import { auth } from '../../firebase/utils';

const initialState = {
    email: '',
    errors: [],

};

interface EmailPasswordState {
    email: string;
    errors: string[];
};

const EmailPassword = () => {

    const [state, setState] = useState<EmailPasswordState>(initialState);
    const history = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email } = state;
        const config = {
            url: 'http://localhost:3000/login'
        };
        try {

        } catch (err) {
            // console.log(err);
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                history("/login");
                console.log('success!');
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                setState({ ...state, errors: err });
            });
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>

                {state.errors.length > 0 && (
                    <ul>
                        {state.errors.map((e, index) => {
                            return (
                                <li key={index}>
                                    {e}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={state.email}
                        placeholder="Email"
                        handleChange={handleChange}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                </form>
            </div>

        </AuthWrapper>
    );
}

export default EmailPassword;
