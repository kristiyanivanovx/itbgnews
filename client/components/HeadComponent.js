import Head from 'next/head';
import React, { Component } from 'react';

export default class HeadComponent extends Component {
    render() {
        return (
            <Head>
                <title>IT-BG News • {this.props.currentPageName || ''}</title>
                <meta
                    name="description"
                    content="Hacker News Clone, IT News, get information about the latest technology trends"
                />
                <link rel="icon" href={'/favicon.ico'} />
            </Head>
        );
    }
}
