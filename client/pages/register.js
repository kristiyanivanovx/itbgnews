import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';

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
<<<<<<< HEAD
                    <Input placeholder={'Име'} />
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Регистрация'} />
=======
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
>>>>>>> 7343bc21 (fix identation)
                </Form>
            </FormContainer>
            <Footer />
        </>
    );
};

export default Register;
