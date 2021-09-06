import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';

const Login = () => {
    return (
        <>
            <FormContainer>
                <HeadComponent currentPageName={'Login'} />
                <FormTitle text={'Вход'} />
                <Form>
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Влез'} />
                    <AuthLinks
                        firstText={'Нямаш профил?'}
                        secondText={'Забравена парола?'}
                    />
                </Form>
            </FormContainer>
            <Footer />
        </>
    );
};

export default Login;
