import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const Login = () => {
    return (
        <>
            <HeadComponent currentPageName={'Login'} />
            <FormContainer>
                <FormTitle text={'Вход'} />
                <Form>
                    <Input placeholder={'Имейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Влез'} />
                    <AuthLinks
                        firstText={'Нямаш профил?'}
                        secondText={'Забравена парола?'}
                    />
                </Form>
            </FormContainer>
        </>
    );
};

Login.getLayout = getDefaultLayout;

export default Login;
