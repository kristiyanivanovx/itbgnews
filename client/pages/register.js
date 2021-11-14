import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import Modal from '../components/Modal';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { EXISTING_USER_ERROR_CODE } from '../utilities/codes';
import { SUCCESSFUL_REGISTRATION_ERROR } from '../utilities/messages';
import Router from 'next/router';
import renewCookie from '../utilities/renewCookie';
import AuthLinks from '../components/AuthLinks';
import AuthLink from '../components/AuthLink';
import Header from '../components/Header';
import Http from '../utilities/http';

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
    setErrors((prev) => ({
      ...prev,
      errorEmail: result.errorEmail ? 'Имейлът ви не е валиден.' : null,
      errorPassword: result.errorPassword
        ? 'Паролата трябва да съдържа поне една цифра и да е с дължина от 8 до 35 символа включително.'
        : null,
      errorUsername: result.errorUsername
        ? 'Потребителското ви име трябва да е с дължина от 6 до 13 символа включително.'
        : null,
    }));

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

  // todo: use redux
  const submitForm = async () => {
    let result = await http.post('/register', true, false, true, null, {
      username,
      email,
      password,
    });

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
