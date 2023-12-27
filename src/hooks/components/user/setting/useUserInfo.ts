// hooks/useUserInfo.js
import { useState, useEffect, useCallback } from "react";
import { useAccountContext } from "@/contexts/AccountContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useMessageAlert } from "@/contexts/MessageAlertContext";
import useUser from "@/hooks/api/useUser";
import { UpdateUserInput, User } from "@/API";
import useAPIRequest from "@/hooks/utils/useAPIRequest";

// マイページユーザー情報を処理するカスタムフック
export function useUserInfo() {
  const [user, setUser] = useState({} as User);
  const { apiGetUserByCognitoSub } = useUser();
  const { accountInfomation } = useAccountContext();
  const { setLoading } = useLoading();
  const { setAlertMessage } = useMessageAlert();
  const { apiUpdateUser } = useUser();
  const { getUpdateRequest } = useAPIRequest();

  // ユーザー情報の取得
  const getUserInfo = useCallback(async () => {
    if (!accountInfomation.userId) return;

    setLoading(true);
    try {
      const result = await apiGetUserByCognitoSub(accountInfomation.userId);
      if (result.isSuccess && result.data) {
        setUser(result.data);
      } else {
        setAlertMessage({
          type: "error",
          message: "データの取得に失敗しました。",
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message:
          "エラーが発生しました。しばらく時間を置いてから再度お試しください。",
      });
    } finally {
      setLoading(false);
    }
  }, [accountInfomation.userId]);

  // ユーザー情報の保存
  const saveUserProfile = async () => {
    setLoading(true);
    try {
      const request: UpdateUserInput = getUpdateRequest({
        ...user,
        isRegisterUserInfo: true,
      });
      const result = await apiUpdateUser(request);
      if (!result.isSuccess || !result.data) {
        throw new Error("");
      }
      setAlertMessage({
        type: "success",
        message: "データを保存しました。",
      });
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: "error",
        message: "データの保存に失敗しました。",
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  // マウント時のデータ取得
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return { user, setUser, getUserInfo, saveUserProfile };
}
