import {
  Card,
  CardContent,
  Container,
  Divider,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UserProfileForm from "@/components/pages/review/register/UserProfileForm";
import { useRouter } from "next/router";
import useReview from "@/hooks/useReview";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSessionStorage from "@/hooks/utils/useSessionStorage";

export const initProfile = {
  displayId: "",
  gender: "",
  prefecture: "",
  age: null as null | number,
};
export type UserProfileType = typeof initProfile;

export default function UserSetting() {
  // hooks
  const isMobile = useMediaQuery("(max-width:640px)");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { steps } = useReview();
  const { sessionStorageValue, setSessionStorageValue } = useSessionStorage(
    "PROFILE_DATA",
    ""
  );
  // state
  const [userInfo, setUserInfo] = useState<UserProfileType>(initProfile);

  // Formの更新
  const handlerUserFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // セッションストレージにデータを保存する
  const handlerSubmit = async (data: UserProfileType) => {
    const req = JSON.stringify({
      ...data,
      displayId: uuidv4(),
    });
    setSessionStorageValue(req);
    router.push("/review/register/select");
  };

  const beforePath = searchParams?.get("beforePath");

  useEffect(() => {
    if (beforePath === "select") {
      if (sessionStorageValue) {
        setUserInfo(JSON.parse(sessionStorageValue));
      }
    }
    setSessionStorageValue("");
  }, [beforePath]);

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 5 }}>
      <Card
        sx={{ py: 4, px: isMobile ? 2 : 4, borderRadius: "16px" }}
        elevation={3}
      >
        <Typography
          component="h2"
          variant="h5"
          textAlign="center"
          marginBottom={2}
        >
          プロフィール入力
        </Typography>
        <CardContent sx={{ px: 0 }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider sx={{ my: 3 }}></Divider>
          <UserProfileForm
            onSubmit={handlerSubmit}
            userInfo={userInfo}
            handlerFormChange={handlerUserFormChange}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
