import { Box, Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { navLinksMapByOption, navLinksMapByTech } from "@/const";
import React from "react";
import { useRouter } from "next/router";

export default function HomeNavigation() {
  const router = useRouter();

  return (
    <Container
      sx={{
        pt: 4,
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography component="h2" variant="h4" color="text.primary">
        技術やビジョンに合ったスクールを探す
      </Typography>
      {/* <Typography variant="body1" color="text.secondary">
        See what our customers love about our products. Discover how we excel in efficiency,
        durability, and satisfaction. Join us for quality, innovation, and reliable support.
      </Typography> */}
      <Grid container spacing={2} marginTop={1}>
        {Object.keys(navLinksMapByTech).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <Button
              sx={{ display: "block", textAlign: "center", height: "fit-content", py: 2 }}
              LinkComponent={Link}
              href={navLinksMapByTech[key].href}
              variant="contained"
            >
              {React.createElement(navLinksMapByTech[key].Icon, {
                fontSize: "large",
              })}
              <Typography>{navLinksMapByTech[key].navigationTitle}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography component="h2" variant="h4" color="text.primary" sx={{ mt: 10 }}>
        スクールの特徴から探す
      </Typography>
      {/* <Typography variant="body1" color="text.secondary">
        See what our customers love about our products. Discover how we excel in efficiency,
        durability, and satisfaction. Join us for quality, innovation, and reliable support.
      </Typography> */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        useFlexGap
        sx={{ width: "100%", display: { sm: "flex" } }}
      >
        {navLinksMapByOption.map(({ Icon, title, href }, index) => (
          <Card
            key={index}
            variant="outlined"
            component={Button}
            onClick={() => router.push(href)}
            sx={{
              p: 3,
              height: "fit-content",
              width: "100%",
              background: "none",
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              borderColor: "grey.200",
              ":hover": {
                borderColor: "primary.light",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                textAlign: "left",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                gap: 2.5,
              }}
            >
              <Box sx={{ color: "primary.main" }}>
                <Icon />
              </Box>
              <Box sx={{ textTransform: "none" }}>
                <Typography color="text.primary" variant="body2" fontWeight="bold">
                  {title}
                </Typography>
                {/* <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                  This item could provide information about the mobile app version of the product.
                </Typography> */}
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
