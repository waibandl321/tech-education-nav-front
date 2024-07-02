import { Box, Container, Divider, Typography } from "@mui/material";
import ConversionSection from "@/components/pages/coaching/lp/frontend/ConversionSection";
import PlansSection from "@/components/pages/coaching/lp/frontend/PlansSection";
import FAQSection from "@/components/pages/coaching/lp/frontend/FAQSection";
import UsageStepperSection from "@/components/pages/coaching/lp/frontend/UsageStepperSection";
import ServiceStrengthSection from "@/components/pages/coaching/lp/frontend/ServiceStrengthSection";
import LPLayout from "@/app/lp-layout";
import WorriesSection from "@/components/pages/coaching/lp/frontend/WorriesSection";
import Head from "next/head";
import MainVisual from "@/components/pages/coaching/lp/frontend/MainVisual";
import ContactForm from "@/components/pages/coaching/lp/ContactForm";
import Copyright from "@/components/common/section/Copyright";
import AboutCoachSection from "@/components/pages/coaching/lp/frontend/AboutCoachSection";
import useUtils from "@/hooks/utils/useUtils";
import React from "react";
import Image from "next/image";

export default function FrontEnd() {
  const { isWindowSizeSm, isWindowSizeMdSm } = useUtils();

  const logoStyle = { width: 200, height: 75.7 };

  return (
    <LPLayout>
      <Head>
        <title>フロントエンドエンジニア専門のコーチング「テック教育ナビ」</title>
      </Head>
      <Box sx={{ d: isWindowSizeSm ? "block" : "flex" }}>
        <Box
          sx={{
            width: isWindowSizeSm
              ? "100%"
              : `calc(100vw - ${isWindowSizeMdSm ? "280px" : "330px"})`,
          }}
        >
          <MainVisual />
          <Box mt={15}>
            <Container
              maxWidth="md"
              sx={{
                px: {
                  sm: 2,
                },
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="700"
                variant={isWindowSizeSm ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                こんなお悩みありませんか？
              </Typography>
              <Box textAlign="center" mt={4}>
                <WorriesSection />
              </Box>
            </Container>
          </Box>
          <Box
            textAlign="center"
            mt={10}
            py={10}
            sx={{
              background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
            }}
          >
            <Container maxWidth="sm">
              <Box>
                <Typography
                  mt={2}
                  textAlign="center"
                  fontWeight="700"
                  variant={isWindowSizeSm ? "h5" : "h4"}
                  component="h2"
                  // fontSize={isWindowSizeSm ? 32 : 50}
                  color="#fff"
                  sx={{
                    fontSize: {
                      sm: 32,
                      md: 40,
                      lg: 48,
                    },
                  }}
                >
                  そんなあなたに
                  <br />
                  提供できる価値
                </Typography>
              </Box>
            </Container>
            <Box mt={6}>
              <Container
                maxWidth="md"
                sx={{
                  px: {
                    sm: 2,
                  },
                }}
              >
                <ServiceStrengthSection />
              </Container>
            </Box>
          </Box>

          <Box mt={10}>
            <Container
              maxWidth="md"
              sx={{
                px: {
                  sm: 2,
                },
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="700"
                variant={isWindowSizeSm ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                料金
              </Typography>
              <PlansSection />
            </Container>
          </Box>
          <Box
            mt={10}
            py={10}
            sx={{
              background: "linear-gradient(to bottom, #2E336C, #3A407F, #2B3056)",
              color: "#fff",
            }}
          >
            <Container
              maxWidth="md"
              sx={{
                px: {
                  sm: 2,
                },
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="700"
                variant={isWindowSizeSm ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                コーチ紹介
              </Typography>
              <AboutCoachSection />
            </Container>
          </Box>

          {isWindowSizeSm && (
            <Box>
              <ConversionSection />
            </Box>
          )}

          <Box mt={10} pb={10}>
            <Container
              maxWidth="md"
              sx={{
                px: {
                  sm: 2,
                },
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="700"
                variant={isWindowSizeSm ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                ご利用までの流れ
              </Typography>
              <UsageStepperSection />
            </Container>
          </Box>

          <Divider />

          <Box mt={10}>
            <Container
              maxWidth="md"
              sx={{
                px: {
                  sm: 2,
                },
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="700"
                variant={isWindowSizeSm ? "h5" : "h4"}
                component="h2"
                paddingBottom={3}
              >
                よくあるご質問
              </Typography>
              <FAQSection />
            </Container>
          </Box>

          {isWindowSizeSm && (
            <Box>
              <ConversionSection />
            </Box>
          )}

          {!isWindowSizeSm && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                py: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Copyright />
            </Box>
          )}
        </Box>
        {/* 予約フォーム */}
        {!isWindowSizeSm && (
          <Box
            sx={{
              width: isWindowSizeMdSm ? 280 : 330,
              height: "100dvh",
              position: "fixed",
              top: 0,
              right: 0,
              p: 3,
              backgroundColor: "rgba(0, 0, 0, .03)",
              borderLeft: "1px solid #dcdfe3",
            }}
          >
            <Box textAlign="center">
              <Image
                src="/logo.png"
                width={logoStyle.width}
                height={logoStyle.height}
                alt="テック教育ナビ ロゴ"
                priority={false}
              />
            </Box>
            <Typography mt={1} textAlign="center" fontSize={18} fontWeight={700}>
              無料体験セッション予約
            </Typography>
            <Box mt={3}>
              <ContactForm />
            </Box>
          </Box>
        )}

        {/* 予約フォーム: デバイス幅 600px以下 */}
        {isWindowSizeSm && (
          <div id="reservationForm">
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(0, 0, 0, .03)",
              }}
            >
              <Box textAlign="center">
                <Image
                  src="/logo.png"
                  width={logoStyle.width}
                  height={logoStyle.height}
                  alt="テック教育ナビ ロゴ"
                />
              </Box>
              <Typography mt={1} textAlign="center" fontSize={18} fontWeight={700}>
                無料体験セッション予約
              </Typography>
              <Box mt={3}>
                <ContactForm />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                py: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Copyright />
            </Box>
          </div>
        )}
      </Box>
    </LPLayout>
  );
}
