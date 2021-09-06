import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const Create = () => {
    return (
        <>
            <HeadComponent currentPageName={'Създай Статия'} />
            <FormContainer>
                <FormTitle text={'Създай Статия'} />
                <Form>
                    <Input placeholder={'Заглавие'} />
                    <Input placeholder={'Линк'} />
                    <Button text={'Създай'} />
                </Form>
            </FormContainer>
        </>
    );
};

Create.getLayout = getDefaultLayout;

export default Create;
