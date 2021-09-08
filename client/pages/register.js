import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {
        const response = await fetch('https://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
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
            <FormContainer>
                <FormTitle text={'Регистрация'} />
                <Form>
                    <Input
                        onClick={(e) => setUsername(e)}
                        placeholder={'Име'}
                    />
                    <Input onClick={(e) => setEmail(e)} placeholder={'Имейл'} />
                    <Input
                        onClick={(e) => setPassword(e)}
                        placeholder={'Парола'}
                    />
                    <Button
                        onClick={(e) => submitForm(e)}
                        text={'Регистрация'}
                    />
                </Form>
            </FormContainer>
        </>
    );
};

Register.getLayout = getDefaultLayout;

export default Register;
