import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import dayjs from "dayjs";
import { navigationLinks } from "@/const";
import Link from "next/link";

const logoStyle = {
  width: 280,
  height: 106,
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      © {dayjs().get("year")} テック教育ナビ. All Rights Reserved.
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
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
              <Image
                src="/logo.png"
                width={logoStyle.width}
                height={logoStyle.height}
                alt="logo of sitemark"
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
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
