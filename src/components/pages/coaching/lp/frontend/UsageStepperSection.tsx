import { Step, StepLabel, Stepper, Typography, useMediaQuery } from "@mui/material";

/**
 * ご利用までの流れ
 */
const steps = [
  {
    label: "無料体験セッション",
    description: `サービスへの疑問や質問に無料でお答えします。\n
      達成したい目標や実現したいこと、希望するサポートなどを気軽に相談ください。(オンライン)`,
  },
  {
    label: "申し込み・お支払い",
    description:
      "無料体験セッション後、サービスを利用を希望する場合は、WEBから申し込みを行います。",
  },
  {
    label: "サービス開始",
    description: `申し込み後、専用のチャットルーム（Slack）へ招待します。\n
      コーチングセッションのスケジュールは、都合の良い日程で調整します。`,
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
