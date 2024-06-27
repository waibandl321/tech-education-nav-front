import {
  Box,
  Card,
  Chip,
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

const plans = {
  sustainedPlans: {
    subTitle: "持続的なコーチングをご希望の方",
    items: [
      {
        name: "開発実践プラン（2ヶ月）",
        price: "440,000",
        priceDetails: [
          "- 週1回のコーチングセッション",
          "- 技術・キャリア相談（チャット）",
          "- プロダクト開発支援（実践的なチーム開発にするため、コーチも開発に参加する）",
          "- コードレビュー",
        ],
        recommendations: [
          "実務レベルのチーム開発を経験したい方",
          "短期間でプロダクトを開発して実績にしたい方",
          "自分のコードが本当に良いかどうかチェックしてほしい方",
        ],
        memo: "",
        bgColor: "#3293FB",
      },
      {
        name: "月額プラン",
        price: "88,000",
        priceDetails: ["- 週1回のコーチングセッション", "- 技術・キャリア相談（チャット）"],
        recommendations: [
          "日々の仕事で悩みや不安を抱えている方",
          "自信を持って業務に取り組みたい方",
          "技術的なアドバイスや仕事の進め方について定期的に相談したい方",
        ],
        memo: "",
        bgColor: "#3AC500",
      },
    ],
  },
  spotPlans: {
    subTitle: "単発のコーチングをご希望の方",
    items: [
      {
        name: "コーチングセッション",
        price: "11,000",
        priceDetails: ["- 1時間のコーチングセッション"],
        recommendations: [
          " 必要な時にだけサポートを受けたい方",
          "コーチングを試してみたい方",
          "特定の課題について短期間でアドバイスが欲しい方",
        ],
        memo: "",
        bgColor: "#F9A905",
      },
      {
        name: "コードレビュー",
        price: null,
        priceDetails: ["- コードレビュー"],
        recommendations: [
          "自分のコードの品質を向上させたい方",
          "プロの視点からコードの改善点を知りたい方",
          "コードのベストプラクティスを学びたい方",
        ],
        memo: `コードレビューの料金は、体験セッション後に見積もりを行います。
        これは、コードレビューの内容がクライアントごとに異なり、コードの量や複雑さに応じて所要時間が変わるためです。`,
        bgColor: "#F63D57",
      },
    ],
  },
};

export default function PlansSection() {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      {Object.entries(plans).map(([key, value]) => (
        <Box key={key} mb={10}>
          <Typography
            textAlign="center"
            fontWeight="700"
            variant="h5"
            component="h3"
            paddingBottom={3}
          >
            {value.subTitle}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            marginTop={1}
          >
            {value.items.map((plan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    bgcolor: "white",
                    pb: 3,
                    mx: isMobile ? 2 : 0,
                    height: "100%",
                  }}
                  elevation={3}
                >
                  <Box bgcolor={plan.bgColor} p={3} color="white">
                    <Typography fontSize={18} fontWeight={700} textAlign="center">
                      {plan.name}
                    </Typography>
                    {plan.price ? (
                      <Typography fontSize={40} fontWeight={700} textAlign="center" marginTop={1}>
                        <Box component="span">¥</Box>
                        {plan.price}
                      </Typography>
                    ) : (
                      <Typography
                        fontSize={28}
                        fontWeight={700}
                        textAlign="center"
                        marginTop={2}
                        pb={1}
                      >
                        別途見積り
                      </Typography>
                    )}
                  </Box>

                  <Box p={3}>
                    {key === "sustainedPlans" && (
                      <>
                        <Typography marginTop={1}>【内容】</Typography>
                        {plan.priceDetails.map((detail, idx) => (
                          <Typography key={idx} variant="body2" marginTop={1}>
                            {detail}
                          </Typography>
                        ))}
                        <Divider sx={{ my: 2 }} />
                      </>
                    )}

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
                    {plan.memo && (
                      <Typography mt={3} variant="body2">
                        ※ {plan.memo}
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Box mt={3}>
        <Chip label="ご利用可能なお支払い方法" />
        <List dense sx={{ mt: 1 }}>
          <ListItem disablePadding>
            - クレジットカード: VISA、Mastercard、JCB、American Express
          </ListItem>
          <ListItem disablePadding>- 銀行振込</ListItem>
        </List>
      </Box>
      <Box mt={3}>
        <Chip label="注意事項" />
        <List dense sx={{ mt: 1 }}>
          <ListItem disablePadding>- 表示価格は税込です。</ListItem>
          <ListItem disablePadding>- 料金のお支払い完了をもって正式申込とします。</ListItem>
          <ListItem disablePadding>- 支払い後の返金は原則として行いません。</ListItem>
          <ListItem disablePadding>
            - コードレビューの料金は、事前に見積もりを行い、合意いただいた後に支払いとなります。
          </ListItem>
        </List>
      </Box>
    </>
  );
}
