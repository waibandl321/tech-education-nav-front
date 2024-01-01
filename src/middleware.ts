import { runWithAmplifyServerContext } from "@/utils/server-utils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = cookies();
  const userSubCookie = cookieStore.get("userSub");

  // userSubがクッキーに存在する場合は、認証済みとして処理を続行
  if (userSubCookie) {
    return response;
  }

  // 認証チェック
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        // 認証情報を取得する
        const session = await fetchAuthSession(contextSpec, {});
        if (session.tokens) {
          // 認証済みの場合、userSubの値をcookieに保持する
          response.cookies.set({
            name: "userSub",
            value: session.userSub ?? "",
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 例: 24時間後に期限切れ
          });
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  // ユーザーが認証された場合、ルート要求は続行される
  if (authenticated) {
    return response;
  }

  // 未認証の場合はログイン画面にリダイレクト
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

// パスマッチング: '/user/:path*' は /user 以下のすべてのパスにマッチする
export const config = {
  matcher: "/user/:path*",
};
