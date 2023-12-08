import { useMessageAlert } from "@/contexts/MessageAlertContext";
import { ResetPasswordOutput } from "aws-amplify/auth";
import { useRouter } from "next/router";

const usePasswordReset = () => {
  const { setAlertMessage } = useMessageAlert();
  const router = useRouter();

  const handleResetPasswordNextSteps = (output: ResetPasswordOutput) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        // const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        setAlertMessage({
          type: "success",
          message:
            "メールアドレスに認証コードを送信しました。認証コードと新しいパスワードを入力してください。",
        });
        router.replace("/auth/reset-password-confirm");
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case "DONE":
        setAlertMessage({
          type: "success",
          message: "パスワードを再設定しました。ログインしてください。",
        });
        router.replace("/auth/login");
        break;
    }
  };

  return {
    handleResetPasswordNextSteps,
  };
};

export default usePasswordReset;
