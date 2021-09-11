import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useRouter } from 'next/router';
import { getEnvironmentInfo } from '../utilities/common';

const Verify = () => {
    const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

    const [password, setPassword] = useState('');

    const router = useRouter();
    const { token, email } = router.query;

    const submitForm = async () => {
        let jsonData = JSON.stringify({ token, email, password });

        const response = await fetch(ENDPOINT + '/password-reset', {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log(result);

        // setErrors(() => result);
        // checkResponse(result);
    };

    return (
        <>
            <HeadComponent currentPageName={'Забравена Парола'} />
            <FormContainer>
                <FormTitle text={'Моля, изберете нова парола'} />
                <Form>
                    <p>Въведете желаната от вас нова парола</p>
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        placeholder={'Нова Парола'}
                        // errorMessage={errors.errorEmail}
                    />
                    <Button
                        text={'Запази'}
                        onClick={async () => await submitForm()}
                    />
                </Form>
            </FormContainer>
        </>
    );
};

Verify.getLayout = getDefaultLayout;

export default Verify;
