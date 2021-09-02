import Link from "next/link";
import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div className={"topnav"} >
                {/*<Image src="/it-bg-logo.png" alt="it bg logo" width={50} height={50} />*/}

                <Link href={"/"}>
                    <a>Home</a>
                </Link>

                <Link href={"/post"}>
                    <a>Post</a>
                </Link>

                <Link href={"/login"}>
                    <a>Login</a>
                </Link>

                <Link href={"/register"}>
                    <a>Register</a>
                </Link>
            </div>
        )
    }
}

export default Navbar;
