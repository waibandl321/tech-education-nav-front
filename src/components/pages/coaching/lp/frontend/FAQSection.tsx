import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type QAItem = {
  question: string;
  answer: string;
};

type QAObject = {
  [key: string]: {
    title: string;
    items: QAItem[];
  };
};

const QAItems: QAObject = {
  general: {
    title: "コーチング全般",
    items: [
      {
        question: "Q. プログラミング未経験でも大丈夫ですか？",
        answer:
          "A. 大丈夫です。プログラミング経験に関わらず、目指すキャリアや目標に合わせてサポートいたします。まずは気軽にご相談ください。",
      },
      {
        question: "Q. コーチングセッションはどのように行われますか？",
        answer:
          "A. コーチングセッションは基本的にオンラインで行います。ビデオ会議ツール（Google Meet）を使用して、あなたの都合の良い時間に合わせてセッションを調整します。",
      },
      {
        question: "Q. プログラミングの教材やカリキュラムは提供されていますか？",
        answer:
          "A. サイト内に学習コンテンツを配信していますので、学習のお役に立ててください。こちらのコンテンツは永続的に作成、改修を行なっていきます。",
      },
      {
        question: "Q. コーチングの内容はどのように決まりますか？",
        answer:
          "A. 無料体験セッションであなたの目標や現状を詳しくお聞きした上で、個別にカスタマイズされたコーチングプランを提案します。",
      },
      {
        question: "Q. 技術・キャリア相談はどのように行われますか？",
        answer:
          "A. 技術・キャリア相談は主にチャット（Slackなど）を通じて行います。随時質問や相談を受け付けております。",
      },

      {
        question: "Q. コードレビューではどのようなツールを使用しますか？",
        answer: "A. GutHubを使用します。",
      },
    ],
  },
  fee: {
    title: "料金と支払いについて",
    items: [
      {
        question: "Q. 料金の支払い方法は何がありますか？",
        answer:
          "A. クレジットカード（VISA、Mastercard、JCB、American Express）や銀行振込に対応しています。詳細はお申し込み後にご案内します。",
      },
      {
        question: "Q. 料金の支払いはいつ行えば良いですか？",
        answer:
          "A. サービス開始前に全額をお支払いください。料金のお支払い完了をもって正式申込となります。",
      },
      {
        question: "Q. 支払い後の返金は可能ですか？",
        answer:
          "A. 支払い後の返金は原則として行いません。ただし、特別な事情がある場合はご相談ください。",
      },
    ],
  },
  plan: {
    title: "プランについて",
    items: [
      {
        question: "Q. 短期集中プランの期間を延長することは可能ですか？",
        answer:
          "A. 可能です。延長したい場合はその旨をご連絡ください。延長期間が決まり次第、料金を請求させていただきます。",
      },
      {
        question:
          "Q. 単発でコーチングセッションを受けることはできますか？まずは、お試しで利用したいです。",
        answer: "A. 可能です。コーチングセッションは¥11000（税込）/1時間でご提供しております。",
      },
      {
        question: "Q. コードレビューのみお願いすることは可能でしょうか？",
        answer: "A. 可能です。料金については、ご要望に応じて別途お見積もりいたします。",
      },
      {
        question: "Q. コードレビューの料金が別途見積りになる理由は何ですか？",
        answer:
          "A. コードレビューの内容はプロジェクトごとに異なり、コードの量や複雑さに応じて所要時間が変わるため、個別に見積もりを行っています。無料体験セッションで詳細をお聞きし、その後見積もりを提示いたします。",
      },
    ],
  },
};

const FAQSection = () => {
  return Object.entries(QAItems).map(([key, v]) => (
    <Box key={key} mt={4}>
      <Typography fontWeight={700}>{v.title}</Typography>
      {v.items.map((item, index) => (
        <Accordion key={index} sx={{ my: 2 }} variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${key}-content`}
            id={`panel${key}-header`}
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
  ));
};

export default FAQSection;
