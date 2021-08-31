import styles from "../styles/Home.module.css";
import React from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import Footer from "./components/footer";

import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import HeadComponent from "./headComponent";

function Login() {
    return (
        <div>
            <HeadComponent currentPageName={"Login"}/>
            <Navbar/>
            <div className="register-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h1 className={styles.title}>
                                <Link href="/login">
                                    <a>Login</a>
                                </Link>
                            </h1>
                            <p>Please enter your credentials to login.</p>
                        </div>
                    </div>
                    <form method="post" action="/api/login" className="login-form">
                        <input type="text" name="username" placeholder="Username"/>
                        <input type="password" name="Password" placeholder="Password"/>
                        <button>login</button>
                        <p className="message">Not registered?
                            <Link href="/register">
                                <a>{' '}Create an account</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;
