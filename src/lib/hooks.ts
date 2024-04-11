import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, ReduxRootState } from "./store";

/**
 * `useDispatch` と `useSelector` の代わりに、型付けをしてアプリ全体で使用するhook
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<ReduxRootState>();
export const useAppStore = useStore.withTypes<AppStore>();
