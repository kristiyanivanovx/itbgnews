import styles from "../styles/Layout.module.css";
import React, {useState} from 'react';
import HeadComponent from "../components/HeadComponent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";

const Post = () => {
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [longURL, setLongURL] = useState('');

    const submitForm = async () => {
        await fetch( 'http://localhost:5000/api/posts/create', {
            method: 'POST',
            body: JSON.stringify({ username, text, shortURL, longURL }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <div>
            <HeadComponent currentPageName={"Create a post"}/>
            <Navbar/>

            <div className="login">
                <div className="login-header">
                    <h1 className={styles.title}>
                        <Link href={"/post"}>
                            <a>Create a post</a>
                        </Link>
                    </h1>

                    {/* todo: add padding instead of <br/>*/}
                    <br/>
                </div>
            </div>

            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                name="text"
                placeholder="Text"
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="text"
                name="shortURL"
                placeholder="Short URL"
                onChange={(e) => setShortURL(e.target.value)}
            />
            <input
                type="text"
                name="longURL"
                placeholder="Long URL"
                onChange={(e) => setLongURL(e.target.value)}
            />

            <button onClick={submitForm}>
                Submit
            </button>

            <Footer/>
        </div>
    )
}

export default Post;
