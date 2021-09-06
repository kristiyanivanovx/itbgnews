import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthTitle from '../components/AuthTitle';
import AuthLinks from '../components/AuthLinks';
import AuthContainer from '../components/AuthContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';

const Login = () => {
    return (
        <>
            <AuthContainer>
                <HeadComponent currentPageName={'Login'} />
                <AuthTitle text={'Вход'} />
                <Form>
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Влез'} />
                    <AuthLinks
                        firstText={'Нямаш профил?'}
                        secondText={'Забравена парола?'}
                    />
                </Form>
            </AuthContainer>
        </>
    );
};

export default Login;
