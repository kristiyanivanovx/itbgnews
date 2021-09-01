import styles from "../styles/Layout.module.css";
import React from 'react';
import Post from "./Post";

const Landing = ({ posts }) => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Welcome to <a href="#">IT-BG News</a>!
            </h1>
            {posts.map(post => (
                <Post key={post.id} data={post} />
            ))}
        </main>
    )
}

export default Landing;
