import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
    EXISTING_USER_ERROR_CODE, getEnvironmentInfo,
    INCORRECT_PASSWORD_ERROR_MESSAGE,
    SUCCESSFUL_REGISTRATION_MESSAGE,
    USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utilities/common';
import Modal from '../components/Modal';
import { useCookies } from "react-cookie";
import Router  from 'next/router';

const Login = () => {
    let [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [modalMessage, setModalMessage] = useState('');
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

    function toggleModal() {
        setShouldDisplay((shouldDisplay) => !shouldDisplay);
    }

    function handleCookie(access_token, refresh_token) {
        setCookie("access_token", access_token, { path: "/", maxAge: 60 * 60 * 24 }); // 1 day
        setCookie("refresh_token", refresh_token, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // 30 days
    }

    const checkResult = async (result) => {
        if (result.message === USER_NOT_FOUND_ERROR_MESSAGE) {
            setModalMessage(() => 'Няма потребител с този имейл.');
            toggleModal();
        } else if (result.error === INCORRECT_PASSWORD_ERROR_MESSAGE) {
            setModalMessage(() => 'Грешна парола');
            toggleModal();
        } else {
            let { access_token, refresh_token } = result.data;
            handleCookie(access_token, refresh_token);

            setModalMessage(() => 'Влязохре успешно.');
            toggleModal();

            setTimeout(() => {
                 Router.push('/');
            }, 2500)
        }
    };

    const submitForm = async () => {
        let jsonData = JSON.stringify({ email, password });

        const response = await fetch(ENDPOINT + '/login', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let result = await response.json();
        console.log('da' + result);

        setErrors(() => result.data);
        console.log('posle' + result.data);

        await checkResult(result);
    };

    return (
        <>
            <HeadComponent currentPageName={'Login'} />
            <FormContainer>
                <Modal
                    text={modalMessage}
                    shouldDisplay={shouldDisplay}
                    toggleModal={(shouldDisplay) =>
                        setShouldDisplay(!shouldDisplay)
                    }
                />
                <FormTitle text={'Вход'} />
                <Form>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type={'text'}
                        placeholder={'Имейл'}
                        // errorMessage={errors.errorEmail}
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        placeholder={'Парола'}
                        // errorMessage={errors.errorPassword}
                    />
                    <Button
                        text={'Влез'}
                        onClick={async () => await submitForm()}
                    />
                    <AuthLinks
                        firstText={'Нямаш профил?'}
                        secondText={'Забравена парола?'}
                    />
                </Form>
            </FormContainer>
        </>
    );
};

Login.getLayout = getDefaultLayout;

export default Login;
