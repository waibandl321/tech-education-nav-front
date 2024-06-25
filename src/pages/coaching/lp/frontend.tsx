import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ConversionSection from "@/components/pages/coaching/lp/frontend/ConversionSection";
import PlansSection from "@/components/pages/coaching/lp/frontend/PlansSection";
import FAQSection from "@/components/pages/coaching/lp/frontend/FAQSection";
import UsageStepperSection from "@/components/pages/coaching/lp/frontend/UsageStepperSection";
import ServiceStrengthSection from "@/components/pages/coaching/lp/frontend/ServiceStrengthSection";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckBox from "@mui/icons-material/CheckBox";
import ConversionButton from "@/components/pages/coaching/lp/frontend/ConversionButton";
import LPLayout from "@/app/lp-layout";
import WorriesSection from "@/components/pages/coaching/lp/frontend/WorriesSection";
import { useState } from "react";
import Head from "next/head";

export default function FrontEnd() {
  const isMobile = useMediaQuery("(max-width:640px)");

  const boxStyle = {
    position: "relative",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      bottom: "0.4rem",
      height: "6rem",
    },
    "&::before": {
      left: isMobile ? "2rem" : "-4rem",
      borderLeft: "solid 3px",
      transform: "rotate(-25deg)",
    },
    "&::after": {
      right: isMobile ? "2rem" : "-4rem",
      borderRight: "solid 3px",
      transform: "rotate(25deg)",
    },
  };

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

  const imageStyle = {
    width: isMobile ? 200 : 150,
    height: isMobile ? 200 : 150,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: 1,
  };

  const backgroundImageURL = isMobile
    ? "url(/images/pages/coaching/lp/frontend/sp-20240624168142.webp)"
    : "url(/images/pages/coaching/lp/frontend/20240624168142.webp)";

  return (
    <LPLayout>
      <Head>
        <title>フロントエンドエンジニア専門のコーチングサービス「テック教育ナビ」</title>
      </Head>
      <Container maxWidth="md" sx={{ px: { xs: 0, sm: 1 }, pb: 20 }}>
        <Box
          mx={isMobile ? 2 : 0}
          marginX="calc(50% - 50vw)"
          width="100vw"
          pb={10}
          sx={{
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0.5) 100%), ${backgroundImageURL}`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          <Container maxWidth="md">
            <Typography fontWeight="700" variant="h3" textAlign="center" pt={20}>
              コーチと共に、
              <br style={{ display: isMobile ? "block" : "none" }} />
              未来を変えよう
            </Typography>
            <Box marginTop={isMobile ? 6 : 10}>
              <Card
                sx={{
                  borderRadius: 6,
                  pt: { xs: 4, sm: 10 },
                  pb: { xs: 8, sm: 10 },
                  px: { xs: 3, sm: 10 },
                  textAlign: { sm: "left", md: "center" },
                  background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
                  color: "white",
                }}
                elevation={10}
              >
                <Typography fontWeight="700" component="h2" variant={isMobile ? "h5" : "h4"}>
                  結果を出すための
                  <br />
                  フロントエンド特化型コーチング
                </Typography>
                <Typography textAlign="left" marginTop={4} variant="body1" sx={{ mt: 4 }}>
                  「テック教育ナビ」は、フロントエンドエンジニアに特化した専門のコーチングサービスです。
                </Typography>
                <Typography textAlign="left" variant="body1" sx={{ mt: 2 }}>
                  現場で求められる実践的なスキル習得からキャリアアップまで、個別にカスタマイズされた支援を通じて、あなたのフロントエンドエンジニアとしての成長を加速させます。
                </Typography>
                <Typography textAlign="left" variant="body1" sx={{ mt: 2 }}>
                  技術的な悩みやキャリア形成の不安を、経験豊富なコーチが解決へと導きます。フロントエンジニアとして新たな一歩を踏み出すために、まずは具体的な目標設定から始めましょう。
                </Typography>
                <Box textAlign="center" marginTop={6}>
                  <ConversionButton />
                </Box>
              </Card>
            </Box>
          </Container>
        </Box>

        <Box marginTop={10}>
          <Typography
            textAlign="center"
            fontWeight="700"
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            paddingBottom={3}
          >
            こんなお悩みありませんか？
          </Typography>
          <WorriesSection />
        </Box>
        <Box textAlign="center" marginTop={10}>
          <Box>
            <ArrowDropDownIcon sx={{ fontSize: "8rem", color: "#41cabd" }} />
            <ArrowDropDownIcon sx={{ fontSize: "8rem", color: "#41cabd" }} />
            <ArrowDropDownIcon sx={{ fontSize: "8rem", color: "#41cabd" }} />
          </Box>
          <Container maxWidth="sm">
            <Box sx={boxStyle} marginTop={8}>
              <Typography
                textAlign="center"
                fontWeight="700"
                fontSize={isMobile ? 24 : 32}
                component="h2"
              >
                そのお悩み
              </Typography>
              <Typography
                mt={2}
                textAlign="center"
                fontWeight="700"
                variant={isMobile ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                <Box component="span" sx={{ color: "#41cabd", fontSize: isMobile ? 32 : 40 }}>
                  コーチングで解消
                </Box>
                <br style={{ display: isMobile ? "block" : "none" }} />
                できます。
              </Typography>
            </Box>
          </Container>
        </Box>
        <Box marginTop={6}>
          <ServiceStrengthSection />
        </Box>
        <ConversionSection />
        <Box marginTop={20}>
          <Typography
            textAlign="center"
            fontWeight="700"
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            paddingBottom={3}
          >
            料金プラン
          </Typography>
          <PlansSection />
        </Box>
        <Box
          mt={10}
          py={10}
          marginX="calc(50% - 50vw)"
          width="100vw"
          sx={{
            background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
            color: "#fff",
          }}
        >
          <Container maxWidth="md">
            <Typography
              textAlign="center"
              fontWeight="700"
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              paddingBottom={3}
            >
              コーチ紹介
            </Typography>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                p: isMobile ? 3 : 6,
                mt: 2,
                mx: isMobile ? 2 : 0,
                display: isMobile ? "block" : "flex",
              }}
            >
              <Box textAlign="center">
                <Box
                  component="img"
                  alt=""
                  src="/images/pages/coaching/lp/frontend/frontend6.webp"
                  loading="lazy"
                  sx={imageStyle}
                />
              </Box>
              <Box px={isMobile ? 0 : 3} pb={3} pt={isMobile ? 3 : 0}>
                <Typography>
                  WEB制作会社のHTMLコーダーからエンジニアとしてのキャリアをスタートし、近年はTypeScript、Vue.js、React.jsのエキスパートとして多様なプロジェクトに参画。
                  スポーツ映像配信アプリや教育関連システムのフロントエンド開発を手掛け、大手SaaS企業で店舗管理システムの開発に従事。
                </Typography>
                <Typography mt={1}>
                  また、バックエンド領域でも実績を積んでいる。WEB制作会社時代にPHPを用いたAPI開発を経験。最近では、「テック教育ナビ」のインフラ構築からAPI開発まで手掛ける。
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
          </Container>
        </Box>

        {/* 詳細ダイアログ */}
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
          <DialogContent>
            <Typography fontWeight="700" variant="h5" component="h2">
              大西純平
            </Typography>
            <Typography paddingBottom={3}>Jumpei Onishi</Typography>
            <Typography fontWeight="700" component="h3" variant="h6">
              経歴
            </Typography>
            <List disablePadding sx={{ mt: 2 }}>
              <Divider />
              <ListItem sx={{ px: 0 }} divider>
                1996年 愛媛県四国中央市生まれ
              </ListItem>
              <ListItem sx={{ px: 0 }} divider>
                2018年 関西学院大学 国際学部 国際学科を卒業
              </ListItem>
              <ListItem sx={{ px: 0 }} divider>
                2019年 エンジニアとしてのキャリアをスタートさせる
              </ListItem>
              <ListItem sx={{ px: 0 }} divider>
                2021年 フリーランスエンジニアとして独立
              </ListItem>
              <ListItem sx={{ px: 0 }} divider>
                2024年 コーチング提供開始
              </ListItem>
            </List>
            <Box mt={5}>
              <Typography fontWeight="700" component="h3" variant="h6">
                コーチングとの出会いと、私の人生に与えた影響
              </Typography>
              <Typography mt={2}>
                エンジニアとしてキャリアを始めた頃、技術者としての力不足を痛感していました。
                <br />
                所属していた会社では、先輩に気軽に相談できる環境がなく、一人で解決策を見つけるのが難しかったのです。
                <br />
                この状況が、コーチングと出会うきっかけとなりました。
              </Typography>
              <Typography mt={2}>
                私のコーチは、業界の最前線でエンジニアとして活躍する尊敬すべき人物でした。
                <br />
                彼からの学びは、技術スキルを超え、エンジニアとしての成長方法、プロジェクトの効率的な進行戦略、
                そして何よりビジネスプロセスとクライアントのニーズを深く理解することの重要性に焦点を当てていました。
                <br />
                彼の指導は、単なるエラーの修正方法を教えるのではなく、エンジニアリングの根本原則を深く理解し、
                それを実際の仕事に応用する力を育てるものでした。
              </Typography>
              <Typography mt={2}>
                このコーチングは、私が技術的な壁を超え、キャリアの新たな可能性を広げるための重要なステップとなりました。
                <br />
                私は、困難を乗り越える自信と、継続的成長のための具体的な戦略を得ることができ、それが自己実現への道となりました。
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography fontWeight="700" component="h3" variant="h6">
                コーチングを提供しようと思ったきっかけ
              </Typography>
              <Typography mt={2} fontWeight="700">
                人の人生に影響を与える仕事がしたかった
              </Typography>
              <Typography mt={2}>
                社会人としてのキャリアをスタートさせた当初から、「人の役に立ち、人の人生に深い影響を与える仕事がしたい」と思っていました。
                <br />
                しかし、その時点では知識も経験も限られており、自分には何も提供できるものがないように感じていました。
              </Typography>
              <Typography mt={2}>
                そこからエンジニアとしての道を選び、技術スキルを時間をかけて学び、実務経験を積み重ねました。
                <br />
                徐々に自信がつき、自分が他人のキャリアや人生に有益な影響を与えられる日が来ることを確信し始めました。
              </Typography>
              <Typography mt={4} fontWeight="700">
                「人生の勝ち癖」をつけるために
              </Typography>
              <Typography mt={2}>
                これまでの経験から、持続的な自己向上がいかに人生にプラスの影響を与えるかを強く感じています。
                <br />
                コーチングを受けることで仕事のアウトプットが向上し、評価され、仕事がより楽しくなりました。
                <br />
                仕事が楽しくなると、さらに熱意が増大し、持続的な成長を促し、新たな可能性を開きます。
                <br />
                まさに「人生の勝ち癖」をつけることに直結し、結果としてより幸せな人生を送ることができるようになります。
              </Typography>
              <Typography mt={2}>
                私はこの素晴らしい体験を多くの人にもしてもらいたいと願っています。
                <br />
                コーチとして、クライアントが自己実現を果たし、キャリアと人生に前向きな変化をもたらせるようサポートしていきたいです。
                <br />
                以上が、私がコーチングを提供しようと決意した主な理由であり、他人にも同様の価値ある経験を提供できることに深いやりがいを感じています。
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
                  <ListItemText>いかなる時も、主語を自分にすること</ListItemText>
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
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckBox color="success" />
                  </ListItemIcon>
                  <ListItemText>比較対象は過去の自分</ListItemText>
                </ListItem>
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
          </DialogActions>
        </Dialog>

        <ConversionSection />
        <Box marginTop={20}>
          <Typography
            textAlign="center"
            fontWeight="700"
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            paddingBottom={3}
          >
            ご利用までの流れ
          </Typography>
          <UsageStepperSection />
        </Box>
        <Box marginTop={20}>
          <Typography
            textAlign="center"
            fontWeight="700"
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            paddingBottom={3}
          >
            よくあるご質問
          </Typography>
          <FAQSection />
        </Box>
        <ConversionSection />
      </Container>
    </LPLayout>
  );
}
