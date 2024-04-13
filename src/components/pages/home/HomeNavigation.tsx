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
import useSearch from "@/hooks/useSearch";
import { CourseDataBooleanMap } from "@/const";

export default function HomeNavigation() {
  const { linksRelativeDevelop } = useSearch();

  return (
    <Box sx={{ p: 2 }}>
      <Typography borderLeft="5px solid #666" paddingLeft={2} fontWeight="bold">
        技術やビジョンに合ったスクールを探す
      </Typography>
      <Grid container spacing={1} marginTop={1}>
        {linksRelativeDevelop.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Button
              sx={{ display: "block", textAlign: "center", height: "100%" }}
              LinkComponent={Link}
              href={item.href}
              variant="contained"
            >
              <item.Icon fontSize="large" />
              <Typography>{item.title}</Typography>
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
          {CourseDataBooleanMap.map((item, index) => (
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
