import { runWithAmplifyServerContext } from "@/utils/server-utils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 認証チェック
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        // The fetch will grab the session cookies
        const session = await fetchAuthSession(contextSpec, {});
        console.log(session);
        return session.tokens !== undefined;
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
