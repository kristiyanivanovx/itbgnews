import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useRouter } from 'next/router';
import {
  INVALID_PASSWORD_ERROR,
  NO_USER_FOUND_ERROR,
  PASSWORD_CHANGED_SUCCESSFULLY,
} from '../utilities/messages';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import Http from '../utilities/http';

const Verify = () => {
  const router = useRouter();
  const ENDPOINT = useSelector((state) => state.infrastructure.endpoint);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const http = new Http();

  const { token, email } = router.query;

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  // todo: use redux
  const submitForm = async () => {
    const result = await http.post('/password-reset', true, false, true, null, {
      token,
      email,
      password,
    });

    await checkResponse(result);
  };

  const checkResponse = async (result) => {
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
      setTimeout(() => router.push('/login'), 1500);
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
            <FormInput
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
