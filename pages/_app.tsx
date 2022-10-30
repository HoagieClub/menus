import React from 'react';
import Head from 'next/head';
import Layout from '../lib/hoagie-ui/Layout';
import Nav from '../lib/hoagie-ui/Nav';
import Footer from '../components/Footer';
import Theme from '../lib/hoagie-ui/Theme';
import '../lib/hoagie-ui/theme.css'

function Content({ Component, pageProps }) {
    const tabs = [
    // {title: "See Menus", href: "/app"}
    ];

    return (
        <Theme palette="blue">
            <Layout>
                <Nav name="menus" tabs={tabs} />
                <Component {...pageProps} />
                <Footer />
            </Layout>
        </Theme>
    );
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Menus by Hoagie</title>
            </Head>
            <Content Component={Component} pageProps={pageProps} />
        </>
    );
}
