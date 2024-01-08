import type { AppProps } from "next/app";
import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
// import { AccountProvider } from "@/contexts/AccountContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSessionStorage from "@/hooks/utils/useSessionStorage";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { removeSessionStorageValue: removeSavedProfile } = useSessionStorage(
    "PROFILE_DATA",
    ""
  );
  const { removeSessionStorageValue: removeSavedReview } = useSessionStorage(
    "REVIEW_FORM_DATA",
    ""
  );

  useEffect(() => {
    // ルート変更を検知し、口コミ投稿データを保持するセッションストレージの初期化する
    const handleRouteChange = (url: string) => {
      if (!url.includes("/review/register")) {
        removeSavedProfile();
        removeSavedReview();
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <LoadingProvider>
      <MessageAlertProvider>
        <Component {...pageProps} />
      </MessageAlertProvider>
    </LoadingProvider>
  );
}
