import Head from "next/head";
import React, { Component } from "react";

export default class HeadComponent extends Component {
    render() {
        return (
            <Head>
                <title>IT-BG News • {this.props.currentPageName || ''}</title>
                <meta name="description" content="Hacker News Clone" />
                <link rel="icon" href={"/favicon.ico"} />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
        )
    }
}
