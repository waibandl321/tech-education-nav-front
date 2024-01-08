import { LearningCenter, LearningCenterCourse } from "@/API";
import { Autocomplete, Grid, InputAdornment, TextField } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useMemo } from "react";

type PropsType = {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  selectedCenter: LearningCenter | null;
  selectedCourse: LearningCenterCourse | null;
  setSelectedCenter: (
    value: React.SetStateAction<LearningCenter | null>
  ) => void;
  setSelectedCourse: (
    value: React.SetStateAction<LearningCenterCourse | null>
  ) => void;
};

export default function AutoCompleteSchoolCourse({
  centers,
  courses,
  selectedCenter,
  selectedCourse,
  setSelectedCenter,
  setSelectedCourse,
}: PropsType) {
  // コース選択オプション: スクールの選択状態に応じて動的に変化する
  const courseOptions: Array<LearningCenterCourse> = useMemo(() => {
    if (!courses) return [];
    return courses.filter((v) => v.learningCenterId === selectedCenter?.id);
  }, [selectedCenter, courses]);

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Autocomplete
          id="learningCenterSelect"
          value={selectedCenter}
          options={centers}
          noOptionsText="データがありません"
          getOptionLabel={(option) => option.name ?? ""}
          onChange={(event: any, newValue: LearningCenter | null) => {
            setSelectedCenter(newValue);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ backgroundColor: "#fff" }}
              {...params}
              placeholder="受講したスクールを選択してください"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Autocomplete
          fullWidth
          disabled={!selectedCenter}
          id="learningCourseSelect"
          value={selectedCourse}
          options={courseOptions}
          noOptionsText="データがありません"
          getOptionLabel={(option) => option.courseName ?? ""}
          onChange={(event: any, newValue: LearningCenterCourse | null) => {
            setSelectedCourse(newValue);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ backgroundColor: "#fff" }}
              {...params}
              placeholder="受講したコースを選択してください"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <TerminalIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
