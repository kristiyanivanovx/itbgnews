import styles from '../styles/Header.module.css';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';
import { CREATED_RESPONSE_CODE, getEnvironmentInfo } from '../utilities/common';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';

const Create = () => {
  const router = useRouter();

  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  // todo: critical - do not use hardcoded value
  const user_id = '6145698390a1897378449cd5';

  // todo: use getServerSideProps / hoc
  // if user doesnt have cookies, make him login
  useEffect(() => {
    if (!cookies || !router) {
      return;
    }

    const { refreshToken, accessToken } = cookies;
    if (refreshToken === undefined || accessToken === undefined) {
      router.push('/login');
    }
  }, [cookies, router]);

  // todo: add checks and error validation
  const checkResponse = (response) => {
    console.log(response.status, CREATED_RESPONSE_CODE);
    if (response.status === CREATED_RESPONSE_CODE) {
      setModalMessage(() => 'Новината беше успешно създадена!');
      toggleModal();

      setTimeout(async () => await router.push('/'), 1000);
    }
  };

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
    console.log(shouldDisplay);
  }

  const submitForm = async () => {
    let jsonData = JSON.stringify({ text, url, user_id });
    console.log(jsonData);

    const response = await fetch(ENDPOINT + '/posts', {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // todo: check for errors аnd set them
    console.log(response.status);

    // setErrors(() => result);
    checkResponse(response);
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Създай Статия'} />
      <Header />
      <div className={'col'}>
        <SideNav />
        <FormContainer>
          <Modal
            text={modalMessage}
            shouldDisplay={shouldDisplay}
            toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
          />
          <FormTitle text={'Създай Статия'} />
          <Form>
            <Input
              onChange={(e) => setText(e.target.value)}
              type={'text'}
              placeholder={'Заглавие'}
            />
            <Input
              onChange={(e) => setUrl(e.target.value)}
              type={'url'}
              placeholder={'Линк'}
            />
            <Button onClick={async () => await submitForm()} text={'Създай'} />
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Create.getLayout = getDefaultLayout;

export default Create;
