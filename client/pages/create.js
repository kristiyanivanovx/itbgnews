import Header from '../components/Header';
import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';
import { CREATED_RESPONSE_CODE, getEndpoint } from '../utilities/common';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';
import jwt from 'jsonwebtoken';
import requireAuthentication from '../helpers/requireAuthentication';
import getUserToken from '../utilities/getUserToken';
import ensureValidCookie from '../utilities/ensureValidCookie';

export const getServerSideProps = requireAuthentication((context) => {
  let accessToken = getUserToken(context.req?.headers.cookie).split('=')[1];

  return {
    props: {
      accessToken,
    },
  };
});

const Create = ({ accessToken }) => {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const ENDPOINT = getEndpoint();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const checkResponse = async (response, result) => {
    if (response.status === CREATED_RESPONSE_CODE) {
      setModalMessage(() => 'Новината беше успешно създадена!');
      toggleModal();

      setTimeout(async () => await router.push('/'), 1000);
    }
  };

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  const submitForm = async () => {
    let userId = jwt.decode(accessToken).sub;

    const response = await fetch(ENDPOINT + '/posts/create', {
      method: 'POST',
      body: JSON.stringify({ text, url, authorId: userId }),
      headers: {
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
        'Content-Type': 'application/json',
      },
    });

    let result = await response.json();
    setErrors(() => result);
    await checkResponse(response, result);
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Създай Статия'} />
      <Header shouldHideSearchBar={true} />
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
            <FormInput
              onChange={(e) => setText(e.target.value)}
              type={'text'}
              placeholder={'Заглавие'}
              errorMessage={errors?.errorTitle}
            />
            <FormInput
              onChange={(e) => setUrl(e.target.value)}
              type={'url'}
              placeholder={'Линк'}
              errorMessage={errors?.errorUrl}
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
