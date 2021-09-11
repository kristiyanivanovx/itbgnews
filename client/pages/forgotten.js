import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const Forgotten = () => {
    const [email, setEmail] = useState('');

    const submitForm = async () => {
        let jsonData = JSON.stringify({ email });
        // console.dir(JSON.parse(jsonData), { depth: null });

        const response = await fetch('http://localhost:5000/forgotten', {
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
                    <p>Въведете имейлa, свързан с акаунтът ви.</p>
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
