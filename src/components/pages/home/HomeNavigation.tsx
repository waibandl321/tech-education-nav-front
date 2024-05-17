import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { navLinksMapByOption, navLinksMapByTech } from "@/const";
import React from "react";

export default function HomeNavigation() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ p: 2 }}>
        <Link href="/search">検索画面へ</Link>
      </Box>
      <Typography borderLeft="5px solid #666" paddingLeft={2} fontWeight="bold">
        技術やビジョンに合ったスクールを探す
      </Typography>
      <Grid container spacing={1} marginTop={1}>
        {Object.keys(navLinksMapByTech).map((key) => (
          <Grid item xs={6} key={key}>
            <Button
              sx={{ display: "block", textAlign: "center", height: "100%" }}
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
      <Box sx={{ mt: 4 }}>
        <Typography
          borderLeft="5px solid #666"
          paddingLeft={2}
          fontWeight="bold"
        >
          スクールの特徴から探す
        </Typography>
        <List sx={{ mt: 1 }}>
          {navLinksMapByOption.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={<ChevronRightIcon />}
              disablePadding
              sx={{
                borderBottom: "1px solid #ccc",
                ":first-child": {
                  borderTop: "1px solid #ccc",
                },
              }}
            >
              <ListItemButton
                LinkComponent={Link}
                href={item.href}
                sx={{ px: 0 }}
              >
                <ListItemIcon sx={{ minWidth: "unset", mr: 1 }}>
                  <item.Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
