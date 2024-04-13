import type { AppProps } from "next/app";
import { MessageAlertProvider } from "@/contexts/MessageAlertContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSessionStorage from "@/hooks/utils/useSessionStorage";
import StoreProvider from "@/app/StoreProvider";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // クライアント側で Redux ストアを初期化する前に、JSON 文字列をパースして JavaScript オブジェクトに変換
  const preloadedState = JSON.parse(pageProps.initialReduxState || "{}");
  // レビュー投稿のプロファイル管理
  const { removeSessionStorageValue: removeSavedProfile } = useSessionStorage(
    "PROFILE_DATA",
    ""
  );
  const { removeSessionStorageValue: removeSavedReview } = useSessionStorage(
    "REVIEW_FORM_DATA",
    ""
  );

  const handleRouteChange = (url: string) => {
    if (!url.includes("/review/register")) {
      removeSavedProfile();
      removeSavedReview();
    }
  };

  // Reduxデータ保持フラグ管理 cookieを初期化
  const handleBeforeUnload = async () => {
    await axios.put("/api/test/redux", {
      body: {
        IS_FETCHED_SEARCH_DATA: "",
      },
    });
  };

  useEffect(() => {
    // ユーザーがアプリケーションを離脱する際にクッキーを削除
    window.addEventListener("beforeunload", handleBeforeUnload);
    // ルート変更を検知し、口コミ投稿データを保持するセッションストレージの初期化する
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      // コンポーネントがアンマウントされる時にイベントリスナーを削除
      router.events.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return (
    <StoreProvider initialReduxState={preloadedState}>
      <LoadingProvider>
        <MessageAlertProvider>
          <Component {...pageProps} />
        </MessageAlertProvider>
      </LoadingProvider>
    </StoreProvider>
  );
}
