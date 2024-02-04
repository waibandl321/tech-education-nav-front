import { sortBy } from "lodash";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  useMediaQuery,
  Box,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  Slider,
  InputLabel,
  FormHelperText,
} from "@mui/material";

import {
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  ProgrammingLanguage,
  PaymentMethod,
  CreditCard,
  DevelopmentCategory,
  DevelopmentProduct,
  Qualification,
} from "@/API";
import React, { useMemo } from "react";
import { AttendanceTypeLabels, PurposeLabels } from "@/const";

const MAX = 150;
const MIN = 0;

export default function SearchNavigation({
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
  developmentCategories,
  developmentProducts,
  dualifications,
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
  developmentCategories: Array<DevelopmentCategory>;
  developmentProducts: Array<DevelopmentProduct>;
  dualifications: Array<Qualification>;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");

  // 料金レンジ（仮）
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}万円`;
  }

  // プログラミング言語にフレームワークを紐付けたデータ
  const languageWithFrameworks = useMemo(() => {
    return languages.map((lang) => {
      const frameworksByLang = frameworks.filter(
        (framework) => framework.programmingLanguageId === lang.id
      );
      return {
        ...lang,
        frameworks: frameworksByLang,
      };
    });
  }, [languages, frameworks]);

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
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講料金
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            textAlign="center"
            variant="body2"
            fontWeight={700}
          >{`${value[0]}万円以上 〜 ${value[1]}万円以下`}</Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={5}
            min={MIN}
            max={MAX}
          />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: -1 }}
          >
            <Typography variant="caption" sx={{ cursor: "pointer" }}>
              5万円以下
            </Typography>
            <Typography variant="caption" sx={{ cursor: "pointer" }}>
              {MAX}万円
            </Typography>
          </Box>
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
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            カリキュラムの特徴
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isMadeToOrder" />}
            label="オーダーメイドカリキュラム"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isJobIntroductionAvailable" />}
            label="副業・フリーランス案件保証"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isJobHuntingSupport" />}
            label="転職サポート"
          />
          <FormHelperText>Be careful</FormHelperText>
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isJobHuntingSupport" />}
            label="転職保証"
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講スタイル
          </Typography>
        </Box>
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
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講目的
          </Typography>
        </Box>
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

      <Box sx={{ mt: 4 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            特別な受講対象者
          </Typography>
        </Box>
        {/* <List>
          {Object.entries(EspeciallyAudienceLabels).map(([key, item]) => (
            <ListItem
              key={key}
              secondaryAction={<ChevronRight />}
              disablePadding
            >
              <ListItemButton sx={{ p: 2 }}>{item.label}</ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            対応している支払い方法
          </Typography>
        </Box>
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
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            対応しているクレジットカード
          </Typography>
        </Box>
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
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            関わりたい開発分野
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-job-types"
              value={[""]}
              name="developmentCategories"
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {developmentCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            作りたいサービス
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-job-types"
              value={[""]}
              name="developmentProducts"
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {developmentProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            取得したい資格
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-job-types"
              value={[""]}
              name="dualifications"
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {dualifications.map((dualification) => (
                <MenuItem key={dualification.id} value={dualification.id}>
                  {dualification.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            なりたい職種
          </Typography>
        </Box>
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
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたい言語・フレームワーク
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select id="grouped-select" value={""}>
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {languageWithFrameworks.map((lang) => [
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name}
                </MenuItem>,
                // フレームワークをサブアイテムとして表示
                lang.frameworks.map((framework) => (
                  <MenuItem
                    key={framework.id}
                    value={framework.id}
                    sx={{ pl: 4 }}
                  >
                    {framework.name}
                  </MenuItem>
                )),
              ])}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたい開発ツール
          </Typography>
        </Box>
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
    </Card>
  );
}
