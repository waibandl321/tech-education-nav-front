/**
 * グローバルにアクセス可能なユーザー情報を管理するコンテキスト
 */
import useAuth from "@/hooks/api/useAuth";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./LoadingContext";

// 保持するユーザー情報の型定義
interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
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
  const router = useRouter();
  const { setLoading } = useLoading();
  const { currentAuthenticatedUser } = useAuth();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  // ユーザーのログイン状態: userIdがあればログインしていると判定
  const isLoggedIn = !!userId;

  // ログインユーザーの操作画面の場合はリダイレクトする
  const moveToLoginPage = () => {
    if (router.pathname.startsWith("/user/")) {
      router.replace("/auth/login");
      return;
    }
  };

  // ユーザーのログイン状態をチェックし、未認証の場合はログイン画面に遷移させる
  const checkUserSignIn = async () => {
    setLoading(true);

    try {
      const { userId } = await currentAuthenticatedUser();
      if (!userId) {
        setUserId("");
        moveToLoginPage();
        setUserId(userId);
      }
    } catch (error) {
      setUserId("");
      moveToLoginPage();
      console.error(error);
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserId = localStorage.getItem("userId");
    if (storedEmail) setEmail(storedEmail);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (email) localStorage.setItem("userEmail", email);
    if (userId) localStorage.setItem("userId", userId);
  }, [email, userId]);

  useEffect(() => {
    checkUserSignIn();
  }, []);

  return (
    <UserContext.Provider
      value={{ email, setEmail, userId, setUserId, isLoggedIn }}
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
