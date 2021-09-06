import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Title from '../components/AuthTitle';
import Container from '../components/AuthContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';

const Create = () => {
    return (
        <>
            <HeadComponent currentPageName={'Create an Article'} />
            <Container>
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
