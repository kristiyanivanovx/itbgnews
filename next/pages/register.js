import styles from "../styles/Home.module.css";
import React from "react";
import Navbar from "./navbar";
import Link from "next/link";
import Footer from "./footer";

function Register() {
    return (
        <div>
            <Navbar/>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </h1>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <form action="/" method="POST">
                            <label htmlFor="username">Username</label>
                            <br/>

                            <input id="name" type="text" autoComplete="username" required/>
                            <br/>

                            <label htmlFor="password">Password</label>
                            <br/>
                            <input id="password" type="text" autoComplete="name" required/>
                            <br/>

                            <label htmlFor="confirm-password">Confirm Password</label>
                            <br/>
                            <input id="confirm-password" type="text" autoComplete="confirm-name" required/>
                            <br/>

                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Register;
