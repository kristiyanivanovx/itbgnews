import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { useRouter } from 'next/router';
import {
  getEndpoint,
  INVALID_PASSWORD_ERROR,
  NO_USER_FOUND_ERROR,
  PASSWORD_CHANGED_SUCCESSFULLY,
} from '../utilities/common';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Verify = () => {
  const ENDPOINT = getEndpoint();
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const { token, email } = router.query;

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/password-reset', {
      method: 'POST',
      body: JSON.stringify({ token, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    await checkResponse(result);
  };

  const checkResponse = async (result) => {
    console.log(result);
    if (result.errorPassword === INVALID_PASSWORD_ERROR) {
      setError(
        () =>
          'Паролата ви трябва да съдържа поне една цифра и да бъде между 8 и 35 символа.',
      );
    } else if (result.errorUser === NO_USER_FOUND_ERROR) {
      setError(() => 'Потребител с този имейл не съществува.');
    } else if (result.result === PASSWORD_CHANGED_SUCCESSFULLY) {
      setError(() => null);
      setModalMessage(() => 'Паролата ви беше успешно променена!');
      toggleModal();
      setTimeout(() => router.push('/'), 1500);
    }
  };

  return (
    <div className={'container'}>
      <HeadComponent currentPageName={'Забравена Парола'} />
      <Header shouldHideSearchBar={true} />
      <div className={'col'}>
        <FormContainer>
          <Modal
            text={modalMessage}
            shouldDisplay={shouldDisplay}
            toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
          />
          <FormTitle text={'Моля, изберете нова парола'} />
          <Form>
            <p>Въведете желаната от вас нова парола</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
              placeholder={'Нова парола'}
              errorMessage={error}
            />
            <Button text={'Запази'} onClick={async () => await submitForm()} />
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Verify.getLayout = getDefaultLayout;

export default Verify;
