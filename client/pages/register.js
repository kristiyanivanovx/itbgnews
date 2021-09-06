import React from 'react';
import FormContainer from '../components/FormContainer';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const Register = () => {
    return (
        <>
            <HeadComponent currentPageName={'Register'} />
            <FormContainer>
                <FormTitle text={'Регистрация'} />
                <Form>
                    <Input placeholder={'Име'} />
                    <Input placeholder={'Имейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Регистрация'} />
                </Form>
            </FormContainer>
        </>
    );
};

Register.getLayout = getDefaultLayout;

export default Register;
