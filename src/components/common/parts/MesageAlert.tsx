import { Alert, Snackbar } from "@mui/material";

/**
 * メッセージタイプのユニオン型
 */
export type AlertMessageKeyType = "isOpenSuccessAlert" | "isOpenErrorAlert";

/**
 * alertメッセージ用のstateの型
 * 主にAPI通信が発生するページコンポーネントで使用する
 */
export interface AlertMessageStateType {
  isOpenSuccessAlert: boolean;
  isOpenErrorAlert: boolean;
  successMessage: string;
  errorMessage: string;
}

/**
 * props型
 */
interface MesageAlertPropsType {
  isOpenSuccessAlert: boolean;
  isOpenErrorAlert: boolean;
  successMessage: string;
  errorMessage: string;
  handleClose: (messageKey: AlertMessageKeyType) => void;
}

/**
 * アラートメッセージ表示用のコンポーネント
 */
export default function MesageAlert({
  isOpenSuccessAlert,
  isOpenErrorAlert,
  successMessage,
  errorMessage,
  handleClose,
}: MesageAlertPropsType) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpenSuccessAlert}
        autoHideDuration={6000}
        onClose={() => handleClose("isOpenSuccessAlert")}
      >
        <Alert
          onClose={() => handleClose("isOpenSuccessAlert")}
          severity="success"
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpenErrorAlert}
        autoHideDuration={6000}
        onClose={() => handleClose("isOpenErrorAlert")}
      >
        <Alert onClose={() => handleClose("isOpenErrorAlert")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
