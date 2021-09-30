import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import {
  getEndpoint,
  INCORRECT_PASSWORD_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utilities/common';
import Modal from '../components/Modal';
import Router from 'next/router';
import renewCookie from '../utilities/renewCookie';

const Login = () => {
  const ENDPOINT = getEndpoint();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const checkResult = async (result) => {
    if (result.message === USER_NOT_FOUND_ERROR_MESSAGE) {
      setModalMessage(() => 'Няма потребител с този имейл.');
      toggleModal();
    } else if (result.error === INCORRECT_PASSWORD_ERROR_MESSAGE) {
      setModalMessage(() => 'Грешна парола');
      toggleModal();
    } else {
      const { accessToken } = result.data;
      await renewCookie(accessToken);

      setModalMessage(() => 'Влязохте успешно.');
      toggleModal();

      setTimeout(() => {
        Router.push('/');
      }, 2000);
    }
  };

  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result = await response.json();
    setErrors(() => result.data);

    await checkResult(result);
  };

  return (
    <>
      <HeadComponent currentPageName={'Вход'} />
      <FormContainer>
        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplay}
          toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
        />
        <FormTitle text={'Вход'} />
        <Form>
          <FormInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Имейл'}
            type={'text'}
            errorMessage={errors?.email}
          />
          <FormInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Парола'}
            type={'password'}
            errorMessage={errors?.password}
          />
          <Button onClick={async () => await submitForm()} text={'Влез'} />

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
