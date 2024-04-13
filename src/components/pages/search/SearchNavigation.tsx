import { sortBy } from "lodash";
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
  Slider,
} from "@mui/material";
import React, { useMemo } from "react";
import { AttendanceTypeLabels, PurposeOptions } from "@/const";
import { useAppSelector } from "@/lib/hooks";

const MAX = 150;
const MIN = 0;

export default function SearchNavigation() {
  // store
  const searchData = useAppSelector((state) => state.searchData);
  // デバイス判定
  const isMobile = useMediaQuery("(max-width:640px)");

  // 料金レンジ（仮）
  const [rangeValue, setRangeValue] = React.useState<number[]>([20, 37]);
  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };
  function rangeValueText(value: number) {
    return `${value}万円`;
  }

  // プログラミング言語にフレームワークを紐付けたデータ
  const languageWithFrameworks = useMemo(() => {
    return searchData.programmingLanguages.map((lang) => {
      const frameworksByLang = searchData.frameworks.filter(
        (framework) => framework.programmingLanguageId === lang.id
      );
      return {
        ...lang,
        frameworks: frameworksByLang,
      };
    });
  }, [searchData.programmingLanguages, searchData.frameworks]);

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
          >{`${rangeValue[0]}万円以上 〜 ${rangeValue[1]}万円以下`}</Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={rangeValue}
            onChange={handleChangeRange}
            valueLabelDisplay="auto"
            getAriaValueText={rangeValueText}
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
            {AttendanceTypeLabels.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="attendanceType" value={item.id} />}
                label={item.name}
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
            {PurposeOptions.map((purpose) => (
              <FormControlLabel
                key={purpose.id}
                control={<Checkbox name="purposes" value={purpose.id} />}
                label={purpose.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            特別割引の対象者
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            id="select-benefit-user-categories"
            value={[""]}
            name="benefitUserCategories"
            input={<OutlinedInput fullWidth />}
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {searchData.benefitUserCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            対応している支払い方法
          </Typography>
        </Box>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {searchData.paymentMethods.map((item) => (
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
            {searchData.creditCards.map((item) => (
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
            開発分野
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
              {searchData.developmentCategories.map((category) => (
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
              {searchData.developmentProducts.map((product) => (
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
            資格
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              id="select-job-types"
              value={[""]}
              name="qualifications"
              input={<OutlinedInput fullWidth />}
              multiple
            >
              <MenuItem value="">
                <em>指定しない</em>
              </MenuItem>
              {searchData.qualifications.map((dualification) => (
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
              {searchData.jobTypes.map((job) => (
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
            学びたいツール
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
            {sortBy(searchData.developmentTools, ["name"]).map((item) => (
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
