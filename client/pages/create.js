import Header from '../components/Header';
import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';
import jwt from 'jsonwebtoken';
import requireAuthentication from '../utilities/requireAuthentication';
import getUserToken from '../utilities/getUserToken';
import ensureValidCookie from '../utilities/ensureValidCookie';
import { createArticle } from '../redux';
import { useDispatch } from 'react-redux';
import store from '../redux/store';

export const getServerSideProps = requireAuthentication((context) => {
  let accessToken = getUserToken(context.req?.headers.cookie).split('=')[1];

  return {
    props: {
      accessToken,
    },
  };
});

const Create = ({ accessToken }) => {
  const router = useRouter();
  const commentDispatch = useDispatch();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  const submitForm = async () => {
    let userId = jwt.decode(accessToken).sub;
    const token = await ensureValidCookie(accessToken);

    commentDispatch(createArticle(text, url, userId, token)).then(() => {
      checkResponse();
    });
  };

  const checkResponse = () => {
    let stateErrors = store.getState().article.errors;

    setErrors((prev) => ({
      ...prev,
      errorTitle: stateErrors?.errorTitle
        ? 'Заглавието трябва да е с дължина от 6 до 250 букви.'
        : null,
      errorUrl: stateErrors?.errorUrl
        ? 'Хиперлинкът трябва да е валиден.'
        : null,
    }));

    if (!stateErrors?.errorTitle && !stateErrors?.errorUrl) {
      setModalMessage(() => 'Новината беше успешно създадена!');
      toggleModal();

      setTimeout(async () => await router.push('/'), 1000);
    }
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Създай Статия'} />
      <Header shouldHideSearchBar={true} />
      <div className={'col'}>
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
