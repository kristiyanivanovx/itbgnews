import React, { useState } from 'react';
import FormInput from '../components/form/FormInput';
import Button from '../components/common/Button';
import FormTitle from '../components/form/FormTitle';
import AuthLinks from '../components/auth/AuthLinks';
import FormContainer from '../components/form/FormContainer';
import Form from '../components/form/Form';
import HeadComponent from '../components/common/HeadComponent';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import {
  INCORRECT_PASSWORD_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../utilities/infrastructure/messages';
import Modal from '../components/common/Modal';
import Router from 'next/router';
import renewCookie from '../utilities/auth/renewCookie';
import AuthLink from '../components/auth/AuthLink';
import Header from '../components/stateful/Header';
import Http from '../utilities/service/http';

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
