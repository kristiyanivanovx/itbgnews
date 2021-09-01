import Link from "next/link";
import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <div className="topnav" >
                {/*<Image src="/it-bg-logo.png" alt="it bg logo" width={50} height={50} />*/}

                <Link href="/">
                    <a>Home</a>
                </Link>

                <Link href="/users">
                    <a>Users</a>
                </Link>

                <Link href="/login">
                    <a>Login</a>
                </Link>

                <Link href="/register">
                    <a>Register</a>
                </Link>

                <a href="javascript:void(0);" className="icon" onClick="myFunction()">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        )
    }
}

export default Navbar;
