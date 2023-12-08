import { User } from "@/API";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
import { UserProfileInputType } from "@/types/FormType";
import {
  Box,
  Button,
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

export default function EditUserProfileForm({
  user,
  handlerFormChange,
  onSubmit,
}: {
  user: User;
  handlerFormChange: (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
  onSubmit: () => Promise<void>;
}) {
  const isMobile = useMediaQuery("(max-width:480px)");
  const { prefectures, genders, getBirthDayFields } = useFormOptions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserProfileInputType>({
    //初期値を useForm の defaultValues に設定する
    defaultValues: {
      name: user.name || "",
      gender: user.gender || "",
      birthYear: user.birthYear || 1990,
      birthMonth: user.birthMonth || 1,
      birthDate: user.birthDate || 1,
      prefecture: user.prefecture || "",
      previousJob: user.previousJob || "",
    },
  });

  useEffect(() => {
    // useFormのdefaultValuesを使っている場合は、setValueで初期値を設定する
    setValue("name", user.name || "");
    setValue("gender", user.gender || "");
    setValue("birthYear", user.birthYear || 1990);
    setValue("birthMonth", user.birthMonth || 1);
    setValue("birthDate", user.birthDate || 1);
    setValue("prefecture", user.prefecture || "");
    setValue("previousJob", user.previousJob || "");
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 5 }}>
        <Typography>氏名</Typography>
        <TextField
          value={user.name || ""}
          {...register("name", {
            required: {
              value: true,
              message: "氏名は入力必須の項目です。",
            },
            onChange: (event) => handlerFormChange(event),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          id="name"
          placeholder="名前 太郎"
          autoComplete="name"
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography>性別</Typography>
        <RadioGroup
          row
          aria-label="gender"
          sx={{ mt: 1 }}
          value={user.gender || ""}
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
      <Box sx={{ mt: 5 }}>
        <Typography>生年月日</Typography>
        <Grid container alignItems="center" sx={{ mt: 1 }}>
          {getBirthDayFields(user).map((field, index) => (
            <React.Fragment key={field.name}>
              <Grid item minWidth={80}>
                <Select
                  labelId={field.labelId}
                  id={field.labelId}
                  fullWidth
                  value={field.value || ""}
                  {...register(field.name, {
                    required: `${field.labelName}は入力必須の項目です。`,
                    onChange: (event) => handlerFormChange(event),
                  })}
                  error={!!errors[field.name]}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[field.name] && (
                  <FormHelperText error={!!errors[field.name]}>
                    {errors[field.name]?.message}
                  </FormHelperText>
                )}
              </Grid>
              {index < getBirthDayFields(user).length - 1 && (
                <Grid item sx={{ px: 1 }}>
                  /
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography>現在お住まいの都道府県</Typography>
        <Grid container sx={{ mt: 1 }}>
          <Grid item minWidth={200}>
            <Select
              value={user?.prefecture || ""}
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
      <Box sx={{ mt: 5 }}>
        <Typography>前職</Typography>
        <TextField
          value={user?.previousJob || ""}
          {...register("previousJob", {
            required: {
              value: true,
              message: "前職は入力必須の項目です。",
            },
            onChange: (event) => handlerFormChange(event),
          })}
          error={!!errors.previousJob}
          helperText={errors.previousJob?.message}
          margin="normal"
          fullWidth
          id="previousJob"
          placeholder="営業、公務員、コールセンター、学生など"
          autoComplete="off"
          sx={{ mt: 1 }}
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
