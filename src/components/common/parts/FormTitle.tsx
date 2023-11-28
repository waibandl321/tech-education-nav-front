import { Typography } from "@mui/material";

/**
 * Formのタイトル コンポーネント
 */
export default function FormButtons({ formTitle }: { formTitle: string }) {
  return (
    <>
      <Typography component="h2" fontWeight={700} variant="h6" align="center">
        {formTitle}
      </Typography>
    </>
  );
}
