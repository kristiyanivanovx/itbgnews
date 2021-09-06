import React, { useState } from 'react';
<<<<<<< HEAD


const Login = () => {
    return (
       <>
        <div className={"auth"}>
            <h2 className={"auth__title"}>Вход</h2>
            <form className={"auth__input"}>
                <input className={"user__input"} placeholder={"Е-мейл"}/>
                <input className={"user__input"} placeholder={"Парола"}/>
                <button className={"auth__btn"}>
                        <div className={"auth__btn--background"}>
                        </div>
                        <div className={"auth__btn--shadow"}>

                        </div>
                        <div className={"auth__btn--text"}>Влез</div>
                </button>
                <div className={"auth__links"}>
                <span className={"auth__link"}>Нямаш профил?</span>
                <span className={"auth__link"}>Забравена парола?</span>
                </div>
            </form>
        </div>
       </>
=======
import Input from '../components/Input';
import Button from '../components/Button';
import AuthTitle from '../components/AuthTitle';
import AuthLinks from '../components/AuthLinks';
import AuthContainer from '../components/AuthContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';

const Login = () => {
    return (
        <>
            <AuthContainer>
                <HeadComponent currentPageName={'Login'} />
                <AuthTitle text={'Вход'} />
                <Form>
                    <Input placeholder={'Е-мейл'} />
                    <Input placeholder={'Парола'} />
                    <Button text={'Влез'} />
                    <AuthLinks
                        firstText={'Нямаш профил?'}
                        secondText={'Забравена парола?'}
                    />
                </Form>
            </AuthContainer>
        </>
>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97
    );
};

export default Login;
