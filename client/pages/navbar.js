import Link from "next/link";
import React, {Component} from "react";

class Navbar extends Component {
    render() {
        return (
            <div className="topnav" id="myTopnav">
                <Link href="/">
                    <a>Home</a>
                </Link>

                {/*<a href="news">News</a>*/}
                {/*<a href="contact">Contact</a>*/}
                {/*<a href="about">About</a>*/}

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
