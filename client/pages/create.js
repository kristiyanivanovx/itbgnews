import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import AuthContainer from '../components/AuthContainer';
import { getEnvironmentInfo } from '../utilities/common';

const Create = () => {
    let [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();


    return (
        <>
            <HeadComponent currentPageName={'Създай Статия'} />
            <AuthContainer>
                <FormTitle text={'Създай Статия'} />
                <Form>
                    <Input placeholder={'Заглавие'} />
                    <Input placeholder={'Линк'} />
                    <Button text={'Създай'} />
                </Form>
            </AuthContainer>
        </>
    );
};

Create.getLayout = getDefaultLayout;

export default Create;
