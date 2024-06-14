"use client";
import { Box, CircularProgress } from "@mui/material";

export default function LoadingInnerElement() {
  return (
    <Box
      position="absolute"
      top={100}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
    >
      <CircularProgress />
      {/* データ取得中... */}
    </Box>
  );
}
