import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import AuthContainer from '../components/AuthContainer';
import { getEnvironmentInfo } from '../utilities/common';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const Create = () => {
    const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);

    const router = useRouter();

    // todo: improve checks
    // if user doesnt have cookies, make him login
    const { refreshToken, accessToken } = cookies;
    if (refreshToken === undefined || accessToken === undefined) {
        router.push('/login').then();
    }

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
