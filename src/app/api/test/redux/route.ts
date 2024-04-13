import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // ストアのデータ取得フラグをセット
    cookies().set("IS_FETCHED_SEARCH_DATA", "true", { secure: true });

    return Response.json({
      isSuccess: true,
      message: "",
    });
  } catch (error) {
    return Response.json({
      isSuccess: false,
      message: "failed to set cookie is IS_FETCHED_SEARCH_DATA.",
    });
  }
}

// POSTの場合、アプリケーションからの離脱を意味する
export async function PUT(request: Request) {
  try {
    // ストアのデータ取得フラグをセット
    cookies().set("IS_FETCHED_SEARCH_DATA", "", { secure: true });
    return Response.json({
      isSuccess: true,
      message: "",
    });
  } catch (error) {
    return Response.json({
      isSuccess: false,
      message: "failed to set cookie is IS_FETCHED_SEARCH_DATA.",
    });
  }
}
