import { Accordion, AccordionDetails, AccordionSummary, Box, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const qaOptions = [
  {
    question: "Q. プログラミング経験が少なくても大丈夫ですか？",
    answer:
      "A. 大丈夫です。プログラミング経験に関わらず、目指すキャリアや目標に合わせてサポートいたします。まずは気軽にご相談ください。",
  },
  {
    question: "Q. プログラミングの教材やカリキュラムは提供されていますか？",
    answer:
      "A. 一般的なプログラミングスクールのように、教材やカリキュラムの提供は行っておりません。コーチが学習内容やカリキュラムの方針についてアドバイスや提案を行うため、何を学習するか迷っている方でも安心して学習を進められます。",
  },
  {
    question: "Q. コーチングセッションは１回どのくらいの時間ですか？",
    answer:
      "A. 1回で約1時間を目安にセッションを行います。セッションの間隔を長く希望される方は、少し長めにすることも可能です。逆に30分程度に短縮することも可能です。",
  },
  {
    question: "Q. コーチングセッションはどのようなツールによって行いますか？",
    answer:
      "A. 環境に特に問題がない場合、zoomを使って面談を行います。ご希望であれば別のツールでも対応は可能です。",
  },
  {
    question: "Q. 決済はどのような方法で行いますか？",
    answer:
      "A. 月に1回、クレジットカードで決済いただきます。決済日付は契約日付からの計算となるため、月の途中で解約したとしても次の契約日まではサービスはご利用可能です。",
  },
  {
    question: "Q. 入会金や退会料はかかりますか？",
    answer:
      "A. 入会金や退会料は一切かかりません。月単位の契約なので1ヶ月で解約しても1ヶ月以上の料金は一切かかりません。※",
  },
];

const FAQSection = () => {
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <Box mx={isMobile ? 2 : 0}>
      {qaOptions.map((item, index) => (
        <Accordion key={index} sx={{ my: 2 }} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              py: 1,
              background: (theme) =>
                theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
            }}
          >
            {item.question}
          </AccordionSummary>
          <AccordionDetails sx={{ py: 2 }}>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQSection;
