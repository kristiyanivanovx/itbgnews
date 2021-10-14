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
  INCORRECT_PASSWORD_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../utilities/common';
import Modal from '../components/Modal';
import Router from 'next/router';
import renewCookie from '../utilities/renewCookie';
import AuthLink from '../components/AuthLink';
import Header from '../components/Header';
import Http from '../services/http';

const Login = () => {
  // const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const http = new Http();

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const checkResult = async (result) => {
    if (result.message === USER_NOT_FOUND_ERROR) {
      setModalMessage(() => 'Няма потребител с този имейл.');
      toggleModal();
    } else if (result.error === INCORRECT_PASSWORD_ERROR) {
      setModalMessage(() => 'Грешна парола');
      toggleModal();
    } else {
      await renewCookie(result.data.accessToken);

      setModalMessage(() => 'Влязохте успешно.');
      toggleModal();

      setTimeout(() => {
        Router.push('/');
      }, 2000);
    }
  };

  const submitForm = async () => {
    const result = await http.post('/login', true, false, true, null, {
      email,
      password,
    });

    await checkResult(result);
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Вход'} />
      <Header shouldHideSearchBar={true} />
      <div className={'col'}>
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
            />
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'Парола'}
              type={'password'}
            />
            <Button onClick={async () => await submitForm()} text={'Влез'} />
            <AuthLinks>
              <AuthLink text={'Нямаш профил?'} link={'/register'} />
              <AuthLink text={'Забравена парола?'} link={'/forgotten'} />
            </AuthLinks>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Login.getLayout = getDefaultLayout;

export default Login;
