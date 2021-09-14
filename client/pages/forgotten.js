import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { getEnvironmentInfo } from '../utilities/common';
import styles from '../styles/Form.module.css';

const Forgotten = () => {
    let [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
    const [email, setEmail] = useState('');

    const submitForm = async () => {
        let jsonData = JSON.stringify({ email });

        const response = await fetch(ENDPOINT + '/forgotten', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let result = await response.json();
        console.log('result >' + JSON.parse(result));

        // setErrors(() => result);
        // checkResponse(result);
    };

    return (
        <>
            <HeadComponent currentPageName={'Забравена Парола'} />
            <FormContainer>
                <FormTitle text={'Забравена Парола'} />
                <Form>
                    <p className={styles.forgotten__text}>Въведете имейлa, свързан с акаунта ви.</p>
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
