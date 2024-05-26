"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { navigationLinks } from "@/const";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

const logoStyle = { width: 140, height: 53 };

export default function AppHeader() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Image
                src="/logo.png"
                width={logoStyle.width}
                height={logoStyle.height}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
                {Object.entries(navigationLinks)
                  .filter(([key, value]) => key === "features")
                  .map(([key, value]) =>
                    value.menus.map((v) => (
                      <MenuItem
                        key={v.href}
                        LinkComponent={Link}
                        href={v.href}
                        sx={{ py: "6px", px: "12px" }}
                      >
                        <Typography variant="body2" color="text.primary">
                          {v.text}
                        </Typography>
                      </MenuItem>
                    ))
                  )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => router.push("/notifications")}
                size="large"
                color="primary"
              >
                <NotificationsIcon />
              </IconButton>
              {/* <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
              >
                Sign up
              </Button> */}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  {Object.entries(navigationLinks).map(([key, value]) => (
                    <Box key={key}>
                      {value.menus.map((v) => (
                        <MenuItem
                          key={v.href}
                          onClick={() => router.push(v.href)}
                          sx={{ py: "6px", px: "12px" }}
                        >
                          <Typography variant="body2" color="text.primary">
                            {v.text}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Box>
                  ))}
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
