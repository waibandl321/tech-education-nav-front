import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { useAccountContext } from "@/contexts/AccountContext";
import useAPIResponse from "@/hooks/api/useAPIResponse";
import useAuth from "@/hooks/api/useAuth";
import {
  AuthRegisterConfirmFormType,
  AuthRegisterFormType,
} from "@/types/FormType";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { autoSignIn } from "aws-amplify/auth";
import useLogin from "./useLogin";

/**
 * 会員登録画面のビジネスロジックを定義するカスタムフック
 */
const useRegister = () => {
  const { setAlertMessage } = useMessageAlert();
  const router = useRouter();
  const { setLoading } = useLoading();
  const { accountInfomation, setAccountInfomation } = useAccountContext();
  const { apiSignUp, apiConfirmSignUp } = useAuth();
  const { getErrorMessage } = useAPIResponse();
  const { handleAfterSignIn } = useLogin();

  /**
   * サインアップ
   * @param data
   * @returns
   */
  const signUpSubmit: SubmitHandler<AuthRegisterFormType> = async (data) => {
    setLoading(true);
    try {
      const { nextStep } = await apiSignUp(data);
      // 認証コードの未確認
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setAccountInfomation({
          email: data.email,
        });
        router.replace("/auth/register-confirm");
      }
      return;
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 認証コード確認: 自動サインインする
   * @param data
   * @returns
   */
  const confirmSignUpSubmit: SubmitHandler<
    AuthRegisterConfirmFormType
  > = async (data) => {
    if (!accountInfomation.email) {
      setAlertMessage({
        type: "error",
        message: `不明なエラー: Emailが存在しません。\n
          ログインすると認証コードが再度送信されます。
          `,
      });
      return;
    }
    setLoading(true);
    try {
      const result = await apiConfirmSignUp({
        username: accountInfomation.email,
        confirmationCode: data.authCode,
      });
      if (result.isSignUpComplete) {
        // 自動ログイン
        const autoSignInResult = await autoSignIn();
        if (
          autoSignInResult.isSignedIn &&
          autoSignInResult.nextStep.signInStep === "DONE"
        ) {
          await handleAfterSignIn();
          return;
        }
        setAlertMessage({
          type: "success",
          message:
            "認証に成功しました。ログインしてアプリの利用を開始してください。",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "認証に失敗しました。入力された認証コードは正しいですか？",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    signUpSubmit,
    confirmSignUpSubmit,
  };
};

export default useRegister;
