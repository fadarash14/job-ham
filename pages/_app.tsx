import "@/styles/globals.css";
import { ThemeSystem } from "@/utils/system";
import type { AppProps } from "next/app";
import Head from "next/head";
import store from "../store";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Router } from "next/router";
import dynamic from "next/dynamic";
import Splash from "@/components/Splash/Splash";
const AuthContextProvider = dynamic(
  () => import("@/components/log in/AuthContextProvider")
);
import "react-modern-datepicker-javaheri/lib/DatePicker.css";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./Layout";

NProgress.configure({
  template:
    '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"></div>',
  showSpinner: false,
});
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Provider store={store}>
            <ThemeSystem>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1"
                />
              </Head>
              <Splash />
              <Layout>
                <AuthContextProvider>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </AuthContextProvider>
              </Layout>
            </ThemeSystem>
          </Provider>
        </HydrationBoundary>
      </QueryClientProvider>
    </Fragment>
  );
}
