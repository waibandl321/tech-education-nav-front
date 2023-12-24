// グローバルにアクセス可能なユーザー情報を管理するコンテキスト
import useAuth from "@/hooks/api/useAuth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./LoadingContext";

export interface AccountInfomation {
  email?: string;
  phoneNumber?: string;
  userId?: string;
}

// 保持するユーザー情報の型定義
interface UserContextType {
  accountInfomation: AccountInfomation;
  setAccountInfomation: (accountInfo: AccountInfomation) => void;
  isLoggedIn: boolean; // ログイン状態のgetter
}

// プロバイダーのプロパティの型定義（子コンポーネントを受け取る）
interface UserProviderProps {
  children: ReactNode;
}

// ユーザープロバイダーコンポーネント
const UserContext = createContext<UserContextType | undefined>(undefined);

// ユーザープロバイダーコンポーネント
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // hooks
  const { setLoading } = useLoading();
  const { currentAuthenticatedUser } = useAuth();
  const [accountInfomation, setAccountInfomation] = useState<AccountInfomation>(
    {}
  );

  // ユーザーのログイン状態: userIdがあればログインしていると判定
  const isLoggedIn = !!accountInfomation?.userId;

  // ユーザーのログイン状態をチェックし、未認証の場合はログイン画面に遷移させる
  const checkUserSignIn = async () => {
    setLoading(true);
    try {
      const { userId, signInDetails } = await currentAuthenticatedUser();
      if (!userId) {
        setAccountInfomation({ userId: "", email: "" });
      }
      setAccountInfomation({
        userId,
        email: signInDetails?.loginId,
      });
    } catch (error) {
      setAccountInfomation({ userId: "", email: "" });
      console.error(error);
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  useEffect(() => {
    checkUserSignIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        accountInfomation,
        setAccountInfomation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// カスタムフック：コンテキストを使用してユーザーの状態にアクセス
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
