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

const Delete = () => {
  const router = useRouter();
  const { post_id } = router.query;

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
  const user_id = '613fc9389fa3734feef85202';

  // todo: maybe check cookies?

  // todo: delete the specific post, then redirect
  const submitForm = async (ENDPOINT) => {
    const jsonData = JSON.stringify({ text, url, user_id });
    console.log(jsonData);

    // /posts/comments
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
    // checkResponse(response);
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Изтриване на Статия'} />
      <Header />
      <div className={'col'}>
        <SideNav />
        <FormContainer>
          <FormTitle text={'Изтриване на Статия'} />
          <Form>
            <h5 className="center">
              Сигурни ли сте, че искате да изтриете тази статия?
            </h5>
            <hr />

            <h4 className="center">{'title'}</h4>

            <h4 className="center">
              <a href={url}>{url}</a>
            </h4>

            <Button
              onClick={async (ENDPOINT) => await submitForm(ENDPOINT)}
              text={'Изтриване'}
            />
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

Delete.getLayout = getDefaultLayout;

export default Delete;
