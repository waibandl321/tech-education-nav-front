import useAuth from "@/hooks/api/useAuth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./LoadingContext";
import { User } from "@/API";
import useUser from "@/hooks/api/useUser";

export interface AccountInfomation {
  email?: string;
  userId?: string;
}

const initAccountInfomation = {
  userId: "",
  email: "",
};

// 保持するユーザー情報の型定義
interface AccountContextType {
  isLoggedIn: boolean;
  accountInfomation: AccountInfomation;
  setAccountInfomation: (accountInfo: AccountInfomation) => void;
  loginUser: User | null | undefined;
  setLoginUser: (user: User) => void;
}

// プロバイダーのプロパティの型定義（子コンポーネントを受け取る）
interface AccountProviderProps {
  children: ReactNode;
}

// AccountContextを作成
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// ユーザープロバイダーコンポーネント
export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  // hooks
  const { setLoading } = useLoading();
  const { currentAuthenticatedUser } = useAuth();
  const { apiGetUserByCognitoSub } = useUser();
  const [accountInfomation, setAccountInfomation] = useState<AccountInfomation>(
    {}
  );
  const [loginUser, setLoginUser] = useState<User | null>(null);

  // アカウントのログイン状態: userIdがあればログインしていると判定
  const isLoggedIn = !!accountInfomation?.userId;

  // アカウントのログイン状態をチェックし、未認証の場合はログイン画面に遷移させる
  const checkSignIn = async () => {
    setLoading(true);
    try {
      const { userId, signInDetails } = await currentAuthenticatedUser();
      if (!userId) {
        setAccountInfomation(initAccountInfomation);
        return;
      }
      setAccountInfomation({
        userId,
        email: signInDetails?.loginId,
      });
      // ログインユーザー情報を取得する
      const getLoginUserResult = await apiGetUserByCognitoSub(userId);
      if (getLoginUserResult.data) {
        setLoginUser(getLoginUserResult.data);
      }
    } catch (error) {
      setAccountInfomation(initAccountInfomation);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSignIn();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        isLoggedIn,
        accountInfomation,
        setAccountInfomation,
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// カスタムフック：コンテキストを使用してアカウントの状態にアクセス
export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within a AccountProvider");
  }
  return context;
};
