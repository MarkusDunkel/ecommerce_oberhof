import React, { Component } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../../components/forms/FormInput';
import Button from './../../components/forms/Button';

interface InputData {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: string[];
};

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

const Signup = () => {

    const [inputData, setInputData] = React.useState<InputData>(initialState);

    const reset = () => {
        setInputData(
            {
                ...initialState
            })
    };

    function handleChange(e: any) {
        const { name, value } = e.target;
        setInputData(
            {
                ...inputData,
                [name]: value
            }
        );
    }

    const handleFormSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, errors } = inputData;

        if (password !== confirmPassword) {
            const err = ['Password don\'t match']
            setInputData(
                {
                    ...inputData,
                    errors: err
                })
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });
            reset();
        } catch (err) {
            // console.log(err);
        }
    }

    const { displayName, email, password, confirmPassword, errors } = inputData;

    const configAuthWrapper = {
        headline: 'Registration'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={handleChange}
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={handleChange}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={handleChange}
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="ConfirmPassword"
                        handleChange={handleChange}
                    />

                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper >
    )
}

export default Signup;