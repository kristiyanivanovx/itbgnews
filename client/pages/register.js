import React, { useState } from 'react';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import AuthContainer from '../components/AuthContainer';
import FormContainer from '../components/FormContainer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
  };

  // let { accessToken } = result.data;
  // await renewCookie(accessToken);

  // toggleModal();
  // setTimeout(() => Router.push('/'), 2000);
  // } else if (result.data?.code === EXISTING_USER_ERROR_CODE) {
  //   setModalMessage(() => 'Потребител с това име или имейл вече съществува.');
  //
  //   toggleModal();
  // }
  // };

  // const submitForm = async () => {
  // const response = await fetch(ENDPOINT + '/register', {
  //   method: 'POST',
  //   body: JSON.stringify({ username, email, password }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  //
  // let result = await response.json();
  // setErrors(() => result);
  // await checkResponse(result);
  // };

  return (
    <>
      <HeadComponent currentPageName={'Регистрация'} />
      <FormContainer>
        {/*<Modal*/}
        {/*  text={modalMessage}*/}
        {/*  shouldDisplay={shouldDisplay}*/}
        {/*  toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}*/}
        {/*/>*/}
        <FormTitle text={'Регистрация'} />
        <Form>
          <FormInput
          // onChange={(e) => setUsername(e.target.value)}
          // type={'text'}
          // placeholder={'Име'}
          // errorMessage={errors.errorUsername}
          />
          <FormInput
          // onChange={(e) => setEmail(e.target.value)}
          // type={'text'}
          // placeholder={'Имейл'}
          // errorMessage={errors.errorEmail}
          />
          <FormInput
          // onChange={(e) => setPassword(e.target.value)}
          // type={'password'}
          // placeholder={'Парола'}
          // errorMessage={errors.errorPassword}
          />
          <Button
            text={'Регистрация'}
            onClick={async () => await submitForm()}
          />
        </Form>
      </FormContainer>
    </>
  );
};

Register.getLayout = getDefaultLayout;

export default Register;
