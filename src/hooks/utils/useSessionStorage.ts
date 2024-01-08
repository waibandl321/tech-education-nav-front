import { useState } from "react";

type SessionStorageKeyType = "PROFILE_DATA" | "REVIEW_FORM_DATA";

export default function useSessionStorage<T>(
  key: SessionStorageKeyType,
  initialValue: T
) {
  // sessionStorageから値を取得する関数
  const fetchSessionStorageValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // sessionStorageの値をstateとして保持
  const [sessionStorageValue, setSessionStorageValueValue] = useState<T>(
    fetchSessionStorageValue
  );

  // sessionStorageに値を設定する関数
  const setSessionStorageValue = (value: T | ((val: T) => T)) => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting sessionStorage key “${key}” even though environment is not a client`
      );
      return;
    }

    try {
      const newValue =
        value instanceof Function ? value(sessionStorageValue) : value;
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
      setSessionStorageValueValue(newValue);
      window.dispatchEvent(new Event("sessionstorage"));
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error);
    }
  };

  // sessionStorageから値を削除する関数
  const removeSessionStorageValue = () => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried removing sessionStorage key “${key}” even though environment is not a client`
      );
      return;
    }

    try {
      window.sessionStorage.removeItem(key);
      setSessionStorageValueValue(initialValue);
      window.dispatchEvent(new Event("sessionstorage"));
    } catch (error) {
      console.warn(`Error removing sessionStorage key “${key}”:`, error);
    }
  };

  return {
    sessionStorageValue,
    setSessionStorageValue,
    removeSessionStorageValue,
  };
}
