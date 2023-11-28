import { getCurrentUser } from "aws-amplify/auth";

export default function useAuth() {
  /**
   * ユーザーがサインインしているかどうかを確認する
   */
  const currentAuthenticatedUser = async (): Promise<{
    isSuccess: boolean;
  }> => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      return {
        isSuccess: true,
      };
    } catch (err) {
      console.log(err);
      // 認証されていない場合はエラーがスローされる
      return {
        isSuccess: false,
      };
    }
  };

  return {
    currentAuthenticatedUser,
  };
}
