import { Card, List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

export default function UserSettingAside() {
  const router = useRouter();
  return (
    <Card>
      <List>
        <ListItemButton>
          <ListItemText
            primary="口コミ投稿・削除"
            onClick={() => router.push("/user/review")}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemText
            primary="プロフィール・各種設定"
            onClick={() => router.push("/user/setting")}
          />
        </ListItemButton>
      </List>
    </Card>
  );
}
