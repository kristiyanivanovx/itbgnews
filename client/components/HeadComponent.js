import Head from 'next/head';
import React from 'react';

const HeadComponent = ({ currentPageName }) => {
    return (
        <Head>
            <title>IT-BG News • {currentPageName || ''}</title>
            <meta
                name="description"
                content="IT Bulgaria News Website, get information about the latest technology trends and innovations"
            />
            <link rel="icon" href={'/favicon.ico'} />
        </Head>
    );
};

export default HeadComponent;
