import Head from 'next/head';
import React from 'react';

const HeadComponent = ({ currentPageName }) => {
    return (
        <Head>
            <title>IT-BG News • {currentPageName || ''}</title>
            <meta
                name="description"
                content="Hacker News Clone, IT News, get information about the latest technology trends"
            />
            <link rel="icon" href={'/favicon.ico'} />
        </Head>
    );
};

export default HeadComponent;
