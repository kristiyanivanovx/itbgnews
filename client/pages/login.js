import styles from "../styles/Home.module.css";
import React from "react";
import Navbar from "./navbar";
import Link from "next/link";
import Footer from "./footer";

function Login() {
    return (
        <div>
            <Navbar/>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </h1>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <form action="/" method="POST">
                            <label htmlFor="username">Username</label>
                            <br/>

                            <input id="username" type="text" autoComplete="username" required/>
                            <br/>

                            <label htmlFor="password">Password</label>
                            <br/>
                            <input id="password" type="text" autoComplete="name" required/>
                            <br/>

                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Login;
