import React from 'react';
import styles from '../styles/Header.module.css';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';

const Create = () => {
    return (
        <div className="container">
            <Header />
            <div className={'col'}>
                <SideNav />
                <HeadComponent currentPageName={'Създай Статия'} />
                <FormContainer>
                    <FormTitle text={'Създай Статия'} />
                    <Form>
                        <Input placeholder={'Заглавие'} />
                        <Input placeholder={'Линк'} />
                        <Button text={'Създай'} />
                    </Form>
                </FormContainer>
            </div>
        </div>
    );
};

Create.getLayout = getDefaultLayout;

export default Create;
