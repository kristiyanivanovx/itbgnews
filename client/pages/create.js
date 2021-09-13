<<<<<<< HEAD
import React from 'react';
import styles from '../styles/Header.module.css';
import Header from '../components/Header';
=======
import styles from '../styles/Header.module.css';
import Header from '../components/Header';
import React, { useEffect } from 'react';
>>>>>>> chris
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';
<<<<<<< HEAD
=======
import { getEnvironmentInfo } from '../utilities/common';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
>>>>>>> chris

const Create = () => {
    const router = useRouter();

    const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);

    // todo: use getServerSideProps / hoc
    // todo: improve checks
    // if user doesnt have cookies, make him login
    useEffect(() => {
        if(!cookies || !router) {
            return;
        }

        const { refreshToken, accessToken } = cookies;
        if (refreshToken === undefined || accessToken === undefined) {
            router.push('/login');
        }

    }, [cookies, router])

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
