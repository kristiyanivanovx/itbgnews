import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Hacker News Clone • IT-BG</title>
                    <meta name="description" content="Hacker News Clone" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="#">Hacker News Clone</a>!
                    </h1>

                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <a href="">
                                <h2>Title 1</h2>
                            </a>
                            <button className={"button"}>&#9650;</button>
                            <p>Some details about this item</p>
                            <div>
                                <p>by <a href="">SomeUser</a> | <a href="">4 hours ago</a> | <a href="">100 comments</a></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Landing;
