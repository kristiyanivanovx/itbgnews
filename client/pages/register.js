import styles from "../styles/Layout.module.css";
import React, {useState} from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeadComponent from "../components/HeadComponent";
import BASE_URL from "../utilities/common";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submitForm = async () => {
        await fetch(BASE_URL + '/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, passwordConfirm }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <div>
            <HeadComponent currentPageName={"Register"}/>
            <Navbar/>
            <div className="register-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h1 className={styles.title}>
                                <Link href={"/register"}>
                                    <a>Register</a>
                                </Link>
                            </h1>
                            <p>Please enter your credentials to register.</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <button onClick={submitForm}>
                        Register
                    </button>
                    <p className="message">You have already registered?
                        <Link href={"/login"}>
                            <a>{' '}Login</a>
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register;
