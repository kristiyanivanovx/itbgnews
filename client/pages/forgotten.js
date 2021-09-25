import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { getEndpoint } from '../utilities/common';

// verify that this works
const Forgotten = () => {
  const ENDPOINT = getEndpoint();
  const [email, setEmail] = useState('');

  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/forgotten', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result = await response.json();

    // setErrors(() => result);
    // checkResponse(result);
  };

  return (
    <>
      <HeadComponent currentPageName={'Забравена Парола'} />
      <FormContainer>
        <FormTitle text={'Забравена Парола'} />
        <Form>
          {/*<p className={styles.forgotten__text}>Въведете имейлa, свързан с акаунта ви.</p>*/}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type={'text'}
            placeholder={'Имейл'}
            // errorMessage={errors.errorEmail}
          />
          <Button
            text={'Изпрати код за възстановяване'}
            onClick={async () => await submitForm()}
          />
        </Form>
      </FormContainer>
    </>
  );
};

Forgotten.getLayout = getDefaultLayout;

export default Forgotten;
