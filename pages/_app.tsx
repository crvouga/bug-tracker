import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import React from "react";
import { SessionProvider } from "../users/authentication/session";
import { ThemeProvider } from "../components/theme";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    //why?: https://itnext.io/next-js-with-material-ui-7a7f6485f671
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Bug Tracker</title>
        <meta name="description" content="bug tacker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <AnimateSharedLayout>
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </ThemeProvider>
      </SessionProvider>
    </React.Fragment>
  );
};

export default App;
