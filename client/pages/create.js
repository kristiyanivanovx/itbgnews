import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import AuthContainer from '../components/AuthContainer';
import Brand from "../components/Brand";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNav";
import FormContainer from "../components/FormContainer";

const Create = () => {
    return (
        <>

            <HeadComponent currentPageName={'Създай Статия'} />
            <div className={"container"}>
            <div className={"col"}>
                <Brand />
                <SearchBar />
            </div>
            <div className={"col"}>
            <SideNav />
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
        </>
    );
};

Create.getLayout = getDefaultLayout;

export default Create;
