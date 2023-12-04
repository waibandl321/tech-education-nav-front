// utils/auth.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

// ユーザーの認証状態をチェックして、認証されていないユーザーはログイン画面にリダイレクトする
export async function checkAuthServerSide(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  try {
    // ユーザーセッションを取得
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    // const { userId } = await getCurrentUser();
    if (!accessToken && !idToken) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    return { props: {} };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
