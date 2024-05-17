import { School, Course } from "@/types/APIDataType";
import { Autocomplete, Grid, InputAdornment, TextField } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useMemo } from "react";

type PropsType = {
  centers: Array<School>;
  courses: Array<Course>;
  selectedCenter: School | null;
  selectedCourse: Course | null;
  setSelectedCenter: (value: React.SetStateAction<School | null>) => void;
  setSelectedCourse: (value: React.SetStateAction<Course | null>) => void;
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
  const courseOptions: Array<Course> = useMemo(() => {
    if (!courses) return [];
    return courses.filter((v) => v.schoolId === selectedCenter?._id);
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
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(event: any, newValue: School | null) => {
            setSelectedCenter(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="スクールを選択してください"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#fff" }}
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
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(event: any, newValue: Course | null) => {
            setSelectedCourse(newValue);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ backgroundColor: "#fff" }}
              {...params}
              placeholder="コースを選択してください"
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
