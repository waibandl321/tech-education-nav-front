import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckBox from "@mui/icons-material/CheckBox";
import { useState } from "react";
import useUtils from "@/hooks/utils/useUtils";
import Image from "next/image";

export default function AboutCoachSection() {
  const { isWindowSizeMdSm } = useUtils();

  /**
   * ダイアログ
   */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          p: isWindowSizeMdSm ? 3 : 6,
          mt: 2,
          display: isWindowSizeMdSm ? "block" : "flex",
        }}
      >
        <Box textAlign="center">
          <Image
            alt=""
            src="/images/pages/coaching/lp/frontend/frontend6.webp"
            loading="lazy"
            width={isWindowSizeMdSm ? 200 : 150}
            height={isWindowSizeMdSm ? 200 : 150}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #dcdfe3",
            }}
          />
        </Box>
        <Box px={isWindowSizeMdSm ? 0 : 3} pb={3} pt={isWindowSizeMdSm ? 3 : 0}>
          <Typography>
            WEB制作会社のHTMLコーダーからエンジニアとしてのキャリアをスタートし、近年はTypeScript、Vue.js、React.jsのエキスパートとして多様なプロジェクトに参画。
            スポーツ映像配信アプリや教育関連システムのフロントエンド開発を手掛け、大手SaaS企業で店舗管理システムの開発に従事。
          </Typography>
          <Typography mt={1}>
            また、バックエンド領域でもWEB制作会社時代にPHPを用いたAPI開発を経験。最近では、「テック教育ナビ」のインフラ構築からAPI開発まで手掛ける。
          </Typography>
          <Box mt={3}>
            <Button
              size="large"
              sx={{ fontSize: 18, fontWeight: "bold" }}
              onClick={handleClickOpen}
            >
              コーチについて詳しく見る
            </Button>
          </Box>
        </Box>
      </Card>
      {/* 詳細ダイアログ */}
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent>
          <Typography fontWeight="700" variant="h5" component="h2">
            大西純平
          </Typography>
          <Typography mt={0.5}>Jumpei Onishi</Typography>
          <Typography mt={0.5}>愛媛県出身</Typography>

          <Box mt={3}>
            <Typography fontWeight="700" component="h3" variant="h6">
              コーチングを提供しようと思ったきっかけ
            </Typography>
            <Typography mt={2}>
              過去にコーチングを受けた経験から、持続的な自己向上がいかに人生にプラスの影響を与えるかを強く感じています。
            </Typography>
            <Typography mt={2}>
              自分を高めることでアウトプットが向上し、評価され、仕事がより楽しくなります。
              <br />
              仕事が楽しくなると、さらに熱意が増大し、持続的な成長を促し、新たな可能性を開きます。
              <br />
              結果として、より幸せな人生を送ることができるようになります。
            </Typography>
            <Typography mt={2}>
              今の私は、この状況を実現することができています。
              <br />
              毎日の仕事が楽しいですし、もっと成長したいという熱意に満ちています。
            </Typography>
            <Typography mt={2}>
              しかし、過去はそうではありませんでした。
              <br />
              技術者として伸び悩み、自分の目標は永遠に達成できないのではないかと不安になることもありました。
              そんな時にコーチと出会い、エンジニアとして成長するためのきっかけやヒントを得ることができたのです。
            </Typography>
            <Typography mt={2}>
              そして次は、自分がコーチとして、クライアントの自己実現の力となりたいと思うようになりました。
              以上が、私がコーチングを提供しようと決意した主な理由であり、
              今後もクライアントのキャリアと人生に前向きな変化をもたらせるようサポートしていきたいです。
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography fontWeight="700" component="h3" variant="h6">
              大切にしている価値観
            </Typography>
            <List disablePadding sx={{ mt: 2 }}>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckBox color="success" />
                </ListItemIcon>
                <ListItemText>他人と自分を比較しないこと</ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckBox color="success" />
                </ListItemIcon>
                <ListItemText>
                  いかなる時も、主語を自分にする（自分の人生に責任を持つ）こと
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckBox color="success" />
                </ListItemIcon>
                <ListItemText>原理原則を理解すること</ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckBox color="success" />
                </ListItemIcon>
                <ListItemText>「事実」にフォーカスすること</ListItemText>
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
