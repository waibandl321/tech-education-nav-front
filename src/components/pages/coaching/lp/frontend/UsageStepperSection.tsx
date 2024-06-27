import { Step, StepLabel, Stepper, Typography, useMediaQuery } from "@mui/material";

/**
 * ご利用までの流れ
 */
const steps = [
  {
    label: "無料体験セッション",
    description: `クライアントのヒアリングを重点的に行い、達成したい目標や実現したいことに対して提供できるサポート内容を説明します。（オンライン対応）`,
  },
  {
    label: "申し込み・お支払い",
    description: `無料体験セッション後、コーチングを希望される場合は、お支払いの案内をいたします。その場で決断する必要はなく、後日連絡をいただいても構いません。`,
  },
  {
    label: "サービス開始",
    description: `初回のコーチングセッションで目標をより具体的にし、目標達成までに必要なこと（全体像）をレクチャーします。専用のSlackに招待しますので、その時点から技術やキャリアの相談が可能です。`,
  },
];

const UsageStepperSection = () => {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <Stepper
      orientation="vertical"
      sx={{
        mt: 4,
        px: isMobile ? 2 : 0,
        "& .MuiStepLabel-label": { fontSize: isMobile ? "1.25rem" : "1.75rem" },
        "& .MuiTypography-caption": { fontSize: "1rem" },
        "& .MuiStepIcon-root": { fontSize: isMobile ? "3rem" : "4rem" },
        "& .MuiStepConnector-root": { marginLeft: isMobile ? 2.5 : 3.5 },
        "& .MuiStepLabel-labelContainer": { marginLeft: 2 },
      }}
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel optional={<Typography variant="caption">{step.description}</Typography>}>
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default UsageStepperSection;
