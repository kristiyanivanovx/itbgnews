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
import { deleteComment } from '../redux';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { login } from '../redux/auth/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  // const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const submitForm = async () => {
    dispatch(login(email, password)).then(() => {
      checkResult();
      // await checkResult(store.getState().auth);
    });
  };

  const checkResult = () => {
    const auth = store.getState().auth;

    if (auth.error === USER_NOT_FOUND_ERROR) {
      setModalMessage(() => 'Няма потребител с този имейл.');
      toggleModal();
    } else if (auth.error === INCORRECT_PASSWORD_ERROR) {
      setModalMessage(() => 'Грешна парола.');
      toggleModal();
    } else if (auth.accessToken) {
      setModalMessage(() => 'Влязохте успешно.');
      toggleModal();

      renewCookie(auth.accessToken).then(() => {
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      });
    } else {
      setModalMessage(() => 'Стана неочаквана грешка...');
      toggleModal();
    }
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
