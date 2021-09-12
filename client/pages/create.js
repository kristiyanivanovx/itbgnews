import styles from '../styles/Header.module.css';
import Header from '../components/Header';
import React, { useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';

import { getEnvironmentInfo } from '../utilities/common';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const Create = () => {
    const router = useRouter();
    // useEffect();

    const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);

    const handleNotValidTokens = () => {
        //router.push('/login')
    }

    // todo: improve checks
    // if user doesnt have cookies, make him login
    const { refreshToken, accessToken } = cookies;
    if (refreshToken === undefined || accessToken === undefined) {
        handleNotValidTokens();
    }

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
