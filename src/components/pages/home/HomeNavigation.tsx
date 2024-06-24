import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function HomeNavigation() {
  const router = useRouter();

  return (
    <>
      <Container
        sx={{
          pt: 4,
          pb: { xs: 8 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary" textAlign="center">
          コーチと共に
          <br />
          圧倒的な結果を出そう！
        </Typography>
        <Box>
          <Button
            sx={{ display: "flex", textAlign: "center", p: 3 }}
            size="large"
            variant="contained"
            LinkComponent={Link}
            href="/coaching/lp/frontend"
          >
            <CastForEducationIcon fontSize="large" />
            <Typography variant="h5" marginLeft={2}>
              コーチングについて
            </Typography>
          </Button>
        </Box>
      </Container>
      <Container
        sx={{
          pt: 4,
          pb: { xs: 8 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary" textAlign="center">
          あなたに合った
          <br />
          プログラミングスクールが見つかる！
        </Typography>
        <Box>
          <Button
            sx={{ display: "flex", textAlign: "center", p: 3 }}
            size="large"
            LinkComponent={Link}
            href="/search"
            variant="contained"
          >
            <SearchIcon fontSize="large" />
            <Typography variant="h5" marginLeft={2}>
              検索サイトへ
            </Typography>
          </Button>
        </Box>
      </Container>
      <Container
        sx={{
          pt: 4,
          pb: { xs: 8 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary" textAlign="center">
          プログラミングを学ぼう！
        </Typography>
        <Box>
          <Button
            sx={{ display: "flex", textAlign: "center", p: 3 }}
            size="large"
            LinkComponent={Link}
            href="/contents/educational-materials"
            variant="contained"
          >
            <ContentPasteGoIcon fontSize="large" />
            <Typography variant="h5" marginLeft={2}>
              学習コンテンツを見る
            </Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
}
