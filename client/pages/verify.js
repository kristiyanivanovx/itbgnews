import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { useRouter } from 'next/router';
import { getEndpoint } from '../utilities/common';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Verify = () => {
  const ENDPOINT = getEndpoint();
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { token, email } = router.query;

  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/password-reset', {
      method: 'POST',
      body: JSON.stringify({ token, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    // setErrors(() => result);
    // checkResponse(result);
  };

  return (
    <div className={'container'}>
      <HeadComponent currentPageName={'Забравена Парола'} />
      <Header shouldHideSearchBar={true} />
      <div className={'col'}>
        <FormContainer>
          {/*<Modal*/}
          {/*  text={modalMessage}*/}
          {/*  shouldDisplay={shouldDisplay}*/}
          {/*  toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}*/}
          {/*/>*/}
          <FormTitle text={'Моля, изберете нова парола'} />
          <Form>
            <p>Въведете желаната от вас нова парола</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
              placeholder={'Нова парола'}
              // errorMessage={errors.errorEmail}
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
