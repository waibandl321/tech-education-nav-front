import {
  Container,
  Typography,
  Paper,
  useMediaQuery,
  Box,
} from "@mui/material";
import React from "react";
import Link from "next/link";

const linkStyle = {
  height: "60px",
  lineHeight: "60px",
  fontSize: "20px",
  textDecoration: "none",
  backgroundColor: "#1976d2",
  color: "#fff",
  borderRadius: 8,
  width: "300px",
  display: "flex",
  justifyContent: "center",
};

export default function TopPane() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Paper
      elevation={0}
      sx={{
        pt: isMobile ? 3 : 5,
        borderRadius: 0,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Container>
        <Typography
          textAlign="center"
          component={"h2"}
          variant="h5"
          lineHeight={2}
        >
          リアルな体験談が、あなたの挑戦を後押しする。
          <br />
        </Typography>
        <Box marginTop={2} display="flex" justifyContent="center">
          <Link style={linkStyle} href="/search">
            口コミを探す
          </Link>
        </Box>
      </Container>
    </Paper>
  );
}
