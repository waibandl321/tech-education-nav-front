// hooks/useUserInfo.js
import { AccountInfomation } from "@/contexts/AccountContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import useAuth from "@/hooks/api/useAuth";
import { useState } from "react";
import useAPIResponse from "@/hooks/api/useAPIResponse";

// アカウント情報を処理するためのカスタムフック
export function useAccountInfo() {
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  const { apiUpdateUserAttr } = useAuth();
  const { getErrorMessage } = useAPIResponse();
  const [account, setAccount] = useState({} as AccountInfomation);

  // メールアドレス更新
  const updateEmail = async () => {
    setLoading(true);
    try {
      if (!account.email) throw new Error("Not fount email.");
      const results = await apiUpdateUserAttr(account.email);
      const failed = !results["email"].isUpdated || !results["name"].isUpdated;
      if (failed) throw new Error("Failed to update account information.");
      setAlertMessage({
        type: "success",
        message: "アカウント情報を更新しました。",
      });
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return { account, setAccount, updateEmail };
}
