import {
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckBox from "@mui/icons-material/CheckBox";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const plans = [
  {
    name: "短期集中（2ヶ月）",
    price: 300000,
    priceDetail:
      "※ 月4回のコーチングセッション + 技術サポート + プロダクト開発支援 + コードレビュー",
    recommendations: [
      "新しい技術領域に挑戦するための実績が欲しい",
      "実務レベルの開発経験を積みたい",
      "プロダクトを開発したい",
      "コードレビューをして欲しい",
    ],
  },
  {
    name: "月額プラン",
    price: 80000,
    priceDetail: "※ 月4回のコーチングセッション + 技術サポート",
    recommendations: [
      "悩みや不安を定期的に相談したい。",
      "自信を持って、日々の仕事に取り組みたい。",
      "仕事の進め方や技術的なアドバイスをして欲しい。",
    ],
  },
  {
    name: "都度利用プラン",
    price: 10000,
    priceDetail: "※ コーチングセッション1時間につき、10,000円",
    recommendations: [
      "コーチングに興味はあるけど、長期的に自分に必要かは分からない。",
      "何回か利用してから、必要であれば長期的にコーチをつけたい。",
    ],
  },
];

export default function PlansSection() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Grid container spacing={3} marginTop={1}>
      {plans.map((plan, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            sx={{ borderRadius: 3, bgcolor: "white", p: 4, mx: isMobile ? 2 : 0 }}
            elevation={3}
          >
            <Typography fontSize={18} fontWeight={700} textAlign="center">
              {plan.name}
            </Typography>
            <Typography fontSize={32} fontWeight={700} textAlign="center" marginTop={1}>
              ¥{plan.price.toLocaleString()}
            </Typography>
            <Typography variant="body2" marginTop={1}>
              {plan.priceDetail}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography></Typography>
            <Typography
              textAlign="center"
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ThumbUpOffAltIcon />
              <Typography fontWeight={700} component="span" sx={{ ml: 1 }}>
                こんな方におすすめ！
              </Typography>
            </Typography>
            <List dense sx={{ mt: 1 }}>
              {plan.recommendations.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckBox color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
