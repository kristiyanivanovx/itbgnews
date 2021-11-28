import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
  INCORRECT_PASSWORD_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../utilities/messages';
import Modal from '../components/Modal';
import Router from 'next/router';
import renewCookie from '../utilities/renewCookie';
import AuthLink from '../components/AuthLink';
import Header from '../components/Header';
import Http from '../utilities/http';
import { deleteComment } from '../redux';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { login } from '../redux/auth/authActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});

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
            {/*todo: proper form, onsubmit*/}
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
            <Button
              type={'submit'}
              onClick={async () => await submitForm()}
              text={'Влез'}
            />
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
