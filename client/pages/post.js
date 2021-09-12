import React, { useState } from 'react';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';
import Link from 'next/link';
import Input from '../components/Input';

const Post = () => {
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [longURL, setLongURL] = useState('');

    const submitForm = async () => {
        await fetch('http://localhost:5000/api/posts/create', {
            method: 'POST',
            body: JSON.stringify({ username, text, shortURL, longURL }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <div>
            <HeadComponent currentPageName={'Create a post'} />

            <div className="login">
                <div className="login-header">
                    <h1>
                        <Link href={'/post'}>
                            <a>Create a post</a>
                        </Link>
                    </h1>

                    {/* todo: add padding instead of <br/>*/}
                    <br />
                </div>
            </div>

            <Input
                type="text"
                name="title"
                placeholder="Заглавие"
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                type="text"
                name="link"
                placeholder="Линк"
                onChange={(e) => setLongURL(e.target.value)}
            />
            <button onClick={submitForm}>Submit</button>

            <Footer />
        </div>
    );
};

export default Post;
