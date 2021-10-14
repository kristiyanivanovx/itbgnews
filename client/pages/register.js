import React, { useState } from 'react';
import FormContainer from '../components/form/FormContainer';
import FormTitle from '../components/form/FormTitle';
import Form from '../components/form/Form';
import FormInput from '../components/form/FormInput';
import Button from '../components/common/Button';
import HeadComponent from '../components/common/HeadComponent';
import Modal from '../components/common/Modal';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import { EXISTING_USER_ERROR_CODE } from '../utilities/infrastructure/codes';
import { SUCCESSFUL_REGISTRATION_ERROR } from '../utilities/infrastructure/messages';
import Router from 'next/router';
import renewCookie from '../utilities/auth/renewCookie';
import AuthLinks from '../components/auth/AuthLinks';
import AuthLink from '../components/auth/AuthLink';
import Header from '../components/stateful/Header';
import Http from '../utilities/service/http';

const Register = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const http = new Http();

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  const checkResponse = async (result) => {
    if (result.message === SUCCESSFUL_REGISTRATION_ERROR) {
      setModalMessage(() => 'Регистрирахте се успешно!');
      toggleModal();

      await renewCookie(result.data.accessToken);
      setTimeout(() => Router.push('/'), 2000);
    } else if (result.data?.code === EXISTING_USER_ERROR_CODE) {
      setModalMessage(() => 'Потребител с това име или имейл вече съществува.');
      toggleModal();
    }
  };

  const submitForm = async () => {
    let result = await http.post('/register', true, false, true, null, {
      username,
      email,
      password,
    });

    setErrors(() => result);
    await checkResponse(result);
  };

  return (
    <div className={'container'}>
      <HeadComponent currentPageName={'Регистрация'} />
      <Header shouldHideSearchBar={true} />
      <div className={'col'}>
        <FormContainer>
          <Modal
            text={modalMessage}
            shouldDisplay={shouldDisplay}
            toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
          />
          <FormTitle text={'Регистрация'} />
          <Form>
            <FormInput
              onChange={(e) => setUsername(e.target.value)}
              type={'text'}
              placeholder={'Име'}
              errorMessage={errors.errorUsername}
            />
            <FormInput
              onChange={(e) => setEmail(e.target.value)}
              type={'text'}
              placeholder={'Имейл'}
              errorMessage={errors.errorEmail}
            />
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
              placeholder={'Парола'}
              errorMessage={errors.errorPassword}
            />
            <Button
              text={'Регистрация'}
              onClick={async () => await submitForm()}
            />
            <AuthLinks>
              <AuthLink text={'Имаш профил?'} link={'/login'} />
            </AuthLinks>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Register.getLayout = getDefaultLayout;

export default Register;
