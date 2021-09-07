import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';

const Login = () => {
    return (
        <>
            <FormContainer>
                <HeadComponent currentPageName={'Forgotten'} />
                <FormTitle text={'Забравена Парола'} />
                <Form>
                    <p>Въведете имейлa, свързан с акаунтът ви.</p>
                    <Input placeholder={'Имейл'} />
                    <Button text={'Изпрати код за възстановяване'} />
                </Form>
            </FormContainer>
            <Footer />
        </>
    );
};

export default Login;
