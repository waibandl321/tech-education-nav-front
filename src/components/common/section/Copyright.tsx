import { Typography } from "@mui/material";
import dayjs from "dayjs";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      © {dayjs().get("year")} テック教育ナビ. All Rights Reserved.
    </Typography>
  );
}
