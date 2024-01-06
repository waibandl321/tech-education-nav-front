import type { AppProps } from "next/app";
import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
import { AccountProvider } from "@/contexts/AccountContext";
import { LoadingProvider } from "@/contexts/LoadingContext";

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
