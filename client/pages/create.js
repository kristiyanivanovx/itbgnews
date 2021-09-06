import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Title from '../components/AuthTitle';
import AuthLinks from '../components/AuthLinks';
import Container from '../components/AuthContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';

const Create = () => {
    return (
        <>
            <Container>
                <HeadComponent currentPageName={'Login'} />
                <Title text={'Създай Новина'} />
                <Form>
                    <Input placeholder={'Заглавие'} />
                    <Input placeholder={'Линк'} />
                    <Button text={'Създай'} />
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default Create;
