import { Card, List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

export default function UserSettingAside() {
  const router = useRouter();
  return (
    <Card>
      <List>
        <ListItemButton>
          <ListItemText
            primary="アカウント情報編集"
            onClick={() => router.push("/user/setting/edit/account")}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemText
            primary="プロフィール編集"
            onClick={() => router.push("/user/setting/edit/profile")}
          />
        </ListItemButton>
      </List>
    </Card>
  );
}
