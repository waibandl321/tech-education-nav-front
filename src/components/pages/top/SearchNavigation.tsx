import { sortBy } from "lodash";
import ChevronRight from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import learningCenterDefaultImage from "@/assets/images/learning-center-default.webp";
import {
  Container,
  Grid,
  Paper,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import {
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  ProgrammingLanguage,
  PaymentMethod,
  CreditCard,
} from "@/API";
import React, { useMemo } from "react";
import {
  AttendanceTypeLabels,
  EspeciallyAudienceLabels,
  PurposeLabels,
  priceOptions,
} from "@/const";
import Link from "next/link";
import Image from "next/image";

type ExtendedLearningCenter = LearningCenter & {
  courses: Array<LearningCenterCourse>;
};

const drawerWidth = 360;

export default function SearchNavigation({
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");

  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(() => {
    return centers.map((center) => {
      const coursesByCenter = courses.filter(
        (v) => v.learningCenterId === center.id
      );
      return {
        ...center,
        courses: coursesByCenter,
      };
    });
  }, [centers, courses]);

  // スクール > コースがplansを持っているかどうか
  const hasPlan = (center: ExtendedLearningCenter) => {
    return center.courses.some(
      (course) => course.plans && course.plans.length > 0
    );
  };

  return (
    <Card
      sx={
        isMobile
          ? { overflow: "auto", p: 2 }
          : { overflow: "auto", mr: 2, mb: 8, p: 2 }
      }
      variant="outlined"
    >
      <Box>
        <Typography>料金</Typography>
        <Box sx={{ mt: 1 }} display="flex" alignItems="center">
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="price-min-select-label">下限</InputLabel>
            <Select
              labelId="price-min-select-label"
              id="price-min-select"
              label="下限"
            >
              <MenuItem value="">
                <em>下限なし</em>
              </MenuItem>
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  {`${price}万円`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span style={{ marginLeft: 8, marginRight: 8 }}>~</span>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="price-max-select-label">上限</InputLabel>
            <Select
              labelId="price-max-select-label"
              id="price-max-select"
              label="上限"
            >
              <MenuItem value="">
                <em>上限なし</em>
              </MenuItem>
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  {`${price}万円`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 1 }}>
          <FormControlLabel
            control={<Checkbox name="isAvailableMoneyBack" />}
            label="返金保証あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isAvailableSubsidy" />}
            label="補助金あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="onSale" />}
            label="キャンペーン（クーポン/セール）あり"
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>カリキュラム</Typography>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isMadeToOrder" />}
            label="オーダーメイドカリキュラムあり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isJobIntroductionAvailable" />}
            label="副業・フリーランス案件紹介あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isJobHuntingSupport" />}
            label="転職サポートあり"
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>受講スタイル</Typography>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {Object.entries(AttendanceTypeLabels).map(([key, item]) => (
              <FormControlLabel
                key={key}
                control={<Checkbox name="attendanceType" value={item.value} />}
                label={item.label}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>受講目的</Typography>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {Object.entries(PurposeLabels).map(([key, purpose]) => (
              <FormControlLabel
                key={key}
                control={<Checkbox name="purposes" value={purpose.value} />}
                label={purpose.label}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>職種</Typography>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-job-types"
              value={[""]}
              name="jobTypes"
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {jobTypes.map((job) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>プログラミング言語</Typography>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-languages"
              name="programmingLanguages"
              value={[""]}
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {sortBy(languages, ["name"]).map((language) => (
                <MenuItem key={language.id} value={language.id}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>フレームワーク</Typography>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-frameworks"
              name="frameworks"
              value={[""]}
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {sortBy(frameworks, ["name"]).map((framework) => (
                <MenuItem key={framework.id} value={framework.id}>
                  {framework.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>開発ツール</Typography>
        <FormControl fullWidth>
          <Select
            id="select-development-tools"
            name="developmentTools"
            value={[""]}
            input={<OutlinedInput fullWidth />}
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {sortBy(developmentTools, ["name"]).map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>支払い方法</Typography>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {paymentMethods.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="paymentOptions" value={item.id} />}
                label={item.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>クレジットカード</Typography>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {creditCards.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="creditCards" value={item.id} />}
                label={item.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography>こだわりのテーマから探す</Typography>
        <List>
          {Object.entries(EspeciallyAudienceLabels).map(([key, item]) => (
            <ListItem
              key={key}
              secondaryAction={<ChevronRight />}
              disablePadding
            >
              <ListItemButton sx={{ p: 2 }}>{item.label}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
    // </Drawer>
  );
}
