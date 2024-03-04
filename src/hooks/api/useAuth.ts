import { AuthLoginFormType, AuthRegisterFormType } from "@/types/FormType";
import {
  ConfirmSignUpInput,
  confirmSignUp,
  signIn,
  signUp,
  resendSignUpCode,
  resetPassword,
  ConfirmResetPasswordInput,
  confirmResetPassword,
  fetchAuthSession,
} from "aws-amplify/auth";

export default function useAuth() {
  /**
   * 会員登録
   * @param formData 入力データ
   */
  const apiSignUp = async (formData: AuthRegisterFormType) =>
    signUp({
      username: formData.email,
      password: formData.password,
      options: {
        userAttributes: {
          email: formData.email,
        },
        autoSignIn: true,
      },
    });

  /**
   * サインアップ: 認証コード再送信
   */
  const resendSignUpAuthCode = async (username: string) =>
    resendSignUpCode({
      username,
    });

  /**
   * 認証コード確認
   * @param username ユーザー名（メールアドレス）
   * @param confirmationCode 認証コード
   */
  const apiConfirmSignUp = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) =>
    confirmSignUp({
      username,
      confirmationCode,
    });

  /**
   * ログイン
   * @param formData ログイン画面の入力データ
   */
  const apiSignin = async (formData: AuthLoginFormType) =>
    signIn({
      username: formData.email,
      password: formData.password,
    });

  /**
   * パスワード再設定: 認証コード送信
   * @param username ユーザー名（メールアドレス）
   */
  const apiResetPassword = async (username: string) =>
    resetPassword({ username });

  /**
   * パスワード再設定: パスワード再設定実行
   * @param username ユーザー名（メールアドレス）
   * @param confirmationCode 認証コード
   * @param newPassword 新しいパスワード
   */
  const apiConfirmResetPassword = async ({
    username,
    confirmationCode,
    newPassword,
  }: ConfirmResetPasswordInput) =>
    confirmResetPassword({ username, confirmationCode, newPassword });

  /**
   * セッションのリフレッシュ
   * fetchAuthSession API は、認証トークンの有効期限が切れて有効な
   * refreshTokenが存在する場合に、自動的にユーザのセッションをリフレッシュする。
   * forceRefresh フラグを有効にして fetchAuthSession API をコールすることで、
   * 明示的にセッションを更新することもできます。
   */
  async function currentSession() {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      console.log(tokens);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    apiConfirmSignUp,
    resendSignUpAuthCode,
    apiSignUp,
    apiSignin,
    apiResetPassword,
    apiConfirmResetPassword,
    currentSession,
  };
}
