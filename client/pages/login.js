import styles from '../styles/Layout.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeadComponent from '../components/HeadComponent';
import Input from '../components/Input';

const Login = () => {
    return (
        <div>
            <HeadComponent currentPageName={'Login'} />
            <Navbar />
            <div className="register-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h1 className={styles.title}>
                                <Link href={'/login'}>
                                    <a>Login</a>
                                </Link>
                            </h1>
                            <p>Please enter your credentials to login.</p>
                        </div>
                    </div>

                    <Input
                        className={'input'}
                        type={'text'}
                        name={'username'}
                        placeholder={'Username'}
                    />

                    <Input
                        className={'input'}
                        type={'password'}
                        name={'password'}
                        placeholder={'Password'}
                    />

                    <button onClick={submitForm}>Login</button>
                    <p className="message">
                        Not registered?
                        <Link href={'/register'}>
                            <a> Create an account</a>
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
