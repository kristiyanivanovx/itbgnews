import styles from "../styles/Layout.module.css";

import React from 'react';
import HeadComponent from "../components/HeadComponent";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import User from "../components/user";
import Link from "next/link";

export const getStaticProps = async () => {
    const result = await fetch(`http://localhost:5000/api/users`)
    const data = await result.json();

    return {
        props: { users: data },
    }
}

const Users = ({ users }) => {
    return (
        <div>
            <HeadComponent currentPageName={"Login"}/>
            <Navbar/>
            <h1 className={styles.title}>
                <Link href="/users">
                    <a>Users</a>
                </Link>
            </h1>
            <ul className={styles.alignCenter}>
                {users.map(user => (
                    <User key={user.id} data={user}/>
                ))}
            </ul>

            <Footer/>
        </div>
    )
}

export default Users;
