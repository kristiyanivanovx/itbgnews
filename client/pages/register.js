import React from 'react';
import AuthContainer from '../components/AuthContainer';
import AuthTitle from '../components/AuthTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';

const Register = () => {
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
