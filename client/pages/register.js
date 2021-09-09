import React, { useState } from 'react';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import AuthContainer from "../components/AuthContainer";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <HeadComponent currentPageName={'Register'} />
            <AuthContainer>
                <FormTitle text={'Регистрация'} />
                <Form>
                    <Input
                        onClick={(e) => setUsername(e)}
                        type={'text'}
                        placeholder={'Име'}
                    />
                    <Input
                        onClick={(e) => setEmail(e)}
                        type={'text'}
                        placeholder={'Имейл'}
                    />
                    <Input
                        onClick={(e) => setPassword(e)}
                        type={'password'}
                        placeholder={'Парола'}
                    />
                    <Button
                        onClick={(e) => submitForm(e)}
                        text={'Регистрация'}
                    />
                </Form>
            </AuthContainer>
        </>
    );
};

Register.getLayout = getDefaultLayout;

export default Register;
