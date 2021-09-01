import styles from "../styles/Home.module.css";
import React, {Component, useEffect, useState} from 'react';
import HeadComponent from "./headComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Post from "./components/post";

const Landing = ({ posts }) => {
    return (
        <div>
            <HeadComponent currentPageName={"Index"}/>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="#">IT-BG News</a>!
                </h1>
                {posts.map(post => (
                    <Post key={post.id} data={post} />
                ))}
            </main>
        </div>
    )
}

export default Landing;
