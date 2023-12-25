import { LiteralUnion, RegisterOptions } from "react-hook-form";

/**
 * フォームのバリデーションhook
 */
export default function useValidation() {
  /**
   * Email形式 正規表現
   */
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Emailのバリデーションエラーメッセージを取得する
   * @param errorType エラーのタイプ
   * @returns エラーメッセージ
   */
  const useGetEmailInputError = (
    errorType: LiteralUnion<keyof RegisterOptions, string> | undefined
  ) => {
    switch (errorType) {
      case "required":
        return "メールアドレスの入力は必須です";
      case "pattern":
        return "メールアドレスの形式で入力してください";
      default:
        break;
    }
  };

  /**
   * Passwordのバリデーションエラーメッセージを取得する
   * @param errorType エラーのタイプ
   * @returns エラーメッセージ
   */
  const useGetPasswordInputError = (
    errorType: LiteralUnion<keyof RegisterOptions, string> | undefined
  ) => {
    switch (errorType) {
      case "required":
        return "パスワードの入力は必須です。";
      case "minLength":
        return "パスワードは8文字以上で入力してください。";
      case "pattern":
        return "パスワードの形式で入力してください。";
      default:
        break;
    }
  };

  return {
    EmailRegex,
    useGetEmailInputError,
    useGetPasswordInputError,
  };
}
