import React, { useState } from 'react';
import AuthContainer from '../components/AuthContainer';
import AuthTitle from '../components/AuthTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submitForm = async () => {
        await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, passwordConfirm }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <>
            <HeadComponent currentPageName={'Register'} />
            <AuthContainer>
                <AuthTitle text={'Регистрация'} />
                <Form>
                    <Input placeholder={'Име'} />
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Регистрация'} />
                </Form>
            </AuthContainer>
        </>
    );
};

export default Register;
