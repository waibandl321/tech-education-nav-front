import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useAccountContext } from "@/contexts/AccountContext";
import useAuth from "@/hooks/api/useAuth";
import useUser from "@/hooks/api/useUser";
import { AuthLoginFormType } from "@/types/FormType";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { getCurrentUser } from "aws-amplify/auth";

/**
 * サインイン画面のビジネスロジックを定義するカスタムフック
 */
const useLogin = () => {
  const { setAlertMessage } = useMessageAlert();
  const router = useRouter();
  const { setLoading } = useLoading();
  const { apiGetUserByCognitoSub, apiCreateUser } = useUser();
  const { setAccountInfomation, setLoginUser } = useAccountContext();
  const { apiSignin, resendSignUpAuthCode } = useAuth();

  // サインイン完了後の処理
  const handleAfterSignIn = async () => {
    const { userId, signInDetails } = await getCurrentUser();
    if (!userId) return;

    let alertMessage = "認証に成功しました。アプリの利用を開始してください。";
    let redirectPath = "/";

    const getUserResult = await apiGetUserByCognitoSub(userId);
    if (getUserResult.data && getUserResult.data.isRegisterUserInfo) {
      // ユーザー情報が存在し、プロフィールも登録済み
      setLoginUser(getUserResult.data);
    } else if (getUserResult.data && !getUserResult.data.isRegisterUserInfo) {
      // ユーザー情報が存在するが、プロフィールは未登録
      redirectPath = "/user/setting/edit/profile";
      alertMessage += "ユーザー情報を登録してください。";
    } else if (!getUserResult.data) {
      // ユーザー情報が存在しない
      await apiCreateUser(userId);
      redirectPath = "/user/setting/edit/profile";
      alertMessage += "ユーザー情報を登録してください。";
    }

    setAccountInfomation({
      userId,
      email: signInDetails?.loginId,
    });

    await router.replace(redirectPath);
    setAlertMessage({
      type: "success",
      message: alertMessage,
    });
  };

  /**
   * 認証コード未確認時の処理
   * @param email メールアドレス
   */
  const handleUnconfirmedSignUp = async (email: string) => {
    await resendSignUpAuthCode(email);
    setAccountInfomation({
      email: email,
    });
    router.replace("/auth/register-confirm");
    setAlertMessage({
      type: "error",
      message:
        "お客様は、認証コードの確認が未完了です。メールアドレスに送信された認証コードを入力してください。",
    });
  };

  /**
   * サインイン 送信処理
   * @param data AuthLoginFormType
   */
  const login: SubmitHandler<AuthLoginFormType> = async (data) => {
    setLoading(true);
    try {
      const { isSignedIn, nextStep } = await apiSignin(data);

      // 認証コードの未確認
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await handleUnconfirmedSignUp(data.email);
        return;
      }

      // サインイン完了
      if (isSignedIn) {
        await handleAfterSignIn();
      }
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "認証に失敗しました。",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    handleAfterSignIn,
    handleUnconfirmedSignUp,
  };
};

export default useLogin;
