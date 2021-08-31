import styles from "../styles/Home.module.css";
import React from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import Footer from "./components/footer";
import HeadComponent from "./headComponent";

function Register() {
    return (
        <div>
            <HeadComponent currentPageName={"Register"}/>
            <Navbar/>
            <div className="register-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h1 className={styles.title}>
                                <Link href="/register">
                                    <a>Register</a>
                                </Link>
                            </h1>
                            <p>Please enter your credentials to register.</p>
                        </div>
                    </div>
                    <form method="post" action="/api/register" className="login-form">
                        <input type="text" name="username" placeholder="Username"/>
                        <input type="password" name="password" placeholder="Password"/>
                        <input type="password" name="confirm-password" placeholder="Confirm Password"/>
                        <button>Register</button>
                        <p className="message">You have already registered?
                            <Link href="/login">
                                <a>{' '}Login</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register;
