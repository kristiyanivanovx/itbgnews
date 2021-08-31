import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { Component } from 'react';
import HeadComponent from "./headComponent";
import Post from "./components/post";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

class Landing extends Component {
    render() {
        return (
            <div>
                <HeadComponent currentPageName={"Index"}/>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="#">IT-BG News</a>!
                    </h1>

                    <Post/>
                </main>
            </div>
        )
    }
}

export default Landing;
