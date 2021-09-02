import styles from "../styles/Layout.module.css";
import React, {useState} from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeadComponent from "../components/HeadComponent";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = async () => {
        await fetch( 'http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <div>
            <HeadComponent currentPageName={"Login"}/>
            <Navbar/>
            <div className="register-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h1 className={styles.title}>
                                <Link href={"/login"}>
                                    <a>Login</a>
                                </Link>
                            </h1>
                            <p>Please enter your credentials to login.</p>
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
                    <button onClick={submitForm}>
                        Login
                    </button>
                    <p className="message">Not registered?
                        <Link href={"/register"}>
                            <a>{' '}Create an account</a>
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;
