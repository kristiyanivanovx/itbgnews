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
    EXISTING_USER_ERROR_CODE,
    INCORRECT_PASSWORD_ERROR_MESSAGE,
    SUCCESSFUL_REGISTRATION_MESSAGE,
    USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utilities/common';
import Router from 'next/router';
import Modal from '../components/Modal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [modalMessage, setModalMessage] = useState('');
    const [shouldDisplay, setShouldDisplay] = useState(false);

    function toggleModal() {
        setShouldDisplay((shouldDisplay) => !shouldDisplay);
    }

    const checkResult = async (result) => {
        if (result.message === USER_NOT_FOUND_ERROR_MESSAGE) {
            setModalMessage(() => 'Няма потребител с този имейл.');
            toggleModal();
        } else if (result.error === INCORRECT_PASSWORD_ERROR_MESSAGE) {
            setModalMessage(() => 'Грешна парола');
            toggleModal();
        } else {
            // await Router.push('/');
        }
    };

    const submitForm = async () => {
        let jsonData = JSON.stringify({ email, password });

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let result = await response.json();
        console.log(result);

        setErrors(() => result.data);

        let { access_token, refresh_token } = result.data;
        console.log(access_token);
        console.log(refresh_token);

        // await checkResult(result);
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
                        errorMessage={errors.errorEmail}
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        placeholder={'Парола'}
                        errorMessage={errors.errorPassword}
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
