import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { navigationLinks } from "@/const";
import Link from "next/link";
import Copyright from "./Copyright";

const logoStyle = {
  width: 280,
  height: 106,
};

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        pt: { xs: 8, sm: 10 },
        pb: { xs: 4, sm: 4 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "30%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
            <Box sx={{ ml: "-15px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                style={{ width: logoStyle.width, height: logoStyle.height }}
                alt="テック教育ナビ ロゴ"
              />
            </Box>
          </Box>
        </Box>
        {Object.entries(navigationLinks).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              display: { xs: "block", sm: "flex" },
              margin: { xs: 2, sm: 0 },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {value.text}
            </Typography>
            {value.menus.map((v) => (
              <Link
                key={v.href}
                color="text.secondary"
                href={v.href}
                style={{
                  marginTop: 0.5,
                  display: "block",
                }}
              >
                {v.text}
                <br />
              </Link>
            ))}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          pt: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Copyright />
      </Box>
    </Container>
  );
}
