import React from "react";
import App from "next/app";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>SPK - ID Express Logistik</title>
        </Head>

        <Layout>
          <NextNProgress color="rgb(240 68 68)" />
          <Component {...pageProps} />
          <Toaster toastOptions={{ duration: 3500 }} />
        </Layout>
      </React.Fragment>
    );
  }
}
