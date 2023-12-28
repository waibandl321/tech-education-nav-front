import type { AppProps } from "next/app";
import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
import { AccountProvider } from "@/contexts/AccountContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <AccountProvider>
        <MessageAlertProvider>
          <Component {...pageProps} />
        </MessageAlertProvider>
      </AccountProvider>
    </LoadingProvider>
  );
}
