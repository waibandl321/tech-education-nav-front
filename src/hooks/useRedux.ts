import { AppDataPropType } from "@/types/CommonType";
import axios from "axios";

export default function useRedux() {
  // 検索データ取得フラグ（cookie）更新
  const updateReduxCookie = async (data: AppDataPropType) => {
    if (data.centers.length > 0) {
      await axios.get("/api/test/redux");
    }
    return;
  };

  // Redux cookieを削除
  const deleteReduxCookie = async (data: AppDataPropType) => {
    await axios.put("/api/test/redux");
  };

  return {
    updateReduxCookie,
    deleteReduxCookie,
  };
}
