import { AccountInfomation } from "@/contexts/UserContext";
import useValidation from "@/hooks/utils/useValidation";
import { UserAccountInputType } from "@/types/FormType";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditUserAccountForm({
  account,
  handlerFormChange,
  onSubmit,
}: {
  account: AccountInfomation;
  handlerFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
}) {
  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccountInputType>({
    //初期値を useForm の defaultValues に設定する
    defaultValues: {
      email: account.email || "",
    },
  });
  const { EmailRegex, useGetEmailInputError } = useValidation();

  useEffect(() => {
    // setValueで初期値を設定
    setValue("email", account.email || "");
  }, [account, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 2 }}>
        <Typography>メールアドレス</Typography>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          autoComplete="email"
          autoFocus
          value={account.email || ""}
          {...register("email", {
            required: true,
            pattern: EmailRegex,
            onChange: (event) => handlerFormChange(event),
          })}
          error={!!errors.email}
          helperText={useGetEmailInputError(errors.email?.type)}
        />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "100%",
            fontSize: isMobile ? 16 : 18,
            height: isMobile ? 48 : 56,
          }}
          type="submit"
        >
          保存
        </Button>
      </Box>
    </form>
  );
}
