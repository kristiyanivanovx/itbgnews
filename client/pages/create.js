import Header from '../components/stateful/Header';
import React, { useState } from 'react';
import FormInput from '../components/form/FormInput';
import Button from '../components/common/Button';
import FormTitle from '../components/form/FormTitle';
import Form from '../components/form/Form';
import HeadComponent from '../components/common/HeadComponent';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import FormContainer from '../components/form/FormContainer';
import SideNav from '../components/nav/SideNav';
import { useRouter } from 'next/router';
import Modal from '../components/common/Modal';
import jwt from 'jsonwebtoken';
import requireAuthentication from '../utilities/auth/requireAuthentication';
import getUserToken from '../utilities/auth/getUserToken';
import ensureValidCookie from '../utilities/auth/ensureValidCookie';
import { createArticle } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

export const getServerSideProps = requireAuthentication((context) => {
  let accessToken = getUserToken(context.req?.headers.cookie).split('=')[1];

  return {
    props: {
      accessToken,
    },
  };
});

// todo: finish up here
const Create = ({ accessToken }) => {
  const router = useRouter();
  const article = useSelector((state) => state.article);
  const errors = useSelector((state) => state.article.errors);
  const commentDispatch = useDispatch();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  // const [errors, setErrors] = useState({});

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  const submitForm = async () => {
    let userId = jwt.decode(accessToken).sub;
    const token = await ensureValidCookie(accessToken);
    commentDispatch(await createArticle(text, url, userId, token));

    // todo: fix state not updating
    console.log('the article i got is: ');
    console.log(article);

    console.log('the errors that i got are: ');
    console.log(errors);

    console.log('store.getState() ');
    console.log(store.getState());

    checkResponse();
  };

  // const checkResponse = async (response, result) => {
  const checkResponse = () => {
    let hasNoErrors = !errors?.errorTitle && !errors?.errorUrl;

    if (hasNoErrors) {
      console.log('debug: no errors');
      setModalMessage(() => 'Новината беше успешно създадена!');
      toggleModal();

      console.log('store.getState() ');
      console.log(store.getState());

      setTimeout(async () => await router.push('/'), 1000);
    } else {
      console.log('store.getState() ');
      console.log(store.getState());
      console.log('debug: yes errors');
    }
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
