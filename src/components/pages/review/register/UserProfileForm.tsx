import { useFormOptions } from "@/hooks/utils/useFormOptions";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserProfileType } from "./ReviewRegisterProfilePane";
import { useRouter } from "next/router";

export default function UserProfileForm({
  onSubmit,
  userInfo,
  handlerFormChange,
}: {
  onSubmit: (data: UserProfileType) => void;
  userInfo: UserProfileType;
  handlerFormChange: (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");
  const router = useRouter();
  const { prefectures, genders } = useFormOptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserProfileType>({
    //初期値を useForm の defaultValues に設定する
    defaultValues: {
      ...userInfo,
    },
  });

  useEffect(() => {
    // useFormのdefaultValuesを使っている場合は、setValueで初期値を設定する
    setValue("gender", userInfo.gender || "");
    setValue("age", userInfo.age);
    setValue("prefecture", userInfo.prefecture || "");
  }, [userInfo, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={700}>性別</Typography>
        <RadioGroup
          row
          aria-label="gender"
          sx={{ mt: 1 }}
          value={userInfo.gender || ""}
        >
          {genders.map((gender) => (
            <FormControlLabel
              key={gender.key}
              {...register("gender", {
                required: {
                  value: true,
                  message: "性別は入力必須の項目です。",
                },
                onChange: (event) => handlerFormChange(event),
              })}
              value={gender.key}
              control={<Radio />}
              label={gender.value}
            />
          ))}
        </RadioGroup>
        {!!errors.gender && (
          <FormHelperText error={!!errors.gender}>
            {errors.gender.message}
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={700}>年齢</Typography>
        <TextField
          value={userInfo.age || ""}
          {...register("age", {
            required: {
              value: true,
              message: "年齢は入力必須の項目です。",
            },
            onChange: (event) => handlerFormChange(event),
          })}
          error={!!errors.age}
          helperText={errors.age?.message}
          margin="normal"
          type="number"
          id="age"
          autoComplete="age"
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={700}>お住まいの都道府県</Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid item minWidth={200}>
            <Select
              value={userInfo?.prefecture || ""}
              {...register("prefecture", {
                required: {
                  value: true,
                  message: "都道府県は選択必須の項目です。",
                },
                onChange: (event) => handlerFormChange(event),
              })}
              error={!!errors.prefecture}
              id="prefecture"
              sx={{ mt: 1 }}
              fullWidth
            >
              {prefectures.map((p) => (
                <MenuItem key={p.key} value={p.key}>
                  {p.value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        {errors.prefecture?.message && (
          <FormHelperText error={!!errors.prefecture}>
            {errors.prefecture.message}
          </FormHelperText>
        )}
      </Box>
      <Divider sx={{ my: 3 }}></Divider>
      <Box sx={{ mt: 3, px: 2 }} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: isMobile ? "100%" : 400,
            height: 52,
            fontSize: 18,
          }}
          type="submit"
        >
          次へ
        </Button>
      </Box>
      <Box textAlign="center" sx={{ mt: 2, px: 2 }}>
        <Button
          color="inherit"
          variant="outlined"
          size="large"
          sx={{
            width: isMobile ? "100%" : 400,
            height: 52,
            fontSize: 18,
          }}
          onClick={() => router.push("/")}
        >
          キャンセル
        </Button>
      </Box>
    </form>
  );
}
