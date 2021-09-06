import React, { useState } from 'react';
<<<<<<< HEAD
=======
import AuthContainer from '../components/AuthContainer';
import AuthTitle from '../components/AuthTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97

const Register = () => {
    return (
<<<<<<< HEAD
    <>
        <div className={"auth"}>
            <h2 className={"auth__title"}>Регистрация</h2>
            <form className={"auth__input"}>
                <input className={"user__input"} placeholder={"Име"}/>
                <input className={"user__input"} placeholder={"Е-мейл"}/>
                <input className={"user__input"} placeholder={"Парола"}/>
                <button className={"auth__btn"}>
                    <div className={"auth__btn--background"}>
                    </div>
                    <div className={"auth__btn--shadow"}>
=======
        <>
            <HeadComponent currentPageName={'Register'} />
            <AuthContainer>
                <AuthTitle text={'Регистрация'} />
                <Form>
                    <Input placeholder={'Име'} />
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Регистрация'} />
                </Form>
            </AuthContainer>
        </>
    );
};
>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97

                    </div>
                    <div className={"auth__btn--text"}>Регистрация</div>
                </button>
            </form>
        </div>
    </>
    )
}
export default Register;
