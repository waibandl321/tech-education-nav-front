import useUtils from "@/hooks/utils/useUtils";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const items = [
  {
    src: "/images/pages/coaching/lp/frontend/frontend3.webp",
    number: "01",
    title: "実務レベルの開発経験",
    sections: [
      {
        title: "実務レベルの開発スタイル",
        description: `当サービスは「学ぶ場所」ではありません。
        実際のプロジェクトを立ち上げ、開発現場で採用される「チケット駆動開発」で開発を行います。
        要件定義から詳細設計、実装、レビュー、テスト、デプロイまでの一連のフローを経験し、
        実践的なスキルを習得できます。`,
        image: "",
      },
      {
        title: "チーム開発",
        description:
          "Gitを使ったチーム開発のフローを再現し、円滑なチーム開発スキルを磨きます。また、バックエンド（API）との連携についてもレクチャーし、フロントエンドとバックエンドの協調作業をスムーズに行えるようにします。",
        image: "",
      },
    ],
    description: `当サービスは「学ぶ場所」ではありません。
    実際のプロジェクトを立ち上げ、開発現場で採用される「チケット駆動開発」で開発を行います。
    要件定義から詳細設計、実装、レビュー、テスト、デプロイまでの一連のフローを経験し、
    実践的なスキルを習得できます。また、Gitを使ったチーム開発のフローを再現し、円滑なチーム開発スキルを磨きます。`,
  },

  {
    src: "/images/pages/coaching/lp/frontend/frontend1.webp",
    number: "02",
    title: "技術力の向上",
    description: `Vue.jsやReact.jsを使用したモダンなフレームワークでの開発を通じて、ルーティング、状態管理、サーバーサイドレンダリング（SSR）などの重要な技術を実践的に学びます。`,
    sections: [
      {
        title: "モダンな技術のトレーニング",
        description: `Vue.jsやReact.jsを始めとするモダンなフレームワークを使用して開発を行います。
        アプリケーション開発で必要な、ルーティング、状態管理、サーバーサイドレンダリング（SSR）
        などの技術を実践を通じて身につけます。`,
        image: "",
      },
      {
        title: "コードレビュー",
        description: `開発現場では、コードレビューを行うのが一般的です。
          コードレビューの経験がない場合、「厳しすぎる」と感じたり、意味を見出せないこともあります。
          当サービスのコードレビューは、「修正が必要な理由」や「他のアプローチの利点」など具体的な根拠を明確にします。
          コードレビューに慣れることで、エンジニアとしての成長を促進します。`,
        image: "",
      },
    ],
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend5.webp",
    number: "03",
    title: "ゴールへの道筋",
    description: `単なる自己肯定ではなく、具体的に「何ができるようになったか」「何が足りないか」を明示します。常に「次にやるべきこと」が明確で、動き続けるための指針を提供します。`,
    sections: [
      {
        title: "マンツーマン指導",
        description: `現役のフロントエンドエンジニアがコーチであるため、そこを目指す人にとって有益な情報を提供できます。
          また、完全個別のコーチングであるため、何事も遠慮なく相談でき、コーチも情報共有を惜しみません。`,
        image: "",
      },
      {
        title: "方向性の提示",
        description: `コーチングセッションで定期的にフィードバックを行いますが、
          単なる自己肯定ではなく、具体的に「何ができるようになったか」「何が足りないか」を明示します。
          常に「次にやるべきこと」が明確で、動き続けるための指針を提供します。`,
        image: "",
      },
    ],
  },
  {
    src: "/images/pages/coaching/lp/frontend/frontend4.webp",
    number: "04",
    title: "アウトプット習慣の確立",
    sections: [
      {
        title: "技術ブログの執筆",
        description: `コーチング開始と同時に技術ブログを立ち上げてもらい、学んだことをアウトプットする習慣を身につけます。
        これにより知識を整理し、技術力をアピールすることで転職やフリーランス活動の成功につなげます。`,
        image: "",
      },
      {
        title: "書く力の向上",
        description: `開発現場での仕事を円滑に進める上で、書く力は非常に重要です。
          的確なドキュメント作成により、コミュニケーションの効率が上がり、信頼性が高まります。
          書く力を高めることでエンジニアとしての価値をさらに向上させます。`,
        image: "",
      },
    ],
    description: `残念ながら、技術を高めるだけでは、転職成功やフリーランスの案件獲得は難しいです。
          あなた自身をアピールする術が必要です。  
        適切なアウトプットは、信用を積み上げあなたのキャリアの可能性を広げます。
            開発現場での円滑なコミュニケーションにもつながります。
            そのための「アウトプット術」を身につけることができます。`,
  },
];

const ServiceStrengthSection = () => {
  const { isWindowSizeMdSm } = useUtils();

  return (
    <Box>
      {items.map((item) => (
        <React.Fragment key={item.src}>
          <Box
            display={isWindowSizeMdSm ? "block" : "flex"}
            alignItems="center"
            justifyContent="center"
            color="#f9ac0c"
          >
            <Typography
              fontWeight={700}
              sx={{
                whiteSpace: "nowrap",
                fontSize: 56,
              }}
            >
              {item.number}
            </Typography>
            <Typography
              fontWeight={700}
              component="h3"
              sx={{
                ml: {
                  sm: 4,
                },
                fontSize: {
                  xs: 30,
                  sm: 32,
                  md: 40,
                  lg: 48,
                },
              }}
            >
              {item.title}
            </Typography>
          </Box>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              mt: 3,
              mb: 10,
              p: isWindowSizeMdSm ? 2 : 4,
              overflow: "visible",
              position: "relative",
              display: isWindowSizeMdSm ? "block" : "flex",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <Box>
              <Image
                alt=""
                src={item.src}
                loading="lazy"
                width={300}
                height={250}
                // sx={{
                //   width: isWindowSizeMdSm ? "100%" : 300,
                // }}
              />
            </Box>
            <Box>
              {item.sections.map((section, secIndex) => (
                <Box pb={3} pt={0} key={secIndex}>
                  <Typography
                    component="h4"
                    variant={isWindowSizeMdSm ? "h6" : "h5"}
                    fontWeight="bold"
                  >
                    {section.title}
                  </Typography>
                  <Typography marginTop={1}>{section.description}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ServiceStrengthSection;
