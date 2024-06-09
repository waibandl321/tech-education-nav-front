import type { AppProps } from "next/app";
import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import StoreProvider from "@/app/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <LoadingProvider>
        <MessageAlertProvider>
          <Component {...pageProps} />
        </MessageAlertProvider>
      </LoadingProvider>
    </StoreProvider>
  );
}
