import React, { useState } from 'react';
import FormInput from '../components/form/FormInput';
import Button from '../components/common/Button';
import FormTitle from '../components/form/FormTitle';
import FormContainer from '../components/form/FormContainer';
import Form from '../components/form/Form';
import HeadComponent from '../components/common/HeadComponent';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import {
  INVALID_EMAIL_ERROR,
  NO_USER_FOUND_ERROR,
} from '../utilities/infrastructure/messages';
import Header from '../components/stateful/Header';
import Modal from '../components/common/Modal';
import Http from '../utilities/service/http';
import { useRouter } from 'next/router';

const Forgotten = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const http = new Http();
  const router = useRouter();

  const toggleModal = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const submitForm = async () => {
    const result = await http.post('/forgotten', true, false, true, null, {
      email,
    });

    await checkResponse(result);
  };

  const checkResponse = async (result) => {
    if (result.errorEmail === INVALID_EMAIL_ERROR) {
      setError(() => 'Имейлът ви е невалиден.');
    } else if (result.errorUser === NO_USER_FOUND_ERROR) {
      setError(() => 'Потребител с този имейл не съществува.');
    } else if (result.data === 202) {
      setError(() => null);
      setModalMessage(() => 'Изпратихме ви код за възстановяване!');
      toggleModal();
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
          <FormTitle text={'Забравена Парола'} />
          <Form>
            <FormInput
              onChange={(e) => setEmail(e.target.value)}
              type={'text'}
              placeholder={'Имейл'}
              errorMessage={error}
            />
            <Button
              text={'Изпрати код за възстановяване'}
              onClick={async () => await submitForm()}
            />
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Forgotten.getLayout = getDefaultLayout;

export default Forgotten;
