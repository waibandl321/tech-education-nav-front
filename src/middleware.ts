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
        // 認証情報を取得
        const session = await fetchAuthSession(contextSpec, {});
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
  return NextResponse.redirect(
    new URL("/auth/login?redirect_type=review_post", request.url)
  );
}

// パスマッチング: '/review/:path*' は /review 以下のすべてのパスにマッチする
export const config = {
  matcher: "/review/register/:path*",
};
