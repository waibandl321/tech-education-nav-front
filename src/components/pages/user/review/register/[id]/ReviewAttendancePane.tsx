import {
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  IconButton,
  Container,
  useMediaQuery,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormButtons from "@/components/common/parts/FormButtons";
import FormTitle from "@/components/common/parts/FormTitle";

interface AttendanceFormType {
  courseName: string;
  attendancePeriod: string;
  courseFee: string;
  attendanceStyle: string;
  jobSupport: boolean;
  learnedLanguages: Array<string>;
}

/**
 * 受講情報の登録画面
 */
export default function Attendance() {
  const router = useRouter();

  // sp device
  const isMobile = useMediaQuery("(max-width:480px)");

  const [attendance, setAttendance] = useState<AttendanceFormType>({
    courseName: "",
    attendancePeriod: "",
    courseFee: "",
    attendanceStyle: "",
    jobSupport: false,
    learnedLanguages: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [name]: value,
    }));
  };

  // プログラミング言語情報
  const [learnedLanguages, setLearnedLanguages] = useState<string[]>([]);

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...learnedLanguages];
    newLanguages[index] = value;
    setLearnedLanguages(newLanguages);

    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      learnedLanguages: newLanguages,
    }));
  };

  const addLanguageField = () => {
    setLearnedLanguages([...learnedLanguages, ""]);
  };

  const removeLanguageField = (index: number) => {
    const newLanguages = learnedLanguages.filter((_, i) => i !== index);
    setLearnedLanguages(newLanguages);
  };

  // 数値（金額）をカンマ区切りの文字列に変換
  const formatNumber = (num: string) =>
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // カンマ区切りの文字列を数値（金額）に変換
  const unformatNumber = (formattedNumber: string) =>
    formattedNumber.replace(/[^\d]/g, "");

  // 数値（金額） 入力変更ハンドラ
  const handleFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedNumber = unformatNumber(event.target.value);
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      courseFee: formatNumber(unformattedNumber),
    }));
  };

  // データ送信の非同期処理をここに追加する
  const handleSubmit = async () => {
    // 送信ロジック
    console.log(attendance);
    router.push("/user/review/register/2/comment");
  };

  useEffect(() => {
    addLanguageField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={isMobile ? { px: 2, py: 4 } : { px: 4, py: 6 }}
      maxWidth="md"
    >
      <Card sx={{ backgroundColor: "#fff", pb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <FormTitle formTitle="[スクール名]の受講情報について教えてください。" />
        </CardContent>
        <Divider></Divider>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>受講したコース名</Typography>
          <TextField
            id="course_name"
            value={attendance.courseName}
            onChange={handleInputChange}
            name="courseName"
            fullWidth
            sx={{ mt: 1 }}
          />
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>受講期間</Typography>
          <TextField
            id="attendance_period"
            type="number"
            value={attendance.attendancePeriod}
            onChange={handleInputChange}
            name="attendancePeriod"
            sx={{ mt: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">ヶ月</InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>受講料金</Typography>
          <TextField
            id="course_fee"
            value={attendance.courseFee}
            name="courseFee"
            sx={{ mt: 1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">円</InputAdornment>,
            }}
            onChange={handleFeeChange}
          />
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>受講スタイル</Typography>
          <RadioGroup
            row
            aria-label="attendance_style"
            name="attendanceStyle"
            value={attendance.attendanceStyle}
            onChange={handleInputChange}
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              value="remote"
              control={<Radio />}
              label="リモート"
            />
            <FormControlLabel
              value="in-person"
              control={<Radio />}
              label="通学"
            />
          </RadioGroup>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>転職サポートの有無</Typography>
          <FormGroup sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={attendance.jobSupport}
                  onChange={handleInputChange}
                  name="jobSupport"
                />
              }
              label="あり"
            />
          </FormGroup>
        </CardContent>
        <CardContent sx={isMobile ? { px: 2 } : { px: 4 }}>
          <Typography fontWeight={700}>
            学習したプログラミング言語・フレームワークなど
          </Typography>
          {learnedLanguages.map((language, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                marginTop: "8px",
              }}
            >
              <TextField
                sx={{ flexGrow: 1 }}
                value={language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                name="learnedLanguages"
              />
              <IconButton
                onClick={() => removeLanguageField(index)}
                aria-label="delete"
                color="error"
                sx={{ ml: 1 }}
              >
                <DeleteOutline></DeleteOutline>
              </IconButton>
            </div>
          ))}
          <Button onClick={addLanguageField}>+ 追加</Button>
        </CardContent>

        <FormButtons
          submitText="次へ"
          backText="戻る"
          handleSubmit={handleSubmit}
          handleBack={() => router.back()}
        />
      </Card>
    </Container>
  );
}
